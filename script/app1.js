
var margin = {top: 60, right: 100, bottom: 20, left: 80},
  width = 850 - margin.left - margin.right,
  height = 370 - margin.top - margin.bottom;


// Set the ranges
var x = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

var y = d3.scaleLinear()
  .rangeRound([height, 0]); 

var svg = d3.select("#graph")
        .append("svg")
        .style("width", width + margin.left + margin.right + "px")
        .style("height", height + margin.top + margin.bottom + "px")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "svg");

// Create the svg canvas in the "graph" div
//Grafico principal que aparece por defecto

//Enter selecction
createMainChart = () => {
d3.json("https://www.datos.gov.co/resource/t8qq-kx9s.json").then(function(data) {
  console.log(data);
   data.forEach(function(d) {
   d.animales = d.animales;
     d.cuarentenas = +d.cuarentenas;
     d.lugar = d.lugar;
     d.procedencia = d.procedencia;
     
     })
 var nest = d3.nest()
    .key(function(d){
      return d.animales;
    })
    

    .rollup(function(leaves){
      return d3.sum(leaves, function(d) {return (d.cuarentenas)});
    })
    .entries(data)
  console.log(nest) 


    nest.sort(function(a, b) {
        return b.value - a.value;
      });

 // Scale the range of the data
  x.domain(nest.map(function(d) { return d.key; }));
  y.domain([0, d3.max(nest, function(d) { return d.value; })]);


  // Set up2 the x axis
  svg.html("");
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          //.ticks(d3.timeMonth)
          .tickSize(0, 0)
          //.tickFormat(d3.timeFormat("%B"))
          .tickSizeInner(0)
          .tickPadding(10));
  
   // Add the Y Axis
   var yaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y)
          .ticks(5)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));



svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Annual Sales")
        .attr("class", "y axis label");
  
  // Draw the bars
  svg.selectAll(".rect")
      .data(nest)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        ; 


});   
}





//Graficos secundarios aparecen cuando se de click



function updateGrap(value) {
d3.json("https://www.datos.gov.co/resource/t8qq-kx9s.json").then(function(data) {
  console.log(data);
   data.forEach(function(d) {
   d.animales = d.animales;
     d.cuarentenas = +d.cuarentenas;
     d.lugar = d.lugar;
     d.procedencia = d.procedencia;
     
     })

svg.html("");

 var data=data.filter(d => d.animales==value) 
 var nest = d3.nest()
    .key(function(d){
      return d.procedencia;
    })
    
    .rollup(function(leaves){
      return d3.sum(leaves, function(d) {return (d.cuarentenas)});
    })
    .entries(data)
    console.log(nest) 

    nest.sort(function(a, b) {
        return b.value - a.value;
      });


 // Scale the range of the data
  x.domain(nest.map(function(d) { return d.key; }));
  y.domain([0, d3.max(nest, function(d) { return d.value; })]);



 // Set up the x axis
  var xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")
       .call(d3.axisBottom(x)
          //.ticks(d3.timeMonth)
          .tickSize(0, 0)
          //.tickFormat(d3.timeFormat("%B"))
          .tickSizeInner(0)
          .tickPadding(10));
  
   // Add the Y Axis
   var yaxis = svg.append("g")
       .attr("class", "y axis")
       .call(d3.axisLeft(y)
          .ticks(5)
          .tickSizeInner(0)
          .tickPadding(6)
          .tickSize(0, 0));



    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 60)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Cuarentenas")
        .attr("class", "y axis label")
        ;
  
  // Draw the bars
  svg.selectAll(".rect")
      .data(nest)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); });

});   

}










createMainChart();






