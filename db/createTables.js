import { clienteSql as knex } from './clienteSql.js'
//import { clienteSqlLite3 as knex } from './clienteSql.js'


function createTables(){
knex.schema.hasTable('productos')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('productos', tabla => {
                tabla.string('_id'),
                    tabla.string('name'),
                    tabla.string('description'),
                    tabla.string('image(url)'),
                    tabla.integer('price')
            })
                .then(() => {
                    console.log('tabla "productos" creada!')
                })
        } else {
            console.log('la tabla "productos" ya existe. no se realizaron cambios')
        }
    })
  

    knex.schema.hasTable('cart')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('cart', tabla => {
                tabla.string('_id'),
                tabla.string('user')
            })
                .then(() => {
                    console.log('tabla "cart" creada!')
                })
        } else {
            console.log('la tabla "cart" ya existe. no se realizaron cambios')
        }
    })

    knex.schema.hasTable('cartProds')
    .then(exists => {
        if (!exists) {
            knex.schema.createTable('cartProds', tabla => {
                tabla.increments('_id'),
                tabla.string('_idCart'),
                tabla.string('_idPRod')
            })
                .then(() => {
                    console.log('tabla "cartProds" creada!')
                })
        } else {
            console.log('la tabla "cartProds" ya existe. no se realizaron cambios')
        }
    })

}

export default createTables;