export class OTPAuth {
  readonly type: "totp" | "hotp";
  readonly name: string;
  readonly issuer?: string;
  readonly secret: string;
  readonly algorithm?: string;
  readonly period?: number;
  readonly digits?: number;
  readonly counter?: number;

  constructor(uri: string) {
    const parts = uri.split("/");
    if (parts.length !== 4) {
        throw new Error("Invalid uri");
    }

    // why I don't use new URL()
    // https://stackoverflow.com/questions/74793662/why-do-browsers-and-node-js-parse-urls-with-custom-schemes-differently-with-new
    const url = new URL(uri);
    const searchParams = url.searchParams;

    // check protocol
    if (!uri.startsWith("otpauth://")) {
      throw new Error("Invalid protocol");
    }

    // handle type
    const type = parts[2];
    if (type !== "totp" && type !== "hotp") {
      throw new Error("Invalid type");
    }
    this.type = type;

    // get label by remove prefix `//${type}/`
    const pathnameParts = url.pathname.split("/");
    const labelEncoded = pathnameParts[pathnameParts.length - 1];
    const label = decodeURIComponent(labelEncoded);

    if (label.includes(":")) {
      const [issuer, name] = label.split(":");
      this.issuer = issuer;
      // remove prefix whitespace
      if (name.startsWith(" ")) {
        this.name = name.substring(1);
      } else {
        this.name = name;
      }
    } else {
      this.name = label;
      if (searchParams.has("issuer")) {
        this.issuer = searchParams.get("issuer")!;
      }
    }

    // handle secret
    if (!searchParams.has("secret")) {
      throw new Error("Missing secret");
    }
    this.secret = searchParams.get("secret")!;

    // handle algorithm
    if (searchParams.has("algorithm")) {
      this.algorithm = searchParams.get("algorithm")!;
    }

    // handle digits
    if (searchParams.has("digits")) {
      this.digits = parseInt(searchParams.get("digits")!);
    }

    // handle period
    if (searchParams.has("period")) {
      this.period = parseInt(searchParams.get("period")!);
    }

    // handle counter
    if (searchParams.has("counter")) {
      this.counter = parseInt(searchParams.get("counter")!);
    }

    if (this.type === "hotp" && this.counter === undefined) {
      throw new Error("Missing counter");
    }
  }
}
