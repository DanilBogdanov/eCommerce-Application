import axios from 'axios';
import {
  ApiResponse,
  AuthResponse,
  RefreshResponse,
  TokenResponse,
  config,
} from '../types/api';
import handleError from '../utils/api/errorHandler';
import { crypt, encrypt } from '../utils/api/crypt';
import { MSEC_IN_SEC, VALID_TIME_INTERVAL } from '../types/constants';

class TokenStore {
  private readonly LS_KEY = 'd2v2:token_state';

  private isAnonymous: boolean = true;

  private token: string | null = null;

  private refreshToken: string | null = null;

  private exp: number | null = null;

  private lock: Promise<void | TokenResponse> | null = null;

  private email: string = '';

  constructor() {
    const lsState = localStorage.getItem(this.LS_KEY);
    if (lsState) {
      try {
        const encryptState = encrypt(lsState);
        this.load(JSON.parse(encryptState));
      } catch {
        // empty
      }
    }
    this.save();
  }

  public isAnonym(): boolean {
    return this.isAnonymous;
  }

  public getEmail(): string {
    return this.email;
  }

  public async getToken(): Promise<ApiResponse<string>> {
    if (this.lock) {
      try {
        await this.lock;
      } catch (e) {
        return handleError(e);
      }
    }

    if (!this.token) {
      const prom = TokenStore.loginAnonymous();
      this.lock = prom;
      try {
        const resp = await prom;
        this.update(resp);
        return {
          isSuccessful: true,
          message: 'Success',
          data: resp.accessToken,
        };
      } catch (e: unknown) {
        return handleError<string>(e);
      }
    }

    const validDate = Date.now() + VALID_TIME_INTERVAL;
    if (this.exp && this.refreshToken && this.exp < validDate) {
      try {
        const prom = this.refresh(this.refreshToken);
        this.lock = prom;
        await prom;
      } catch (e: unknown) {
        return handleError<string>(e);
      }
    }
    return {
      isSuccessful: true,
      message: 'Success',
      data: this.token,
    };
  }

  public update(tokenResponse: TokenResponse) {
    this.isAnonymous = tokenResponse.isAnonymous;
    this.exp = tokenResponse.exp;
    this.token = tokenResponse.accessToken;
    this.refreshToken = tokenResponse.refreshToken;
    this.email = tokenResponse.email;
    this.save();
  }

  private async refresh(token: string) {
    const { data } = await axios<RefreshResponse>({
      url: `${config.authUrl}/oauth/token`,
      method: 'post',
      params: {
        grant_type: 'refresh_token',
        refresh_token: token,
      },
      auth: {
        username: config.clientId,
        password: config.secret,
      },
    });

    this.exp = Date.now() + data.expires_in * MSEC_IN_SEC;
    this.token = data.access_token;
    this.save();
  }

  public static async loginAnonymous(): Promise<TokenResponse> {
    const { data } = await axios<AuthResponse>({
      url: `${config.authUrl}/oauth/${config.projectKey}/anonymous/token`,
      method: 'post',
      params: {
        grant_type: 'client_credentials',
        scope: config.scope,
      },
      auth: {
        username: config.clientId,
        password: config.secret,
      },
    });

    return {
      isAnonymous: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      exp: Date.now() + data.expires_in * MSEC_IN_SEC,
      email: '',
    };
  }

  private load(lsState: unknown): void {
    if (lsState && typeof lsState === 'object') {
      if ('token' in lsState && typeof lsState.token === 'string') {
        this.token = lsState.token;
      }
      if (
        'refreshToken' in lsState &&
        typeof lsState.refreshToken === 'string'
      ) {
        this.refreshToken = lsState.refreshToken;
      }
      if (
        'isAnonymous' in lsState &&
        typeof lsState.isAnonymous === 'boolean'
      ) {
        this.isAnonymous = lsState.isAnonymous;
      }
      if ('exp' in lsState && typeof lsState.exp === 'number') {
        this.exp = lsState.exp;
      }
      if ('email' in lsState && typeof lsState.email === 'string') {
        this.email = lsState.email;
      }
    }
  }

  private save() {
    const lsState = {
      isAnonymous: this.isAnonymous,
      exp: this.exp,
      token: this.token,
      refreshToken: this.refreshToken,
      email: this.email,
    };
    const strState = JSON.stringify(lsState);
    const cryptState = crypt(strState);
    localStorage.setItem(this.LS_KEY, cryptState);
  }
}

export default TokenStore;
