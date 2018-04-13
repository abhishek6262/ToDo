import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { OauthTokenService } from "../oauth-token.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  /**
   * The email address to use for the authentication.
   */
  email: string = "";

  /**
   * The password to use for the authentication.
   */
  password: string = "";

  /**
   * Defines whether the authentication is in process in the server.
   */
  isProcessing: boolean = false;

  /**
   * The text to use in the submit button of the form.
   */
  loginButtonText: string = "Log in";

  /**
   * Defines whether the user supplied wrong credentials while
   * authenticating.
   */
  showInvalidCredentialsError: boolean = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _token: OauthTokenService
  ) {}

  ngOnInit() {
    // We'll check whether the user is already authenticated and if they
    // do then we'll redirect them back to home-screen.
    if (this._userService.isAuthenticated()) {
      this._router.navigate([""]);
    }
  }

  /**
   * Authenticates the user in the application.
   * 
   * @returns void
   */
  authenticateUser() {
    // Cache the text of the button so it can be reverted back to it
    // later.
    let cachedText = this.loginButtonText;

    this.isProcessing = true;
    this.loginButtonText = "Processing...";
    this.showInvalidCredentialsError = false;

    // Next, we'll try to authenticate user with the supplied email and
    // password.
    this._userService.authenticateUser(this.email, this.password).subscribe(
      data => {
        // If the credentials are correct then we'll store the retrieved
        // access token for the client on the browser so it can be later
        // for the requests on behalf of the authenticated user.
        this._token.setToken(data.access_token);

        // Finally, we'll fetch the details of the authenticated user from
        // the server and redirect the user to the home-screen after the
        // successful fetch.
        this._userService.fetchAuthenticatedUser(() => {
          this._router.navigate([""]);
        });

        this.isProcessing = false;
        this.loginButtonText = cachedText;
      },
      _ => {
        // In-case if the authentication fails then we'll simply display
        // the error message to the user and ask them to enter correct
        // credentials to log-in into the application.
        this.isProcessing = false;
        this.loginButtonText = cachedText;
        this.showInvalidCredentialsError = true;
      }
    );
  }
}
