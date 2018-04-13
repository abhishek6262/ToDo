import { Component, OnInit } from "@angular/core";
import { ListItemService } from "../list-item.service";

@Component({
  selector: "app-list-completed",
  templateUrl: "./list-completed.component.html",
  styleUrls: ["./list-completed.component.css"]
})
export class ListCompletedComponent implements OnInit {
  constructor(private _itemService: ListItemService) {}

  ngOnInit() {}

  /**
   * Returns the completed list items from the store.
   * 
   * @returns array.
   */
  getItems() {
    return this._itemService.getItems("completed");
  }
}
