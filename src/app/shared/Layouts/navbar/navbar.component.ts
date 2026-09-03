import { Component, DoCheck, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CartService } from 'src/app/features/submodules/cart/services/cart.service';
import { ProductsService } from 'src/app/features/submodules/home/products.service';
import { CreateProductComponent } from '../../UI/create-product-form/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RoleAccess, Userinfo } from 'src/app/store/Models/User.model';
import { getMenuByRole } from 'src/app/store/User/User.Selector';
import { fetchMenu } from 'src/app/store/User/User.Action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  id: any;
  searchText: any = '';
  cartItemCount: any;
  isSortMenuVisible: boolean = false;
  criteria: any[] = ['Price(Low to High)', 'Price(High to Low)'];
  displayUserDropDown: boolean = false;
  displayProductDropDown: boolean = false;
  isPriceFiltersVisible: boolean = false;
  priceFilters = [100, 500, 1000];
  categories: any;
  isCategoriesVisible: boolean = false;
  isMenuVisible = false;
  menuList!: RoleAccess[];

  constructor(
    private cartService: CartService, 
    private productsService: ProductsService,
    private dialog: MatDialog,
    private router: Router,
    private store: Store<{ user: Userinfo }>
  ) {}

  ngOnInit(): void {
    // Set Menu Items OnInit
    if(localStorage.getItem('userdata') != null){
      let jsonstring = localStorage.getItem('userdata') as string;
      const _obj = JSON.parse(jsonstring) as Userinfo;
      this.store.dispatch(fetchMenu({userrole:_obj.role}))
    }
    this.getProductCategories();
    this.store.select(getMenuByRole).subscribe(item => {
      this.menuList = item;
    })
    this.getCartItemCount();
  }

  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/login' || currentRoute === '/signup') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }

  getCartItemCount() {
    this.cartService.cartSubject.subscribe((cartItems: any) => {
      this.cartItemCount = cartItems.length;
    });
  }

  // Review
  getProductCategories() {
    this.productsService.getAllProductCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
    return this.categories;
  }

  getCategories() {
    // Displaying the Various Categories on the Side Navigation
    this.productsService.getAllProducts().subscribe((res) => {
      this.categories = this.productsService.getAllCategories();
    });
  }

  // Review
  productModal(): void {
    this.productsService.getAllProductCategories().subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(CreateProductComponent, {
          // width: '500px',
          data: {
            categories: res,
          },
        });
      },
    });
  }

  // Open Sort Menu - Sets isSortMenuVisible to true
  showSortMenu() {
    this.isSortMenuVisible = !this.isSortMenuVisible;
  }

  // Sort products by price
  sortProducts(criterion: any) {
    this.productsService.getSortCriterion(criterion);
  }

  // Category Filters
  showCategories() {
    this.isPriceFiltersVisible = false;
    this.isCategoriesVisible = !this.isCategoriesVisible;
  }

  // Pass the selected category value to the Product Service
  filterProductsByCategory(category: any) {
    this.productsService.getProductCategory(category);
    this.isCategoriesVisible = false;
  }

  searchProduct(searchText: any) {
    this.productsService.getSearchString(searchText);
  }

  toggleUserDropDownArrow() {
    this.displayUserDropDown = !this.displayUserDropDown;
  }

  toggleProductDropDown() {
    this.displayProductDropDown = !this.displayProductDropDown;
  }

  // Price Filters
  showPriceFilters() {
    this.isCategoriesVisible = false;
    this.isPriceFiltersVisible = !this.isPriceFiltersVisible;
  }

  // Pass the selected priceFilter value to the Product Service
  filterProductsByPrice(priceFilter: any) {
    this.productsService.getPriceFilter(priceFilter);
  }
}
