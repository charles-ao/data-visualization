let width = 900
let height = 500
let padding = 50

const GDP_API_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
const COUNTRY_API_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
const EDUCATION_API_URL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
const CYCLIST_API_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'



let barChart = d3.select('body')
                .select('#bar-chart')
                .append('svg')
                .attr('width', width)
                .attr('height', height)

let choropleth = d3.select('body')
                .select('#choropleth')
                .append('svg')
                .attr('width', (width+100))
                .attr('height', (height+100))

let scatterPlot = d3.select('body')
                .select('#scatterplot')
                .append('svg')
                .attr('width', width)
                .attr('height', height)
    

d3.json(GDP_API_URL, function(error, param) {
    if (error) {
        return console.warn(error);
    }
    const data = param.data

    let xScale = d3.scaleBand()
                .range([0,width-(2*padding)])
                .domain((data.map(d => (d[0]).slice(0,4))))
                .padding(0.1)

    let yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d[1])])       
                .range([height-(2*padding),0]);

    let grpOne = barChart.append('g')
                .attr('transform','translate('+padding+','+padding+')')

    let tooltip = d3.select('#t-01')
                .style('visibility', 'hidden')

    grpOne.append('g')
        .call(d3.axisLeft(yScale).tickFormat(d=> '$'+d))
        .attr('id','y-axis')
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', padding/2)
        .attr('x', padding/10)
        .attr('stroke', 'black')
        .style('font-size','16px')
        .text('Gross Domestic Product')

    grpOne.append('g')
        .attr('transform', 'translate(0,'+(height-(2*padding))+')')
        .call(d3.axisBottom(xScale)
            .tickValues(xScale.domain()
                    .filter(function(d,i){ return !(i%5)})
                )
            )
        .attr('id','x-axis')
        .append('text')
        .attr('x',400)
        .attr('y', 40)
        .attr('stroke', 'black')
        .style('font-size','16px')
        .text('Years')
        
    grpOne.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect') 
        .attr('class', 'bar')
        .attr('data-date',d => d[0])
        .attr('data-gdp',d => d[1])
        .attr("x", d => xScale((d[0]).slice(0,4)))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d =>  (height-(2*padding)) - yScale(d[1]))

        .on('mouseover', (d) => {
            tooltip.transition()
                .style('visibility', 'visible')

            tooltip.text('Year: ' +d[0]+ ' GDP: $' + d[1] )

        })
        .on('mouseout', (d) => {
            tooltip.transition()
                .style('visibility', 'hidden')

        })

        .append('title')
        .attr('id','tooltip')
        .attr('data-date', d => d[0])
        .text(d => 'Year: ' +d[0]+ ', GDP: $' + d[1] )

    
});

d3.json(COUNTRY_API_URL, function(error, data){
    if(error) {
        console.log(error);
    } else {
        let color = ['#55a8ed','#5199d3','#3d74a0','#335e82']
        let colorText = ['< 15%','15% - 30%','30% - 45%','> 45%']
        let country = topojson.feature(data, data.objects.counties).features

        console.log(country);

        d3.json(EDUCATION_API_URL,function(error,data){
            if(error) {
                console.log(error);
            } else {
                let education = data

                let tooltip = d3.select('#t-02')
                    .style('visibility', 'hidden')
                    .style('height', '70px')

                choropleth.selectAll('path')
                    .data(country)
                    .enter()
                    .append('path')
                    .attr('d', d3.geoPath())
                    .attr('class', 'pattern')
                    .attr('fill', (d,i) =>{
                        let id = d['id']
                        let county = education.find(item=> item['fips'] === id)
                        let percentage = county['bachelorsOrHigher']
            
                        if(percentage <= 15) {
                            return color[0]
                        } else if(percentage <= 30) {
                            return color[1]
                        } else if (percentage <= 45) {
                            return color[2]
                        } else {
                            return color[3]
                        }
                    })

                    .on('mouseover', (d) => {
                        tooltip.transition()
                            .style('visibility', 'visible')
                            let id = d['id'];
                            let county = education.find((item) => item['fips'] === id)
                
                            tooltip.text(county['fips'] + ' - ' + county['area_name'] + ', ' +
                            county['state'] + ' : ' + county['bachelorsOrHigher'] + '%')
                    })
                    .on('mouseout', (d) => {
                        tooltip.transition()
                            .style('visibility', 'hidden')
                    })

                    .append('title')
                    .text((d)=>{
            
                        let id = d['id'];
                        let county = education.find((item) => item['fips'] === id)
            
                        return (county['fips'] + ' - ' + county['area_name'] + ', ' +
                        county['state'] + ' : ' + county['bachelorsOrHigher'] + '%')
            
                    })

                choropleth.selectAll('g')
                    .data(color)
                    .enter()
                    .append('g')
                    .append('rect')
                    .attr('x', 750)
                    .attr('y', (d,i)=>i*20)
                    .attr('width', 20)
                    .attr('height', 20)
                    .attr('fill', d=>d)

                choropleth.selectAll('g')
                    .data(colorText)
                    .append('text')
                    .attr('x', 780)
                    .attr('y', (d,i)=>(i*20)+15)
                    .style('font-size','12px')
                    .text(d=>d)
            }
        })

    }


})

d3.json(CYCLIST_API_URL, function(error, data) {
    if(error) {
        console.log(error);
    } else {

        let years = data.map(val => val['Year'])
        let seconds = data.map(val => val['Seconds'])
        
        let xScale =  d3.scaleLinear()
                        .domain([d3.min(years), d3.max(years)])
                        .range([0,width-(2*padding)])

        let yScale = d3.scaleLinear()
                        .domain([d3.min(seconds), d3.max(seconds)])
                        .range([height-(2*padding),0])
              

        let grpTwo = scatterPlot.append('g')
                        .attr('transform','translate('+(padding+20)+','+padding+')')

        let tooltip = d3.select('#t-03')
                        .style('visibility', 'hidden')
                        .style('width', 'auto')
                        .style('height', 'auto')

        grpTwo.append('g')
            .call(d3.axisLeft(yScale)
            .tickFormat(function(d){
                    let min = Math.floor(d/60);
                    let sec = d%60;
            
                    return min+":"+sec
                })
            )
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -45)
            .attr('x', -100)
            .attr('stroke', 'black')
            .style('font-size','14px')
            .text('Time in Minutes')    

        grpTwo.append('g')
            .attr('transform', 'translate(0,'+(height-(2*padding))+')')
            .call(d3.axisBottom(xScale)
                .tickFormat(d => d))
            .append('text')
            .attr('y', 40)
            .attr('x', 400)
            .attr('stroke', 'black')
            .style('font-size','14px')
            .text('Years') 

        grpTwo.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'pattern')

            .attr('r', 7)
            .attr('cx', (d,i) => xScale(d['Year']))
            .attr('cy', (d,i) => yScale(d['Seconds']))
            .attr('fill', (d,i) => {
                if(d['Doping'] === '') {
                    return 'seagreen'
                } else {
                    return 'steelblue'
                }
            })

            .on('mouseover', (d) => {
                tooltip.transition()
                    .style('visibility', 'visible')
    
                tooltip.text(`Name: ${d['Name']} Year: ${d['Year']}, Time: ${d['Time']}
                ${d['Doping']}
                `)
            })
            .on('mouseout', (item) => {
                tooltip.transition()
                    .style('visibility', 'hidden')
            })

            .append('title')
            .text((d,i) => {
                return `
                Name: ${d['Name']}
                Year: ${d['Year']}, Time: ${d['Time']}
                ${d['Doping']}
                `
            })
        
        let legend = grpTwo.append('g')

        legend.append('rect')
            .attr('transform', 'translate('+(width-(5.5*padding))+','+(height-(4*padding))+')')
            .attr('width',18)
            .attr('height',18)
            .attr('fill', 'steelblue') 

        legend.append('rect')
            .attr('transform', 'translate('+(width-(5.5*padding))+','+(height-(3.5*padding))+')')
            .attr('width',18)
            .attr('height',18)
            .attr('fill', 'seagreen') 

        legend.append('text')
            .attr('x', width-(5*padding))
            .attr('y', height-(3.7*padding))
            .attr('stroke', 'black')
            .style('font-size','12px')
            .text('Riders with Doping Allegations')

        
        legend.append('text')
            .attr('x', width-(5*padding))
            .attr('y', height-(3.2*padding))
            .attr('stroke', 'black')
            .style('font-size','12px')
            .text('No Doping Allegations')
    }

})