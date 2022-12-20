import { mongoDatabase } from '../db/mongoClient.js';

class Container{

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = mongoDatabase.collection(nombreColeccion);
    }



    //PRODUCTOS y CARRITO
    async save(objeto){
 
        try {
            await this.coleccion.insertOne(objeto)
            return 'Id del objeto guardado: ' + this.coleccion._id
        } 
        catch (error){
            error => { throw error}
        } 

      }


    //PRODUCTOS y CARRITO
    async getById(id){
       
        try {

            const objetoBuscado = await this.coleccion.find({_id: id}).toArray()

            if(objetoBuscado[0]===undefined){
                return null
            }else{
                return objetoBuscado[0];
            }
            
        }

        catch(error){
            error => { throw error}
        } 

     }


    //PRODUCTOS y CARRITO
     async getAll(){

        try {

            const objetoBuscado = await this.coleccion.find({}).toArray()

            if(objetoBuscado===undefined){
                return null
            }else{
                return objetoBuscado;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

    }


    //PRODUCTOS y CARRITO
    async deleteById(id){
        try {
            const objetoBorrado = await this.coleccion.find({_id: id}).toArray()

         if(objetoBorrado[0]){ 
            await this.coleccion.deleteOne({_id: id})
            return objetoBorrado[0]
          } else {
            return null
          }
        }

        catch(error){
            error => { throw error}
        } 

    }

    
    //PRODUCTOS y CARRITO
    async update(objeto){

        try {
            await this.coleccion.updateMany({_id: objeto._id}, {$set: {"name": objeto.name, "description": objeto.description, "price": objeto.price, "image(url)": objeto.imageurl}})
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }

    
    //CARRITO
    async save_products(objeto){
        try {
            await this.coleccion.updateOne({_id: objeto._id}, {$set: {"productos": objeto.productos}})
            return objeto;
        }
        catch(error){
            error => { throw error }
        } 
    }


    //CARRITO
    async deleteByIdCart(id){
        try {
            const carritoVaciado = await this.coleccion.updateOne({_id: id}, {$set: {"productos": []}})
            return carritoVaciado
        }
        catch(error){
            error => { throw error}
        } 
    }


    //CARRITO
    async deleteByIdProd(indice_cart, indice_prod){
        try {
            this.cart = await this.getAll()
            const eliminado = this.cart[indice_cart].productos.splice(indice_prod, 1)
            await this.coleccion.updateOne({_id: this.cart[indice_cart]._id}, {$set: {"productos": this.cart[indice_cart]}})
            return eliminado
        }
        catch(error){
            error => { throw error}
        } 
    }


 }


 export default Container;
