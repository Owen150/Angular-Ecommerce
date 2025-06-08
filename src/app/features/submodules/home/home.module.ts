import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';
import { SearchPipe } from 'src/app/shared/Pipes/search.pipe';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LimitWordsPipePipe } from 'src/app/shared/Pipes/limit-words-pipe.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    SearchPipe,
    ProductCategoriesComponent,
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule
  ]
})
export class HomeModule { }
