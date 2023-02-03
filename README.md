# otpauth-migration
Convert between otpauth-migration and otpauth in JavaScript.

## Usage

``` js
import { URI } from "otpauth-migration";

const OTPAuthURI = URI.toOTPAuthURIs("otpauth-migration://offline?data=...");
const OTPAuthMigrationURI = URI.toOTPAuthMigrationURI([
    "otpauth://totp/...",
    "otpauth://totp/..."
]);
```