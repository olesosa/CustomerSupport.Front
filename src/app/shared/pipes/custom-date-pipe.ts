import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  standalone: true,
  name: 'ticketDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'dd MMM HH:mm');
    return formattedDate || '';
  }
}
