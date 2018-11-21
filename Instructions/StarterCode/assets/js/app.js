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
        // d.abbr = d.abbr
        // d.obesity = d.obesity
        console.log(d.poverty);
        console.log(d.obesity);
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
    .call(yAxis);

    // creat a veriable adds <text> element away from the <circle> element 
    var circlesGroup = chartGroup.selectAll("g theCircles")
    .data(Data).enter();

    // Append a circles in the scater
    circlesGroup
        .append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx",d => xScale(d.poverty))
        .attr("cy",d => yScale(d.healthcare))
        .style("fill", "lightblue")


    // Create the "mouse_over" event listeners with transitions
        .on("mouseover", function(d) {
            tip.show(d, this)
        })

    // Create "mouse_out" event listener to hide tooltip
        .on("mouseout", function(d) {
            tip.hide(d, this)
        });

    // Create "mouseover" event listener to display tooltip
    var tip = d3.tip()
        .attr("class","d3-tip")
        .offset([-10,0])
        .html(function(d) 
        {return `<h6>${(d.state)}</h6><h6>Poverty: ${(d.poverty)}%</h6><h6>Obesity: ${d.obesity}%</h6>`})
    svg.call(tip);

    // Add the abbr data in side the circles   
    circlesGroup
        .append("text")
        .text(function(d) { return d.abbr})
        .attr("class", "stateText")
        .attr("font-size", 10)
        .attr("dx",d => xScale(d.poverty))
        .attr("dy", d => yScale(d.healthcare) + 4);

    // Creat the X lable
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 40})`)
        .classed("xlabel", true)
        .text("In Poverty (%)");
    

    // Creat the Y lable
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (chartHeight / 2))
        .attr("dy", "15px")
        .style("text-anchor", "middle")
        .text("Lacks Healthcare (%)"); 

});
