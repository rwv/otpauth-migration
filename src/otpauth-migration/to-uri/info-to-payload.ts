import { migration } from "../../proto";
import { OTPInfo } from "../../common";

export function infosToUInt8Array(infos: OTPInfo[]): Uint8Array {
  const payload = infosToPayloads(infos);
  const data = migration.Payload.encode(payload).finish();
  return data;
}

export function infosToPayloads(infos: OTPInfo[]): migration.IPayload {
  const iOtpParameters = infos.map(infoToPayload);
  const iPayload: migration.IPayload = {
    otpParameters: iOtpParameters,
    version: 1,
    batchSize: 1,
    batchIndex: 0,
    batchId: null,
  };

  return iPayload;
}

export function infoToPayload(info: OTPInfo): migration.Payload.IOtpParameters {
  return {
    secret: base32Decode(info.secret),
    name: info.name,
    issuer: info.issuer,
    algorithm: toAlgorithm(info.algorithm),
    digits: toDigits(info.digits),
    type: toType(info.type),
    counter: toCounter((info as any)?.counter),
  };
}

function toType(type: "totp" | "hotp"): migration.Payload.OtpType {
  if (type === "totp") {
    return migration.Payload.OtpType.OTP_TYPE_TOTP;
  } else if (type === "hotp") {
    return migration.Payload.OtpType.OTP_TYPE_HOTP;
  } else {
    throw new Error("Unknown type");
  }
}

function toAlgorithm(algorithm?: string): migration.Payload.Algorithm {
  if (algorithm === undefined) {
    return migration.Payload.Algorithm.ALGORITHM_SHA1;
  } else if (algorithm === "SHA1") {
    return migration.Payload.Algorithm.ALGORITHM_SHA1;
  } else if (algorithm === "SHA256") {
    return migration.Payload.Algorithm.ALGORITHM_SHA256;
  } else if (algorithm === "SHA512") {
    return migration.Payload.Algorithm.ALGORITHM_SHA512;
  } else if (algorithm === "MD5") {
    return migration.Payload.Algorithm.ALGORITHM_MD5;
  } else {
    throw new Error("Unknown algorithm");
  }
}

function toDigits(digits?: number): migration.Payload.DigitCount {
  if (digits === undefined) {
    return migration.Payload.DigitCount.DIGIT_COUNT_SIX;
  } else if (digits === 6) {
    return migration.Payload.DigitCount.DIGIT_COUNT_SIX;
  } else if (digits === 8) {
    return migration.Payload.DigitCount.DIGIT_COUNT_EIGHT;
  } else {
    throw new Error("Unsupported digits");
  }
}

function toCounter(counter?: number): number | undefined {
  if (counter === undefined) {
    return undefined;
  } else {
    return counter;
  }
}

function base32Decode(secret: string): Uint8Array {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

  let bits = 0;
  let value = 0;
  let index = 0;
  const result = new Uint8Array(Math.ceil((secret.length * 5) / 8));

  for (let i = 0; i < secret.length; i++) {
    const v = base32chars.indexOf(secret[i].toUpperCase());
    if (v < 0) {
      continue;
    }

    value = (value << 5) | v;
    bits += 5;

    if (bits >= 8) {
      result[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }

  return result;
}
