import User from "./User.js";
import Stat from "./Stat.js";


User.hasOne(Stat,{
    foreignKey:"userId",
});
Stat.belongsTo(User,{
    foreignKey:"userId",
});


export {User, Stat};