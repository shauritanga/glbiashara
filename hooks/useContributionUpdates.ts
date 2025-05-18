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
    if (!clubId) return;

    let eventSource: EventSource;

    const connectSSE = () => {
      eventSource = new EventSource(`/api/contributions/${clubId}`);

      eventSource.onopen = () => {
        setIsConnected(true);
        console.log("SSE connection established");
      };

      eventSource.onmessage = (event) => {
        try {
          const newData = JSON.parse(event.data);
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
        setTimeout(connectSSE, 5000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
        setIsConnected(false);
      }
    };
  }, [clubId]);

  return { data, isConnected };
}
