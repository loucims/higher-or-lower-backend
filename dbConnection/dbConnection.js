import {Sequelize} from "sequelize";
import {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_DIALECT,
    DB_PORT,
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

export default dbConnection;




