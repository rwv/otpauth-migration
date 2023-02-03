import { infosToUInt8Array } from "./info-to-payload";
import { OTPInfo } from "../../common";
import { constructURI } from "./construct-uri";

export function toURI(infos: OTPInfo[]): string {
  const data = infosToUInt8Array(infos);
  const uri = constructURI(data);
  return uri;
}
