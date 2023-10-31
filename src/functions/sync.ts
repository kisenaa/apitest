/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { neonConfig, Pool } from '@neondatabase/serverless';
import type { Handler } from '@netlify/functions';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { IncomingHttpHeaders } from "http";
import { Webhook, WebhookRequiredHeaders  } from 'svix';
import ws from 'ws';
// Init database connection
dotenv.config();
neonConfig.fetchConnectionCache = true;
neonConfig.webSocketConstructor = ws;
const url = `${process.env.DATABASE_URL}`;

// Init prisma client
const pool = new Pool({ connectionString: url });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient();

const webhookSecret = `${process.env.WEBHOOK_SECRET}`;

export const handler: Handler = async (event) => {
  const payload = event.body!
  const headers = event.headers as IncomingHttpHeaders & WebhookRequiredHeaders

  const heads = {
    "svix-id": headers['svix-id'],
    "svix-timestamp": headers['svix-timestamp'],
    "svix-signature": headers['svix-signature']
  }

  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  try {
    evt = wh.verify(payload, heads) as WebhookEvent
    console.log(evt)
  } 
  catch (error) {
    console.log(error)
    return {
      body: JSON.stringify({ message: "Webhook Signature Error", error: error }),
      statusCode: 400,
    }
  }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const {username, email_addresses, first_name, last_name, created_at} = evt.data
    
    console.time('query')
    await prisma.userdata.upsert({
      where: {username: username as string},
      create: {
        username: username as string,
        email: email_addresses[0].email_address,
        firstname: first_name,
        lastname: last_name,
        createdAt: new Date(created_at).toISOString()
      },
      update: {
        email: email_addresses[0].email_address,
        firstname: first_name,
        lastname: last_name,
      }
    })
    console.timeEnd('query')
  }

  return {
    body: JSON.stringify({ message: "Sync API is online" }),
    statusCode: 200,
  }
};
