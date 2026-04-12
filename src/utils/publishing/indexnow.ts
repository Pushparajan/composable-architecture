/**
 * IndexNow API integration
 * For fast URL submission to Bing, Yandex, and other supporting search engines
 */

import { AppConfig } from '../AppConfig';
import { IndexNowSubmission } from './types';

// IndexNow API endpoint (Bing's endpoint, also works for other engines)
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// Your IndexNow key (should be stored in env variable)
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || 'your-indexnow-key-here';

/**
 * Get the host from the site URL
 */
function getHost(): string {
  const url = new URL(AppConfig.url);
  return url.host;
}

/**
 * Submit a single URL to IndexNow (GET request)
 */
export async function submitSingleUrl(url: string): Promise<{
  success: boolean;
  status?: number;
  error?: string;
}> {
  try {
    const keyLocation = `${AppConfig.url}/${INDEXNOW_KEY}.txt`;

    const params = new URLSearchParams({
      url,
      key: INDEXNOW_KEY,
      keyLocation,
    });

    const response = await fetch(`${INDEXNOW_ENDPOINT}?${params.toString()}`, {
      method: 'GET',
    });

    // IndexNow returns various status codes:
    // 200: OK, URL submitted successfully
    // 202: Accepted, key was not found but will be validated later
    // 400: Bad request
    // 403: Key not valid
    // 422: Invalid URL
    // 429: Too many requests

    return {
      success: response.status === 200 || response.status === 202,
      status: response.status,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Submit multiple URLs to IndexNow (POST request)
 * Supports up to 10,000 URLs per request
 */
export async function submitBatchUrls(urls: string[]): Promise<{
  success: boolean;
  status?: number;
  error?: string;
  urlCount: number;
}> {
  if (urls.length === 0) {
    return { success: true, urlCount: 0 };
  }

  if (urls.length > 10000) {
    return {
      success: false,
      error: 'IndexNow batch limit is 10,000 URLs',
      urlCount: urls.length,
    };
  }

  try {
    const submission: IndexNowSubmission = {
      host: getHost(),
      key: INDEXNOW_KEY,
      keyLocation: `${AppConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(submission),
    });

    return {
      success: response.status === 200 || response.status === 202,
      status: response.status,
      urlCount: urls.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      urlCount: urls.length,
    };
  }
}

/**
 * Submit article URLs from events
 */
export async function submitArticleUrls(urls: string[]): Promise<{
  success: boolean;
  submitted: number;
  status?: number;
  error?: string;
}> {
  if (urls.length === 0) {
    return { success: true, submitted: 0 };
  }

  // Use batch submission if more than one URL
  if (urls.length === 1) {
    const result = await submitSingleUrl(urls[0]);
    return {
      success: result.success,
      submitted: result.success ? 1 : 0,
      status: result.status,
      error: result.error,
    };
  }

  const result = await submitBatchUrls(urls);
  return {
    success: result.success,
    submitted: result.success ? urls.length : 0,
    status: result.status,
    error: result.error,
  };
}
