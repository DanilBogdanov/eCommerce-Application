import axios from 'axios';
import { Action, ApiResponse, Cart, CartCallback, config } from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

class Carts {
  private tokenStore: TokenStore;

  public currentQuantity: number = 0;

  private callback?: CartCallback;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
    this.getCart();
  }

  public onChangeQuantity(callback: CartCallback): void {
    this.callback = callback;
  }

  public changeQuantity(quantity: number): void {
    this.currentQuantity = quantity;
    if (this.callback) {
      this.callback(this.currentQuantity);
    }
  }

  public async getCart(): Promise<ApiResponse<Cart>> {
    try {
      const cart = await this.getActiveCart();
      this.changeQuantity(cart.totalLineItemQuantity || 0);
      return {
        isSuccessful: true,
        message: 'Cart',
        data: cart,
      };
    } catch {
      try {
        const cart = await this.createCart();
        this.changeQuantity(cart.totalLineItemQuantity || 0);
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

  public async addProducts(
    products: { productId: string; quantity: number }[],
  ): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchAddProducts(cart, products);
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
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

  public async addDiscountCode(code: string): Promise<ApiResponse<Cart>> {
    const cartResp = await this.getCart();
    if (cartResp.isSuccessful && cartResp.data) {
      const cart = cartResp.data;
      try {
        const updatedCart = await this.fetchAddDiscountCode(cart, code);
        this.changeQuantity(updatedCart.totalLineItemQuantity || 0);
        return {
          isSuccessful: true,
          message: 'Success added discount code',
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

  private async fetchAddDiscountCode(cart: Cart, code: string): Promise<Cart> {
    let currentCart = cart;
    const token = await this.getToken();

    if (currentCart.discountCodes && currentCart.discountCodes[0]) {
      const discount = currentCart.discountCodes[0];
      const actions = [
        {
          action: Action.RemoveDiscountCode,
          discountCode: discount.discountCode,
        },
      ];

      const { data } = await axios.post<Cart>(
        `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
        {
          version: currentCart.version,
          actions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      currentCart = data;
    }

    const { data } = await axios.post<Cart>(
      `${config.apiUrl}/${config.projectKey}/me/carts/${cart.id}`,
      {
        version: currentCart.version,
        actions: [
          {
            action: Action.AddDiscountCode,
            code,
          },
        ],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
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

  private async fetchAddProducts(
    cart: Cart,
    products: { productId: string; quantity: number }[],
  ) {
    const token = await this.getToken();
    const actions = products.map((item) => {
      return {
        action: Action.AddLineItem,
        productId: item.productId,
        quantity: item.quantity,
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
