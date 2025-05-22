import Sequelize from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/database.sqlite"
});


try {
    await sequelize.authenticate();
    console.log("Connection has been established succesfully.");
}
catch {
    console.error("Connection has not been established", err);
}

export default sequelize;