export function donut(svg, config) {

  d3.select("#" + config.elementId).select("svg").select("g")
    .attr("transform",
        "translate(" + (svg.width / 2) + "," + (svg.height / 2) + ")");

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

  let radius = Math.min(svg.width, svg.height) / 2;

  let donutWidth = 75;                            // NEW

  let color = d3.scaleOrdinal(d3.schemeCategory20b);

  let arc = d3.arc()
    .innerRadius(radius - donutWidth)             // UPDATED
    .outerRadius(radius);

  let pie = d3.pie()
    .value(function(d) { return d.y; })
    .sort(null);

  let path = svg.svg.selectAll('path')
    .data(pie(config.values))
    .enter()
    .append('path')
    .attr('d', arc)
    .style("filter", "url(#drop-shadow)")
    .attr('fill', function(d, i) {
      return color(d.data.x);
    });

}
