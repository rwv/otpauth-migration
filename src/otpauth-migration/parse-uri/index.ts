import { migration } from "../../proto";
import { extractData } from "./extractData";
import { payloadToInfo } from "./payloadToOptions";
import { OTPInfo } from "../../common";

export function parseURI(uri: string): OTPInfo[] {
  const data = extractData(uri);
  const payload = migration.Payload.decode(data);
  const infos = payload.otpParameters.map(payloadToInfo)
  return infos
}
