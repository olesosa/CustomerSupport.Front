import {RequestTypes} from "../enums/request-types";

export interface Statistic {
  requestType: RequestTypes
  count: number
}
