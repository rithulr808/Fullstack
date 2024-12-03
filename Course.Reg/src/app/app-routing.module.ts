// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
//
//
//
// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
//   },
//   {
//     path: 'errors',
//     loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
//   },
//   { path: '**', redirectTo: 'errors/404' },
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app.guard'; // Adjust the path if necessary

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [AuthGuard], // Protect routes under the layout module
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./modules/error/error.module').then((m) => m.ErrorModule),
  },
  { path: '**', redirectTo: 'errors/404' }, // Redirect any unmatched route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
