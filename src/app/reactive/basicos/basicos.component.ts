import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector   : 'app-basicos',
  templateUrl: './basicos.component.html',
  styles     : [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   'nombre'     : new FormControl('AirPods Pro10'),
  //   'precio'     : new FormControl(150),
  //   'existencias': new FormControl(20),
  // })

  miFormulario: FormGroup = this.fb.group({
    nombre    : ['AirPods Pro20', [Validators.required, Validators.minLength(3)]],
    precio    : [150, [Validators.required, Validators.min(1)]],
    existencia: [, [Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre    : 'Iphone 50',
      precio    : 1000000,
      existencia: 10,
    })

  }

  campoNoEsValido(campo:string) {
    return this.miFormulario.controls[campo].errors
              && this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    

    console.log(this.miFormulario.value);
    this.miFormulario.reset();    
  }


}
