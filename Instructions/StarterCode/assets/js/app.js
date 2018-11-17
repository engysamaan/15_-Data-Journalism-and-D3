// @TODO: YOUR CODE HERE!


// svg params
var svgHeight = 500;
var svgWidth = 960 ;

// margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    };
// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


// create an SVG element
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// Import data from the donuts.csv file
d3.csv("/assets/data/data.csv").then(function(Data, error){
    if (error) return console.warn(error);
  
    //console.log(Data);
    Data.forEach(d => {
        d.poverty = +d.poverty
        d.healthcare = +d.healthcare
        d.abbr = d.abbr
        // console.log(d.poverty);
        // console.log(d.healthcare);
    });

    // Create Scales
    var xScale = d3.scaleLinear()
        .domain(d3.extent(Data,d => d.poverty))
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(Data,d => d.healthcare)])
        .range([chartHeight, 0]);

    // Create Axes
    var xAxis = d3.axisBottom(xScale)//.tickFormat();
    var yAxis = d3.axisLeft(yScale);
   
    // Append the axes to the chartGroup
    // Add bottomAxis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    // Add rightAxis to the right side of the display
    chartGroup.append("g")
    // .attr("transform", `translate(${chartWidth}, 0)`)
    .call(yAxis);

    var circles = chartGroup.selectAll("g theCircles").data(Data).enter();
    // Append a path for line1
    circlesGroup = circles
        .append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx",d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .style("fill", "lightblue")

        .on("mouseover", function(d) {
            tip.show(d, this);
          })
        // Step 3: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
            tip.hide(d);
        });

    circles
        .append("text")
        .text(function(d) { return d.abbr})
        .attr("class", "stateText")
        .attr("font-size", 10)
        .attr("dx",d => xScale(d.poverty))
        .attr("dy", d => yScale(d.healthcare) + 4);


// // Step 1: Append tooltip div
//     var toolTip = d3.select("circle")
//         .append("div")
//         .classed("tooltip", true);


// Create the event listeners with transitions

    // // Step 2: Create "mouseover" event listener to display tooltip

    var tip = d3.tip()
        .attr("class","d3-tip")
        .offset([-10,0])
        .html(function(d) {return `<strong>${(d.poverty)}</strong><hr><strong>${d.healthcare}</strong>`})
    svg.call(tip);
    

});
