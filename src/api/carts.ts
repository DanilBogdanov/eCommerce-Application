import axios from 'axios';
import { Action, ApiResponse, Cart, config } from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

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

  public async addProduct(
    productId: string,
    quantity: number = 1,
  ): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchAddProduct(
          cart,
          productId,
          quantity,
        );
        return {
          isSuccessful: true,
          message: 'Success added product',
          data: updatedCart,
        };
      } catch (e) {
        return handleError<Cart>(e);
      }
    }

    return {
      isSuccessful: false,
      message: `Can't get active cart`,
    };
  }

  private async fetchAddProduct(
    cart: Cart,
    productId: string,
    quantity: number,
  ) {
    const token = await this.getToken();
    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
      {
        version: cart.version,
        actions: [
          {
            action: Action.AddLineItem,
            productId,
            quantity,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
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
