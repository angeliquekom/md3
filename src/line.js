export function line(svg, config) {

  let defs = svg.svg.append("defs");

  // black drop shadow
  let filter = defs.append("filter")
      .attr("id", "drop-shadow")
  filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 2)
      .attr("result", "blur");
  filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 4)
      .attr("dy", 4)
      .attr("result", "offsetBlur");

  var feMerge = filter.append("feMerge");

  feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
  feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

  // set the ranges
  let x = d3.scaleLinear().range([0, svg.width]);
  let y = d3.scaleLinear().range([svg.height, 0]);

  // Add the X Axis
  svg.svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + svg.height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

  svg.svg.selectAll(".axis")
      .selectAll("path")
      .style("stroke", "rgba(0,0,0,0)")

  svg.svg.selectAll(".axis")
      .selectAll("line")
      .style("stroke", "rgba(0,0,0,0)");

  svg.svg.selectAll(".axis")
      .selectAll("text")
      .style("font-weight", "700")
      .style("font-family", "Roboto")
      .style("fill", "white");

      // add the Y gridlines
  svg.svg.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
          .tickSize(-svg.width)
          .tickFormat("")
      )

  // define the line
  let valueline = d3.line()
      .curve(d3.curveNatural)
      .x(function(d) { return x(d.x); })
      .y(function(d) { return y(d.y); });

  // define the area
  let area = d3.area()
    .curve(d3.curveNatural)
    .x(function(d) { return x(d.x); })
    .y0(svg.height)
    .y1(function(d) { return y(d.y); });

  // Scale the range of the config.values
  x.domain(d3.extent(config.values, function(d) { return d.x; }));
  y.domain([0, d3.max(config.values, function(d) { return d.y; })]);

  // Add the valueline path.
  svg.svg.append("path")
      .data([config.values])
      .style("fill", "none")
      .style("stroke", config.styles.line.color ? config.styles.line.color : "black")
      .style("stroke-width", 1)
      .style("filter", "url(#drop-shadow)")
      .attr("d", valueline);

  svg.svg.append("path")
        .datum(config.values)
        .style("fill", config.styles.line.background ? config.styles.line.background : "black")
        .attr("d", area)
        .style("filter", "url(#drop-shadow)");

      // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(x)
            .ticks(5)
    }
    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(y)
            .ticks(5)
    }
  // Add the scatterplot
  svg.svg.selectAll("dot")
      .data(config.values)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .style("stroke-width", 1)
      .style("stroke", config.styles.line.color ? config.styles.line.color : "black")
      .style("fill", config.styles.line.color ? config.styles.line.color : "black");
}
