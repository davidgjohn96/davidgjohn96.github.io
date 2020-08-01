//SECOND SCENE
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


// append the svg object to the body of the page

var svg = d3.select("#fuelefficiency_viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")             
.attr("transform",
      "translate(" + (width/2) + " ," + 
                      (height + margin.top + 20) + ")")
.style("text-anchor", "middle")
.text("Average City MPG");

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Average Highway MPG"); 

//Read the data
d3.csv("https://flunky.github.io/cars2017.csv", function(data) {
    
  // Add X axis
  var x = d3.scaleLinear()
    .domain([5, 50 ])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([5, 50 ])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add a scale for bubble size
  var z = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.EngineCylinders }) ])
    .range([ 1, 40]);
//tool tip
    var tooltip = d3.select("#fuelefficiency_viz")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Model: " + d.Make + "<br />Cylinders: " + d.EngineCylinders)
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }
   
  var pallete = ['blue','yellow','green','pink']

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.AverageCityMPG); } )
      .attr("cy", function (d) { return y(d.AverageHighwayMPG); } )
      .attr("r", function (d) { return z(d.EngineCylinders); } )
      .style("fill", "#bc5090")
      //.style("fill", function (d) { return x(d.AverageCityMPG); })
      .style("opacity", "0.7")
      .attr("stroke", "black")
      .on("mouseover", showTooltip )
      .on("mousemove", moveTooltip )
      .on("mouseleave", hideTooltip )
      
})
