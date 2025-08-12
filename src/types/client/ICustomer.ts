/**
 * @file
 * @module Types.Client
 * Simplified client-facing interfaces for customer management.
 */

/**
 * Represents a customer in a simplified, flattened format.
 */
export interface ICustomer {
  id: number; // The unique ID for the customer.
  username: string; // The customer's username.
  billboardMetric: string; // The billboard metric setting (e.g., "score").
  includeTestPropertiesInGraphics: boolean; // Whether to include test properties in graphics.
  firstName: string; // The customer's first name.
  lastName: string; // The customer's last name.
  address: {
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  email: string; // The customer's email address.
  organization: string; // The customer's organization name.
  jobTitle: string; // The customer's job title.
}

/**
 * Represents a customer in the list view with minimal information.
 * Used for customer list endpoints that return basic customer details.
 */
export interface ICustomerListItem {
  id: number; // The unique ID for the customer.
  organizationName: string; // The name of the customer's organization.
} 
