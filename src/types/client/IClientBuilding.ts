export interface IClientBuilding {
  id: number;
  name: string;
  constructionStatus: string;
  primaryFunction: string;
  grossFloorArea: number;
  yearBuilt: number;
  address: {
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  occupancyPercentage?: number;
  isFederalProperty?: boolean;
}
