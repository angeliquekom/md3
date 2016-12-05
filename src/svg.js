export function svg(config) {

    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = document.getElementById(config.elementId).offsetWidth - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#" + config.elementId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background", config.styles.svg.background ? config.styles.svg.background : "white")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    return {
        svg,
        width,
        height,
        margin
    };
}
