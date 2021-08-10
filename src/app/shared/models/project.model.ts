
import  { Evidence } from './evidence.model';


export class Project {
  public name: string;
  public description: string;
  public CAS: string;
  public month: string;
  public reflections:string;
  public evidences: Evidence[];
  public show:boolean;
  public userid: string;
  public classroom:string;
  public LO: [] ;

  // tslint:disable-next-line:max-line-length
  constructor(name: string, desc: string, CAS: string, month: string, reflections:string, evidences: Evidence[], show:boolean, userid:string,classroom:string, LO:[]) {
    this.name = name;
    this.description = desc;
    this.CAS = CAS;
    this.month = month;
    this.reflections = reflections;
    this.evidences = evidences;
    this.show = show;
    this.userid = userid;
    this.classroom = classroom;
    this.LO = LO;
  }
}



