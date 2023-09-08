import axios from 'axios';
import { ApiResponse, Cart, config } from '../types/api';
import TokenStore from './tokenStore';

class Carts {
  private tokenStore: TokenStore;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public async getCart(): Promise<ApiResponse<Cart>> {
    try {
      const cart = await this.getActiveCart();
      return {
        isSuccessful: true,
        message: 'Cart',
        data: cart,
      };
    } catch {
      try {
        const cart = await this.createCart();
        return {
          isSuccessful: true,
          message: 'Cart',
          data: cart,
        };
      } catch {
        return {
          isSuccessful: false,
          message: `Can't create cart`,
        };
      }
    }
  }

  private async getActiveCart(): Promise<Cart> {
    const token = await this.getToken();
    const { data } = await axios.get<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/active-cart`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }

  private async createCart() {
    const token = await this.getToken();
    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts`,
      {
        currency: 'USD',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }

  private async getToken(): Promise<string> {
    const tokenResp = await this.tokenStore.getToken();
    if (!tokenResp.isSuccessful || !tokenResp.data) {
      throw Error(`Can't get token: ${tokenResp.message}`);
    }

    return tokenResp.data;
  }
}

export default Carts;
