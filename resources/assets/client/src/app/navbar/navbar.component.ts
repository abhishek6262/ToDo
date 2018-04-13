import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import {OauthTokenService} from "../oauth-token.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService, private _token: OauthTokenService) {}

  ngOnInit() {}

  /**
   * Returns the name of the authenticated user.
   * 
   * @returns string
   */
  getFullName(): string {
    if (this._userService.getAuthenticatedUser() !== undefined) {
      return this._userService.getAuthenticatedUser().name;
    }

    return '';
  }

  /**
   * Determines whether the user is authenticated into the application.
   * 
   * @returns boolean
   */
  isAuthenticated(): boolean {
    return this._userService.isAuthenticated();
  }

  /**
   * Logs out the authenticated user from the application.
   * 
   * @param event
   * 
   * @returns void
   */
  logOut(event) {
    event.preventDefault();

    this._token.destroyToken();
    this._router.navigate(['login']);
  }
}
