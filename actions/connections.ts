"use server";

import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import mongoose from "mongoose";
import { Connection } from "@/models";

// Define connection status constants
const CONNECTION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

// Search for users to connect with
export async function searchUsers(query: string, currentUserId: string) {
  try {
    await dbConnect();

    // Create a regex for case-insensitive search
    const searchRegex = new RegExp(query, "i");

    // Find users that match the search query
    const users = await User.find({
      $and: [
        {
          $or: [
            { name: { $regex: searchRegex } },
            { "profession.name": { $regex: searchRegex } },
            { business: { $regex: searchRegex } },
          ],
        },
        { _id: { $ne: currentUserId } }, // Exclude current user
      ],
    })
      .populate("profession")
      .limit(10)
      .lean();

    // Get existing connections to filter out users already connected or with pending requests
    const connections = await Connection.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    }).lean();

    // Extract IDs of users already connected or with pending requests
    const connectedUserIds = connections.map((conn) => {
      return conn.sender.toString() === currentUserId
        ? conn.receiver.toString()
        : conn.sender.toString();
    });

    // Filter out users already connected or with pending requests
    const filteredUsers = users.filter(
      (user) =>
        !connectedUserIds.includes(
          (user._id as mongoose.Types.ObjectId).toString()
        )
    );

    return JSON.parse(JSON.stringify(filteredUsers));
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Failed to search users");
  }
}

// Send a connection request
export async function sendConnectionRequest(
  senderId: string,
  receiverId: string
) {
  try {
    await dbConnect();

    // Check if a connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    if (existingConnection) {
      throw new Error("Connection already exists");
    }

    // Create a new connection request
    const connection = new Connection({
      sender: senderId,
      receiver: receiverId,
      status: CONNECTION_STATUS.PENDING,
    });

    await connection.save();
    return { success: true };
  } catch (error) {
    console.error("Error sending connection request:", error);
    throw new Error("Failed to send connection request");
  }
}

// Accept a connection request
export async function acceptConnection(connectionId: string, userId: string) {
  try {
    await dbConnect();

    const connection = await Connection.findOne({
      _id: connectionId,
      receiver: userId,
      status: CONNECTION_STATUS.PENDING,
    });

    if (!connection) {
      throw new Error("Connection request not found");
    }

    connection.status = CONNECTION_STATUS.ACCEPTED;
    await connection.save();

    return { success: true };
  } catch (error) {
    console.error("Error accepting connection:", error);
    throw new Error("Failed to accept connection");
  }
}

// Remove a connection
export async function removeConnection(connectionId: string, userId: string) {
  try {
    await dbConnect();

    const connection = await Connection.findOne({
      _id: connectionId,
      $or: [{ sender: userId }, { receiver: userId }],
    });

    if (!connection) {
      throw new Error("Connection not found");
    }

    await Connection.deleteOne({ _id: connectionId });

    return { success: true };
  } catch (error) {
    console.error("Error removing connection:", error);
    throw new Error("Failed to remove connection");
  }
}

// Cancel a pending connection request
export async function cancelConnectionRequest(
  connectionId: string,
  userId: string
) {
  try {
    await dbConnect();

    const connection = await Connection.findOne({
      _id: connectionId,
      sender: userId,
      status: CONNECTION_STATUS.PENDING,
    });

    if (!connection) {
      throw new Error("Connection request not found");
    }

    await Connection.deleteOne({ _id: connectionId });

    return { success: true };
  } catch (error) {
    console.error("Error cancelling connection request:", error);
    throw new Error("Failed to cancel connection request");
  }
}

// Get user's established connections
export async function getUserConnections(userId: string) {
  try {
    await dbConnect();

    const connections = await Connection.find({
      $or: [{ sender: userId }, { receiver: userId }],
      status: CONNECTION_STATUS.ACCEPTED,
    })
      .populate("sender", "name image profession")
      .populate("receiver", "name image profession")
      .lean();

    return JSON.parse(JSON.stringify(connections));
  } catch (error) {
    console.error("Error getting user connections:", error);
    throw new Error("Failed to get user connections");
  }
}

// Get user's pending connection requests (sent by the user)
export async function getUserPendingConnections(userId: string) {
  try {
    await dbConnect();

    const connections = await Connection.find({
      sender: userId,
      status: CONNECTION_STATUS.PENDING,
    })
      .populate("receiver", "name image profession")
      .lean();

    return JSON.parse(JSON.stringify(connections));
  } catch (error) {
    console.error("Error getting pending connections:", error);
    throw new Error("Failed to get pending connections");
  }
}

// Get connection requests received by the user
export async function getUserConnectionRequests(userId: string) {
  try {
    await dbConnect();

    const connections = await Connection.find({
      receiver: userId,
      status: CONNECTION_STATUS.PENDING,
    })
      .populate("sender", "name image profession")
      .lean();

    return JSON.parse(JSON.stringify(connections));
  } catch (error) {
    console.error("Error getting connection requests:", error);
    throw new Error("Failed to get connection requests");
  }
}
