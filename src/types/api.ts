export const config = {
  projectKey: 'ecommerce_application',
  clientId: 'H6OphX6uQuW2dT6Cwh_Ih-qL',
  secret: 'sxwWH6AHJbkB1mNgJB6dYFN47x5iA3H1',
  apiUrl: 'https://api.us-central1.gcp.commercetools.com',
  authUrl: 'https://auth.us-central1.gcp.commercetools.com',
  scope:
    'manage_my_quotes:ecommerce_application manage_my_payments:ecommerce_application manage_my_quote_requests:ecommerce_application manage_customers:ecommerce_application create_anonymous_token:ecommerce_application view_published_products:ecommerce_application manage_my_profile:ecommerce_application manage_my_shopping_lists:ecommerce_application view_categories:ecommerce_application manage_my_orders:ecommerce_application manage_my_business_units:ecommerce_application',
};

export interface TokenResponse {
  isAnonymous: boolean;
  exp: number;
  accessToken: string;
  refreshToken: string;
  email: string;
}

export interface AuthResponse {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface RefreshResponse {
  expires_in: number;
  access_token: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  addresses: Address[];
  defaultShippingAddress?: number;
  shippingAddresses?: number[];
  defaultBillingAddress?: number;
  billingAddresses?: number[];
}

export enum Country {
  RUSSIA = 'RU',
  UKRAINE = 'UA',
  BELARUS = 'BY',
  USA = 'US',
  AUSTRALIA = 'AU',
}

export interface Address {
  key?: string;
  country: Country;
  streetName?: string;
  postalCode?: string;
  region?: string;
  city?: string;
  building?: string;
  phone?: string;
}

export interface ApiResponse<T> {
  isSuccessful: boolean;
  message: string;
  data?: T;
}

export interface Profile {
  version: number;
  email: string;
  firstName: string;
  lastName: string;
}

export type AuthCallback = (isAnonym: boolean, email: string) => void;

export type CategoriesResponse = {
  results: {
    id: string;
    key: string;
    name: {
      'en-US': string;
    };
    description: {
      'en-US': string;
    };
  }[];
};

export interface Category {
  id: string;
  key: string;
  name: string;
  description: string;
}

export interface ProductRequestOptions {
  limit?: number;
  categoryId?: string;
  page?: number;
}

export interface ProductsFetchResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductFetchResponse[];
}

export interface ProductsResponse {
  limit: number;
  count: number;
  total: number;
  currentPage: number;
  totalPage: number;
  results: Product[];
}

export interface ProductFetchResponse {
  id: string;
  key: string;
  name: {
    'en-US': string;
  };
  description: {
    'en-US': string;
  };
  categories: {
    id: string;
  }[];
  masterVariant: {
    attributes: {
      name: string;
      value: string;
    }[];
    images: {
      url: string;
    }[];
    prices: {
      id: string;
      value: {
        centAmount: number;
      };
      discounted?: {
        value: {
          centAmount: number;
        };
      };
    }[];
  };
}

export interface Product {
  id: string;
  key: string;
  name: string;
  description: string;
  categoryId: string;
  attributes: {
    name: string;
    value: string;
  }[];
  imagesUrl: string[];
  price: number;
  salePrice: number | null;
}
