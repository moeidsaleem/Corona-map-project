const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
var GeoJSON = require('geojson');
const _ = require('lodash')
const bodyParser = require('body-parser');
let fs = require('fs');
const axios = require('axios').default;
const geo = require('geojson-properties');


var cors=require('./cors');
app.use(cors.permission);
app.use(express.static(__dirname + '/src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//CORONA API 
const CORONA_API_URL = 'https://thevirustracker.com/free-api';
const GLOBAL_STATISTIC_URI = CORONA_API_URL + '?global=stats';
const FULL_TIMELINE_URI = CORONA_API_URL + '/timeline/map-data.json';
const COUNTRY_TIMELINE_URI = CORONA_API_URL + 'countryTimeline=US';


/* FETCH DATA FROM API AND RETURN */

app.get('/pkdata', (req,res)=>{

    fs.readFile(__dirname + '/pk.geojson', 'utf8', function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        res.json(data);

    });

})



app.get('/coronaData',async (req,res)=>{
    let c = await axios.get("https://api.thevirustracker.com/free-api?countryTotals=ALL");
    let cx = c.data.countryitems[0];
    let countryData = Object.values(cx);
    let arr ={}
    countryData.forEach(d=>{
        let name = d.title;
         arr = {...arr, [name]: {...d}}
         
    })

    console.log('ARRAY',arr['New Zealand'])


   fs.readFile(__dirname + '/countries.geo.json', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
     data.features.map(value=>{
            console.log('VALUEXXX',arr['New Zealand']);
            let n = value.properties.name;
            console.log('name', n);
        value.properties = {...arr[n] }
        
    });
    console.log(data);
// let v= geo.replaceProperties(JSON.parse(data), [{name:'pakistan',game:'22'}], 'name');
// let v = GeoJSON.parse(data, {Point: ['lat', 'lng'], include: ['name','fuck']});
// console.log(v);
    res.send(data);
  

});
});




app.listen(3001, ()=>console.log('running on 3001'))

