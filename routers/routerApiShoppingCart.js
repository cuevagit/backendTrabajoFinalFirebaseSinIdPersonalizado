import express from 'express';
const routerApiShoppingCart = express.Router();


import  {controladorPostItems,
        controladorPostItemProducts,
        controladorGetItemsSegunId,
        controladorDeleteItemsSegunId,
        controladorDeleteItemsSegunIdProducts}  from '../controllers/controllerShoppingCart.js';


routerApiShoppingCart.post('/', controladorPostItems);
routerApiShoppingCart.post('/:id_cart/products', controladorPostItemProducts);
routerApiShoppingCart.get('/:id_cart/products', controladorGetItemsSegunId);
routerApiShoppingCart.delete('/:id_cart', controladorDeleteItemsSegunId);
routerApiShoppingCart.delete('/:id_cart/products/:id_prod', controladorDeleteItemsSegunIdProducts);


export default routerApiShoppingCart;
