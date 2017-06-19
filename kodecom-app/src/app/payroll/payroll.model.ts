import { Deduction } from '../shared/deduction.model';

export class Payroll {
  public c_ID: number;
  public s_ID: number;
  public p_ID: number;
  public weekEnding: Date;
  public paymentDate: Date;
  public monthEndingDate: Date;
  public deductionRate: number;
  public vatRate: number;
  public gross: number;
  public fee: number;
  public materials: string;
  public totalDeductions: number;
  public locked: boolean;
  public deductions: Deduction[];

  constructor(c_ID: number, s_ID: number, p_ID: number, weekEnding: Date, paymentDate: Date, monthEndingDate: Date,
  deductionRate: number, vatRate: number, gross: number,  fee: number,  materials: string,  totalDeductions: number,
  locked: boolean) {
    this.c_ID = c_ID;
    this.s_ID = s_ID;
    this.p_ID = p_ID;
    this.weekEnding = weekEnding;
    this.paymentDate = paymentDate;
    this.monthEndingDate = monthEndingDate;
    this.deductionRate = deductionRate;
    this.vatRate = vatRate;
    this.gross = gross;
    this.fee = fee;
    this.materials = materials;
    this.totalDeductions = totalDeductions;
    this.locked = locked;
  }
}