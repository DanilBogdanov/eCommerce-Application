import axios from 'axios';
import {
  ApiResponse,
  CategoriesResponse,
  Category,
  Product,
  ProductFetchResponse,
  ProductRequestOptions,
  ProductsFetchResponse,
  ProductsResponse,
  config,
} from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';
import { DEFAULT_LIMIT_PER_PAGE } from '../types/constants';

class Catalog {
  private tokenStore: TokenStore;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public async getCategories(): Promise<ApiResponse<Category[]>> {
    const tokenResp = await this.tokenStore.getToken();

    if (!tokenResp.isSuccessful || !tokenResp.data) {
      return {
        isSuccessful: false,
        message: `Can't get token: ${tokenResp.message}`,
      };
    }

    try {
      const categories = await Catalog.fetchCategories(tokenResp.data);
      return {
        isSuccessful: true,
        message: 'Success',
        data: categories,
      };
    } catch (e) {
      return handleError<Category[]>(e);
    }
  }

  public async getProducts({
    limit = DEFAULT_LIMIT_PER_PAGE,
    categoryId,
    page,
  }: ProductRequestOptions): Promise<ApiResponse<ProductsResponse>> {
    const tokenResp = await this.tokenStore.getToken();

    if (!tokenResp.isSuccessful || !tokenResp.data) {
      return {
        isSuccessful: false,
        message: `Can't get token: ${tokenResp.message}`,
      };
    }

    const checkedLimit = limit <= 0 ? DEFAULT_LIMIT_PER_PAGE : limit;
    const queryString = `limit=${checkedLimit}${
      categoryId ? `&filter=categories.id:"${categoryId}"` : ''
    }${page ? `&offset=${page * checkedLimit}` : ''}`;

    try {
      const products = await Catalog.fetchProducts(tokenResp.data, queryString);
      return {
        isSuccessful: true,
        message: 'Success',
        data: products,
      };
    } catch (e) {
      return handleError<ProductsResponse>(e);
    }
  }

  public async getProduct(id: string): Promise<ApiResponse<Product>> {
    const tokenResp = await this.tokenStore.getToken();

    if (!tokenResp.isSuccessful || !tokenResp.data) {
      return {
        isSuccessful: false,
        message: `Can't get token: ${tokenResp.message}`,
      };
    }

    try {
      const product = await Catalog.fetchProduct(tokenResp.data, id);
      return {
        isSuccessful: true,
        message: 'Success',
        data: product,
      };
    } catch (e) {
      return handleError<Product>(e);
    }
  }

  private static async fetchCategories(token: string): Promise<Category[]> {
    const { data } = await axios.get<CategoriesResponse>(
      `${config.apiUrl}/${config.projectKey}/categories`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const categoriesResp = data.results;
    const categories = categoriesResp.map((val) => {
      return {
        id: val.id,
        key: val.key,
        name: val.name['en-US'],
        description: val.description['en-US'],
      };
    });

    return categories;
  }

  private static async fetchProducts(
    token: string,
    queryString: string,
  ): Promise<ProductsResponse> {
    const { data } = await axios.get<ProductsFetchResponse>(
      `${config.apiUrl}/${config.projectKey}/product-projections/search?${queryString}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const products = data.results.map<Product>((product) => {
      return {
        id: product.id,
        name: product.name['en-US'],
        description: product.description['en-US'],
        categoryId: product.categories[0].id,
        attributes: product.masterVariant.attributes,
        imagesUrl: product.masterVariant.images.map<string>((img) => img.url),
        price: product.masterVariant.prices[0].value.centAmount / 100,
      };
    });

    return {
      limit: data.limit,
      count: data.count,
      total: data.total,
      currentPage: Math.ceil(data.offset / data.limit),
      totalPage: Math.ceil(data.total / data.limit),
      results: products,
    };
  }

  private static async fetchProduct(
    token: string,
    id: string,
  ): Promise<Product> {
    const { data } = await axios.get<ProductFetchResponse>(
      `${config.apiUrl}/${config.projectKey}/product-projections/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const product = {
      id: data.id,
      name: data.name['en-US'],
      description: data.description['en-US'],
      categoryId: data.categories[0].id,
      attributes: data.masterVariant.attributes,
      imagesUrl: data.masterVariant.images.map<string>((img) => img.url),
      price: data.masterVariant.prices[0].value.centAmount / 100,
    };

    return product;
  }
}

export default Catalog;
