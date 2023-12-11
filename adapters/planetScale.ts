import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";

const INIT_RESUMES = 2;

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
      console.log(error);
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
    console.log(error);
    return null;
  }
};

export default function planetScaleAdapter(prismaClient: PrismaClient) {
  return {
    ...PrismaAdapter(prismaClient),
    createUser: customCreateUser,
  };
}
