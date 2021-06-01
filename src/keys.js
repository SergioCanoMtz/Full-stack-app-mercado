module.exports = {
    
    database: {
        host: "localhost" || process.env.DB_HOST,
        user: "root" || process.env.DB_USER,
        password: "" || process.env.DB_PASSWORD,
        database: "database_link" || process.env.DB_DATABASE
    }

}