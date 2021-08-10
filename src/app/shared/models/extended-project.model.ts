
import { LearnOut} from './learning-outcome.model';

export class Extended {
  public name: string;
  public description: string;
  public imagePath: string;
  public CAS: string;
  public startdate: string;
  public enddate: string;
  public reflections:string;
  public learnOut: LearnOut[];



  // tslint:disable-next-line:max-line-length
  constructor(name: string, desc: string, imagePath: string, CAS: string, startdate: string,enddate: string, reflections:string, learnOut: LearnOut[],) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.CAS = CAS;
    this.startdate = startdate;
    this.enddate = enddate;
    this.reflections = reflections;
    this.learnOut = learnOut;
  }
}
