// var matrix = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16]
// ];

// let tr = d3.select('body')
//     .append('table')
//     .selectAll('tr')
//     .data(matrix)
//     .enter()
//     .append('tr')

// let td = d3.selectAll('tr')
//     .selectAll('td')
//     .data(function(d){
//         console.log(d);
//         return d
//     })
//     .enter()
//     .append('td')
//     .text(function(d) {
//         return d
//     })

// let svg = d3.select('div').append('svg')

// let bar1 = svg.append('rect').attr('height', 15).attr('width', 50).attr("fill", "blue").attr("x", 50).attr("y", 20)

// let bar2 = svg.append('rect').attr('height', 30).attr('width', 50).attr("fill", "pink").attr("x", 100).attr("y", 20)

// let bar3 = svg.append('rect').attr('height', 20).attr('width', 50).attr("fill", "red").attr("x", 150).attr("y", 20)



// let data = [{
//     "name": "Jon",
//     "age": 30,
//     "location": "The Wall"
// },
// {
//     "name": "Arya",
//     "age": 12,
//     "location": "Braavos"
// },
// {
//     "name": "Cersei",
//     "age": 42,
//     "location": "Kings Landing"
// },
// {
//     "name": "Tyrion",
//     "age": 40,
//     "location": "Kings Landing "
// }]

//     let faces = d3.select('div')
//     .selectAll('p')
//     .data(data)
//     .enter()
//     .append('p')
//     .text(function(d){
//         return d.name + ''+ d.age
//     })

// let width = 1000;
// let height = 500;

// let data = [10, 15, 20, 25, 30];
// let colors = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];

// let svg = d3.select('div')
//     .append('svg') 
//     .attr('width', width)
//     .attr('height', height)


// let circle = svg.selectAll('g')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('transform', 'translate(20,0)')
 

// circle.append('circle')
//     .attr('r', function(d){
//         return d*2
//     })
//     .attr('cx', function(d,i){
//         return i*150
//     })
//     .attr('cy', 100)
//     .attr('fill', function(d,i){
//         return colors[i]
//     })

//     circle.append('text')
//     .attr('x', function(d,i){
//         return i*145;
//     })
//     .attr('y',100)
//     .attr('font-size','12px')
//     .attr('font-family','sans-serif')
//     .attr('stroke','teal')
//     .text(function(d){
//         return d
//     })


// var width = 500
// var height = 500;

// var data = [150, 200, 300, 100, 250];
// var color = ['#ffffcc','#c2e699','#78c679','#31a354','#006837']

// var scale = d3.scaleLinear()
//             .domain([d3.min(data),d3.max(data)])
//             .range([50,200])

//             var scaled = d3.scaleLinear()
//             .domain([d3.min(data),d3.max(data)])
//             .range([0,200])

// var svg = d3.select('div')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height)


 

// var g = svg.selectAll('g')
//         .data(data)
//         .enter()
//         .append('g')
        

// var rect = g.append('rect')
//         .attr('height', function(d,i){
//             return scale(d)
//         })
//         .attr('width', scale(100))
//         .attr('y', (d,i) => {
//             return height - scale(d) - height/2
//         })
//         .attr('x', function(d,i){
//             return i*scale(100)
//         })
//         .attr('class', 'bar')
//         .attr('fill', (d,i) => {
//             return color[i]
//         })

// var xaxis = d3.axisBottom()
//         .scale(scaled)

// var axe = svg.append('g')
// .attr('transform', 'translate(0,'+height/2+')')

//         .call(xaxis);

// var width = 400,
// height = 400;

// var data = [10, 15, 20, 25, 30];

// let svg = d3.select('body')
//             .select('#my-id')
//             .append('svg')
//             .attr('width',width)
//             .attr('height',height)

// let xScale  = d3.scaleLinear()
//                 .domain([0,d3.max(data)])
//                 .range([0,width-100])

// let yScale = d3.scaleLinear()
//                 .domain([0,d3.max(data)])
//                 .range([height/2,0])

// let xAxis = d3.axisBottom()
//               .scale(xScale)

// let yAxis = d3.axisLeft()
//               .scale(yScale)

// let g1 = svg.append('g')
//         .attr('transform', 'translate(20,20)')
//         .call(yAxis)

// let g2 = svg.append('g')
//         .attr('transform', 'translate(20,220)')
//         .call(xAxis)

// Data Visualization for Predot Stocks

const data = [
                [2011, 40],
                [2012, 50],
                [2013, 65],
                [2014, 50],
                [2015, 75],
                [2016, 80]
            ]

let width = 700
let height = 500
let margin = 100
let h = height - margin
let w = width - margin


// SVG created
let svg = d3.select('#bar-chart').append('svg').attr('width',width).attr('height',height)

//General group container for elements
let g = svg.append('g')

// Scale for x-axis
let xScale = d3.scaleBand()
                .range([0, w])
                .padding(0.4) 
                .domain(data.map(function(d) { return d[0]; }))

// Scale for y-axis
let yScale = d3.scaleLinear()
                .range([h,0])
                .domain([0,d3.max(data, function(d) { return d[1] })])

// Scale for bars
let scaled = d3.scaleLinear()
                .range([200,h])
                .domain([d3.min(data, function(d) { return d[1] }),d3.max(data, function(d) { return d[1] })])

//Added x-axis to chart
g.append('g')
    .attr('transform', 'translate('+margin+','+(h+50)+')')
    .call(d3.axisBottom(xScale))
    .append('text')
    .attr('y',margin/3)
    .attr('dx', w-20)
    .attr('stroke', 'black')
    .text('Years')
    
//Added y-axis to chart
g.append('g')
    .attr('transform', 'translate('+margin+',50)')
    .call(d3.axisLeft(yScale))
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y',-margin/3)
    .attr('dx', 0)
    .attr('stroke', 'black')
    .text('Price of Stock ($)')

//Added chart label to chart
g.append('text')
    .attr('x', w/2)
    .attr('y', 20)
    .attr('stroke', 'black')
    .text('Predot Stocks Across Six (6) Years')


//Added bars to chart
g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    // .on('mouseover', onMouseOver)
    // .on('mouseout', onMouseOut)
    .attr('x', (d,i)=>{ return xScale(d[0])+margin})
    .attr('y', (d,i)=> { return h - scaled(d[1]) + 50} )
    .attr('width', xScale.bandwidth())
    .transition()
    .ease(d3.easeLinear)
    .duration(500)
    .delay(function (d, i) {
        return i * 40;
    })
    .attr('height',(d,i)=> { return scaled(d[1]) })



// function onMouseOver (d,i) {
//     d3.select(this).attr('class', 'highlighted');

//     g.append("text")
//     .attr('class', 'val') 
//     .attr('x', function(d,i) {
//         return xScale(d[0]);
//     })
//     .attr('y', function() {
//         return yScale(d[1]);
//     })
//     .text(function() {
//         return [ '$' +d[1]];  // Value of the text
//     })

// }

// function onMouseOut (d,i) {
//     d3.select(this).attr('class', 'bar');

// }
let stat = [6, 4, 8, 2, 10];
let food = ['Spaghetti', 'Rice', 'Yam', 'Beans', 'Noodles']


let sWidth = 500
let sHeight = 400
let radius = Math.min(sWidth, sHeight) / 2;

let color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', '#ff456a']);


let svge = d3.select('body')
            .select('#pie-chart')
            .append("svg")
            .attr('width',sWidth+100 )
            .attr('height', sHeight+100)

          
let gr = svge.append("g")
            .attr("transform", "translate(" + sWidth / 1.5 + "," + sHeight / 1.5 + ")");

let pie = d3.pie()

let arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

let label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 160);


let arcs = gr.selectAll(".arc")
            .data(pie(stat))
            .enter()
            .append("g")
            .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", function(d,i) { return color(i); });
        
        
    arcs.append("text")
        .attr("transform", function(d) { 
                 return "translate(" + label.centroid(d) + ")"; 
         })
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(function(d,i) { return food[i] })
      
            

    svge.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        .append("text")
        .text("Food Consumption for April 2021")
        .attr("class", "title")
