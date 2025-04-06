import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const NOMBA_BASE_URL = process.env.NOMBA_BASE_URL || '';
const GRANT_TYPE = process.env.GRANT_TYPE || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const SECRET_KEY = process.env.SECRET_KEY || '';
const ACCOUNT_ID = process.env.ACCOUNT_ID || '';

/**
 * Get access token from Monnify
 */
async function getAccessToken(): Promise<string> {

  try {
    const res: any = await axios.post(`${NOMBA_BASE_URL}/auth/token/issue`, {
      grant_type: GRANT_TYPE,
      client_id: CLIENT_ID,
      client_secret: SECRET_KEY,
      account_id: ACCOUNT_ID,
    }, {
      headers: {
        "accountId": ACCOUNT_ID,
        "Content-Type": "application/json",
      },
    });

    return res.data.data.access_token;
  } catch (error: any) {
    console.error('Failed to get access token:', error?.response?.data || error.message);
    throw error;
  }
}


async function getHeaders(): Promise<{ [key: string]: string }> {
  const accessToken = await getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
    "accountId": ACCOUNT_ID,
  };

  return headers;
}

export { getAccessToken, getHeaders };

