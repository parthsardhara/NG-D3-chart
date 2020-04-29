import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';
import { D3Component } from './d3/d3.component';
import { MultiParentComponent } from './multi-parent/multi-parent.component';
import { ImageChartComponent } from './image-chart/image-chart.component';
import { ParentComponent } from './parent/parent.component';
import { NgMultiParentComponent } from './ng-multi-parent/ng-multi-parent.component';
import { NewD3Component } from './new-d3/new-d3.component';

@NgModule({
  declarations: [ChartComponent, D3Component, MultiParentComponent, ImageChartComponent, ParentComponent, NgMultiParentComponent, NewD3Component],
  imports: [
    CommonModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
