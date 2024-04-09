export interface Filter {
  PageNumber: number;
  PageSize: number;

  RequestType?: string;
  IsAssigned?: boolean;
  IsSolved?: boolean;
  IsClosed?: boolean;
  UserId? : string

  SortDir?: string;
  Number?: boolean;
}
