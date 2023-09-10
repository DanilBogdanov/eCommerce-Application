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

  public async removeProduct(productId: string) {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      const lineItem = cart.lineItems.find((li) => li.productId === productId);
      if (!lineItem) {
        return {
          isSuccessful: false,
          message: `The cart does not contain a line item with this product`,
        };
      }
      try {
        const updatedCart = await this.fetchRemoveLineItem(cart, lineItem.id);
        return {
          isSuccessful: true,
          message: 'Success removed lineItem',
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

  public async removeLineItem(lineItemId: string): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchRemoveLineItem(cart, lineItemId);
        return {
          isSuccessful: true,
          message: 'Success removed lineItem',
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

  public async cleanCart(): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchCleanCart(cart);
        return {
          isSuccessful: true,
          message: 'Success clean cart',
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

  public async changeLineItemQuantity(
    lineItemId: string,
    quantity: number,
  ): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchChangeLineItemQuantity(
          cart,
          lineItemId,
          quantity,
        );
        return {
          isSuccessful: true,
          message: 'Success change quantity',
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

  private async fetchChangeLineItemQuantity(
    cart: Cart,
    lineItemId: string,
    quantity: number,
  ): Promise<Cart> {
    const token = await this.getToken();
    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
      {
        version: cart.version,
        actions: [
          {
            action: Action.ChangeLineItemQuantity,
            lineItemId,
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

  private async fetchRemoveLineItem(
    cart: Cart,
    lineItemId: string,
  ): Promise<Cart> {
    const token = await this.getToken();
    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
      {
        version: cart.version,
        actions: [
          {
            action: Action.RemoveLineItem,
            lineItemId,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }

  private async fetchCleanCart(cart: Cart): Promise<Cart> {
    const token = await this.getToken();
    const actions = cart.lineItems.map((li) => {
      return {
        action: Action.RemoveLineItem,
        lineItemId: li.id,
      };
    });
    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
      {
        version: cart.version,
        actions,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
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
