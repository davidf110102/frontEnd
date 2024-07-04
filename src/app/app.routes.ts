import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'inicio',
        loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent),
        children: [
            {
                path: 'CRUD-persona',
                title: 'Persona',
                loadComponent: () => import('./components/inicio/persona/persona.component').then(m => m.PersonaComponent),
            },
            {
                path: 'CRUD-genero',
                title: 'Genero',
                loadComponent: () => import('./components/inicio/genero/genero.component').then(m => m.GeneroComponent),
            },
            {
                path: '', 
                redirectTo: 'CRUD-persona', 
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    }
];
