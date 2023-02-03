import { toURI } from "../../otpauth-migration";
import { parseURI } from "../../otpauth";

export function toOTPAuthMigrationURI(otpauth_uris: string[]): string {
  const infos = otpauth_uris.map(parseURI);
  const otpauth_migration_uri = toURI(infos);
  return otpauth_migration_uri;
}
