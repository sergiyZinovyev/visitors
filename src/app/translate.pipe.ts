import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './shared/translate.service';

@Pipe({
  name: 'translate',
  //pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {}

  checkArrIdVal(array, val) {
    for (let i: number = 0; i < array.length; i++){
      if (array[i].id === val){
        return i;
      }
    }
    return undefined;
  }

  transform(value, arg) {
    let id = this.checkArrIdVal(this.translate.dictionary, value);
    if (id >= 0){
      if(arg == 'UK'){
        return this.translate.dictionary[id].EN;
      }
      else{return value}
    }
    return value
  }

}
