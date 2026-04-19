import type { NextApiRequest, NextApiResponse } from 'next';

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || '';
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || '';

// Extract data center from API key (format: key-dc)
const dc = MAILCHIMP_API_KEY.split('-')[1] || 'us19';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res
      .status(400)
      .json({ success: false, message: 'Valid email is required' });
  }

  if (!MAILCHIMP_LIST_ID || !MAILCHIMP_API_KEY) {
    // If not configured, log and return success (for development)
    // eslint-disable-next-line no-console
    console.log('Newsletter subscription:', email);
    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing!',
    });
  }

  try {
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: 'Thank you for subscribing!',
      });
    }

    // Handle already subscribed
    if (data.title === 'Member Exists') {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed!',
      });
    }

    return res.status(400).json({
      success: false,
      message: data.detail || 'Subscription failed. Please try again.',
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Mailchimp error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
}
