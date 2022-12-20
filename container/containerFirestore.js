import { firestoreDatabase } from '../db/firestoreClient.js';

class Container{

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = firestoreDatabase.collection(nombreColeccion)    
    }



    //PRODUCTOS y CARRITO
    async save(objeto){

        try {
            const ref = await this.coleccion.add(objeto)
            return ref;
        } 
        catch (error){
            error => { throw error}
        } 

      }



    //PRODUCTOS y CARRITO
    async getById(id){
       
        try {

           const snapshot = await this.coleccion.doc(id).get()

         if(!snapshot){
                return null
            }else{
                    const resultado = {id: snapshot.id, ...snapshot.data() }
                return resultado;
            }
            
        }

       catch(error){
            error => { throw error}
        } 

     }


    //PRODUCTOS y CARRITO
     async getAll(){

        try {

            const snapshot = await this.coleccion.get()

            if(!snapshot){
                return null
            }else{

                const resultado = []

                snapshot.forEach(doc => {
                    resultado.push({id: doc.id,  ...doc.data() })
                })

                return resultado;
            }
            
        }

        catch(error){
            error => { throw error}
        } 

    }


    //PRODUCTOS
    async deleteById(id){
        try {
            const objetoBorrado = await this.getById(id)

         if(objetoBorrado){ 
            await this.coleccion.doc(id).delete()
            return objetoBorrado
          } else {
            return null
          }
        }

        catch(error){
            error => { throw error}
        } 

    }

    
    //PRODUCTOS y CARRITO
    async update(id, objeto){

        try {
            await this.coleccion.doc(id).update(objeto)
            return objeto;
        }
       catch(error){
            error => { throw error}
        } 
    }

    
    //CARRITO
    async save_products(id, objeto){

        try {
            await this.coleccion.doc(id).update({productos: objeto.productos})
            await this.coleccion.doc(id).update({ productos: {name: objeto.name, imageurl: objeto.imageurl, price: objeto.price, description: objeto.description }})
            return objeto;
        }
        catch(error){
            error => { throw error }
        } 
    }


    //CARRITO
    async deleteByIdCart(id){

        try {
            const carritoVaciado = await this.coleccion.doc(id).update({productos: []})
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
            await this.coleccion.doc(this.cart[indice_cart].id).update({productos: this.cart[indice_cart].productos})
            return eliminado
        }
        catch(error){
            error => { throw error}
        } 
    }


 }


 export default Container;
