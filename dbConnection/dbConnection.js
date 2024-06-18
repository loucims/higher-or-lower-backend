import {Sequelize} from "sequelize";

const dbConnection = new Sequelize("usuarioshigherorlower", "root", "",{
    host:"localhost",
    dialect:"mysql",
    port:3306,

});

try {
    await dbConnection.authenticate();
    console.log("La connexión se ha establecido exitosamente");
} catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
}

export default dbConnection;




