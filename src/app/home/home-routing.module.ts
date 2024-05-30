import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CreateProductComponent } from '../shared/UI/create-product-form/create-product.component';

import { authGuard } from '../core/Guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'create-product', component: CreateProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
