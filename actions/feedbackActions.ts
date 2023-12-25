"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma/client";
import { redirect } from "next/navigation";
import { cancelSubscription } from "@/helper/Payments/crud";

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
  await cancelSubscription(userId);
  await prisma.user.delete({ where: { id: userId } });
}
