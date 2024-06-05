import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url_backend = environment.url_backend;
  constructor(
    public _http:HttpClient
  ) { }


  obtenerProductos(){
    let url_ws=`${this.url_backend}/products`;
    return this._http.get<any>(url_ws);
  }
  crearProducto(productoNuevo:Producto){
    let producto={
      "id":productoNuevo.id,
      "name":productoNuevo.name,
      "description":productoNuevo.description,
      "logo":productoNuevo.logo,
      "date_release":productoNuevo.date_release,
      "date_revision":productoNuevo.date_revision
    };
    let url_ws=`${this.url_backend}/products`;
   return this._http.post<any>(url_ws,producto);
  }
  actualizarProducto(productoActualizar:Producto){
    let producto={
      "name":productoActualizar.name,
      "description":productoActualizar.description,
      "logo":productoActualizar.logo,
      "date_release": productoActualizar.date_release,
      "date_revision": productoActualizar.date_revision
    };
    let url_ws=`${this.url_backend}/products/${productoActualizar.id}`;
   return this._http.put<any>(url_ws,producto);
  }

  eliminarProducto(id:string){
    let url_ws=`${this.url_backend}/products/${id}`;
   return this._http.delete<any>(url_ws);
  }

  verificarIdProducto(id:string){
    let url_ws=`${this.url_backend}/products/verification/${id}`;
   return this._http.get<any>(url_ws);
  }
}
