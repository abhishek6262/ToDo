import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../environments/environment";
import { ListItem } from "./list-item";
import { HttpClientService } from "./http-client.service";

@Injectable()
export class ListItemService {
  // The URL to fetch items for the authenticated user.
  private itemsUrl: string = environment.apiUrl + "/items";

  // Stores all the fetched items to retrieve data from later by the
  // application.
  private items: ListItem[] = [];

  constructor(private _http: HttpClientService) {}

  /**
   * Fetch and sets the list items in the Service to later use them in the
   * application.
   */
  setItems(): void {
    this._http
      .get(this.itemsUrl)
      .pipe(map(response => response.data))
      .subscribe(items => (this.items = items as ListItem[]));
  }

  /**
   * Returns the list items by the supplied status.
   *
   * @param status
   */
  getItems(status: string): ListItem[] {
    return this.items.filter(item => item.status === status);
  }

  /**
   * Stores a new list item in the application.
   *
   * @param data
   */
  addItem(data: ListItem) {
    // We'll store a fake data in the application to display it instantly
    // on the screen.
    this.items.push(data);

    // Next, we'll update the list item on the server with the new data
    // and replace the fake data stored by the newly retrieved data from
    // the server.
    this._http
      .post(this.itemsUrl, {
        data: data.data,
        status: data.status
      })
      .subscribe(item => {
        this.items.pop();
        this.items.push(item as ListItem);
      });
  }

  /**
   * Deletes the list item from the application.
   *
   * @param item
   */
  deleteItem(item: ListItem) {
    let index = this.items.findIndex(element => element.id === item.id);

    if (index !== -1) {
      this.items.splice(index, 1);

      this._http.delete(this.itemsUrl + "/" + item.id).subscribe();
    }
  }

  /**
   * Updates the list item in the application.
   *
   * @param item
   * @param newProps
   */
  updateItem(item: ListItem, newProps: Object) {
    let index = this.items.findIndex(element => element.id === item.id);

    // We'll determine whether the list item exists in the application
    // before updating it and if it does then we'll update it both on the
    // client and server.
    if (index !== -1) {
      for (let prop in newProps) {
        this.items[index][prop] = newProps[prop];
      }

      this._http.put(this.itemsUrl + "/" + item.id, newProps).subscribe();
    }
  }
}
