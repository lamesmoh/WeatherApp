console.log('js file loaded!')

const messageOne =document.getElementById('message-1')
const messageTwo =document.getElementById('message-2')
const Address = document.querySelector('input')
const form = document.querySelector('form')



    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        const o =Address.value
    
     
    messageOne.textContent='loading ...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+o).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
        messageOne.textContent=data.error
    }
    else{
        messageOne.textContent=o
        messageTwo.textContent=data.forecast
    }
})
})

    })

