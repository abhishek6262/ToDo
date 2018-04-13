import { Injectable } from "@angular/core";

@Injectable()
export class OauthTokenService {
  constructor() {}

  /**
   * Deletes the access token from the local storage of the browser.
   */
  destroyToken() {
    localStorage.removeItem("accessToken");
  }

  /**
   * Retrieves the access token from the local storage of the browser.
   */
  getToken(): string {
    return localStorage.getItem("accessToken");
  }

  /**
   * Determines whether or not the access token exists in the local
   * storage of the browser.
   */
  hasToken(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Stores the access token in the local storage of the browser.
   * 
   * @param token 
   */
  setToken(token: string): void {
    localStorage.setItem("accessToken", token);
  }
}
