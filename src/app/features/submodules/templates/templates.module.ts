import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates/templates.component';
import { FormsModule } from '@angular/forms';
import { TemplatesRoutingModule } from './templates-routing.module';

@NgModule({
  declarations: [
    TemplatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule { }
