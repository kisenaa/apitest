import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import dotenv from 'dotenv';
import express, { Router } from 'express';
import cors from 'cors';

import serverless from 'serverless-http';
import ws from 'ws';
// Init database connection
dotenv.config();
neonConfig.fetchConnectionCache = true;
neonConfig.webSocketConstructor = ws;
const url = `${process.env.DATABASE_URL}`;

// Init prisma client
const pool = new Pool({ connectionString: url });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({
  adapter,
});
// Init router
const router = Router();
// Init express js
const app = express();

app.use(cors());
app.use(express.json());

router.get('/msg', async (req, res) => {
  res.json({ msg: 'Hello Words from 3000' });
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(401).json({ msg: 'Not enough argument were given !' });
    return;
  }

  const result = await prisma.userdata.create({
    data: {
      username,
      email,
      password,
    },
  });
  res.json(result);
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body;

  if (username) {
    const result = await prisma.userdata.findUnique({
      where: {
        username: username,
      },
    });

    if (!result || result.password !== password) {
      res.status(401).json({ msg: 'Wrong Cridentials' });
    } else {
      res.json({ msg: 'Success', username: username });
    }
    return;
  }

  if (email) {
    const result = await prisma.userdata.findUnique({
      where: {
        email: email,
      },
    });

    if (!result || result.password !== password) {
      res.status(401).json({ msg: 'Wrong Cridentials' });
    } else {
      res.json({ msg: 'Success', username: username });
    }
    return;
  }

  res.json({ msg: 'Not enough argument were given !' });
});

app.use('/api/', router);

export const handler = serverless(app);
