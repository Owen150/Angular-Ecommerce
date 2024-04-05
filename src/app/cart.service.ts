import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: any[] = [];
  cartSubject = new Subject();
  //Discount - Percentage
  discount: number = 10;

  constructor() {}

  addProductToCart(product: any) {
    let currentProduct = { ...product, count: 1 };
    this.cartProducts.push(currentProduct);
    this.cartSubject.next(this.cartProducts);
  }
  getAllCartItems() {
    return this.cartProducts;
  }

  //Cart Price Details
  getPriceDetailsInCartItem(product: any) {
    let priceDetails = {
      discountedPrice:
        product.price * product.count -
        (this.discount / 100) * (product.price * product.count),
      price: product.price * product.count,
    };
    return priceDetails;
  }

  increaseProductCountInCart(product: any) {
    //Will give us a particular index object in the cartProducts array
    let index = this.cartProducts.findIndex((productData) => {
      return productData.id === product.id;
    });
    // Update affected values
    this.cartProducts[index].count++;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProducts);
  }

  decreaseProductCountInCart(product: any) {
    let index = this.cartProducts.findIndex((productData) => {
      return productData.id === product.id;
    });
    this.cartProducts[index].count--;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProducts);
  }

  //Change this to ngMaterial dialog
  removeItemFromCart(product: any) {
    let removeConfirm = window.confirm('Are you sure?');
    if (removeConfirm) {
      // Find the item index
      let index = this.cartProducts.findIndex((productData) => {
        return productData.id === product.id;
      });
      // Remove the item from the cartProducts array using the index
      this.cartProducts.splice(index, 1);
      // Sending the updated cartProduct value/s
      this.cartSubject.next(this.cartProducts);
    }
  }
}