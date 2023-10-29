/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { IncomingHttpHeaders } from "http";
import type { Handler } from '@netlify/functions';
import { Webhook, WebhookRequiredHeaders  } from 'svix';
import dotenv from 'dotenv';

dotenv.config();
const webhookSecret = `${process.env.WEBHOOK_SECRET}`;

export const handler: Handler = async (event) => {
  const payload = event.body!
  console.log(payload)
  const headers = event.multiValueHeaders as IncomingHttpHeaders & WebhookRequiredHeaders

  const heads = {
    "svix-id": headers['svix-id'],
    "svix-timestamp": headers['svix-timestamp'],
    "svix-signature": headers['svix-signature']
  }
  console.log(heads)
  console.log(webhookSecret)
  
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
