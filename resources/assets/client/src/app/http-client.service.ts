import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Meta } from "@angular/platform-browser";
import { Observable } from "rxjs/Observable";
import { OauthTokenService } from "./oauth-token.service";

@Injectable()
export class HttpClientService {
  constructor(
    private _http: HttpClient,
    private _meta: Meta,
    private _token: OauthTokenService
  ) {}

  /**
   * Returns the headers to send with the ajax requests.
   *
   * @returns HttpHeaders
   */
  getHeaders(): HttpHeaders {
    let headers = {
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": this._meta.getTag('name="csrf-token"').content
    };

    // Add the Authorization header if the user is authenticated.
    if (this._token.hasToken()) {
      headers["Authorization"] = "Bearer " + this._token.getToken();
    }

    return new HttpHeaders(headers);
  }

  /**
   * Sends a DELETE request to the supplied url.
   *
   * @param url
   *
   * @returns Observable
   */
  delete(url: string): Observable<any> {
    return this._http.delete(url, {
      headers: this.getHeaders()
    });
  }

  /**
   * Sends a GET request to the supplied url with the provided parameters.
   *
   * @param url
   *
   * @returns Observable
   */
  get(url: string, params: any = {}): Observable<any> {
    return this._http.get(url, {
      headers: this.getHeaders(),
      params
    });
  }

  /**
   * Sends a POST request to the supplied url with the provided data.
   *
   * @param url
   *
   * @returns Observable
   */
  post(url: string, data: any): Observable<any> {
    return this._http.post(url, data, {
      headers: this.getHeaders()
    });
  }

  /**
   * Sends a PUT/UPDATE request to the supplied url with the provided
   * data.
   *
   * @param url
   *
   * @returns Observable
   */
  put(url: string, data: any): Observable<any> {
    return this._http.put(url, data, {
      headers: this.getHeaders()
    });
  }
}
