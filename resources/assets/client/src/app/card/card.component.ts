import { Component, Input, OnInit } from "@angular/core";
import { ListItem } from "../list-item";
import { ListItemService } from "../list-item.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  /**
   * The list item to create a card for.
   */
  @Input() item: ListItem;

  /**
   * The new status to change to for the item.
   */
  status: string;

  constructor(private _itemService: ListItemService) {}

  ngOnInit() {
    // We'll catch the status of the item so it can be reverted back to
    // original in-case.
    this.status = this.item.status;
  }

  /**
   * Updates the status state of the list item to the new status.
   * 
   * @returns void
   */
  changeStatus() {
    this._itemService.updateItem(this.item, {
      status: this.status
    });
  }

  /**
   * Deletes the item from the list.
   * 
   * @returns void
   */
  deleteItem() {
    this._itemService.deleteItem(this.item);
  }
}
