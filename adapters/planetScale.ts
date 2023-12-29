import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";
import { MixpanelBack } from "@/services/mixpanelBack";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

const INIT_RESUMES = 1;

const customCreateUser: (
  user: Omit<AdapterUser, "id">,
) => Promise<AdapterUser> = async (user) => {
  let resUser = await getUserByEmail(user.email);
  if (!resUser) {
    try {
      resUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          resumeBoostsAvailable: INIT_RESUMES,
          resumeBoostsTotal: INIT_RESUMES,
        },
      });
      return resUser;
    } catch (error) {
      MixpanelBack.getInstance().track(
        MontioringErrorTypes.CREATE_CUSTOM_USER_ERROR,
        {
          error: error,
        },
      );
      return {} as AdapterUser;
    }
  }
  return resUser;
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    MixpanelBack.getInstance().track(
      MontioringErrorTypes.GET_USER_BY_EMAIL_ERROR,
      {
        error: error,
      },
    );
    return null;
  }
};

export default function planetScaleAdapter(prismaClient: PrismaClient) {
  return {
    ...PrismaAdapter(prismaClient),
    createUser: customCreateUser,
  };
}
