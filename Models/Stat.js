import {DataTypes, Model} from "sequelize";
import dbConnection from "../dbConnection/dbConnection.js";

class Stat extends Model{}

Stat.init({
    recordNormal:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    recordTimer: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    totalGuesses: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
},
{
    sequelize:dbConnection,
    modelName:"Stat",
});

export default Stat;