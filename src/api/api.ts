import TokenStore from './tokenStore';
import Auth from './auth';
import User from './user';
import Catalog from './catalog';

class Api {
  private tokenStore: TokenStore;

  public readonly auth: Auth;

  public readonly user: User;

  public readonly catalog: Catalog;

  constructor() {
    this.tokenStore = new TokenStore();
    this.auth = new Auth(this.tokenStore);
    this.user = new User(this.tokenStore);
    this.catalog = new Catalog(this.tokenStore);
  }
}

export const api = new Api();
