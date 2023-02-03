import { toURI } from "../../otpauth";
import { parseURI } from "../../otpauth-migration";

export function toOTPAuthURIs(otpauth_migration_uri: string): string[] {
    const infos = parseURI(otpauth_migration_uri);
    const otpauth_uris = infos.map(toURI);
    return otpauth_uris;
}