import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../../shared/menu/menu.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ RouterModule, MenuComponent ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
