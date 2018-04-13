import { Component, OnInit } from "@angular/core";
import { ListItemService } from "../list-item.service";

@Component({
  selector: "app-postarea",
  templateUrl: "./postarea.component.html",
  styleUrls: ["./postarea.component.css"]
})
export class PostareaComponent implements OnInit {
  /**
   * The default status state to use at the time of adding new list item.
   */
  status: string = "todo";

  /**
   * The text used for the list item.
   */
  data: string = "";

  constructor(private _itemService: ListItemService) {}

  ngOnInit() {}

  /**
   * Adds a new list item to the application.
   * 
   * @param event 
   */
  addItem(event) {
    event.preventDefault();

    // Terminate the process of adding the list item if there's no text on
    // it.
    if (this.data.length < 1) {
      return;
    }

    // Next, we'll generate a random id for our new item so no two list
    /// item collides with each other.
    let randomId: number = Math.floor(Math.random() * 10000);

    // Finallt, we'll add a new list item on the application and reset the
    // postarea to its default state.
    this._itemService.addItem({
      id: randomId,
      status: this.status,
      data: this.data
    });

    this.status = "todo";
    this.data = "";
  }
}
