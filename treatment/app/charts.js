(function() {
  var Chart, FlowChart, GridChart, Mediator, RowChart, mediators,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Chart = (function() {
    function Chart(params) {
      this.params = params;
      if (this.params.mediator) {
        if (!mediators[this.params.mediator.id]) {
          mediators[this.params.mediator.id] = new Mediator();
        }
        this.mediator = mediators[this.params.mediator.id];
        this.mediator.register(this.params.mediator, this);
      }
      this.loadData();
      return this;
    }

    Chart.prototype.loadData = function() {
      var response;
      response = window.TREATMENTFLOWS.data[this.params.url];
      if (this.params.data) {
        response = response.concat(this.params.data);
      }
      return this.data = this.handleResponse(response);
      /*
      $.ajax {
        type: 'GET'
        url: "/static/data/#{@params.url}"
        success: (response) =>
          @data = @handleResponse response
        error: (request) -> # TODO: gracefully handle error
      }
      */

    };

    Chart.prototype.render = function() {};

    Chart.prototype.handleResponse = function(response) {
      return response;
    };

    return Chart;

  })();

  RowChart = (function(_super) {
    __extends(RowChart, _super);

    function RowChart(app, params) {
      this.app = app;
      this.params = params;
      this.labelOffset = this.params.labelOffset;
      this.rowHeight = this.params.rowHeight;
      this.rowOffset = this.params.rowOffset;
      this.statSet = this.params.defaultStats;
      this.statAttrs = this.params.statAttrs;
      this.headerText = this.params.headerText;
      this.textColor = '#fff';
      if (this.params.svg) {
        this.svg = this.params.svg;
      } else {
        this.svg = d3.select("" + params.el).append("svg:svg").attr("width", this.params.width + this.params.margins[1] + this.params.margins[3]).attr("height", this.params.height);
      }
      this.container = this.svg.append("svg:g").attr("transform", "translate(0," + 40 + ")");
      this.container.append("svg:rect").attr("id", "background").attr("width", this.params.width - this.params.margins[1] - this.params.margins[3] - 30).attr("height", this.params.height - this.params.margins[0] - this.params.margins[2]).attr("rx", 6).attr("ry", 6).style("fill", '#333').style("opacity", 0.97);
      this.rowChart = this.container.append("svg:g")
        .attr("transform", "translate(" + this.params.margins[3] + "," + 80 + ")");
      this.header = this.rowChart.append("svg:g");
      RowChart.__super__.constructor.call(this, this.params);
    }

    RowChart.prototype.handleResponse = function(response) {
      var item, key, _i, _len,
        _this = this;
      this.columns = [
        (function() {
          var _results;
          _results = [];
          for (key in this.headerText) {
            _results.push(key);
          }
          return _results;
        }).call(this)
      ][0];
      this.columnWidth = (this.params.width - this.params.margins[1] - this.params.margins[3] - this.labelOffset - 20) / this.columns.length;
      this.sortArrow = this.rowChart.append('svg:g').style("visibility", "hidden").classed({
        'down': false
      });
      this.sortArrow.append('svg:path').attr("d", d3.svg.symbol().type("triangle-down")).style("fill", '#fff');
      this.header.selectAll('g').data(this.columns).enter().append('svg:g').classed({
        'down': false
      }).attr('id', function(d) {
        return 'column_' + d;
      }).on('mousedown', function(d, i) {
        var arrow, sortFunc, toggle;
        toggle = _this.headerElem != null ? _this.headerElem.attr('id') === ("column_" + d) : false;
        _this.headerElem = _this.header.select("#column_" + d);
        _this.header.selectAll('text').style('font-weight', 300);
        _this.headerElem.select('text').style('font-weight', 600);
        if (_this.headerElem.classed('down') && toggle) {
          _this.headerElem.classed({
            'down': false
          });
          sortFunc = function(a, b) {
            return a['populationStats'][d] - b['populationStats'][d];
          };
          arrow = d3.svg.symbol().type("triangle-up");
        } else {
          _this.headerElem.classed({
            'down': true
          });
          sortFunc = function(a, b) {
            return b['populationStats'][d] - a['populationStats'][d];
          };
          arrow = d3.svg.symbol().type("triangle-down");
        }
        _this.sortArrow.select('path').attr("d", arrow);
        _this.sortArrow.attr("transform", "translate(" + (i * _this.columnWidth + _this.labelOffset + _this.columnWidth - 20) + ", 8)").style("visibility", "visible");
        _this.data.sort(sortFunc);
        _this.orderBy(_this.data);
        return _this.update(_this.data);
      }).attr("transform", function(d, i) {
        return "translate(" + (i * _this.columnWidth + _this.labelOffset) + ", 12)";
      }).append('text').text(function(d) {
        return _this.headerText[d];
      }).attr('class', 'header').style('fill', this.textColor).style('cursor', 'pointer');
      this.header.selectAll('g').append("svg:rect").attr('x', -10).attr('y', 20).attr('width', 1).attr('height', this.rowHeight * response.length + 20).style('fill', '#fff').style('opacity', 0.1);
      for (_i = 0, _len = response.length; _i < _len; _i++) {
        item = response[_i];
        item[this.statSet] = this.filterByHeaders(item[this.statSet]);
      }
      this.update(response);
      return response;
    };

    RowChart.prototype.filterByHeaders = function(newData) {
      return _.pick(newData, this.columns);
    };

    RowChart.prototype.showComparison = function(newData) {
      var data;
      newData[this.statSet] = this.filterByHeaders(newData[this.statSet]);
      data = [this.data[0], newData];
      return this.update(data);
    };

    RowChart.prototype.orderBy = function(data) {};

    RowChart.prototype.update = function(data) {
      var item, key, stat, _ref,
        _this = this;
      if ((_ref = this.chartArea) != null) {
        _ref.remove();
      }
      this.chartArea = this.rowChart.append("svg:g");
      this.maxes = _.object([
        (function() {
          var _results;
          _results = [];
          for (stat in this.statAttrs) {
            _results.push(stat);
          }
          return _results;
        }).call(this)
      ][0]);
      for (key in data[0].populationStats) {
        this.maxes[key] = d3.max([
          (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              item = data[_i];
              _results.push(item.populationStats[key]);
            }
            return _results;
          })()
        ][0]);
      }
      this.barWidth = this.columnWidth - 70;
      for (stat in this.statAttrs) {
        this.statAttrs[stat]['scale'] = d3.scale.linear().domain([this.statAttrs[stat].domain[0], this.maxes[stat]]).range([0, this.barWidth]);
      }
      data.forEach(function(data, i) {
        var index, labelData, nodeLabel;
        index = i;
        if (_this.params.className === 'RowChart') {
          labelData = data.childregimen.toUpperCase().split(';');
          nodeLabel = _this.chartArea.append("svg:g").attr("class", "nodelabel").attr("transform", function(d, i) {
            return "translate(" + (_this.labelOffset - 20) + ", " + (index * _this.rowHeight + 39) + ")";
          });
          nodeLabel.selectAll("text").data(labelData).enter().append("svg:text").attr("text-anchor", "end").text(function(d, i) {
            return d;
          }).attr("x", function(d) {
            return -10;
          }).attr("dy", function(d, i) {
            if (i === 0) {
              return "0.25em";
            } else {
              return i + ".25em";
            }
          }).style('fill', _this.textColor);
        }
        data = [
          (function() {
            var _results;
            _results = [];
            for (key in data[this.statSet]) {
              _results.push([key, data[this.statSet][key]]);
            }
            return _results;
          }).call(_this)
        ][0];
        _this.bars = _this.chartArea.append('g').style('opacity', 0.0);
        _this.bars.selectAll('g').data(data).enter().append('svg:g').attr('class', 'container').attr("transform", function(d, i) {
          return "translate(" + (i * _this.columnWidth + _this.labelOffset) + ", " + (index * _this.rowHeight + _this.rowOffset) + ")";
        });
        _this.bars.selectAll('g').append('rect').style('fill', '#666').attr('x', 40).attr('y', 4).attr('height', 4).attr('width', _this.barWidth);
        _this.bars.selectAll('g').append('rect').style('fill', '#eee').attr('x', 40).attr('y', 4).attr('height', 4).attr('width', function(d) {
          return _this.statAttrs[d[0]].scale(d[1]);
        });
        _this.bars.selectAll('g').append("svg:text").attr("text-anchor", "end").text(function(d, i) {
          return _this.statAttrs[d[0]].format(d[1]);
        }).attr("x", 36).attr("dy", "1.0em").style('fill', '#ccc');
        return _this.bars.transition().duration(_this.params.duration).style('opacity', 1.0).delay(i * _this.params.secondaryDuration);
      });
    };

    return RowChart;

  })(Chart);

  FlowChart = (function(_super) {
    __extends(FlowChart, _super);

    function FlowChart(app, params) {
      var brush,
        _this = this;
      this.app = app;
      this.params = params;
      this.toggleAll = __bind(this.toggleAll, this);
      this.svg = d3.select("" + params.el).append("svg:svg");
      this.brushEl = this.svg.append("svg:g").attr('class', 'brush');
      brush = d3.svg.brush().x(d3.scale.linear().domain([0, this.params.width]).range([0, this.params.width])).y(d3.scale.linear().domain([this.params.height, 0]).range([this.params.height, 0])).on("brush", function() {
        _this.svg.select(".extent").style("visibility", "visible");
        _this.selected = _this.svg.selectAll("g.node");
        _this.selected.selectAll('.node');
        _this.selected[0] = _.filter(_this.selected[0], function(elem) {
          var ext0, ext1;
          ext0 = brush.extent()[0];
          ext1 = brush.extent()[1];
          return elem.__data__.y > ext0[0] && elem.__data__.y < ext1[0] && elem.__data__.x > ext0[1] && elem.__data__.x < ext1[1];
        });
        if (_this.selected[0].length) {
          d3.select("" + _this.params.el).selectAll(".node").style('opacity', 0.1);
          d3.select("" + _this.params.el).selectAll(".link").style('opacity', 0.05);
          return _this.selected.style('opacity', 1.0);
        } else {
          return d3.select("" + _this.params.el).selectAll(".node").style('opacity', 1.0);
        }
      }).on("brushend", function() {
        var data, elem;
        _this.svg.select(".extent").style("visibility", "hidden");
        _this.svg.select(".extent").attr("width", 0);
        if (_this.selected[0].length) {
          d3.select("" + _this.params.el).selectAll(".node").style('opacity', 1.0);
          d3.select("" + _this.params.el).selectAll(".link").style('opacity', 0.2);
          data = [
            (function() {
              var _i, _len, _ref, _results;
              _ref = this.selected[0];
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                elem = _ref[_i];
                _results.push(elem.__data__);
              }
              return _results;
            }).call(_this)
          ];
          _this.params.gridChartParams.data = data[0];
          _this.params.gridChartParams.svg = _this.svg;
          new window.TREATMENTFLOWS.charts[_this.params.gridChartParams.className](null, _this.params.gridChartParams);
        } else {
          d3.select("" + _this.params.el).selectAll(".node").style('opacity', 1.0);
        }
        brush.clear();
        return brush.empty();
      });
      this.brushEl.call(brush);
      this.columnWidth = (this.params.width - this.params.margins[1] - this.params.margins[3]) / 5;
      this.statSet = this.params.defaultStats;
      this.statAttrs = this.params.statAttrs;
      this.tree = d3.layout.tree().size([this.params.height, this.params.width]);
      this.treeChart = this.svg.attr("width", this.params.width + this.params.margins[1] + this.params.margins[3]).attr("height", this.params.height + this.params.margins[0] + this.params.margins[2]).append("svg:g").attr("transform", "translate(" + this.params.margins[3] + "," + this.params.margins[0] + ")");
      this.diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.y, d.x];
      });
      /*
      this.legend = this.svg.append("svg:g").attr("transform", "translate(" + (this.params.margins[3] + 4) + "," + this.params.margins[0] + ")");
      this.legendElems = this.legend.selectAll('g').data(this.params.colors).enter().append('svg:g').attr("transform", function(d, i) {
        return "translate(" + (i * 68) + ",10)";
      });
      this.legendElems.append('svg:circle').attr('r', 8).attr('cy', -5).style('fill', function(d) {
        return d;
      });
      this.legendElems.append('text').text(function(d, i) {
        if (i === 0) {
          return (i + 1) + ' drug';
        }
        return (i + 1) + ' drugs';
      }).attr('x', 11);
*/
      FlowChart.__super__.constructor.call(this, this.params);
    }

    FlowChart.prototype.handleResponse = function(response) {
      this.i = 0;
      this.root = response;
      this.root.x0 = this.params.height / 2;
      this.root.y0 = this.params.width - 60;
      this.root.children.forEach(this.toggleAll);
      return this.update(this.root);
    };

    FlowChart.prototype.toggleAll = function(d) {
      if (d.children) {
        d.children.forEach(this.toggleAll);
        return this.toggle(d);
      }
    };

    FlowChart.prototype.toggle = function(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    };

    FlowChart.prototype.render = function() {
      return FlowChart.__super__.render.apply(this, arguments);
    };

    FlowChart.prototype.update = function(source) {
      var colorScale, duration, link, node, nodeEnter, nodeExit, nodeUpdate, nodes, rScale,
        _this = this;
      if (source.children) {
        rScale = d3.scale.linear().domain(d3.extent(this.statAttrs[this.params.sizeAttr].domain)).range([100, 10000]);
        colorScale = d3.scale.linear().domain(this.statAttrs[this.params.colorAttr].domain).range(this.params.colors);
        source.children.sort(function(a, b) {
          return b[_this.params.rankAttr] - a[_this.params.rankAttr];
        });
      }
      duration = 400;
      nodes = this.tree.nodes(this.root).reverse();
      nodes.forEach(function(d) {
        var parentValue;
        d.y = _this.params.width - (d.depth * _this.columnWidth) - 60;
        if (_this.params.sizeAttr === 'populationpercent') {
          parentValue = d.parent && d.parent["sizeAttr"] ? d.parent["sizeAttr"] : 1.0;
          return d["sizeAttr"] = parseFloat(d[_this.params.sizeAttr]) * parentValue;
        } else {
          return d["sizeAttr"] = d[_this.params.sizeAttr];
        }
      });
      node = this.treeChart.selectAll("g.node").data(nodes, function(d) {
        return d.id || (d.id = ++_this.i);
      });
      nodeEnter = node.enter().append("svg:g").attr("class", "node").attr("id", function(d) {
        return "node_" + d.id;
      }).attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      }).on("mousedown", function(d) {
        event.stopPropagation();
        if (_this.mediator) {
          _this.mediator.broadcast(d, _this.params.id, _this.params.mediator.target, 'mouseout');
        }
        _this.toggle(d);
        return _this.update(d);
      }).on("mouseout", function(d) {
        if (_this.mediator) {
          return _this.mediator.broadcast(d, _this.params.id, _this.params.mediator.target, 'mouseout');
        }
        
        d3.select("#{@params.el}").selectAll(".node")
          .style('opacity', 1.0)
        
        d3.select("#{@params.el}").selectAll(".link")
          .style('opacity', 0.2)
        

      }).on("mouseover", function(d) {
        if (_this.mediator) {
          return _this.mediator.broadcast(d, _this.params.id, _this.params.mediator.target, 'mouseover');
        }
        
        d3.select("#{@params.el}").selectAll(".node")
          .style('opacity', 0.05)
        d3.select("#{@params.el}").selectAll(".link")
          .style('opacity', 0.05)
        
        d3.select("#{@params.el}").selectAll("#node_#{d.id}")
          .style('opacity', 1.0)
        

      });
      nodeEnter.append("svg:circle").style("fill", function(d) {
        return colorScale(d[_this.params.colorAttr]);
      }).attr("id", function(d) {
        return "circle_" + d.id;
      }).attr("r", function(d) {
        if (d.parentid !== 'ROOT') {
          return Math.sqrt(rScale(d["sizeAttr"])) / Math.PI;
        }
        return 0;
      }).style("stroke-width", 0);
      nodeEnter.each(function(d) {
        var labelData, nodeLabel;
        labelData = d.childregimen.split(';');
        nodeLabel = _this.treeChart.select('#node_' + d.id).append("svg:g").attr("class", function(d) {
          if (d.parentid !== 'ROOT') {
            return "nodelabel";
          }
          return "rootnodelabel";
        }).attr("id", "label_" + d.id);
        nodeLabel.selectAll("text").data(labelData).enter().append("svg:text").attr("text-anchor", "end").text(function(d, i) {
          return d;
        }).attr("x", function(d) {
          return -38;
        }).attr("dy", function(d, i) {
          if (i === 0) {
            return "0.25em";
          } else {
            return i + ".25em";
          }
        });
        return nodeLabel.append("svg:text").attr("x", function(d) {
          return -8;
        }).attr("dy", ".25em").attr("text-anchor", "end").text(function(d) {
          if (d.parentid !== 'ROOT') {
            return _this.statAttrs["populationpercent"].format(d['populationpercent']);
          }
          return "";
        });
      });
      nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
      nodeUpdate.select("text").style("fill-opacity", 1);
      nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      }).remove();
      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);
      link = this.treeChart.selectAll("path.link").data(this.tree.links(nodes), function(d) {
        return d.target.id;
      });
      link.enter().insert("svg:path", "g").attr("class", "link").style("stroke", function(d) {
        return colorScale(d['target'][_this.params.colorAttr]);
      }).attr("stroke-width", function(d) {
        return Math.sqrt(rScale(d['target']["sizeAttr"])) / Math.PI * 2.0;
      }).attr("id", function(d) {
        return "link_" + d.target.id;
      }).attr("d", function(d) {
        var o;
        o = {
          x: source.x0,
          y: source.y0
        };
        return _this.diagonal({
          source: o,
          target: o
        });
      }).transition().duration(duration).attr("d", this.diagonal);
      link.transition().duration(duration).attr("d", this.diagonal);
      link.exit().transition().duration(duration).attr("d", function(d) {
        var o;
        o = {
          x: source.x,
          y: source.y
        };
        return _this.diagonal({
          source: o,
          target: o
        });
      }).remove();
      nodes.forEach(function(d) {
        d.x0 = d.x;
        return d.y0 = d.y;
      });
    };

    return FlowChart;

  })(Chart);

  GridChart = (function(_super) {
    __extends(GridChart, _super);

    function GridChart(app, params) {
      this.app = app;
      this.params = params;
      this.statAttrs = this.params.statAttrs;
      GridChart.__super__.constructor.call(this, null, this.params);
      this.prep(this.data);
    }

    GridChart.prototype.orderBy = function(data) {
      var node,
        _this = this;
      data.forEach(function(d, i) {
        return d.newx = i * 50 + _this.rowOffset + 8;
      });
      node = this.rowChart.selectAll("g.node").data(data, function(d) {
        return d.id;
      });
      return node.transition().duration(500).attr("transform", function(d) {
        return "translate(230," + d.newx + ")";
      });
    };

    GridChart.prototype.prep = function(data) {
      var colorScale, duration, node, nodeEnter, nodeExit, nodeUpdate, rScale,
        _this = this;
      d3.selectAll('.brush').style('display', 'none');
      this.container.select('#background')
      .attr("width", this.params.width - this.params.margins[1] - this.params.margins[3]);
      
      this.container.append("svg:text")
        .attr("text-anchor", "Start")
        .text('Patients who switched to Metformin + SU + Januvia')
        .style('font-size', 18)
        .style('font-weight', 800)
        .attr("x", 50)
        .attr("y", 47)
        .style('fill', '#fff')

      this.close = this.container.append("svg:text").attr("text-anchor", "end")
        .text('close')
        .style('font-size', 11)
        .attr("x", this.params.width - this.params.margins[1] - this.params.margins[3] - 30)
        .attr("y", 42)
        .style('fill', '#ccc').on('mousedown', function() {
        d3.selectAll('.brush').style('display', 'inline');
        return _this.container.remove();
      }).style('cursor', 'pointer');
      
      this.i = 0;
      rScale = d3.scale.linear().domain(d3.extent(this.statAttrs[this.params.sizeAttr].domain)).range([100, 10000]);
      colorScale = d3.scale.linear().domain(this.statAttrs[this.params.colorAttr].domain).range(this.params.colors);
      data.sort(function(a, b) {
        return b[_this.params.rankAttr] - a[_this.params.rankAttr];
      });
      duration = 600;
      node = this.rowChart.selectAll("g.node").data(data, function(d) {
        return d.id || (d.id = ++_this.i);
      });
      data.forEach(function(d, i) {
        if (!d["sizeAttr"]) {
          d["sizeAttr"] = 0.0;
        }
        return d.newx = i * 50 + _this.rowOffset + 8;
      });
      nodeEnter = node.enter().append("svg:g").attr("class", "node").attr("id", function(d) {
        return "node_" + d.id;
      }).attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
      });
      nodeEnter.append("svg:circle").style("fill", function(d) {
        return colorScale(d[_this.params.colorAttr]);
      }).style('stroke-width', 0).style('stroke', '#ccc').attr("id", function(d) {
        return "circle_" + d.id;
      }).attr("r", function(d) {
        if (d["sizeAttr"] !== 0.0) {
          return Math.sqrt(rScale(d["sizeAttr"])) / Math.PI;
        }
        return 0;
      });
      nodeEnter.each(function(d) {
        var color, labelData, nodeLabel;
        labelData = d.childregimen.split(';');
        color = d[_this.params.colorAttr] ? colorScale(d[_this.params.colorAttr]) : '#fff';
        nodeLabel = _this.rowChart
          .select('#node_' + d.id)
          .append("svg:g")
          .attr("class", "nodelabel")
          .attr("id", "label_" + d.id);
        nodeLabel
          .selectAll("text")
          .data(labelData)
          .enter()
          .append("svg:text")
          .attr("text-anchor", "start")
          .text(function(d, i) {
          return d;
        }).attr("x", function(d, i) {
          return -100;
        }).attr("dy", function(d, i) {
          if (i === 0) {
            return "0.25em";
          } else {
            return i + ".25em";
          }
        }).style("fill", color);
        return nodeLabel.append("svg:text").attr("x", function(d) {
          return -110;
        }).attr("dy", ".25em").attr("text-anchor", "end").text(function(d) {
          if (d['populationpercent'] != null) {
            return _this.statAttrs["populationpercent"].format(d['populationpercent']);
          }
          return "";
        }).style('fill', color);
      });
      nodeUpdate = node.transition().duration(duration).attr("transform", function(d) {
        if (d.childregimen == 'ALL DIABETICS') {
          d3.select(this).attr('opacity', 0);
          return "translate(230, 58)";
        }
        return "translate(230," + d.newx + ")";
      });
      node.transition().delay(duration).duration(duration).attr("opacity", 1);

      nodeUpdate.select("circle").attr("cx", -165);
      nodeExit = node.exit().transition().duration(duration).attr("transform", function(d) {
        return "translate(" + source.y + "," + source.x + ")";
      }).remove();
      nodeExit.select("circle").attr("r", 1e-6);
      nodeExit.select("text").style("fill-opacity", 1e-6);
    };

    return GridChart;

  })(RowChart);

  mediators = {};

  Mediator = (function() {
    function Mediator(params, source) {
      if (this.elems == null) {
        this.elems = {};
      }
    }

    Mediator.prototype.register = function(params, source) {
      return this.elems[source.params.id] = {
        source: source,
        target: params.target,
        callback: params.callback
      };
    };

    Mediator.prototype.broadcast = function(data, from, to, eventType) {
      var source, target;
      if (to) {
        source = this.elems[from];
        target = this.elems[to];
        return source.callback(source.source, target.source, data, eventType);
      }
    };

    return Mediator;

  })();

  if (window.TREATMENTFLOWS == null) {
    window.TREATMENTFLOWS = {};
  }

  window.TREATMENTFLOWS.charts = {
    FlowChart: FlowChart,
    RowChart: RowChart,
    Mediator: Mediator,
    GridChart: GridChart
  };

  window.TREATMENTFLOWS.data = {
    'data.json': data,
    'benchmark.json': benchmark
  };

}).call(this);
