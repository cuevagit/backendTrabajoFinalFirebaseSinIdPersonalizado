import fs from 'fs';

//MongoDB
export const CNX_STR = 'mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test'

//FireStore
export const serviceAccount = JSON.parse(await fs.promises.readFile('./db/ecommerce-edf6f-firebase-adminsdk-at3mn-33e510bb7e.json', 'utf-8'));

//MySQL
export const mysqlConfig = {
    client: 'mysql2',
    connection: 'mysql://root:cueva1y2*2@localhost:3306/ecommerce'
}

//Sqlite3
export const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: "./db/ecommerce/mydb.sqlite"
    },
    useNullAsDefault: true   
}

export const user = 'root'
export const DB_NAME = 'ecommerce'

//export const PERSISTENCIA = 'fs'
//export const PERSISTENCIA = 'mongodb'
export const PERSISTENCIA = 'firebase'
//export const PERSISTENCIA = 'mysql'
//export const PERSISTENCIA = 'sqlite'

console.log("Estoy conectado con: " + PERSISTENCIA)
