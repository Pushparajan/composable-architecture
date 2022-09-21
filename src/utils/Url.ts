import slugify from 'slugify';

export function addTrailingSlash(url: string) {
  // If the trailing slash exists, it is replaced with /.
  // If the trailing slash does not exist, a / is appended to the end
  // (to be exact: The trailing anchor is replaced with /)
  return url.replace(/\/?$/, '/');
}

export function convertToSlug(url: string) {
  return slugify(url, { lower: true });
}
