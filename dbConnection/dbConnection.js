import {Sequelize} from "sequelize";
import {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PRIVATE_KEY_ID
    } from "../config/config.js";   

const dbConnection = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
});

try {
    await dbConnection.authenticate();
    console.log("La connexión se ha establecido exitosamente");
} catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
}


import admin from "firebase-admin";
import { createRequire } from "module";
import { FirebaseController } from "./firebaseController.js";
const require = createRequire(import.meta.url);
const serviceAccount = require("../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert({...serviceAccount,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY,
  }),
  databaseURL: "https://higher-or-lower-ac9f6-default-rtdb.firebaseio.com"
});

const firebaseRealtimeDB = admin.database()
const firebaseController = new FirebaseController(firebaseRealtimeDB);

export {dbConnection, firebaseRealtimeDB, firebaseController};




