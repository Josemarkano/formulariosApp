import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector   : 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles     : [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Banjo Kazooie', Validators.required],
      ['Goldeneye 007', Validators.required],
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray
  }

  constructor(private fb: FormBuilder) { }

  campoNoEsValido(campo:string) {
    return this.miFormulario.controls[campo].errors
              && this.miFormulario.controls[campo].touched;
  }

  agregarFavoritos() {
    if ( this.nuevoFavorito.invalid) { return; }

    this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required) );

    this.nuevoFavorito.reset();
  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }

  guardar() {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    console.log(this.miFormulario.value);
    // this.miFormulario.reset();
    
  }

 
}
