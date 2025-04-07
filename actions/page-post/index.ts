"use server";

import { revalidatePath } from "next/cache";
import PagePost, {
  IActionResponse,
  IPostInteraction,
  PostInteraction,
} from "@/models/PagePost";
import { auth } from "@/auth";

export async function likePost(
  postId: string,
  pageId: string
): Promise<IActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      console.log("2");
      return { success: false, error: "Unauthorized" };
    }

    const post = await PagePost.findById(postId);
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    // Check if user already interacted
    const existingInteraction = await PostInteraction.findOne({
      postId,
      userId: session.user.id,
    });

    if (existingInteraction) {
      return { success: false, error: `Already ${existingInteraction.type}d` };
    }

    const updatedLikes = post.likes + 1;
    post.likes = updatedLikes;

    await post.save();

    await PostInteraction.create({
      postId,
      userId: session.user.id,
      type: "like",
    });

    revalidatePath(`/clubs/${pageId}`);

    return {
      success: true,
      likes: updatedLikes,
      dislikes: post.dislikes,
    };
  } catch (error) {
    console.error("Error in likePost:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function dislikePost(
  postId: string,
  pageId: string
): Promise<IActionResponse> {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const post = await PagePost.findById(postId);
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const existingInteraction = await PostInteraction.findOne({
      postId,
      userId: session.user.id,
    });

    if (existingInteraction) {
      return { success: false, error: `Already ${existingInteraction.type}d` };
    }

    const updatedDislikes = post.dislikes + 1;
    post.dislikes = updatedDislikes;
    await post.save();

    await PostInteraction.create({
      postId,
      userId: session.user.id,
      type: "dislike",
    });

    revalidatePath(`/clubs/${pageId}`);

    return {
      success: true,
      likes: post.likes,
      dislikes: updatedDislikes,
    };
  } catch (error) {
    console.error("Error in dislikePost:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function checkIfInteracted(
  userId: string,
  postId: string
): Promise<IPostInteraction | null> {
  try {
    const interaction = await PostInteraction.findOne({
      userId,
      postId,
    });
    if (!interaction) {
      return null;
    }
    return JSON.parse(JSON.stringify(interaction));
  } catch (error) {
    console.error("Error checking interaction:", error);
    return null;
  }
}
