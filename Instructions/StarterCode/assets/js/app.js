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



// Import data from the donuts.csv file
d3.csv("/assets/data/data.csv").then(function(Data, error){
    if (error) return console.warn(error);
  
    //console.log(Data);
    Data.forEach(d => {
        d.poverty = +d.poverty
        d.healthcare = +d.healthcare
        //console.log(d.poverty);
        //console.log(d.healthcare);
    });

    // Create Scales
    var xScale = d3.scaleLinear()
        .domain(d3.extent(Data,d => d.poverty))
        .range([0, chartWidth]);

    var yScale = d3.scaleLinear()
        .domain(0, d3.max(Data,d => d.healthcare))
        .range([chartHeight, 0]);

    // Create Axes
    var bottomAxis = d3.axisBottom(xScale)//.tickFormat();
    var leftAxis = d3.axisLeft(yScale);
   
    // Append the axes to the chartGroup
    // Add bottomAxis
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    // Add rightAxis to the right side of the display
    chartGroup.append("g")
    .attr("transform", `translate(${chartWidth}, 0)`)
    .call(leftAxis);

    // Append a path for line1
    chartGroup.selectAll(".dot")
        .data([Data]).enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .style("fill", "red") 



    
}); 


