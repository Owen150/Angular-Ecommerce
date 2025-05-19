import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../../shared/UI/delete-confirmation-modal/delete-confirmation.component';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartProducts: any[] = [];
  cartSubject = new Subject();
  productDeletedSubject = new Subject();

  constructor(private dialog: MatDialog) {}

  addProductToCart(product: any) {
    let currentProduct = { ...product, count: 1 };
    this.cartProducts.push(currentProduct);
    this.cartSubject.next(this.cartProducts);
  }
  getAllCartItems() {
    return this.cartProducts;
  }

  getPriceDetailsInCartItem(product: any) {
    let priceDetails = {
      price: product.price * product.count
    };
    return priceDetails;
  }

  increaseProductCountInCart(product: any) {
    let index = this.cartProducts.findIndex((productData) => {
      return productData.id === product.id;
    });
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

  removeItemFromCart(product: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { product }
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        const index = this.cartProducts.findIndex((productData) => productData.id === product.id);
        if (index !== -1) {
          this.cartProducts.splice(index, 1);
          this.cartSubject.next(this.cartProducts);
          this.productDeletedSubject.next(this.cartProducts);
        }
      }
    });
  }

  getBilling(cartItems: any) {
    let billingDetails = {
      price: 0,
      delivery: 0,
      total: 0
    };
    cartItems.forEach((productData: any) => {
      billingDetails.price = productData.price * productData.count;
      billingDetails.total += billingDetails.price;
      
      billingDetails.total >= 200
        ? (billingDetails.delivery = 0)
        : (billingDetails.delivery = 5);
    });
    return billingDetails;
  }
  
  isProductInCart(product: any): boolean {
    return this.cartProducts.some(item => item.id === product.id);
  }
}
