export class Attachment {
  public id: number;
  public c_ID: number;
  public s_ID: number;
  public a_date: Date;
  public fileName: string;

  constructor(id: number, c_ID: number, s_ID: number, a_date: Date, fileName: string) {
    this.id = id;
    this.c_ID = c_ID;
    this.s_ID = s_ID;
    this.a_date = a_date;
    this.fileName = fileName;
  }
}