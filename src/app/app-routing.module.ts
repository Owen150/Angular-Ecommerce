import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';
import { ProductComponent } from './features/submodules/home/components/product/product.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { UserlistComponent } from './shared/UI/user-list-table/userlist.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { permissionsGuard } from './core/Guards/permissions.guard';
import { LoginComponent } from './shared/UI/login/login.component';
import { SignupComponent } from './shared/UI/signup/signup.component';
import { TemplatesComponent } from './features/submodules/templates/templates/templates.component';
import { AboutPageComponent } from './shared/UI/about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate: [permissionsGuard],
  },
  {
    path: 'user',
    component: UserlistComponent,
    canActivate: [authGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER'],
      },
    },
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [authGuard, NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['ADMIN', 'MANAGER'],
      },
    },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/submodules/home/home.module').then(
        (m) => m.HomeModule
      ),
    canActivate: [permissionsGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/submodules/cart/cart.module').then(
        (m) => m.CartModule
      ),
    canActivate: [authGuard, permissionsGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutPageComponent },
  {
    path: 'templates',
    loadChildren: () =>
      import('./features/submodules/templates/templates.module').then(
        (m) => m.TemplatesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
