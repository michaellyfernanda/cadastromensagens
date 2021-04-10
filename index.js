const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const pessoas = [
                    {
                        
                        "id":"101",
                        "nome" : "Mika MIh",
                        "peso":"78",
                        "altura":"1.8"
                    }, 
                    {
                        "id":"102",
                        "nome":"Mika Segundo",
                        "peso":"69",
                        "altura":"1.6"
                    }
                  ]
app.use(bodyParser.json())


//Read
app.get('/',(req,res)=>{
    res.send(pessoas)
})

app.get('/mensagem/:id',(req,res)=>{
    const id = req.params.id
    const pessoa = pessoas.filter(function(item){
        return item.id == id
    })
    if (pessoa.length == 0)
        res.send("Id Inválido")
    else
        res.send(pessoa)
})


//Create com filtro de id ( repetido )
app.post('/',(req,res)=>{
    const pessoa = req.body
    const indice = pessoas.findIndex(function(item){
        return item.id == pessoa.id
    })
    if (indice == -1){
        res.send("Inclusão realizada com sucesso")
        } else {
            res.send("Id já existe")
        }
})

//Create com id automatico
//lembrar de deixar o id "" no postman!
app.post('/automatico',(req,res)=>{
    const prod = req.body
    
    const codigos = []
    for ( i = 0; i< produtos.length; i++){
        codigos.push(parseInt(produtos[i].id))
    }
    var id=101
    if (codigos.length > 0){
       id = codigos.reduce(function(a, b) {
        return Math.max(a, b);
      }) + 1
    } 
    
    prod.id = id.toString()
    produtos.push(prod)
    res.send('Inclusão Concluída com Sucesso')
    
})

//Update
app.put('/:id', (req, res) => {
    const id = req.params.id
    const pessoa = pessoas.findIndex(function(item){
        return item.id == id
    })
    if (pessoa > -1){
        pessoas[pessoa] = req.body
        res.send('Alterar Realizada com Sucesso')
    } else {
        res.send('Id Inválido')
    }
});


//Delete
app.delete('/:id',(req,res)=>{
    const id = req.params.id
    const indice = pessoas.findIndex(function(item){
        return item.id == id
    })    
    if (indice > -1){
       pessoas.splice(indice,1)
       res.send('Remoção Realizada com Sucesso')
    }
    else
       res.send("Indíce Inválido")
})

app.listen(port)