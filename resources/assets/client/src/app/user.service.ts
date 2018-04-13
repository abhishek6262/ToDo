import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs/Observable";
import { HttpClientService } from "./http-client.service";
import { OauthTokenService } from "./oauth-token.service";
import { User } from "./user";

@Injectable()
export class UserService {
  /**
   * The url to generate authentication token for the user.
   */
  private tokenUrl: string = environment.oauthUrl + "/token";

  /**
   * The url to fetch or store details about the users.
   */
  private usersUrl: string = environment.apiUrl + "/users";

  /**
   * The details of the authenticated user.
   */
  private user: User = undefined;

  constructor(
    private _http: HttpClientService,
    private _token: OauthTokenService
  ) {}

  /**
   * Returns the details of the authenticated user.
   * 
   * @returns User
   */
  getAuthenticatedUser(): User {
    return this.user;
  }

  /**
   * Authenticates the user on the server with the provided email and
   * password.
   * 
   * @param email
   * @param password
   * 
   * @returns Observable
   */
  authenticateUser(email: string, password: string): Observable<any> {
    let postData = {
      grant_type: "password",
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      username: email,
      password: password,
      scope: "*"
    };

    return this._http.post(this.tokenUrl, postData);
  }

  /**
   * Fetches the details of the authenticated user from the server.
   * 
   * @param callback
   * @returns void
   */
  fetchAuthenticatedUser(callback = undefined): void {
    this._http.get(this.usersUrl + "/me").subscribe(response => {
      this.user = response.data;

      // We'll check whether any other function is needed to be performed
      // after the details are successfully fetched from the server and
      // call the supplied function so it can do its actions.
      if (callback !== undefined) {
        callback();
      }
    });
  }

  /**
   * Determines whether or not the user is authenticated.
   * 
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return this._token.hasToken();
  }

  /**
   * Registers the user in the application with the supplied email,
   * password and full name.
   * 
   * @param email 
   * @param password 
   * @param fullName 
   * 
   * @returns Observable
   */
  registerUser(
    email: string,
    password: string,
    fullName: string
  ): Observable<any> {
    let postData = {
      email,
      password,
      name: fullName
    };

    return this._http.post(this.usersUrl, postData);
  }
}
