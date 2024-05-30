import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './UI/create-product-form/create-product.component';
import { DeleteConfirmationComponent } from './UI/delete-confirmation-modal/delete-confirmation.component';
import { RolepopupComponent } from './UI/role-popup-modal/rolepopup.component';
import { UserlistComponent } from './UI/user-list-table/userlist.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CreateProductComponent, DeleteConfirmationComponent, RolepopupComponent, UserlistComponent
  ],
  exports: [
    CreateProductComponent, DeleteConfirmationComponent, RolepopupComponent, UserlistComponent
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
    MatButtonModule
  ]
})
export class SharedModule { }
