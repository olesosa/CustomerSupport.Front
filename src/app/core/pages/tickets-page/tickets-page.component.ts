import {Component, OnDestroy} from '@angular/core';
import {TicketService} from '../../services/ticket.service';
import {Filter} from "../../../shared/interfaces/filter";
import {catchError, of, Subject, takeUntil} from "rxjs";
import {TableLazyLoadEvent} from "primeng/table";
import {TicketShortinfo} from "../../../shared/interfaces/ticket-shortinfo";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent implements OnDestroy {


  private readonly destroy$ = new Subject<void>();
  tickets: TicketShortinfo[] = [];
  totalRecords!: number;
  private readonly filer: Filter = {
    PageNumber: 0,
    PageSize: 5
  }

  constructor(private readonly ticketService: TicketService) {
  }

  loadTickets($event: TableLazyLoadEvent) {

    this.filer.PageNumber = $event.first || 0;
    this.filer.PageSize = $event.rows || 5;
    this.filer.SortDir = $event.sortOrder || 1 ? 'asc' : 'desc';
    this.filer.Number = !!($event.sortField?.toString || 'Number');

    this.ticketService.getAll(this.filer)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error))
      )
      .subscribe({
        next: (tickets) => this.tickets = tickets.data,
        error: (error) => console.log(error)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
