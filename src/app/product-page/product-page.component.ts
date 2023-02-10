import { Component, OnInit } from '@angular/core';
import { Product } from "./product.entity";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  product: Product = {
    name: "Iphone 14",
    imageUrl: "https://proxymedia.woopic.com/api/v1/images/1618%2Fedithor%2Fterminaux%2FiPhone_14_Pro_Deep_Purple_PDP_Image_Position-1a__FRFR_6329876d4d67a850e7ca4d2a.jpg?format=504x504&saveas=jpg&saveasquality=85",
    price: 1500,
    description: "Un magnifique iphone",
    category: "Smartphone",
    seller: "Apple"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
