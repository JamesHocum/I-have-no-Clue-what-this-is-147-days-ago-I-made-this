declare module "jszip" {
  interface JSZip {
    file(name: string, data: string | ArrayBuffer | Uint8Array | Buffer): JSZip
    generateAsync(options: {
      type: "blob" | "base64" | "binarystring" | "array" | "uint8array" | "arraybuffer" | "nodebuffer"
    }): Promise<any>
  }

  interface JSZipStatic {
    new (): JSZip
    (): JSZip
  }

  const JSZip: JSZipStatic
  export = JSZip
}
