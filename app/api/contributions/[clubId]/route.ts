import { NextRequest, NextResponse } from "next/server";
import { getClubContributions } from "@/actions/getContributions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ clubId: string }> }
) {
  const clubId = (await params).clubId;

  // Set headers for SSE
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };

  // Create a readable stream
  const stream = new ReadableStream({
    async start(controller) {
      // Function to send contribution updates
      const sendUpdate = async () => {
        try {
          const data = await getClubContributions(clubId);
          const event = `data: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(new TextEncoder().encode(event));
        } catch (error) {
          console.error("Error sending contribution update:", error);
        }
      };

      // Send initial data
      await sendUpdate();

      // Set up interval to check for updates (every 5 seconds)
      const intervalId = setInterval(sendUpdate, 5000);

      // Clean up on close
      request.signal.addEventListener("abort", () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, { headers });
}
