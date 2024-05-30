import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';
import { ProductComponent } from './features/Pages/product/product.component';
import { AnalyticsComponent } from './features/Pages/analytics/analytics.component';
import { UserlistComponent } from './shared/UI/user-list-table/userlist.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { permissionsGuard } from './core/Guards/permissions.guard';

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
    canActivate: [authGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER']
      }
    }
  },
  { 
    path: 'analytics', 
    component: AnalyticsComponent, 
    canActivate: [authGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER']
      }
    } 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'home', 
    loadChildren: () => import('./features/submodules/home/home.module').then(m => m.HomeModule),
    canActivate: [permissionsGuard] 
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./features/submodules/cart/cart.module').then(m => m.CartModule),
    canActivate: [authGuard, permissionsGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
