const request = require('request')
const forecast =(latitude, longitude, callback)=>{
    const url='https://api.open-meteo.com/v1/forecast?current_weather=true&latitude='+encodeURIComponent(latitude)+'&longitude='+encodeURIComponent(longitude)
    request({url, json:true},(error, response)=>{

        if(error){
            callback('low-level open-meteo error: no internet connection' + error, undefined)
        }
        else{
            callback(undefined,'Time now is '+response.body.current_weather.time+' Temperature is about '+response.body.current_weather.temperature)
        }
    })
}

module.exports=forecast