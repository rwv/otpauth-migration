import { OTPInfo } from "../common";

export function parseURI(uri: string): OTPInfo {
  check(uri);
  const type = parseType(uri);
  const { issuer, name } = parseIssuerAndName(uri);
  const url = new URL(uri);
  const searchParams = url.searchParams;
  const secret = parseSecret(searchParams);
  const algorithm = parseAlgorithm(searchParams);
  const digits = parseDigits(searchParams);
  const period = parsePeriod(searchParams);
  const counter = parseCounter(searchParams);

  if (type === "hotp") {
    if (counter === undefined) {
      throw new Error("Missing counter");
    }

    return {
      type,
      issuer,
      name,
      algorithm,
      digits,
      secret,
      counter,
    };
  } else {
    return {
      type,
      issuer,
      name,
      algorithm,
      digits,
      secret,
      period,
    };
  }
}

function check(uri: string): void {
  const parts = uri.split("/");
  if (parts.length !== 4) {
    throw new Error("Invalid uri");
  }

  // check protocol
  if (!uri.startsWith("otpauth://")) {
    throw new Error("Invalid protocol");
  }
}

function parseType(uri: string): "totp" | "hotp" {
  const parts = uri.split("/");
  const type = parts[2];
  if (type !== "totp" && type !== "hotp") {
    throw new Error("Invalid type");
  }
  return type;
}

function parseIssuerAndName(uri: string): { issuer?: string; name: string } {
  const url = new URL(uri);
  const searchParams = url.searchParams;

  // get label by remove prefix `//${type}/`
  const pathnameParts = url.pathname.split("/");
  const labelEncoded = pathnameParts[pathnameParts.length - 1];
  const label = decodeURIComponent(labelEncoded);

  if (label.includes(":")) {
    const [issuer, name] = label.split(":");
    if (name.startsWith(" ")) {
        return { issuer, name: name.slice(1) };
    }

    return { issuer, name };
  } else {
    const name = label;
    if (searchParams.has("issuer")) {
      const issuer = searchParams.get("issuer")!;
      return { issuer, name };
    } else {
      return { name };
    }
  }
}

function parseSecret(searchParams: URLSearchParams): string {
  if (!searchParams.has("secret")) {
    throw new Error("Missing secret");
  }
  return searchParams.get("secret")!;
}

function parseAlgorithm(searchParams: URLSearchParams): string | undefined {
  if (searchParams.has("algorithm")) {
    return searchParams.get("algorithm")!;
  }
}

function parseDigits(searchParams: URLSearchParams): number | undefined {
  if (searchParams.has("digits")) {
    return parseInt(searchParams.get("digits")!);
  }
}

function parsePeriod(searchParams: URLSearchParams): number | undefined {
  if (searchParams.has("period")) {
    return parseInt(searchParams.get("period")!);
  }
}

function parseCounter(searchParams: URLSearchParams): number | undefined {
  if (searchParams.has("counter")) {
    return parseInt(searchParams.get("counter")!);
  }
}
