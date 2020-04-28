import { Component, OnInit } from '@angular/core';
declare const OrgChart: any;

@Component({
  selector: 'app-multi-parent',
  templateUrl: './multi-parent.component.html',
  styleUrls: ['./multi-parent.component.css']
})
export class MultiParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var chart = new OrgChart(document.getElementById("tree"), {
      orientation: OrgChart.orientation.left,
      nodeBinding: {
        field_0: "id",
        field_1: "pid"
      },
      slinks: [
        { from: 7, to: 1 },
        { from: 5, to: 'parth', label: 'multi-parent' },
        { from: 2, to: 6,  template: 'blue' },
        { from: 2, to: 'kishan', label: 'multi-parent' },
      ]
    });

    chart.load([
      { id: 'parth' },
      { id: 'kishan' },
      { id: 'papa', pid: 'kishan' },
      { id: 1, pid: 'parth' },
      { id: 2, pid: 'parth' },
      { id: 3, pid: 1 },
      { id: 4, pid: 2 },
      { id: 5, pid: 1 },
      { id: 6, pid: 2 },
      { id: 7, pid: 5 },
      { id: 8, pid: 2 },
      { id: 9, pid: 5 },
    ]);
  }

}
