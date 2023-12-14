"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma/client";

export async function setFeedbackLiked(
  boostId: number,
  feedbackId: number,
  isLiked: boolean,
) {
  const updatedFeedback = await prisma.feedback.update({
    where: { feedbackId },
    data: { isLiked },
  });

  revalidatePath(`/boost/${boostId}`);

  return updatedFeedback;
}
