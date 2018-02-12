import { Attachment } from '../shared/attachment.model';
import { Note } from '../shared/note.model';

export class SubContractor {
  public c_ID: number;
  public s_ID: number;
  public firstName: string;
  public surname: string;
  public companyName: string;
  public displayName: string;
  public address: string;
  public town: string;
  public county: string;
  public postcode: string;
  public phone: string;
  public mobPhone: string;
  public fax: string;
  public email: string;
  public bankAccount: string;
  public bankSortCode: string;
  public utr: string;
  public nino: string;
  public companyRegNo: string;
  public tlcIns: string;
  public verificationNo: string;
  public deductionRate: number;
  public vatRate: number;
  public services: string;
  public active: boolean;
  public contractRecd: boolean;
  public currentJob: number;
  public currentJobDisplay: string;
  public attachedFiles: Attachment[];
  public attachedNotes: Note[]; 

  constructor(c_ID: number, s_ID: number, firstName: string, surname: string, companyName: string,
  address: string, town: string, county: string,  postcode: string,  phone: string,  mobPhone: string,
  fax: string, email: string,  utr: string,  nino: string, companyRegNo:string,  verificationNo: string,  deductionRate: number, vatRate: number,
  services: string, active: boolean, contractRecd: boolean) {
    this.c_ID = c_ID;
    this.s_ID = s_ID;
    this.firstName = firstName;
    this.surname = surname;
    this.companyName = companyName;
    this.address = address;
    this.town = town;
    this.county = county;
    this.postcode = postcode;
    this.phone = phone;
    this.mobPhone = mobPhone;
    this.fax = fax;
    this.email = email;
    this.utr = utr;
    this.nino = nino;
    this.companyRegNo = companyRegNo;
    this.verificationNo = verificationNo;
    this.deductionRate = deductionRate;
    this.vatRate = vatRate;
    this.services = services;
    this.active = active;
    this.contractRecd = contractRecd;
    
    if (companyName)
      this.displayName =companyName;
    else
      this.displayName = firstName + ' ' + surname;
    
  }
}