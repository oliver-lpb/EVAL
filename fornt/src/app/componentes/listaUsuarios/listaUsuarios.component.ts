import { Component, OnInit } from '@angular/core';
import { ServidorService } from '../../services/servidor.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listaUsuarios',
  templateUrl: './listaUsuarios.component.html',
  styleUrls: ['./listaUsuarios.component.css'],
  standalone: false
})
export class ListaUsuariosComponent implements OnInit {

  //variables
  modal:boolean = false;
  nuevoUsuario = {
    nombre:'',
    email:'',
    edad:''
  }

  //listas 
  usuarios: Array<any>;


  constructor( private service: ServidorService ) { }

  ngOnInit() {
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.service.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    })

  }

  //vista de modal

  modalOpen(show:boolean){
    
    this.modal = show
  }

  creaUsuario(){
    const validador = this.validarNuevoUsuario(this.nuevoUsuario);
    if(validador.valido){

      this.service.postUsuarios(this.nuevoUsuario).subscribe({
        next:(res) => {
          Swal.fire({
            icon: "success",
            title: "Guardado",
            
          });

          this.nuevoUsuario = {
            nombre:'',
            email:'',
            edad:''
          }

          this.modalOpen(false);
          this.listaUsuarios();

        },
        error:(err) => {
          console.log('Error en creaUsuario(): ', err);
          Swal.fire({
            icon: "error",
            title: "Errores",
            text: "" + err.mensaje,
          });
        }
      })

    }else{
      Swal.fire({
        icon: "error",
        title: "Errores",
        text: "" + validador.errores,
      });
    }
  }

  validarNuevoUsuario(nuevoUsuario: { nombre: string; email: string; edad: any }): { valido: boolean; errores: string[] } {
    const errores: string[] = [];
  
    // Validar nombre
    if (!nuevoUsuario.nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoUsuario.nombre.trim())) {
      errores.push('El nombre es obligatorio y solo debe contener letras y espacios.');
    }
  
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!nuevoUsuario.email || !emailRegex.test(nuevoUsuario.email)) {
      errores.push('El correo electrónico no es válido.');
    }
  
    // Validar edad
    const edad = Number(nuevoUsuario.edad);
    if (!nuevoUsuario.edad || isNaN(edad) || edad <= 0 || !Number.isInteger(edad)) {
      errores.push('La edad debe ser un número entero mayor que 0.');
    }
  
    return {
      valido: errores.length === 0,
      errores,
    };
  }
  

}
