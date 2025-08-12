import { IParsedXml } from "./IParsedXML.js";

/**
 * Represents the customer data structure returned by the API.
 */
export interface ICustomerData {
  username: string;
  billboardMetric: string;
  includeTestPropertiesInGraphics: boolean;
  accountInfo: {
    firstName: string;
    lastName: string;
    address: {
      "@_address1": string;
      "@_city": string;
      "@_state": string;
      "@_postalCode": string;
      "@_country": string;
    };
    email: string;
    organization: string;
    jobTitle: string;
  };
}

/**
 * Response interface for customer get operations.
 * Extends IParsedXml to include XML parsing metadata.
 */
export interface IGetCustomerResponse extends IParsedXml {
  customer: ICustomerData;
} 