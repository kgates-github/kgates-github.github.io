(function() {
  var Application;

  $(function() {
    var app, bubbleRange, headerText, qualitativeColors, statAttrs, updateTooltip, views;
    updateTooltip = function(source, target, data, eventType) {
      /*
      var visibility, y;
      target.showComparison(data);
      y = d3.mouse(document.body)[1] - target.params.height - 20;
      d3.select("" + target.params.el).style('top', y + 'px');
      visibility = eventType === 'mouseover' ? 'visible' : 'hidden';
      return d3.select("" + target.params.el).style('visibility', visibility);
      */
    };
    qualitativeColors = ['#999', '#14a4ec', '#6be2c3', '#9966CC', '#e61e19'];
    bubbleRange = [100, 8000];
    statAttrs = {
      "averagea1c": {
        domain: [0, 10],
        format: d3.format('.2f')
      },
      "averagehdl": {
        domain: [0, 130],
        format: d3.format('.2f')
      },
      "averageldl": {
        domain: [0, 190],
        format: d3.format('.2f')
      },
      "averageage": {
        domain: [0, 90],
        format: d3.format('.1f')
      },
      "averagebmi": {
        domain: [0, 120],
        format: d3.format('.1f')
      },
      "avgdiagnosiscount": {
        domain: [1, 15],
        format: d3.format('.1f')
      },
      "percentmale": {
        domain: [0, 1],
        format: d3.format('.1%')
      },
      "populationpercent": {
        domain: [0, 0.16],
        format: d3.format('.0%')
      },
      "avgchildlength": {
        domain: [30, 350],
        format: d3.format('0f')
      },
      "avgparentlength": {
        domain: [30, 350],
        format: d3.format('0f')
      },
      "drugcount": {
        domain: [1, 2, 3, 4, 5],
        format: d3.format('0f')
      },
      "a1catgoal": {
        domain: [0, 0.6],
        format: d3.format('.1%')
      },
      "avgvisitcount": {
        domain: [0, 30],
        format: d3.format('0f')
      }
    };
    headerText = {
      "averageage": "Average age",
      "percentmale": "Sex (% male)",
      "averagebmi": "Average BMI",
      "averagea1c": "Average A1C",
      "a1catgoal": "A1C at goal (%)",
      "avgvisitcount": "Visits 12 months"
    };
    views = [
      {
        id: 'FlowChart1',
        el: '#flowChart',
        defaultStats: 'populationStats',
        width: 1000,
        height: 800,
        margins: [10, 20, 10, 20],
        url: 'data.json',
        className: 'FlowChart',
        statAttrs: statAttrs,
        colors: qualitativeColors,
        sizeRange: bubbleRange,
        rankAttr: 'populationpercent',
        sizeAttr: 'populationpercent',
        colorAttr: 'drugcount',
        mediator: {
          id: 'crossChartUpdate',
          target: 'RowChart1',
          callback: updateTooltip
        },
        gridChartParams: {
          id: 'GridChart1',
          defaultStats: 'populationStats',
          headerText: headerText,
          width: 1000,
          height: 800,
          margins: [50, 10, 10, 10],
          labelOffset: 240,
          rowHeight: 50,
          rowOffset: 50,
          duration: 500,
          secondaryDuration: 70,
          url: 'benchmark.json',
          className: 'GridChart',
          statAttrs: statAttrs,
          colors: qualitativeColors,
          sizeRange: bubbleRange,
          rankAttr: 'populationpercent',
          sizeAttr: 'populationpercent',
          colorAttr: 'drugcount'
        }
      }, {
        id: 'RowChart1',
        el: '#rowChart',
        defaultStats: 'populationStats',
        headerText: headerText,
        width: 1000,
        height: 150,
        margins: [10, 10, 10, 10],
        labelOffset: 170,
        rowHeight: 30,
        rowOffset: 30,
        duration: 0,
        secondaryDuration: 0,
        url: 'benchmark.json',
        className: 'RowChart',
        statAttrs: statAttrs,
        mediator: {
          id: 'crossChartUpdate',
          target: 'FlowChart1',
          callback: updateTooltip
        }
      }
    ];
    return app = new Application(views);
  });

  Application = (function() {
    function Application(views) {
      var view, _i, _len;
      this.charts = {};
      for (_i = 0, _len = views.length; _i < _len; _i++) {
        view = views[_i];
        this.charts[view.id] = new window.TREATMENTFLOWS.charts[view.className](this, view);
      }
    }

    return Application;

  })();

}).call(this);
