export type OTPInfo =
  | {
      type: "hotp";
      name: string;
      issuer?: string;
      algorithm?: string;
      digits?: number;
      secret: string;
      counter: number;
    }
  | {
      type: "totp";
      name: string;
      issuer?: string;
      algorithm?: string;
      digits?: number;
      secret: string;
      period?: number;
    };
