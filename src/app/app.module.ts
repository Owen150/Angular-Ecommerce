import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

/*Component imports */
import { AppComponent } from './app.component';
import { ProductComponent } from './features/submodules/home/components/product/product.component';
import { AnalyticsComponent } from './features/Pages/analytics/analytics.component';

/*Angular Material imports */
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserReducer } from './store/User/User.Reducer';
import { UserEffect } from './store/User/User.Effects';
import { AppEffects } from './store/App Actions/App.Effects';
import { PermissionsService } from './core/Services/permissions.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { Product } from './core/Interceptors/product.interceptor';

export function permissionsFactory(
  permissionsService: PermissionsService,
  ngxPermissionsService: NgxPermissionsService
) {
  return () => {
    return permissionsService.loadPermissions().then((data) => {
      ngxPermissionsService.loadPermissions(data);
      return true;
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StoreModule.forRoot({ user: UserReducer }),
    EffectsModule.forRoot([UserEffect, AppEffects]),
    NgxPermissionsModule.forRoot(),
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: { APP_INITIALIZER, HTTP_INTERCEPTORS },
      useClass: Product,
      useFactory: permissionsFactory,
      deps: [PermissionsService, NgxPermissionsService],
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
