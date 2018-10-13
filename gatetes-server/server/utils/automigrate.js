module.exports = function (app) {
    app.dataSources.MySQL_DataSource.automigrate();
    console.log("Performed automigration.");
 }