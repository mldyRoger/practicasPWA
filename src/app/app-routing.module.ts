import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'hola',
    loadChildren: () => import('./pages/hola/hola.module').then( m => m.HolaPageModule)
  },*/
  {
    path: 'hola',
    loadChildren: () => import('./pages/hola/hola.module').then( m => m.HolaPageModule)
  },
  {
    path: '',
    redirectTo: 'hola',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./pages/admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'admin-users-add',
    loadChildren: () => import('./pages/admin-users-add/admin-users-add.module').then( m => m.AdminUsersAddPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
