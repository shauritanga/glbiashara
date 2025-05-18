"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getUserConnections,
  getUserPendingConnections,
  getUserConnectionRequests,
} from "@/actions/connections";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import ConnectionList from "./ConnectionList";
import FindConnectionsModal from "./FindConnectionsModal";

interface NetworkTabsProps {
  userId: string;
}

export default function NetworkTabs({ userId }: NetworkTabsProps) {
  const [activeTab, setActiveTab] = useState("connections");
  const [connections, setConnections] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [connectionsData, pendingData, requestsData] = await Promise.all([
          getUserConnections(userId),
          getUserPendingConnections(userId),
          getUserConnectionRequests(userId),
        ]);

        setConnections(connectionsData || []);
        setPendingConnections(pendingData || []);
        setConnectionRequests(requestsData || []);
      } catch (error) {
        console.error("Error fetching network data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const refreshConnections = async () => {
    try {
      const [connectionsData, pendingData, requestsData] = await Promise.all([
        getUserConnections(userId),
        getUserPendingConnections(userId),
        getUserConnectionRequests(userId),
      ]);

      setConnections(connectionsData || []);
      setPendingConnections(pendingData || []);
      setConnectionRequests(requestsData || []);
    } catch (error) {
      console.error("Error refreshing connections:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Connections
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Find Connections
        </Button>
      </div>

      <Tabs
        defaultValue="connections"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="connections">
            Connections
            {connections.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {connections.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            {pendingConnections.length > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingConnections.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="requests">
            Requests
            {connectionRequests.length > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {connectionRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <ConnectionList
            connections={connections}
            type="established"
            isLoading={isLoading}
            onUpdate={refreshConnections}
            userId={userId}
          />
        </TabsContent>

        <TabsContent value="pending">
          <ConnectionList
            connections={pendingConnections}
            type="pending"
            isLoading={isLoading}
            onUpdate={refreshConnections}
            userId={userId}
          />
        </TabsContent>

        <TabsContent value="requests">
          <ConnectionList
            connections={connectionRequests}
            type="requests"
            isLoading={isLoading}
            onUpdate={refreshConnections}
            userId={userId}
          />
        </TabsContent>
      </Tabs>

      <FindConnectionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        onConnect={refreshConnections}
      />
    </div>
  );
}
