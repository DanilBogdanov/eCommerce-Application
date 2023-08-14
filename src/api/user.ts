import axios from 'axios';
import { ApiResponse, Profile, config } from '../types/api';
import TokenStore from './tokenStore';
import handleError from '../utils/api/errorHandler';

class User {
  private tokenStore: TokenStore;

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }

  public async getProfile(): Promise<ApiResponse<Profile>> {
    if (this.tokenStore.isAnonym()) {
      return {
        result: false,
        message: 'Anonymous user has no profile',
      };
    }

    const tokenResp = await this.tokenStore.getToken();

    if (!tokenResp.result || !tokenResp.data) {
      return {
        result: false,
        message: `Can't get token: ${tokenResp.message}`,
      };
    }

    try {
      const profile = await User.me(tokenResp.data);
      return {
        result: true,
        message: 'Success',
        data: profile,
      };
    } catch (e) {
      return handleError<Profile>(e);
    }
  }

  public isAnonymous(): boolean {
    return this.tokenStore.isAnonym();
  }

  private static async me(token: string): Promise<Profile> {
    const { data } = await axios.get<Profile>(
      `${config.apiUrl}/${config.projectKey}/me`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  }
}

export default User;
