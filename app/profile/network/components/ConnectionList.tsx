"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  acceptConnection,
  removeConnection,
  cancelConnectionRequest,
} from "@/actions/connections";
import {
  CheckCircle,
  XCircle,
  UserMinus,
  Clock,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConnectionListProps {
  connections: any[];
  type: "established" | "pending" | "requests";
  isLoading: boolean;
  onUpdate: () => Promise<void>;
  userId: string;
}

export default function ConnectionList({
  connections,
  type,
  isLoading,
  onUpdate,
  userId,
}: ConnectionListProps) {
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleAcceptConnection = async (connectionId: string) => {
    setProcessingIds((prev) => new Set(prev).add(connectionId));
    try {
      await acceptConnection(connectionId, userId);
      toast({
        title: "Connection accepted",
        description: "You are now connected with this user",
        variant: "default",
      });
      await onUpdate();
    } catch (error) {
      console.error("Error accepting connection:", error);
      toast({
        title: "Error",
        description: "Failed to accept connection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  const handleRemoveConnection = async (connectionId: string) => {
    setProcessingIds((prev) => new Set(prev).add(connectionId));
    try {
      await removeConnection(connectionId, userId);
      toast({
        title: "Connection removed",
        description: "You are no longer connected with this user",
        variant: "default",
      });
      await onUpdate();
    } catch (error) {
      console.error("Error removing connection:", error);
      toast({
        title: "Error",
        description: "Failed to remove connection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  const handleCancelRequest = async (connectionId: string) => {
    setProcessingIds((prev) => new Set(prev).add(connectionId));
    try {
      await cancelConnectionRequest(connectionId, userId);
      toast({
        title: "Request cancelled",
        description: "Your connection request has been cancelled",
        variant: "default",
      });
      await onUpdate();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast({
        title: "Error",
        description: "Failed to cancel request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center p-4 border rounded-lg animate-pulse"
          >
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {type === "established" && (
            <UserCheck className="h-8 w-8 text-gray-400" />
          )}
          {type === "pending" && <Clock className="h-8 w-8 text-gray-400" />}
          {type === "requests" && (
            <UserPlus className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-700">
          No connections found
        </h3>
        <p className="text-gray-500 mt-1">
          {type === "established" && "You don't have any connections yet."}
          {type === "pending" &&
            "You don't have any pending connection requests."}
          {type === "requests" && "You don't have any connection requests."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {connections.map((connection) => {
        const user =
          type === "requests" ? connection.sender : connection.receiver;
        const isProcessing = processingIds.has(connection._id);

        return (
          <div
            key={connection._id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">
                  {user.profession
                    ? user.profession.toString()
                    : "No profession listed"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {type === "established" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveConnection(connection._id)}
                  disabled={isProcessing}
                  className="text-gray-700 border-gray-300"
                >
                  {isProcessing ? (
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <UserMinus className="h-4 w-4 mr-1" />
                      Remove
                    </>
                  )}
                </Button>
              )}

              {type === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelRequest(connection._id)}
                  disabled={isProcessing}
                  className="text-gray-700 border-gray-300"
                >
                  {isProcessing ? (
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </>
                  )}
                </Button>
              )}

              {type === "requests" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAcceptConnection(connection._id)}
                    disabled={isProcessing}
                    className="text-green-700 border-green-300 hover:bg-green-50"
                  >
                    {isProcessing ? (
                      <div className="h-4 w-4 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveConnection(connection._id)}
                    disabled={isProcessing}
                    className="text-red-700 border-red-300 hover:bg-red-50"
                  >
                    {isProcessing ? (
                      <div className="h-4 w-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
