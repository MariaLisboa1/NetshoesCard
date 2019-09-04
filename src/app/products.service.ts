import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { NETSHOES_API } from "./app.api";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  products() {
    return this.http.get(`${NETSHOES_API}/products`);
  }
}
