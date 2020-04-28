import { Component, OnInit } from '@angular/core';
declare const d3: any;
declare const _: any;


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var data = {
      id: "cert-root",
      name: "certificates",
      children: [
        {
          id: "cert-iso",
          name: "ISO",
          children: [
            {
              id: "IS-30",
              name: "IS-Diagnostic",
              children: [
                {
                  id: "IS-30_1",
                  name: "IS-Diagnostic.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }, {
                      id: "Aryaka",
                      name: "Aryaka"
                    }
                  ]
                }
              ]
            },
            {
              id: "IS-31",
              name: "IS-Network",
              children: [
                {
                  id: "IS-31_1",
                  name: "IS-Network.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    },
                    {
                      id: "Aryaka",
                      name: "Aryaka"
                    }
                  ]
                },
                {
                  id: "IS-31_2",
                  name: "IS-Network.2",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    },
                    {
                      id: "Aryaka",
                      name: "Aryaka"
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          name: "COBIT",
          id: "cert-cobit",
          children: [
            {
              id: "CO-01",
              name: "co-AuditPlanning",
              children: [
                {
                  id: "CO-01_1",
                  name: "CO-AuditPlanning.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          name: "HIPPA",
          id: "cert-hippa",
          children: [
            {
              id: "CO-01",
              name: "co-AuditPlanning",
              children: [
                {
                  id: "CO-01_1",
                  name: "CO-AuditPlanning.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                }
              ]
            },
            {
              id: "IS-18",
              name: "IS-Encryption"
            },
            {
              id: "IS-19",
              name: "IS-EncryptionKeyManagement"
            },
            {
              id: "IS-20",
              name: "IS-Vulnerability",
              children: [
                {
                  id: "IS-20_1",
                  name: "IS-Vulnerability.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "IS-20_2",
                  name: "IS-Vulnerability.2",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "IS-20_3",
                  name: "IS-Vulnerability.3",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "IS-20_4",
                  name: "IS-Vulnerability.4",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "IS-20_5",
                  name: "IS-Vulnerability.5",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                }
              ]
            },
            {
              id: "IS-21",
              name: "IS-Anti-Virus",
              children: [
                {
                  id: "IS-21_1",
                  name: "IS-Anti-Virus.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "IS-21_2",
                  name: "IS-Anti-Virus.2",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                }
              ]
            },
            {
              id: "SA-14",
              name: "SA-AuditLogging/IntrusionDetection",
              children: [
                {
                  id: "SA-14_1",
                  name: "SA-AuditLogging/IntrusionDetection.1",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "SA-14_2",
                  name: "SA-AuditLogging/IntrusionDetection.2",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                },
                {
                  id: "SA-14_3",
                  name: "SA-AuditLogging/IntrusionDetection.3",
                  children: [
                    {
                      id: "softlayer",
                      name: "Soft Layter"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    var graph = {
      width: 1000,
      height: 1000
    };

    d3.selection.prototype.moveToFront = function () {
      return this.each(function () {
        this.parentNode.appendChild(this);
      });
    };

    var svg = d3.select('.chart').append('svg')
      .attr("width", graph.width)
      .attr("height", graph.height)
      .append('g')
      .attr('transform', 'translate(-10, 0)')

    function elbow(d, i) {
      return "M" + d.source.y + "," + d.source.x + "H" + d.target.y
        + "V" + d.target.x + "H" + d.target.y
    }

    var diagonal = d3.svg.diagonal()
      .projection(function (d) {
        return [d.y, d.x];
      });

    var tree = d3.layout.tree()
      .size([graph.height, graph.width]);

    var nodes = tree.nodes(data);

    nodes = _.uniq(nodes, 'id');

    _.each(nodes, function (o, i) {
      var itemsOfTheSameDepth = _.where(nodes, { depth: o.depth });
      var indexOfCurrent = _.indexOf(itemsOfTheSameDepth, o);
      var interval = graph.height / itemsOfTheSameDepth.length;
      nodes[i].x = interval / 2 + (interval * indexOfCurrent);
    });

    //tooltip
    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var links = tree.links(nodes);

    _.each(links, function (o, i) {
      links[i].target = _.find(nodes, { id: o.target.id });
    });

    var link = svg.selectAll("path")
      .data(links)
      .enter().append("svg:path")
      .attr('class', function (d) {
        return (!!d.source) ? d.source.id : "root";
      })
      .classed('link', true)
      .attr('d', diagonal);

    var node = svg.selectAll('g.node')
      .data(nodes)
      .enter().append("svg:g")
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      })
      .on('mouseup', function (d) {
        // remove all the colour paths
        d3.selectAll('path.link').classed('hover', false);
        // draw new colour paths
        d3.selectAll("." + d.id)
          .classed("hover", true)
          .moveToFront();

        _.pluck(d.children, 'id').forEach(function (id) {
          d3.selectAll('.' + id)
            .classed('hover', true)
            .moveToFront();
        });

        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }

      })
      .on('mouseover', function (d) {
        if (!!d.description) {
          tooltip.transition()
            .duration(200)
            .style('opacity', .9);

          tooltip.html(d.description)
            .style('left', (d3.event.pageX) + 'px')
            .style('top', ((d3.event.pageY) + 8) + "px")
        }
      })
      .on('mouseout', function (d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    var colors = d3.scale.category20();
    node.append("svg:circle")
      .attr("r", 4)
      .attr('fill', function (d, i) {
        return colors(d.id.split('-')[0]);
      })
      .attr('stroke', "#333333")
      .attr('stroke-width', '1.5px');

    node.append("svg:text")
      .attr("dx", function (d) {
        return d.children ? -8 : 8;
      })
      .attr("dy", 3)
      .classed("text", true)
      .attr("text-anchor", function (d) {
        return d.children ? "end" : "start";
      })
      .text(function (d) {
        return d.name;
      });
  }



}
