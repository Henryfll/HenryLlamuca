import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './productos/components/producto/producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoModule } from './productos/module/producto/producto.module';

const appRoutes: Routes = [
  { path: '', component: ProductoComponent },

];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    //FormsModule,
    HttpClientModule,
    ProductoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
