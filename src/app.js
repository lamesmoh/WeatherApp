const hbs = require('hbs')
const express = require('express')
const path = require('path')
const gecode = require('./utils/gecode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
//define pathes for express config
const pubDirpath = path.join(__dirname, '../public')
const viewDirpath = path.join(__dirname, '../templetes/views')
const partialpath =path.join(__dirname, '../templetes/partials')

app.set('view engine', 'hbs')  //enable assign view engine to hbs
app.set('views', viewDirpath)  //enable using hbs views in the viewDirpath

app.use(express.static(pubDirpath)) //enable using static dir to serve. lames.html, css in the public dir 

hbs.registerPartials(partialpath)


app.get('',(req, res)=>{
 
   res.render('index',{
      title:'Weather App',
      name:'lames salih'
   })
})


app.get('/help',(req, res)=>{
 res.render('help',{
   title:'Help',
   name:'lames salih'
 })
})


app.get('/about',(req, res)=>{
   res.render('about',{
      title:'About',
      name:'lames salih'
   })
})


app.get('/help/*',(req, res)=>{
   res.render('404',{
      title:'404',
      name: 'lames salih'
   })
})


app.get('/weather',(req, res)=>{                                       //endpoint
if(!req.query.address){
   return res.send({error:'please provide adress'})
}
  gecode(req.query.address, (error,{latitude, longitude})=>{
   if(error){
       return res.send(error)
   }
   
   forecast(latitude, longitude, (error, data)=>{
         if (error){
           return res.send({error})
         }
        
         res.send({forecast:data})
      })
   })
})



app.get('*',(req, res)=>{
   res.render('404',{
      title:'404',
      name: 'lames salih'
   })
})



app.listen(port ,()=>{
   console.log('Server is up on port '+ port)
})
