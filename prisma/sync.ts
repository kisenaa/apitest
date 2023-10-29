/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { IncomingHttpHeaders } from "http";
import type { Handler } from '@netlify/functions';
import { Webhook, WebhookRequiredHeaders  } from 'svix';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
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
})


const webhookSecret = process.env.WEBHOOK_SECRET!;

export const handler: Handler = async (event) => {
  const payload = event.body!
  console.log(payload)
  const headers = event.multiValueHeaders as IncomingHttpHeaders & WebhookRequiredHeaders
  
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  try {
    evt = wh.verify(payload, headers) as WebhookEvent
  } 
  catch (error) {
    return {
      body: JSON.stringify({ message: "Webhook Signature Error", error: error }),
      statusCode: 400,
    }
  }

  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    const {username, email_addresses, first_name, last_name, created_at} = evt.data
    
    console.log(username)
    console.log(email_addresses)
    console.log(first_name)
    console.log(last_name)
    console.log(((created_at as unknown) as Date).toUTCString())
  }

  return {
    body: JSON.stringify({ message: "Sync API is online" }),
    statusCode: 200,
  }
};
