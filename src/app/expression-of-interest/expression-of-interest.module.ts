import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpressionOfInterestRoutingModule } from './expression-of-interest-routing.module';
import { ExpressionOfInterestComponent } from './expression-of-interest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ExpressionOfInterestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
   
    ExpressionOfInterestRoutingModule
  ]
})
export class ExpressionOfInterestModule { }
