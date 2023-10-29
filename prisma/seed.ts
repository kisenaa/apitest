import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient, Prisma } from '@prisma/client';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();
neonConfig.fetchConnectionCache = true;
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Init prisma client
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

const timestamp = 1698123482078;
const createdAt = new Date(timestamp).toISOString()
console.log(createdAt)

const userData: Prisma.UserdataCreateInput[] = [
  {
    username: "defaultio",
    email: "defau40@gmail.com",
    firstname: "Polandadadad",
    lastname: "Siudadas",
    createdAt: createdAt,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.userdata.create({
      data: u,
    });
    console.log(`Created user with id: ${user.username}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
