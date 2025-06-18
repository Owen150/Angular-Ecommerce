import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { AppRoutingModule } from '../app-routing.module';

import { CreateProductComponent } from './UI/create-product-form/create-product.component';
import { DeleteConfirmationComponent } from './UI/delete-confirmation-modal/delete-confirmation.component';
import { RolepopupComponent } from './UI/role-popup-modal/rolepopup.component';
import { UserlistComponent } from './UI/user-list-table/userlist.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './UI/login/login.component';
import { SignupComponent } from './UI/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './Layouts/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProductItemComponent } from './UI/product-item/product-item.component';
import { LimitWordsPipePipe } from './Pipes/limit-words-pipe.pipe';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './Layouts/navbar/navbar.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { AboutPageComponent } from './UI/about-page/about-page.component';

@NgModule({
  declarations: [
    HeaderComponent, CreateProductComponent, DeleteConfirmationComponent, RolepopupComponent, UserlistComponent, LoginComponent, SignupComponent, ProductItemComponent, LimitWordsPipePipe, NavbarComponent, FooterComponent, AboutPageComponent
  ],
  exports: [
    HeaderComponent, CreateProductComponent, DeleteConfirmationComponent, RolepopupComponent, UserlistComponent, LoginComponent, SignupComponent, ProductItemComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatRadioModule,
    MatStepperModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgxPermissionsModule.forRoot(),
    RouterModule
  ]
})
export class SharedModule { }
