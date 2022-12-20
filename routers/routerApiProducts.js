import express from 'express';
const routerApiProducts = express.Router();


import  {controladorGetProductos,
        controladorPostProductos,
        controladorPutProductosSegunId,
        controladorGetProductosSegunId,
        controladorDeleteProductosSegunId,
        soloParaAdmins}  from '../controllers/controllerProducts.js';



routerApiProducts.post('/', soloParaAdmins, controladorPostProductos);
routerApiProducts.get('/', controladorGetProductos);
routerApiProducts.get('/:id', controladorGetProductosSegunId);
routerApiProducts.put('/:id', soloParaAdmins, controladorPutProductosSegunId);
routerApiProducts.delete('/:id', soloParaAdmins, controladorDeleteProductosSegunId);



export default routerApiProducts;
