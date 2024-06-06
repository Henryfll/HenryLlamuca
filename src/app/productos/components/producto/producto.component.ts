import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  listaProductos:Producto[]=[];
  public frmProducto!: FormGroup;
  esNuevo:boolean=false;
  esEdicion:boolean=false;
  minDate: string;

  constructor(
    private readonly fb: FormBuilder,
    private _productoService:ProductoService
  ) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;

  }

  ngOnInit(): void {
    this.esNuevo=false;
    this.esEdicion=false;
    this.listarProductos();
  }

  listarProductos(){
    this._productoService.obtenerProductos().subscribe(
      (respuesta:any)=>{
        this.listaProductos=respuesta.data;
      },
    (error)=>{
      console.log("Error: ", error);
    }
    );
  }
  nuevoProducto(){
    this.esNuevo=true;
    this.frmProducto=this.fb.group(
      {
        id:[null,[Validators.required]],
        name:[null,[Validators.required]],
        description:[null,[Validators.required]],
        logo:[null,[Validators.required]],
        date_release: [null,[Validators.required]],
        date_revision:[{value:null,disabled:true},[Validators.required]]
      }
    );

    this.frmProducto.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const newDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1));
        this.frmProducto.get("date_revision")?.setValue(newDate.toISOString().split('T')[0]);
      }
    });
  }

  editarProducto(producto:Producto){
    this.esEdicion=true;
    this.frmProducto=this.fb.group(
      {
        id:[{value:producto.id, disabled:true},[Validators.required]],
        name:[producto.name,[Validators.required]],
        description:[producto.description,[Validators.required]],
        logo:[producto.logo,[Validators.required]],
        date_release: [producto.date_release,[Validators.required]],
        date_revision:[{value:producto.date_revision,disabled:true},[Validators.required]]
      }
    );

    this.frmProducto.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const newDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1));
        this.frmProducto.get("date_revision")?.setValue(newDate.toISOString().split('T')[0]);
      }
    });
  }

  reiniciarFormulario(){
    this.esEdicion=false;
    this.esNuevo=false;
    this.listarProductos();
  }

  guardarProducto(){
    let producto:Producto={
      id: this.frmProducto.get("id")!.value,
      name: this.frmProducto.get("name")!.value,
      description: this.frmProducto.get("description")?.value,
      logo: this.frmProducto.get("logo")?.value,
      date_release: this.frmProducto.get("date_release")?.value,
      date_revision: this.frmProducto.get("date_revision")?.value,
    };
    if (this.esNuevo) {
      this._productoService.crearProducto(producto).subscribe(
        (respuesta)=>{
          Swal.fire("Producto creado", "","info");
          this.reiniciarFormulario();
        },
        (error)=>{
          console.log(error);
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
    } else {
      this._productoService.actualizarProducto(producto).subscribe(
        (respuesta)=>{
          Swal.fire("Producto Actualizado","", "info");
          this.reiniciarFormulario();
        },
        (error)=>{
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
    }
  }


  verificarIdExistente(){
    let id:string=this.frmProducto.get("id")?.value;
    this._productoService.verificarIdProducto(id).subscribe(
      (respuesta)=>{
        if (respuesta) {
          Swal.fire("El id del producto ya existe!","","warning");
          this.frmProducto.get("id")?.setValue(null);
        }
      },
      (error)=>{
        Swal.fire(`Error: ${error}`,"", "error");
      }
    );
  }

  eliminarProducto(producto:Producto){
      this._productoService.eliminarProducto(producto.id).subscribe(
        (respuesta)=>{
            Swal.fire("Producto Eliminado!","","success");
            this.listarProductos();
        },
        (error)=>{
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
  }
}
