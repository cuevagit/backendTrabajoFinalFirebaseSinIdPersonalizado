import fs from 'fs';

class Container{

    #productos;
    #cart;
    #filename;

    constructor(filename) {
        this.#productos = [];
        this.#cart = [];
        this.#filename = filename;
    }



    //PRODUCTOS Y CARRITO
    async save(objeto){
 
        try {
           if(await this.getAll())
            this.#productos = await this.getAll()
        } 
        catch (error){
            this.#productos = [];
            error => { throw error}
        } 

        try {
            this.#productos.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos, null, 2))
            return 'Id del objeto guardado: ' + this.#productos[this.#productos.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 

      }


    //PRODUCTOS Y CARRITO
    async getById(id){
       
        try {
            this.#productos = await this.getAll()

            const objetoBuscado = this.#productos.find((p)=>p._id===id)

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


     //PRODUCTOS Y CARRITO
     async getAll(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#productos = contenido
                 return this.#productos
                } else { 
                 return null
                }
            }

        catch(error){
            error => { throw error}
        } 

    }


    //PRODUCTOS Y CARRITO
    async deleteById(id){
        try {
            this.#productos = await this.getAll()
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#productos.filter(p => p._id !== id), null, 2))
            return this.#productos.filter(p => p._id == id)
        }
        catch(error){
            error => { throw error}
        } 
    }


    //PRODUCTOS Y CARRITO
    async update(objeto){

        const productos = await this.getAll();
        const indiceBuscado = productos.findIndex(c => c._id === objeto._id);
        productos[indiceBuscado] = objeto;

        if (indiceBuscado === -1) {
            res.status(404);
            res.json({ mensaje: `no se encontró producto con ese id (${id})` });
        } else {

        try {
            await fs.promises.writeFile(this.#filename, JSON.stringify(productos, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error}
        } 
    }
}


    //CARRITO
    async save_cart(objeto){
 
        try {
           if(await this.getAll())
            this.#cart = await this.getAll()
        } 
        catch (error){
            this.#cart = [];
            error => { throw error}
        } 

        try {
            this.#cart.push(objeto)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return 'Id del objeto guardado: ' + this.#cart[this.#cart.length - 1].id
        }
        catch(error){
            error => { throw error}
        } 

      }

      
      //CARRITO
      async save_products(objeto){
       try {
            const carts = await this.getAllCart();

            const indiceCart = carts.findIndex(c => c._id === objeto._id);
            carts[indiceCart] = objeto;
            await fs.promises.writeFile(this.#filename, JSON.stringify(carts, null, 2))
            return objeto;
        }
        catch(error){
            error => { throw error }
        } 
    }


    //CARRITO
    async getByIdCart(id){
       
        try {
            this.#cart = await this.getAll()

            const objetoBuscado = this.#cart.find((p)=>p._id===id)

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


     //CARRITO
     async deleteByIdCart(id){
        try {
            this.#cart = await this.getAll()
            const indiceBuscado = this.#cart.findIndex(c => c._id === id);

            this.#cart[indiceBuscado].productos = []
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return this.#cart[id]
        }
        catch(error){
            error => { throw error}
        } 
    }


    //CARRITO
    async deleteByIdProd(indice_cart, indice_prod){
        try {
            this.#cart = await this.getAll()
            const eliminado = this.#cart[indice_cart].productos.splice(indice_prod, 1)
            await fs.promises.writeFile(this.#filename, JSON.stringify(this.#cart, null, 2))
            return eliminado
        }
        catch(error){
            error => { throw error}
        } 
    }


    //CARRITO
    async getAllCart(){

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.#filename, 'UTF-8'))

                if(contenido) { 
                 this.#cart = contenido
                 return this.#cart
                } else { 
                 return null
                }
            }

        catch(error){
            error => { throw error}
        } 

    }

  }



 export default Container;
