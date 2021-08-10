import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects'
})
export class FilterProjectsPipe implements PipeTransform {

  transform(projects: any, CASSelected: string, projCAS, MonthSelected:string, projMonth:string): any {
    const resultArray= [];

    if (projects.length === 0 || CASSelected === 'All' && MonthSelected === 'All'){
      for ( const project of projects){
        project.show = true
      }
    }

    else
      for ( const project of projects){
        project.show = false
      }

    for (const project of projects){

      if (project[projCAS] === CASSelected && MonthSelected === 'All') {
        project.show = true
      }

      if(project[projMonth] === MonthSelected &&  CASSelected === 'All') {
        project.show = true
      }

      if(project[projMonth] === MonthSelected && project[projCAS] === CASSelected ) {
        project.show = true
      }

    }

    console.log(resultArray)
    console.log(resultArray.length)
    return projects

  }
}

