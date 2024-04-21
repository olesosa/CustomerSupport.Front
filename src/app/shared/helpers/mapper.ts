import {RequestTypes} from "../enums/request-types";

export function getRequestTypeName(value: RequestTypes): string | null {
  switch (value) {
    case RequestTypes.PaymentIssue:
      return 'Payment Issue'
    case RequestTypes.WebsiteIssue:
      return 'Website Issue'
    case RequestTypes.SecurityIssue:
      return 'Security Issue'
    case RequestTypes.Other:
      return 'Other'
    default:
      return null
  }
}

export function getRequestTypeValue(type: string): number | null {
  switch (type) {
    case 'Payment Issue':
      return RequestTypes.PaymentIssue
    case 'Website Issue':
      return RequestTypes.WebsiteIssue
    case 'Security Issue':
      return RequestTypes.SecurityIssue
    case 'Other':
      return RequestTypes.Other
    default:
      return null;
  }
}
