"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma/client";

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
