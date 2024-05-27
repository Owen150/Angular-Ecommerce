import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from '../guard/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { 
    path: '', 
    component: CartComponent 
  },
  { 
    path: 'checkout', 
    component: CheckoutComponent, 
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['USER']
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
