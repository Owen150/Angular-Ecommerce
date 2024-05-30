import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categories', component: ProductCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
