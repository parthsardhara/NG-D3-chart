import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart.component';
import { D3Component } from './d3/d3.component';
import { MultiParentComponent } from './multi-parent/multi-parent.component';
import { ImageChartComponent } from './image-chart/image-chart.component';
import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
    children: [
      {
        path: '',
        redirectTo: 'd3',
        pathMatch: 'full'
      },
      {
        path: 'd3',
        component: D3Component
      },
      {
        path: 'multi-parent',
        component: MultiParentComponent
      },
      {
        path: 'image-chart',
        component: ImageChartComponent
      },
      {
        path: 'parent',
        component: ParentComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
