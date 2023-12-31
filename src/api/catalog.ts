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

  private categories?: Category[];

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      if (!this.categories) {
        const categories = await this.fetchCategories();
        this.categories = categories;
      }
      return {
        isSuccessful: true,
        message: 'Success',
        data: this.categories,
      };
    } catch (e) {
      return handleError<Category[]>(e);
    }
  }

  public async getProducts({
    limit = DEFAULT_LIMIT_PER_PAGE,
    categoryId,
    categoryKey,
    page,
    sortField,
    sortOrder = 'asc',
    search,
    priceFrom,
    priceTo,
  }: ProductRequestOptions): Promise<ApiResponse<ProductsResponse>> {
    try {
      const checkedLimit = limit <= 0 ? DEFAULT_LIMIT_PER_PAGE : limit;
      const checkedCategoryId =
        categoryId ||
        (categoryKey ? await this.getCategoryIdByKey(categoryKey) : null);
      const checkedSortField = sortField === 'name' ? 'name.en-US' : sortField;
      const checkedSearch = search && search.length >= 5 ? search : null;

      const queryString = `limit=${checkedLimit}${
        checkedCategoryId ? `&filter=categories.id:"${checkedCategoryId}"` : ''
      }${page ? `&offset=${page * checkedLimit}` : ''}${
        checkedSortField ? `&sort=${checkedSortField} ${sortOrder}` : ''
      }${
        checkedSearch
          ? `&text.en-US=${checkedSearch}&fuzzy=true&fuzzyLevel=2`
          : ''
      }${
        priceFrom || priceTo
          ? `&filter=variants.price.centAmount:range (${
              priceFrom ? priceFrom * 100 : '*'
            } to ${priceTo ? priceTo * 100 : '*'})`
          : ''
      }`;

      const products = await this.fetchProducts(queryString);
      return {
        isSuccessful: true,
        message: 'Success',
        data: products,
      };
    } catch (e) {
      return handleError<ProductsResponse>(e);
    }
  }

  public getProductByKey(key: string): Promise<ApiResponse<Product>> {
    return this.getProduct(`key=${key}`);
  }

  public async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      const product = await this.fetchProduct(id);
      return {
        isSuccessful: true,
        message: 'Success',
        data: product,
      };
    } catch (e) {
      return handleError<Product>(e);
    }
  }

  private async fetchCategories(): Promise<Category[]> {
    const token = await this.getToken();
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

  private async fetchProducts(queryString: string): Promise<ProductsResponse> {
    const token = await this.getToken();
    const { data } = await axios.get<ProductsFetchResponse>(
      `${config.apiUrl}/${config.projectKey}/product-projections/search?${queryString}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const products = data.results.map<Product>((productResp) => {
      const product = Catalog.getProductFromResponse(productResp);
      return product;
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

  private async fetchProduct(id: string): Promise<Product> {
    const token = await this.getToken();
    const { data } = await axios.get<ProductFetchResponse>(
      `${config.apiUrl}/${config.projectKey}/product-projections/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const product = Catalog.getProductFromResponse(data);

    return product;
  }

  private static getProductFromResponse(data: ProductFetchResponse): Product {
    const product = {
      id: data.id,
      key: data.key,
      name: data.name['en-US'],
      description: data.description['en-US'],
      categoryId: data.categories[0].id,
      attributes: data.masterVariant.attributes,
      imagesUrl: data.masterVariant.images.map<string>((img) => img.url),
      price: data.masterVariant.prices[0].value.centAmount
        ? data.masterVariant.prices[0].value.centAmount / 100
        : 0,
      salePrice: data.masterVariant.prices[0].discounted?.value.centAmount
        ? data.masterVariant.prices[0].discounted.value.centAmount / 100
        : null,
    };

    return product;
  }

  private async getToken(): Promise<string> {
    const tokenResp = await this.tokenStore.getToken();
    if (!tokenResp.isSuccessful || !tokenResp.data) {
      throw Error(`Can't get token: ${tokenResp.message}`);
    }

    return tokenResp.data;
  }

  private async getCategoryIdByKey(key: string): Promise<string | null> {
    const categories = await this.getCategories();
    return categories.data?.find((cat) => cat.key === key)?.id || null;
  }
}

export default Catalog;
