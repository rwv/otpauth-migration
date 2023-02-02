import { OTPInfo } from "../common";

export function toURI(info: OTPInfo): string {
  const url = new URL(
    `otpauth://${info.type}/${encodeURIComponent(
      `${info.issuer ? `${info.issuer}:` : ""}${info.name}`
    )}`
  );

  const searchParams = url.searchParams;

  if (info.issuer) {
    searchParams.set("issuer", info.issuer);
  }

  if (info.algorithm) {
    searchParams.set("algorithm", info.algorithm);
  }

  if (info.digits) {
    searchParams.set("digits", info.digits.toString());
  }

  if (info.type === "totp") {
    if (info.period) {
      searchParams.set("period", info.period.toString());
    }
  }

  if (info.type === "hotp") {
    if (info.counter) {
      searchParams.set("counter", info.counter.toString());
    }
  }

  searchParams.set("secret", info.secret);

  return url.toString();
}
