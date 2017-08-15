import { Deduction } from '../shared/deduction.model';

export class Payroll {
  public c_ID: number;
  public s_ID: number;
  public p_ID: number;
  public weekEnding: Date;
  public paymentDate: Date;
  public monthEndingDate: Date;
  public deductionRate: number = 0;
  public vatRate: number = 0;
  public gross: number = 0;
  public fee: number= 0;
  public materials: number = 0;
  public totalDeductions: number = 0;
  public locked: boolean;
  public tax: number = 0;
  public vat: number = 0;
  public nett: number = 0;
  public deductions: Deduction[] = [];
  public saveSuccess: boolean;
  public recordError: boolean;
  public message: string = "";

  constructor(){

  }

  SetAll(c_ID: number, s_ID: number, p_ID: number, weekEnding: Date, paymentDate: Date, monthEndingDate: Date,
  deductionRate: number, vatRate: number, gross: number,  fee: number,  materials: number,  totalDeductions: number,
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

  public CalcValues()
  {
    this.vat = this.gross * (this.vatRate / 100); 
    
    this.tax = ((this.gross - this.materials) * (this.deductionRate / 100));
    this.nett = (this.gross - this.tax) + this.vat;

    console.log('gross: ' + this.gross + ' vatrate: ' + this.vatRate);
  }

}