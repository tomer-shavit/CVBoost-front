export function createHeaders(lemonSqueezyApiKey: string) {
  const headers = new Headers();
  headers.append("Accept", "application/vnd.api+json");
  headers.append("Content-Type", "application/vnd.api+json");
  headers.append("Authorization", `Bearer ${lemonSqueezyApiKey}`);
  return headers;
}

export function createRequestOptions(
  method: string,
  headers: Headers,
): RequestInit {
  return {
    method,
    headers,
    redirect: "follow",
    cache: "no-store",
  };
}
