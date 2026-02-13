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

// PWA Installation Event Types
export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// Service Worker Types
export interface ServiceWorkerRegistration {
  scope: string
  active: ServiceWorker | null
  installing: ServiceWorker | null
  waiting: ServiceWorker | null
  update(): Promise<void>
  unregister(): Promise<boolean>
}
