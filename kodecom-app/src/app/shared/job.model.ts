export class Job {
  public id: number;
  public c_ID: number;
  public jobRef: string;
  public description: string;
  public status: string;
 

  constructor(id: number, c_ID: number, jobRef: string, text: string) {
    this.id = id;
    this.c_ID = c_ID;
    this.jobRef = jobRef;
    this.description = text;
  }
}