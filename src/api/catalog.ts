import axios from 'axios';
import {
  ApiResponse,
  CategoriesResponse,
  Category,
  config,
} from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

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
}

export default Catalog;
