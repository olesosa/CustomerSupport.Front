import {RequestTypes} from "../enums/request-types";

export interface StatisticFilter {
  requestType?: RequestTypes
  isAssigned?: boolean
  isSolved?: boolean
  isClosed?: boolean
  userId?: boolean
}
