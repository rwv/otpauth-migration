import { toURI } from "./index";

describe("OTPAuthMigration toURI", () => {
  test("toURI", () => {
    const infos = [
      {
        type: "totp"  as const,
        name: "Test",
        issuer: "Test",
        algorithm: "SHA1",
        digits: 8,
        secret: "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD",
      },
      {
        type: "hotp" as const,
        name: "alice@google.com",
        issuer: "Example",
        algorithm: "SHA1",
        digits: 6,
        secret: "JBSWY3DPEHPK3PXP",
        counter: 7,
      },
    ];

    const uri = toURI(infos);
    const uriExpected = "otpauth-migration://offline?data=CigKFFVUVURPbmFMMXd1cDlBSVZHOUVjEgRUZXN0GgRUZXN0IAEoAjACCi8KCkhlbGxvId6tvu8SEGFsaWNlQGdvb2dsZS5jb20aB0V4YW1wbGUgASgBMAE4BxABGAEgAA%3D%3D";

    expect(uri).toBe(uriExpected)
  });
});
