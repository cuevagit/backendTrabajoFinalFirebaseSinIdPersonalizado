import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js'
import routerApiShoppingCart from './routers/routerApiShoppingCart.js'


const servidor = express()


//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/products', routerApiProducts)
servidor.use('/api/shoppingcart', routerApiShoppingCart)
servidor.use(express.static('public'))

//Si viene de una ruta no implementada
servidor.all('*', (req, res) => {
  res.status(404).json({error: "404", descripcion: "ruta " + req.url + " método " + req.method + " no implementado"})
})

const puerto = process.env.PORT ?? 8080

function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectado = servidor.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}



export default conectar















