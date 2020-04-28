import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { ChartRoutingModule } from './chart-routing.module';
import { D3Component } from './d3/d3.component';
import { MultiParentComponent } from './multi-parent/multi-parent.component';
import { ImageChartComponent } from './image-chart/image-chart.component';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [ChartComponent, D3Component, MultiParentComponent, ImageChartComponent, ParentComponent],
  imports: [
    CommonModule,
    ChartRoutingModule
  ]
})
export class ChartModule { }
