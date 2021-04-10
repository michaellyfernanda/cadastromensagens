const express = require ('express')
const handlebars =  require ('express-handlebars')
const bodyparser = require ('body-parser')
const app = express()
const port = 3000

// a aplicação sabe que tem que entrar no layout e pegar o main 
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//informa onde estão as imagens
app.use(express.static('/public/img'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

const mensagens = []

//Read
//requisição na raiz p consultar o array, http://localhost:3000/
app.get('/',(req, res) =>{
    res.send(mensagens)
})

//Create
//abre o handlebar cadmensagem para o cadastro da mensagem
app.get('/cadmensagem',(req, res) =>{
    res.render('cadmensagem')
})
//retorno de sucesso
app.post('/mensagemcadastrada',(req, res) => {
   //pega o conteudo do input
    const mensagem = req.body.texto
    //valida se o texto é vazio, se for ele não inclue
    const texto = mensagem.toString()
    if (texto.length == 0)
        res.render('mensagem', {msg: 'Mensagem Inválida'})
    else{
        mensagens.push(texto)
        res.render('mensagem',{msg: 'Inclusão Concluída com sucesso!'})
    }

})

//consulta codigo da mensagem para update
app.get('/consultacodigo',(req,res) => {
    //renderiza a lista
        res.render('alteramsg',{msg: mensagens})
        })

//update
app.get('/altera/:id',(req,res) =>{
    //recebe o id e manda renderizar o formulario ja encaixando o texto antigo para modificação
        const id = parseInt(req.params.id)
        const texto = mensagens[id]
        //debug para o console
        console.info("Info1 " + texto)
        res.render('formaltera',{mid:id, msg:texto})
        })
//retorno da alteração
app.post('/mensagemalterada/:id',(req,res) => {
            const mensagem = req.body.texto
            const id = parseInt(req.params.id)
            if (mensagem.length == 0)
            res.render('mensagem',{msg:'Mensagem Inválida'})
            else {
            mensagens[id]=mensagem
            res.render('mensagem',{msg:'Alteração Concluída com Sucesso'})
            }
            })


//remove
//encaminha para a lista de opções para remoção
app.get('/delmensagem',(req,res) => {
    res.render('removemsg',{msg: mensagens})
    })


//remove single
app.get('/remove/:id',(req,res) =>{
    //chega como string transformo em inteiro
    const id = parseInt(req.params.id)
    mensagens.splice(id,1)
    res.render('mensagem',{msg:"Remoção Realizada com Sucesso"})
    })



app.listen(port)