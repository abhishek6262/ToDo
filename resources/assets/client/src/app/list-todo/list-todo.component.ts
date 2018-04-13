import { Component, OnInit } from "@angular/core";
import { ListItemService } from "../list-item.service";

@Component({
  selector: "app-list-todo",
  templateUrl: "./list-todo.component.html",
  styleUrls: ["./list-todo.component.css"]
})
export class ListTodoComponent implements OnInit {
  constructor(private _itemService: ListItemService) {}

  ngOnInit() {}

  /**
   * Returns the todo list items from the store.
   * 
   * @returns array.
   */
  getItems() {
    return this._itemService.getItems("todo");
  }
}
