const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    database: "reactblog"
});

module.exports = pool;