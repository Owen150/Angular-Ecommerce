import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/features/submodules/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItemCount: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItemCount();
  }

  getCartItemCount() {
    this.cartService.cartSubject.subscribe((cartItems: any) => {
      this.cartItemCount = cartItems.length;
    });
  }
}
