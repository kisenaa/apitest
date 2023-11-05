/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-console */
import {
  ClerkExpressWithAuth,
  LooseAuthProp,
  WithAuthProp,
} from '@clerk/clerk-sdk-node';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Router } from 'express';
import serverless from 'serverless-http';

import { addPost, modifyPost } from '../src/types/todolist';

dotenv.config();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}
// Init prisma client
const prisma = new PrismaClient();
// Init router
const router = Router();
// Init express js
const app = express();

app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(ClerkExpressWithAuth());

router.get('/msg', async (req, res) => {
  if (!req.auth.userId) {
    res.status(401).send('Unauthenticated!');
    return;
  }

  res.json({ msg: 'Hello Words from 3000' });
});

router.post('/add', async (req, res) => {
  if (!req.auth.userId) {
    res.status(401).send('Unauthenticated!');
    return;
  }
  const { postId, userId, title, description, status } = req.body as addPost;

  console.time('query');
  const result = await prisma.todolist.create({
    data: { postId, userId, title, description, status },
  });
  console.timeEnd('query');

  res.json(result);
});

router.post('/modify', async (req: WithAuthProp<Request>, res) => {
  if (!req.auth.userId) {
    res.status(401).send('Unauthenticated!');
    return;
  }

  const { postId, userId, title, description, status } = req.body as modifyPost;

  console.time('query');
  const result = await prisma.todolist.update({
    where: { postId, userId },
    data: {
      title: title ? title : undefined,
      description: description ? description : undefined,
      status: status !== null ? status : undefined,
    },
  });
  console.timeEnd('query');

  res.json(result);
});

router.post('/remove', async (req, res) => {
  if (!req.auth.userId) {
    res.status(401).send('Unauthenticated!');
    return;
  }
  const { postId, userId } = req.body as modifyPost;

  console.time('query');
  const result = await prisma.todolist.delete({
    where: { postId, userId },
  });
  console.timeEnd('query');

  res.json(result);
});

router.get('/getall', async (req: WithAuthProp<Request>, res) => {
  if (!req.auth.userId) {
    res.status(401).send('Unauthenticated!');
    return;
  }
  const userId = req.query.userId as string;

  console.time('query');
  const result = await prisma.todolist.findMany({
    where: { userId },
  });
  console.timeEnd('query');

  res.status(200).json(result);
});

router.post('/signup', async (req, res) => {
  const { username, email, userId } = req.body;
  if (!username || !email) {
    res.status(401).json({ msg: 'Not enough argument were given !' });
    return;
  }

  const result = await prisma.userdata.create({
    data: {
      userId,
      username,
      email,
    },
  });
  res.json(result);
});

router.post('/login', async (req, res) => {
  const { username, email } = req.body;

  if (username) {
    const result = await prisma.userdata.findUnique({
      where: {
        username: username,
      },
    });

    if (!result || result.email !== email) {
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

    if (!result || result.email !== email) {
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
