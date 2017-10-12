export class Deduction {
  public id: number;
  public payroll_id: number;
  public description: string;
  public amount: number;
  constructor(id: number, payroll_id: number, description: string, amount: number) {
    this.id= id;
    this.payroll_id = payroll_id;
    this.description = description;
    this.amount = amount;
  }
}