import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {ListItemService} from "../list-item.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router, private _userService: UserService, private _listItemService: ListItemService) {
  }

  ngOnInit() {
    // We'll check whether the user is authenticated when they try to
    // access home page and if they are not then we'll redirect them to
    // the log-in screen.
    if (!this._userService.isAuthenticated()) {
      this._router.navigate(["login"]);
      return;
    }

    // Finally, we'll fetch the list items from the server and set up the
    // cards on the Home screen.
    this._listItemService.setItems();
  }
}
