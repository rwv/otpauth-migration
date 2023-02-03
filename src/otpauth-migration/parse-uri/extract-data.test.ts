import { extractData } from "./extract-data";

describe("extractData", () => {
  test("extractData", () => {
    const uri = "otpauth-migration://offline?data=CigKFFVUVURPbmFMMXd1cDlBSVZHOUVjEgRUZXN0GgRUZXN0IAEoAjACCi8KCkhlbGxvId6tvu8SEGFsaWNlQGdvb2dsZS5jb20aB0V4YW1wbGUgASgBMAE4BxABGAEgAA%3D%3D";
    const data = extractData(uri);

    expect(data).toBeInstanceOf(Uint8Array)
  });

  test("no data", () => {
    const uri = "otpauth-migration://offline";

    expect(() => extractData(uri)).toThrowError("Invalid data")
  });

  test("not base64", () => {
    const uri = "otpauth-migration://offline?data=*igKFFVUVURPbmFMMXd1cDlBSVZHOUVjEgRUZXN0GgRUZXN0IAEoAjACCi8KCkhlbGxvId6tvu8SEGFsaWNlQGdvb2dsZS5jb20aB0V4YW1wbGUgASgBMAE4BxABGAEgAA%3D%3D";

    expect(() => extractData(uri)).toThrow()
  });
});
