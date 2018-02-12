import { Attachment } from '../shared/attachment.model';
import { Note } from '../shared/note.model';
import { Job } from '../shared/job.model';

export class Contractor {
  public c_ID: number;
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
  public fee: number;
  public tlcIns: string;
  public payerType: string;
  public attachedFiles: Attachment[] = [];
  public attachedNotes: Note[] = [];
  public attachedJobs: Job[] = [];

  constructor(c_ID: number, firstName: string, surname: string, companyName: string,
  address: string, town: string, county: string,  postcode: string,  phone: string,  mobPhone: string,
  fax: string, email: string,  utr: string,  fee: number,  tlcIns: string,  payerType: string) {
    this.c_ID = c_ID;
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
    this.fee = fee;
    this.tlcIns = tlcIns;
    this.payerType = payerType;
    
    if (companyName)
      this.displayName = companyName;
    else
      this.displayName = firstName + ' ' + surname;
    
  }
}