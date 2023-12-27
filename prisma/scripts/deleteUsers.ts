// script.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const deleteUsers = await prisma.user.deleteMany({});
  console.log(`${deleteUsers.count} users deleted.`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
