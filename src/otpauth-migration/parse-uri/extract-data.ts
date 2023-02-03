export function extractData(uri: string): Uint8Array {
  if (!uri.startsWith("otpauth-migration://offline")) {
    throw new Error("Invalid protocol");
  }

  const url = new URL(uri);
  const parsed = url.searchParams;
  const base64 = parsed.get("data");
  if (!base64) {
    throw new Error("Invalid data");
  }

  const uint8 = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

  return uint8;
}
