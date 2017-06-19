export class Attachment {
  public f_ID: number;
  public c_ID: number;
  public s_ID: number;
  public file: Uint8Array;
  public fileName: string;

  constructor(f_ID: number, c_ID: number, s_ID: number, file: Uint8Array, fileName: string) {
    this.f_ID = f_ID;
    this.c_ID = c_ID;
    this.s_ID = s_ID;
    this.file = file;
    this.fileName = fileName;
  }
}