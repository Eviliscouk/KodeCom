

export class SubContractorName {
  public s_ID: number;
  public displayName: string;
  public deductionRate: number;
  public vatRate: number;
  public fee: number;

  constructor(s_ID: number, displayName: string) {
    this.s_ID = s_ID;
    this.displayName =displayName;
  }
}