export interface IBuilding {
  id: number;
  name: string;
  constructionStatus: string;
  primaryFunction: string;
  grossFloorArea: {
    value: number;
    "@_units": string;
    "@_temporary": string;
    "@_default": string;
  };
  yearBuilt: number;
  address: {
    "@_address1": string;
    "@_city": string;
    "@_state": string;
    "@_postalCode": string;
    "@_country": string;
  };
  occupancyPercentage?: number;
  isFederalProperty?: boolean;
  agency?: string;
  notes?: string;
}
