import { Component, OnInit } from '@angular/core';
declare const d3: any;

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.css']
})
export class D3Component implements OnInit {

  // Sample data set
  public json = {
    nodes: [
      {
        name: 'A'
      },
      {
        name: 'B'
      },
      {
        name: 'C'
      },
      {
        name: 'D'
      },
      {
        name: 'E'
      }
    ],
    links: [
      {
        source: 'A',
        target: 'B'
      },
      {
        source: 'A',
        target: 'C'
      },
      {
        source: 'B',
        target: 'D'
      },
      {
        source: 'C',
        target: 'D'
      },
      {
        source: 'A',
        target: 'E'
      },
      {
        source: 'D',
        target: 'E'
      }
    ]
  };


  constructor() { }

  ngOnInit(): void {

    var vis = d3.select('#vis').attr('transform', 'translate(20, 20)');

    // Build initial link elements - Build first so they are under the nodes
    var links = vis.selectAll('line.link').data(this.json.links);
    console.log('links', links)
    links.enter().append('line').attr('class', 'link').attr('stroke', '#000');

    // Build initial node elements
    var nodes = vis.selectAll('g.node').data(this.json.nodes);
    console.log('nodes 111', nodes)
    nodes.enter().append('g').attr('class', 'node').append('circle').attr('r', 10).append('title').text(function (d) {
      return d.name;
    });

    console.log('nodes', nodes)

    // Store nodes in a hash by name
    var nodesByName = {};
    nodes.each(function (d) {
      nodesByName[d.name] = d;
    });

    console.log('inside the 2', nodesByName)

    // Convert link references to objects
    links.each(function (link) {
      link.source = nodesByName[link.source];
      link.target = nodesByName[link.target];
      if (!link.source.links) {
        link.source.links = [];
      }
      link.source.links.push(link.target);
      if (!link.target.links) {
        link.target.links = [];
      }
      link.target.links.push(link.source);
    });

    // Compute positions based on distance from root
    var setPosition = function (node, i, depth) {
      if (!depth) {
        depth = 0;
      }
      if (!node.x) {
        node.x = (i + 1) * 40;
        node.y = (depth + 1) * 40;
        if (depth <= 1) {
          node.links.forEach(function (d, i2) {
            setPosition(d, i2, depth + 1);
          });
        }

      }

    };
    nodes.each(setPosition);

    // Update inserted elements with computed positions
    nodes.attr('transform', function (d) {
      return 'translate(' + d.x + ', ' + d.y + ')';
    });

    links.attr('x1', function (d) {
      return d.source.x;
    }).attr('y1', function (d) {
      return d.source.y;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    });
  }

}
