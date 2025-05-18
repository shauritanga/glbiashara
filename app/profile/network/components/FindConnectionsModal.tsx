"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";
import Image from "next/image";
import { searchUsers, sendConnectionRequest } from "@/actions/connections";
import { useToast } from "@/hooks/use-toast";

interface User {
  _id: string;
  name: string;
  image?: string;
  profession?: {
    name: string;
  };
}

interface FindConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onConnect: () => Promise<void>;
}

export default function FindConnectionsModal({
  isOpen,
  onClose,
  userId,
  onConnect,
}: FindConnectionsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [connectingIds, setConnectingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await searchUsers(searchQuery, userId);
      setSearchResults(results || []);
    } catch (error) {
      console.error("Error searching users:", error);
      toast({
        title: "Search failed",
        description: "Failed to search for users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleConnect = async (targetUserId: string) => {
    setConnectingIds((prev) => new Set(prev).add(targetUserId));
    try {
      await sendConnectionRequest(userId, targetUserId);
      toast({
        title: "Connection request sent",
        description: "Your connection request has been sent successfully",
        variant: "default",
      });
      await onConnect();

      // Remove the user from search results
      setSearchResults((prev) =>
        prev.filter((user: { _id: string }) => user._id !== targetUserId)
      );
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast({
        title: "Request failed",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(targetUserId);
        return newSet;
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Find Connections</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search by name or profession..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching}>
              {isSearching ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Search
            </Button>
          </div>
        </form>

        <div className="mt-6 max-h-[300px] overflow-y-auto">
          {isSearching ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center p-4 border rounded-lg animate-pulse"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 mr-3">
                      <Image
                        src={user.image || "/default-avatar.png"}
                        alt={user.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <p className="text-xs text-gray-500">
                        {user.profession?.name || "No profession listed"}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleConnect(user._id)}
                    disabled={connectingIds.has(user._id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {connectingIds.has(user._id) ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          ) : searchQuery && !isSearching ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-700">
                No users found
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Try a different search term or check back later
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <UserPlus className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-700">
                Find new connections
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Search for people by name or profession
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
