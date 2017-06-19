export class Deduction {
  public p_ID: number;
  public d_ID: number;
  public description: string;
  public amount: number;
  constructor(p_ID: number, d_ID: number, description: string, amount: number) {
    this.p_ID = p_ID;
    this.d_ID = d_ID;
    this.description = description;
    this.amount = amount;
  }
}