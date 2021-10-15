import { Client, Environment } from 'square';

// If in prod set to production
export const squareClient = new Client({
  timeout: 3000,
  environment: Environment.Sandbox,
  accessToken: process.env.NEXT_PUBLIC_SQUARE_SANDBOX_ACCESS_TOKEN,
});
