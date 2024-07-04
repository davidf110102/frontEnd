import {AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { GeneroService } from '../../../services/genero.service';
import { Genero } from '../../../interfaces/genero';
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
  selector: 'app-genero',
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
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.css'
})
export class GeneroComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['idGenero', 'nombre'];
  dataSource = new MatTableDataSource<Genero>();
  constructor(private _generoServicio: GeneroService, public dialog: MatDialog,
    private _snackBar : MatSnackBar
  ) {}
  ngOnInit(): void {
    this.mostrarGeneros();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    mostrarGeneros(){
    this._generoServicio.getList().subscribe({
      next:(dataResponse)=>{
        console.log(dataResponse)
        this.dataSource.data = dataResponse;
      },error:(e) => {}
    })
  }

}

