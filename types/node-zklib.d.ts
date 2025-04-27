// types/node-zklib.d.ts

declare module 'node-zklib' {
    export default class ZKLib {
      constructor(ip: string, port: number, timeout?: number, inBio?: number);
      createSocket(): Promise<boolean>;
      disconnect(): Promise<void>;
      getAttendances(): Promise<any[]>;
      getUsers(): Promise<any[]>;
      getInfo(): Promise<any>;
      // তুমি চাইলে আরও methods add করতে পারো
    }
  }
  