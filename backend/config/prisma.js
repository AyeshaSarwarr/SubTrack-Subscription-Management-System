import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;


const globalForPrisma = globalThis;

// 1. Initialize a native Node.js PostgreSQL connection pool
// (This reads DB_URL directly from your process.env or .env file)
const pool = new Pool({ connectionString: process.env.DB_URL });

// 2. Wrap the pool in the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Instantiate the client, passing the required adapter
const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter: adapter,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;