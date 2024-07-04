import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PersonaService } from '../../../services/persona.service';
import { Persona } from '../../../interfaces/persona';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatIconModule } from '@angular/material/icon';

import { MatDialogModule } from '@angular/material/dialog';

import { MatGridListModule } from '@angular/material/grid-list';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogAddEditComponent } from '../../../shared/dialog-add-edit/dialog-add-edit.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { DiologoDeleteComponent } from '../../../shared/diologo-delete/diologo-delete.component';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule, 
    RouterModule,
    ReactiveFormsModule, 
    MatButtonModule,
    MatTableModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
   ],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css'
})
export class PersonaComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'fechaNacimiento', 'nombreGenero', 'acciones'];
  dataSource = new MatTableDataSource<Persona>();


  dialogoNuevaPersona() {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado => {
      if(resultado === "creado"){
        this.mostrarPersonas();
      }
    })
  }
  dialogoEditarPersona(dataPersona: Persona) {
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px",
      data:dataPersona
    }).afterClosed().subscribe(resultado => {
      if(resultado === "editado"){
        this.mostrarPersonas();
      }
    })
  }
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration: 3000
    });
  }
  dialogoEliminarPersona(dataPersona: Persona){
    this.dialog.open(DiologoDeleteComponent,{
      disableClose:true,
      data:dataPersona
    }).afterClosed().subscribe(resultado => {
      if(resultado === "eliminar"){
        this._personaServicio.delete(dataPersona.idPersona).subscribe({
          next:(data)=>{
            this.mostrarAlerta("La persona fue eliminada", "Listo");
            this.mostrarPersonas();
          },
          error:(e)=> {console.log(e)}

        })
      }
    })
  }

  constructor(private _personaServicio: PersonaService, public dialog: MatDialog,
    private _snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mostrarPersonas();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

  mostrarPersonas(){
    this._personaServicio.getList().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }

  
    
}


