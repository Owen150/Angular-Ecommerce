import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './Components/product/product.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { UserlistComponent } from './Components/userlist/userlist.component';
import { NgxPermissionsGuard, ngxPermissionsGuard } from 'ngx-permissions';
import { permissionsGuard } from './guard/permissions.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full',
  },
  { 
    path: 'product/:id', 
    component: ProductComponent,
    canActivate: [permissionsGuard] 
  },
  { 
    path: 'user', 
    component: UserlistComponent, 
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER']
      }
    }
  },
  { 
    path: 'analytics', 
    component: AnalyticsComponent, 
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER']
      }
    } 
  },
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [permissionsGuard] 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [permissionsGuard] 
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), 
    canActivate: [authGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
