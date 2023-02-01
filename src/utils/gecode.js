const request =require('request')
const gecode =(address,callback)=>{

    if(address.length>3){
    const url='http://api.positionstack.com/v1/forward?access_key=113e4035a3b2a41e919a1bcbc213c5ab&query='+encodeURIComponent(address)
    
    request({url, json:true},(error, response)=>{

        if (error){

            callback({error:'low-level positionstack error: internet connection'}, undefined)
        }
        else if (response.body.data.length===0){
            callback({error: 'Inter valid address'}, undefined)
        }
        else{

            callback(undefined, {
                names:response.body.data[0].name,
                latitude:response.body.data[0].latitude,
                longitude:response.body.data[0].longitude})
        }
    })
}
else{
    callback({error:'Address must be more than 3 letter!'}, undefined)
}
}

module.exports= gecode