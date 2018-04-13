import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { OauthTokenService } from "../oauth-token.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  /**
   * The full name to use for the registration.
   */
  fullName: string = "";
  
  /**
   * The email address to use for the registration.
   */
  email: string = "";

  /**
   * The password to use for the registration.
   */
  password: string = "";

  /**
   * Defines whether the registration is in process in the server.
   */
  isProcessing: boolean = false;

  /**
   * The text to use in the submit button of the form.
   */
  registerButtonText: string = "Register now";

  /**
   * The error to display on the screen in-case something goes wrong.
   */
  registrationErrorText: string = "";

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
   * Registers the user into the application.
   * 
   * @returns void
   */
  registerUser() {
    // Cache the text of the button so it can be reverted back to it
    // later.
    let cachedText = this.registerButtonText;

    this.isProcessing = true;
    this.registerButtonText = "Processing...";
    this.registrationErrorText = "";

    // Next, we'll try to register user with the supplied email,
    // password and full name.
    this._userService
      .registerUser(this.email, this.password, this.fullName)
      .subscribe(
        () => {
          // Finally, when the user is successfully registered we can
          // simply attempt to log-in them and redirect them to home
          // screen on successful log-in.
          this._userService
            .authenticateUser(this.email, this.password)
            .subscribe(data => {
              this._token.setToken(data.access_token);

              this._userService.fetchAuthenticatedUser(() => {
                this._router.navigate([""]);
              });

              this.isProcessing = false;
              this.registerButtonText = cachedText;
            });
        },
        errorResponse => {
          // In-case any error occurs then we can simply display the error
          // message on the screen and ask the user to resolve and try
          // again to register.
          let errors = errorResponse.error.errors;
          let firstError = errors[Object.keys(errors)[0]][0];

          this.registrationErrorText = firstError;
          this.isProcessing = false;
          this.registerButtonText = cachedText;
        }
      );
  }
}
