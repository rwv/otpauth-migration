export type HOTPInfo = {
  type: "hotp";
  name: string;
  issuer?: string;
  algorithm?: string;
  digits?: number;
  secret: string;
  counter: number;
};

export type TOTPInfo = {
  type: "totp";
  name: string;
  issuer?: string;
  algorithm?: string;
  digits?: number;
  secret: string;
  period?: number;
};

export type OTPInfo = HOTPInfo | TOTPInfo;
