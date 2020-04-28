import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chart',
    pathMatch: 'full'
  },
  {
    path: 'chart',
    loadChildren: () => import('./Modules/chart/chart.module').then(m => m.ChartModule),
  },
  {
    path: '**',
    redirectTo: 'pages/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
