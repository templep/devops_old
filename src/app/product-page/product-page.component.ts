import { Component, OnInit } from '@angular/core';
import { Product } from "./product.entity";
import Statsig from "statsig-js";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: Product = {
    id: "IPHONE_14_BLUE_256GB",
    name: "Iphone 14",
    imageUrl: "https://proxymedia.woopic.com/api/v1/images/1618%2Fedithor%2Fterminaux%2FiPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a__FRFR_6329876d4d67a850e7ca4d2a.jpg?format=504x504&saveas=jpg&saveasquality=85",
    price: 1500,
    description: "Un magnifique iphone",
    category: "Smartphone",
    seller: "Apple"
  }
  constructor() { }

  buttonColor!: string;

  async ngOnInit(): Promise<void> {
    const id = uuidv4();
    await Statsig.initialize(
      "client-efYeKem0Qb4EWDtCkdLgp3Bz3g20kflhyCce3H7w7tZ",
      { userID: id },
      { environment: { tier: "staging" } } // optional, pass options here if needed
    );
    console.log("Statsig initialized");
    console.log("id", id);
    const expConfig = Statsig.getExperiment("product_buy");
    this.buttonColor = expConfig.get("button_color", "blue");
    console.log("buttonColor", this.buttonColor);
  }

  addToCart() {
    Statsig.logEvent("add_to_cart", this.product.id, {
      price: this.product.price.toString(),
      item_name: this.product.name,
    });
  }
}
