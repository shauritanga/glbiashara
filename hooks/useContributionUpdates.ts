"use client";

import { useState, useEffect } from "react";

type ContributionData = {
  totalAmount: number;
  contributionsCount: number;
  uniqueContributorsCount: number;
};

export function useContributionUpdates(
  clubId: string,
  initialData: ContributionData
) {
  const [data, setData] = useState<ContributionData>(initialData);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!clubId) {
      console.log("No clubId provided, skipping SSE connection");
      return;
    }

    let eventSource: EventSource;
    console.log(`Setting up SSE connection for club: ${clubId}`);

    const connectSSE = () => {
      console.log(`Connecting to SSE endpoint: /api/contributions/${clubId}`);
      eventSource = new EventSource(`/api/contributions/${clubId}`);

      eventSource.onopen = () => {
        setIsConnected(true);
        console.log("SSE connection established successfully");
      };

      eventSource.onmessage = (event) => {
        try {
          console.log("Received SSE update:", event.data);
          const newData = JSON.parse(event.data);
          console.log("Parsed SSE data:", newData);
          setData(newData);
        } catch (error) {
          console.error("Error parsing SSE data:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        setIsConnected(false);
        eventSource.close();

        // Try to reconnect after a delay
        console.log("Attempting to reconnect in 5 seconds...");
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        console.log("Cleaning up SSE connection");
        eventSource.close();
        setIsConnected(false);
      }
    };
  }, [clubId]);

  return { data, isConnected };
}
