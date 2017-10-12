export class Owner {
  public id: number;
  public owner_name: string;
  public address: string;
  public town: string;
  public county: string;
  public postcode: string;
  public country: string;
  public telUK: string;
  public faxUK: string;
  public telOverseas: string;
  public faxOverseas: string;

  constructor(id: number, owner_name: string, address: string, town: string, county: string,  postcode: string,  country: string,  telUK: string,
  faxUK: string, telOverseas: string,  faxOverseas: string) {
    this.id = id;
    this.owner_name = owner_name;
    this.address = address;
    this.town = town;
    this.county = county;
    this.postcode = postcode;
    this.country = country;
    this.telUK = telUK;
    this.faxUK = faxUK;
    this.telOverseas = telOverseas;
    this.faxOverseas = faxOverseas;    
  }
}