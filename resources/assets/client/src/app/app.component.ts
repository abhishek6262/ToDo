import { Component } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private _userService: UserService) {
    // We'll fetch and set the authenticated user in the application on
    // its first-page load to display their details on the page.
    if (this._userService.isAuthenticated()) {
      if (this._userService.getAuthenticatedUser() === undefined) {
        this._userService.fetchAuthenticatedUser();
      }
    }
  }
}
