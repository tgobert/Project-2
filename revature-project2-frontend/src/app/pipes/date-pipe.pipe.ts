import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {
dateNum: number;
readableDate: any;
  transform(value: number, ...args: unknown[]): any {
    this.dateNum = value * 1000;
    this.readableDate = new Date(this.dateNum);
    return `${this.readableDate.getDate()}/${this.readableDate.getMonth()+1}/${this.readableDate.getFullYear()}`;
  }

}
