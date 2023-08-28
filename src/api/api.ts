import TokenStore from './tokenStore';
import Auth from './auth';
import User from './user';

class Api {
  private tokenStore: TokenStore;

  public readonly auth: Auth;

  public readonly user: User;

  constructor() {
    this.tokenStore = new TokenStore();
    this.auth = new Auth(this.tokenStore);
    this.user = new User(this.tokenStore);
  }
}

export const api = new Api();
