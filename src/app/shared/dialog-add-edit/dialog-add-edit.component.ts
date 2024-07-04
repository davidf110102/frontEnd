import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';


import { PersonaService } from '../../services/persona.service';
import { GeneroService } from '../../services/genero.service';
import { Persona } from '../../interfaces/persona';
import { Genero } from '../../interfaces/genero';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  }, 
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}


@Component({
  selector: 'app-dialog-add-edit',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatGridListModule, ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MomentDateModule,
  ],
  templateUrl: './dialog-add-edit.component.html',
  styleUrl: './dialog-add-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: MAT_DATE_FORMATS, useValue : MY_DATE_FORMATS}
  ]
})
export class DialogAddEditComponent implements OnInit {

  formPersona: FormGroup;
  tituloAccion:string = "Nueva";
  botonAccion:string = "Guardar";
  listaGeneros: Genero[]=[];

  constructor(
    private dialogoReferencia: MatDialogRef<DialogAddEditComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _generoServicio: GeneroService,
    private _personaServicio: PersonaService,
    @Inject (MAT_DIALOG_DATA) public dataPersona: Persona
  ){
    this.formPersona = this.fb.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      fechaNacimiento: ['',Validators.required],
      generoId: ['',Validators.required],
    })
    this._generoServicio.getList().subscribe({
      next:(data)=>{
        this.listaGeneros = data;
      }, error:(e)=>{}
    })
   }
   mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
  addEditPersona(){
    console.log(this.formPersona)
    console.log(this.formPersona.value)

    const modelo : Persona = {
      idPersona: 0,
      nombre: this.formPersona.value.nombre,
      apellido: this.formPersona.value.apellido,
      fechaNacimiento: moment(this.formPersona.value.fechaNacimiento).format("YYYY-MM-DD HH:mm:ss.SSS"),
      generoId: this.formPersona.value.generoId
    }

    if(this.dataPersona == null){
      this._personaServicio.add(modelo).subscribe({
        next:(data)=>{
          console.log(modelo);
          this.mostrarAlerta("Persona fue creada", "Listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo crear", "Error");
          console.log(modelo);
        }
      })

    }else{
      this._personaServicio.update(this.dataPersona.idPersona, modelo).subscribe({
        next:(data)=>{
          console.log(modelo);
          this.mostrarAlerta("Persona fue editada ", "Listo");
          this.dialogoReferencia.close("editado");
        },error:(e)=>{
          this.mostrarAlerta("No se pudo editar", "Error");
          console.log(modelo);
        }
      })
    }

    
  }

  ngOnInit(): void{
    if(this.dataPersona){
      this.formPersona.patchValue({
        nombre: this.dataPersona.nombre,
        apellido: this.dataPersona.apellido,
        fechaNacimiento: moment(this.dataPersona.fechaNacimiento, 'DD/MM/YYYY'),
        generoId: this.dataPersona.generoId
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

  }

}
