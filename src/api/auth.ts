import axios from 'axios';
import {
  ApiResponse,
  AuthCallback,
  AuthResponse,
  MSEC_IN_SEC,
  RegisterForm,
  TokenResponse,
  config,
} from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

class Auth {
  private tokenStore: TokenStore;

  private callback?: AuthCallback;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<void>> {
    try {
      const tokenResponse = await Auth.loginUser(email, password);
      this.tokenStore.update(tokenResponse);
      if (this.callback) {
        this.callback(false, email);
      }
      return {
        result: true,
        message: `User with email:${email} successfully logged in`,
      };
    } catch (e: unknown) {
      const resp = handleError<void>(e);
      return resp;
    }
  }

  public async logout(): Promise<ApiResponse<void>> {
    try {
      const tokenResponse = await TokenStore.loginAnonymous();
      this.tokenStore.update(tokenResponse);
      if (this.callback) {
        this.callback(true, '');
      }
      return {
        result: true,
        message: 'User successfully logged out',
      };
    } catch (e: unknown) {
      const resp = handleError<void>(e);
      return resp;
    }
  }

  public async registerAndLogin(
    registerForm: RegisterForm,
  ): Promise<ApiResponse<void>> {
    try {
      await this.registerUser(registerForm);
    } catch (e: unknown) {
      const resp = handleError<void>(e);
      return resp;
    }
    const loginResp = await this.login(
      registerForm.email,
      registerForm.password,
    );
    if (!loginResp.result) {
      return loginResp;
    }

    return {
      result: true,
      message: `User with email:${registerForm.email} successfully registered and logged in`,
    };
  }

  public onChangeUser(callback: AuthCallback): void {
    this.callback = callback;
  }

  private async registerUser(registerForm: RegisterForm): Promise<void> {
    const tokenResp = await this.tokenStore.getToken();

    if (tokenResp.result && tokenResp.data) {
      const token = tokenResp.data;
      await axios.post(
        `${config.apiUrl}/${config.projectKey}/customers`,
        registerForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } else {
      throw Error(`Can't get token: ${tokenResp.message}`);
    }
  }

  private static async loginUser(
    email: string,
    password: string,
  ): Promise<TokenResponse> {
    const { data } = await axios<AuthResponse>({
      url: `${config.authUrl}/oauth/${config.projectKey}/customers/token`,
      method: 'post',
      params: {
        grant_type: 'password',
        username: email,
        password,
        scope: config.scope,
      },
      auth: {
        username: config.clientId,
        password: config.secret,
      },
    });

    return {
      isAnonymous: false,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      exp: Date.now() + data.expires_in * MSEC_IN_SEC,
      email,
    };
  }
}

export default Auth;