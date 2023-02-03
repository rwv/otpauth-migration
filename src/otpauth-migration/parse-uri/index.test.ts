import { parseURI } from "./index";

describe("OTPAuthMigration parseURI", () => {
  test("extractData", () => {
    const uri = "otpauth-migration://offline?data=CigKFFVUVURPbmFMMXd1cDlBSVZHOUVjEgRUZXN0GgRUZXN0IAEoAjACCi8KCkhlbGxvId6tvu8SEGFsaWNlQGdvb2dsZS5jb20aB0V4YW1wbGUgASgBMAE4BxABGAEgAA%3D%3D";
    const infos = parseURI(uri);

    expect(infos).toBeInstanceOf(Array)
    expect(infos.length).toBe(2)

    const totpInfo = infos[0]
    expect(totpInfo.name).toBe("Test")
    expect(totpInfo.issuer).toBe("Test")
    expect(totpInfo.type).toBe("totp")
    expect(totpInfo.algorithm).toBe("SHA1")
    expect(totpInfo.digits).toBe(8)
    expect(totpInfo.secret).toBe("KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD")
    expect((totpInfo as any).counter).toBeUndefined()

    const hotpInfo = infos[1]
    expect(hotpInfo.name).toBe("alice@google.com")
    expect(hotpInfo.issuer).toBe("Example")
    expect(hotpInfo.type).toBe("hotp")
    expect(hotpInfo.algorithm).toBe("SHA1")
    expect(hotpInfo.digits).toBe(6)
    expect(hotpInfo.secret).toBe("JBSWY3DPEHPK3PXP")
    expect((hotpInfo as any).counter).toBeGreaterThanOrEqual(0)
    expect((hotpInfo as any)?.period).toBeUndefined()
  });
});