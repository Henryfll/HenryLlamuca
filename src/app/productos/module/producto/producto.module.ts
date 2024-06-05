import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from '../../components/producto/producto.component';
import { RUTA_PRODUCTOS } from '../../routes/producto-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ProductoComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forChild(RUTA_PRODUCTOS),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ProductoModule { }
