export class Note {
  public n_ID: number;
  public c_ID: number;
  public s_ID: number;
  public n_date: Date;
  public text: string;

  constructor(n_ID: number, c_ID: number, s_ID: number, n_date: Date, text: string) {
    this.n_ID = n_ID;
    this.c_ID = c_ID;
    this.s_ID = s_ID;
    this.n_date = n_date;
    this.text = text;
  }
}