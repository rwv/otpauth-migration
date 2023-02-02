import { OTPAuth } from ".";

describe("OTPAuth", () => {
  test("totp example 1", () => {
    const uri =
      "otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30";
    const otpauth = new OTPAuth(uri);

    expect(otpauth.type).toBe("totp");
    expect(otpauth.name).toBe("john.doe@email.com");
    expect(otpauth.issuer).toBe("ACME Co");
    expect(otpauth.secret).toBe("HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ");
    expect(otpauth.algorithm).toBe("SHA1");
    expect(otpauth.digits).toBe(6);
    expect(otpauth.period).toBe(30);
    expect(otpauth.counter).toBe(undefined);
  });

  test("totp example 2 with missing parameters", () => {
    const uri =
      "otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";
    const otpauth = new OTPAuth(uri);

    expect(otpauth.type).toBe("totp");
    expect(otpauth.name).toBe("alice@google.com");
    expect(otpauth.issuer).toBe("Example");
    expect(otpauth.secret).toBe("JBSWY3DPEHPK3PXP");
    expect(otpauth.algorithm).toBe(undefined);
    expect(otpauth.digits).toBe(undefined);
    expect(otpauth.period).toBe(undefined);
    expect(otpauth.counter).toBe(undefined);
  });

  test("url encoded label", () => {
    const uri =
      "otpauth://totp/Big%20Corporation%3A%20alice%40bigco.com?secret=JBSWY3DPEHPK3PXP&issuer=Big%20Corporation";
    const otpauth = new OTPAuth(uri);

    expect(otpauth.type).toBe("totp");
    expect(otpauth.name).toBe("alice@bigco.com");
    expect(otpauth.issuer).toBe("Big Corporation");
    expect(otpauth.secret).toBe("JBSWY3DPEHPK3PXP");
    expect(otpauth.algorithm).toBe(undefined);
    expect(otpauth.digits).toBe(undefined);
    expect(otpauth.period).toBe(undefined);
    expect(otpauth.counter).toBe(undefined);
  });

  test("hotp example", () => {
    const uri =
      "otpauth://hotp/Test%20issuer:alice?issuer=Test%20issuer&secret=KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD&algorithm=SHA1&digits=6&counter=0";
    const otpauth = new OTPAuth(uri);

    expect(otpauth.type).toBe("hotp");
    expect(otpauth.name).toBe("alice");
    expect(otpauth.issuer).toBe("Test issuer");
    expect(otpauth.secret).toBe("KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD");
    expect(otpauth.algorithm).toBe("SHA1");
    expect(otpauth.digits).toBe(6);
    expect(otpauth.period).toBe(undefined);
    expect(otpauth.counter).toBe(0);
  });

  test("label without issuer", () => {
    const uri =
      "otpauth://totp/john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30";
    const otpauth = new OTPAuth(uri);

    expect(otpauth.type).toBe("totp");
    expect(otpauth.name).toBe("john.doe@email.com");
    expect(otpauth.issuer).toBe("ACME Co");
    expect(otpauth.secret).toBe("HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ");
    expect(otpauth.algorithm).toBe("SHA1");
    expect(otpauth.digits).toBe(6);
    expect(otpauth.period).toBe(30);
    expect(otpauth.counter).toBe(undefined);
  });
});

describe("OTPAuth Error", () => {
  test("wrong protocol", () => {
    const uri =
      "otpauth-test://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30";

    expect(() => {
      new OTPAuth(uri);
    }).toThrowError("Invalid protocol");
  });

  test("wrong type", () => {
    const uri =
      "otpauth://aotp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";

    expect(() => {
      new OTPAuth(uri);
    }).toThrowError("Invalid type");
  });

  test("hotp without counter", () => {
    const uri =
      "otpauth://hotp/Test%20issuer:alice?issuer=Test%20issuer&secret=KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD&algorithm=SHA1&digits=6";

    expect(() => {
      new OTPAuth(uri);
    }).toThrowError("Missing counter");
  });

  test("path error", () => {
    const uri =
      "otpauth://totp/Example:alice@google.com/?secret=JBSWY3DPEHPK3PXP&issuer=Example";

    expect(() => {
      new OTPAuth(uri);
    }).toThrowError("Invalid uri");
  });

  test("missing secret", () => {
    const uri =
      "otpauth://totp/Example:alice@google.com?issuer=Example";

    expect(() => {
      new OTPAuth(uri);
    }).toThrowError("Missing secret");
  });
});
