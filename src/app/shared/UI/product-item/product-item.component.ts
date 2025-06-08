import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() products: any[] = [];

  constructor(private router: Router) {}

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}
