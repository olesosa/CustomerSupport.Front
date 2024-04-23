import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../../shared/services/ticket.service';
import {TicketFilter} from "../../../shared/interfaces/ticket-filter";
import {catchError, finalize, of, Subject, takeUntil} from "rxjs";
import {TableLazyLoadEvent} from "primeng/table";
import {TicketShortinfo} from "../../../shared/interfaces/ticket-shortinfo";
import {ConstVariables} from "../../../const-variables";
import {Router} from "@angular/router";
import {getRequestTypeName, getRequestTypeValue} from "../../../shared/helpers/mapper";
import {Statistic} from "../../../shared/interfaces/statistic";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
import {StatisticFilter} from "../../../shared/interfaces/statistic-filter";

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>()
  tickets: TicketShortinfo[] = []
  totalRecords: number = 0
  spinnerActive: boolean = false;

  readonly requestTypes: string[] = ['All', ...ConstVariables.requestTypes];
  readonly ticketFilterOptions: string[] = ConstVariables.ticketFilterOptions;

  requestTypesSelectedOption: string = 'All'
  assignedSelectedOption: string = 'All'
  solvedSelectedOption: string = 'All'
  closedSelectedOption: string = 'All'

  data!: any

  constructor(private readonly ticketService: TicketService,
              private readonly router: Router) {
  }

  loadTickets($event: TableLazyLoadEvent) {

    this.spinnerActive = true

    let filter: TicketFilter = this.getFilter()

    filter.skip = $event.first || 0
    filter.take = $event.rows || 5
    filter.sortDir = $event.sortOrder == 1 ? 'asc' : 'desc'
    filter.number = true

    this.ticketService.getAll(filter)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error)),
        finalize(() => this.spinnerActive = false)
      )
      .subscribe({
        next: tickets => {
          this.tickets = tickets.data
          this.totalRecords = tickets.totalRecords
        },
        error: (error) => console.log(error)
      })

    const statisticFilter: StatisticFilter = this.getFilter()

    this.ticketService.getStatistic(statisticFilter)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err))
      )
      .subscribe({
        next: statistic => {
          this.data = {
            labels: this.getLabels(statistic),
            datasets: [
              {
                label: 'Request types',
                data: this.getCounts(statistic),
                backgroundColor: ['#7fd0f6', '#80c583'],
                borderColor: ['rgba(127,208,246,0.7)', "rgba(127,195,130,0.7)"],
                borderWidth: 3
              }
            ]
          }
        },
        error: err => console.log(err)
      })
  }

  createTicket() {
    this.router.navigateByUrl('/tickets/create')
  }

  private getFilter() {

    let filter: any = {}

    if (this.requestTypesSelectedOption != 'All') {
      filter.requestType = getRequestTypeValue(this.requestTypesSelectedOption)!;
    } else {
      filter.requestType = undefined
    }

    switch (this.assignedSelectedOption) {
      case 'All':
        filter.isAssigned = undefined
        break

      case 'Yes':
        filter.isAssigned = true
        break

      case 'No':
        filter.isAssigned = false
        break
    }

    switch (this.solvedSelectedOption) {
      case 'All':
        filter.isSolved = undefined
        break

      case 'Yes':
        filter.isSolved = true
        break

      case 'No':
        filter.isSolved = false
        break
    }

    switch (this.closedSelectedOption) {
      case 'All':
        filter.isClosed = undefined
        break

      case 'Yes':
        filter.isClosed = true
        break

      case 'No':
        filter.isClosed = false
        break
    }

    return filter
  }

  private getLabels(stats: Statistic[]) {

    const labels: string[] = []

    for (let stat of stats) {
      labels.push(getRequestTypeName(stat.requestType)!)
    }

    return labels
  }

  private getCounts(stats: Statistic[]) {

    const counts: number[] = []

    for (let stat of stats) {
      counts.push(stat.count!)
    }

    return counts
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected readonly getRequestTypeName = getRequestTypeName;
}
