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

@Component({
  selector: 'app-diologo-delete',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatInputModule, MatGridListModule, ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MomentDateModule,],
  templateUrl: './diologo-delete.component.html',
  styleUrl: './diologo-delete.component.css'
})
export class DiologoDeleteComponent implements OnInit{

  constructor(
    private dialogoReferencia: MatDialogRef<DiologoDeleteComponent>,
    @Inject (MAT_DIALOG_DATA) public dataPersona: Persona
  ){}

  ngOnInit(): void{

  }

  confirmar_eliminar(){
    if(this.dataPersona){
      this.dialogoReferencia.close("eliminar")
    }
  }

}
