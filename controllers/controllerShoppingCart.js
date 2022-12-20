import {randomUUID}  from 'crypto';
import {PERSISTENCIA}  from '../db/config.js'
import {user}  from '../db/config.js'
import ContainerMongodb from '../container/containerMongodb.js'
import ContainerFirestore from '../container/containerFirestore.js'
import Container from '../container/containerFs.js'
import ContainerBDRelacionalProd from '../container/containerBDRelacionalProd.js'
import ContainerBDRelacionalCart from '../container/containerBDRelacionalCart.js'
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';

let prodTest
let cartTest


switch (PERSISTENCIA) {
    case 'mongodb':
        prodTest = new ContainerMongodb('productos')
        cartTest = new ContainerMongodb('cart')
        break
    case 'firebase':
        prodTest = new ContainerFirestore('productos')
        cartTest = new ContainerFirestore('cart')
        break
    case 'mysql':
        prodTest = new ContainerBDRelacionalProd(clienteSql, 'productos')
        cartTest = new ContainerBDRelacionalCart(clienteSql, 'cart', 'cartprods', 'productos')
        break
    case 'sqlite':
        prodTest = new ContainerBDRelacionalProd(clienteSqlLite3, 'productos')
        cartTest = new ContainerBDRelacionalCart(clienteSqlLite3, 'cart', 'cartprods', 'productos')
        break
    case 'fs':
        prodTest = new Container('productos.txt')
        cartTest = new Container('cart.txt')
}


async function controladorPostItems(req, res) {
    res.status(201);
    const objeto = req.body;
    const productos = []
    if(PERSISTENCIA != 'firebase')
    objeto._id = randomUUID();
    objeto.productos = productos

    let resul;
    if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite")
     resul = await cartTest.save({_id: objeto._id, user: user});
    else
     resul = await cartTest.save(objeto);

  if(PERSISTENCIA != 'firebase')
    res.json({id: objeto._id})
  else
    res.json({id: resul.id})
}

async function controladorPostItemProducts({ body, params: { id_cart } }, res) {
    const Items = await cartTest.getAll();
    const Prods = await prodTest.getAll();

    let indiceProducto;
    if(PERSISTENCIA==='firebase') 
      indiceProducto = Prods.findIndex(p => p.id === body._id);
    else
      indiceProducto = Prods.findIndex(p => p._id === body._id);

    if (indiceProducto === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${body._id})` });
    } else {
        body = Prods[indiceProducto]
    }

        let indiceBuscado;
        if(PERSISTENCIA==='firebase') 
          indiceBuscado = Items.findIndex(c => c.id === id_cart);
        else
          indiceBuscado = Items.findIndex(c => c._id === id_cart);



        if (indiceBuscado === -1) {
            res.status(404);
            res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });
        } else {
          if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite"){
            const objeto = {_idCart: id_cart, _idPRod: body._id }
            const insertado = await cartTest.save_products(objeto);
            res.json(insertado)
          }
          else {
            Items[indiceBuscado].productos.push(body);


            if(PERSISTENCIA==='firebase') {
                await cartTest.save_products(id_cart, Items[indiceBuscado]);
               } else {
                await cartTest.save_products(Items[indiceBuscado]);
            }

            res.json(body);

          }

        }

    }



async function controladorGetItemsSegunId({ params: { id_cart } }, res) {
    const Items = await cartTest.getById(id_cart);

    if (!Items) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });
    } else {
        res.json(Items);
    }
}



async function controladorDeleteItemsSegunId({ params: { id_cart } }, res) {
    const Items = await cartTest.getAll();

    let indiceBuscado
    if(PERSISTENCIA==='firebase') 
      indiceBuscado = Items.findIndex(c => c.id === id_cart);
    else
      indiceBuscado = Items.findIndex(c => c._id === id_cart);

    const borrados = Items[indiceBuscado]

    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });
    } else {
        await cartTest.deleteByIdCart(id_cart);
        res.json(borrados);
    }
}

async function controladorDeleteItemsSegunIdProducts({ params: { id_cart }, params: { id_prod } }, res) {
    const Items = await cartTest.getAll();
    const Prods = await prodTest.getAll();

    let indiceBuscadoCart;
    if(PERSISTENCIA==='firebase') 
      indiceBuscadoCart = Items.findIndex(c => c.id === id_cart);
    else
      indiceBuscadoCart = Items.findIndex(c => c._id === id_cart);

    let indiceBuscadoProd
    if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite"){
         indiceBuscadoProd = Prods.findIndex(p => p._id === id_prod);
      }
    else { 
      if(PERSISTENCIA==='firebase') 
         indiceBuscadoProd = Items[indiceBuscadoCart].productos.findIndex(p => p.id === id_prod);
      else
         indiceBuscadoProd = Items[indiceBuscadoCart].productos.findIndex(p => p._id === id_prod);
    }

    if (indiceBuscadoCart === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con ese id (${id_cart})` });

        if (indiceBuscadoProd === -1) {
            res.json({ mensaje: `no se encontró producto con ese id (${id_prod})` });        
        }    

    } else {
      if (indiceBuscadoProd === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id_prod}), en el carrito con id (${id_cart}` });
      } else {
        let borrados
        if(PERSISTENCIA === "mysql"  || PERSISTENCIA === "sqlite")
             borrados = await cartTest.deleteByIdProd(id_cart, id_prod);
        else
             borrados = await cartTest.deleteByIdProd(indiceBuscadoCart, indiceBuscadoProd);
        res.json(borrados);
      }
    }

}



export  {controladorPostItems, controladorPostItemProducts, controladorGetItemsSegunId,
controladorDeleteItemsSegunId, controladorDeleteItemsSegunIdProducts};