export function constructURI(data: Uint8Array): string {
  const url = new URL("otpauth-migration://offline");

  const base64 = btoa(String.fromCharCode(...data));
  url.searchParams.set("data", base64);
  return url.toString();
}
