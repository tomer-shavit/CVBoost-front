"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma/client";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export async function setFeedbackLiked(
  boostId: number,
  feedbackId: number,
  isLiked: boolean,
) {
  await prisma.feedback.update({
    where: { feedbackId },
    data: { isLiked },
  });

  revalidatePath(`/boost/${boostId}`);
}

export async function deleteAccount(userId?: string) {
  if (!userId) {
    redirect("/");
  }
  const user = await prisma.user.delete({ where: { id: userId } });
}
