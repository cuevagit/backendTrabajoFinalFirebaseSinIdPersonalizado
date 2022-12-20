import {randomUUID}  from 'crypto';
import {PERSISTENCIA} from '../db/config.js'
import Container from '../container/containerFs.js'
import ContainerMongoDB from '../container/containerMongodb.js'
import ContainerFirestore from '../container/containerFirestore.js'
import ContainerBDRelacional from '../container/containerBDRelacionalProd.js'
import { clienteSql } from '../db/clienteSql.js';
import { clienteSqlLite3 } from '../db/clienteSql.js';

let prodTest

switch (PERSISTENCIA) {
    case 'mongodb':
        prodTest = new ContainerMongoDB('productos')
        break
    case 'firebase':
        prodTest = new ContainerFirestore('productos')
        break
    case 'mysql':
        prodTest = new ContainerBDRelacional(clienteSql, 'productos')
        break
    case 'sqlite':
        prodTest = new ContainerBDRelacional(clienteSqlLite3, 'productos')
        break
    case 'fs':
        prodTest = new Container('productos.txt')
}



async function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;

   if(PERSISTENCIA!='firebase')
    objeto._id = randomUUID();
    
    const objetoInsert = await prodTest.save(objeto);
    res.json(objetoInsert)
}

async function controladorGetProductos(req, res) {
    const productos = await prodTest.getAll();
    res.json(productos);
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.getById(id);

    if (!productos) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        res.json(productos);
    }
}

async function controladorPutProductosSegunId({ body, params: { id } }, res) {

    const productos = await prodTest.getById(id);

    if (!productos) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
       if(PERSISTENCIA!='firebase') {
        body._id = id;
       }

       if(PERSISTENCIA==='firebase') {
        await prodTest.update(id, body);
       } else {
        await prodTest.update(body);
       }

        res.json(body);
    }

}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await prodTest.deleteById(id);

    if (productos === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        res.json(productos);
    }
}

let administrador = true

function soloParaAdmins(req, res, next) {
    if (administrador) {
        next()
    } else {
        res.status(403).json({error: "403", descripcion:  "ruta " + req.originalUrl + " método " + req.method + " no autorizada"})
    }
}


export  {controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, controladorPutProductosSegunId,
controladorDeleteProductosSegunId, soloParaAdmins};