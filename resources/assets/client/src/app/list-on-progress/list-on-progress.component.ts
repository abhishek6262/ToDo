import { Component, OnInit } from "@angular/core";
import { ListItemService } from "../list-item.service";

@Component({
  selector: "app-list-on-progress",
  templateUrl: "./list-on-progress.component.html",
  styleUrls: ["./list-on-progress.component.css"]
})
export class ListOnProgressComponent implements OnInit {
  constructor(private _itemService: ListItemService) {}

  ngOnInit() {}

  /**
   * Returns the onprogress list items from the store.
   * 
   * @returns array.
   */
  getItems() {
    return this._itemService.getItems("onprogress");
  }
}
