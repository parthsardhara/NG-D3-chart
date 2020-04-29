import { Component, OnInit } from '@angular/core';
declare var d3: any;
declare var _: any;

@Component({
  selector: 'app-ng-multi-parent',
  templateUrl: './ng-multi-parent.component.html',
  styleUrls: ['./ng-multi-parent.component.css']
})
export class NgMultiParentComponent implements OnInit {

  data = {
    name: 'ROOT',
    id: 'root',
    children: [
      {
        name: 'A',
        id: 'A',
        description: 'This is a tooltip with a long multi line text in it',
        children: [
          {
            name: 'AA',
            id: 'AA',
            description: 'This is a tooltip',
            children: [
              {
                name: 'BB1',
                id: 'BB1'
              },
              {
                name: 'CC1',
                id: 'CC1'
              }
            ]
          },
          {
            name: 'BB',
            id: 'BB',
            children: [
              {
                name: 'BB11',
                id: 'BB11'
              },
              {
                name: 'CC11',
                id: 'CC11'
              }
            ]
          },
          {
            name: 'CC',
            id: 'CC'
          }
        ]
      },

      {
        name: 'B',
        id: 'B',
        children: [
          {
            name: 'AA',
            id: 'AA'
          },
          {
            name: 'BB',
            id: 'BB'
          },
          {
            name: 'CC',
            id: 'CC'
          }
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {

    const attr = {
      width: 500,
      height: 500,
    }
    // specify graph defaults with fallbacks
    var graph = {
      width: attr.width || 1000,
      height: attr.height || 900
    };

    // colouring function
    var colors = d3.scale.category20();

    // extend d3 with moveToFront function
    // this function redraws the elements in order to put them always in the front
    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    // draw the svg container for the full graph
    var svg = d3.select('#chart').append("svg:svg").attr("width", graph.width).attr("height", graph.height).append("svg:g").attr("transform", "translate(-" + graph.width * 0.05 + ", 0)");

    // specify the diagonal path link draw function
    var diagonal = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x];
    });

    // define the tree and leave some space for the text
    var tree = d3.layout.tree().size([graph.height, graph.width / 2]);

    //tooltip
    var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // calculate nodes
    var nodes = tree.nodes(this.data);

    //make nodes unique by id
    nodes = _.uniq(nodes, "id");

    // recalculate the x poition of each of then node after the removal
    _.each(nodes, function (o, i) {
      var itemsOfTheSameDepth = _.filter(nodes, { depth: o.depth });
      var indexOfTheCurrentItem = _.indexOf(itemsOfTheSameDepth, o);
      var intervalPerDepth = graph.height / itemsOfTheSameDepth.length;
      nodes[i].x = intervalPerDepth / 2 + intervalPerDepth * indexOfTheCurrentItem;
    });

    // calculate links
    var links = tree.links(nodes);

    // remap the links to the appropriate targets
    _.each(links, function (o, i) {
      links[i].target = _.find(nodes, { id: o.target.id });
    });

    // draw links
    var link = svg.selectAll("path").data(links).enter().append("svg:path").attr("class", function (d) {
      return !!d.source ? d.source.id : "root";
    }).classed("link", true).attr("d", diagonal);

    // draw nodes
    var node = svg.selectAll("g.node").data(nodes).enter().append("svg:g").attr("transform", function (d) {
      return "translate(" + d.y + ", " + d.x + ")";
    }).on("mouseup", function (d) {
      // clean up hovers
      d3.selectAll("path.link").classed("hover", false);

      // mark paths to hover
      d3.selectAll("." + d.id).classed("hover", true).moveToFront();

      _.pluck(d.children, "id").forEach(function (id) {
        d3.selectAll("." + id).classed("hover", true).moveToFront();
      });

      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    }).on("mouseover", function (d) {
      // if description exists ... match it to tooltip
      if (!!d.description) {
        tooltip.transition().duration(200).style("opacity", 0.9);

        tooltip.html(d.description).style("left", d3.event.pageX - 8 + "px").style("top", d3.event.pageY + 8 + "px");
      }
    }).on("mouseout", function (d) {
      tooltip.transition().duration(500).style("opacity", 0);
    });

    // append some node visualization
    node.append("svg:circle").attr("r", 6).attr("fill", function (d) {
      return colors(d.id.split("-")[0]);
    }).attr("stroke", "#333333").attr("stroke-width", "1.5px");

    // add text to represent the meaning of the node
    node.append("svg:text").attr("dx", function (d) {
      return d.children ? -8 : 8;
    }).attr("dy", 3).classed("text", true).attr("text-anchor", function (d) {
      return d.children ? "end" : "start";
    }).text(function (d) {
      return d.name;
    });
  }

}
