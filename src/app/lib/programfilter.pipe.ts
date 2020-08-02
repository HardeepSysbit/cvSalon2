import { Pipe, PipeTransform } from '@angular/core';
import { Global } from '../lib/global' ;
@Pipe({
  name: 'programfilter'
})
export class ProgramfilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(docs: any[], filter: any): any {
    if (!docs || !filter) {
        return docs;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
   // return docs.filter(doc => doc.program.indexOf(filter) !== -1);
    return docs.filter(doc => filter.indexOf(doc.program) > -1 || doc.program == 'moe');
   // programs.indexOf(doc.program) > -1
}

}
