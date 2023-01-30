const hbs = require('hbs')
const express = require('express')
const path = require('path')
const lames = require('./utils/gecode')
const ahmed = require('./utils/forecast')
const gecode = require('./utils/gecode')

const app = express()

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
  gecode(req.query.address, (error, {latitudes, longitudes}={})=>{
   if(error){
       return res.send(error)
   }
   forecast(latitudes, longitudes, (error, data)=>{
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



app.listen(3000,()=>{
   console.log('Server is up on port 3000')
})