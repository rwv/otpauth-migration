import { migration } from "../../proto";
import { extractData } from "./extract-data";
import { payloadToInfo } from "./payload-to-info";
import { OTPInfo } from "../../common";

export function parseURI(uri: string): OTPInfo[] {
  const data = extractData(uri);
  const payload = migration.Payload.decode(data);
  const infos = payload.otpParameters.map(payloadToInfo)
  return infos
}
