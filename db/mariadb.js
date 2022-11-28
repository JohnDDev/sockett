const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'mydb',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
});

const runBasicQuery = async (sql, bindings = null) => {
    let conn;
    
    try {
        conn = await pool.getConnection();

        const result = await conn.query(sql, bindings);

        return result;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

const endSDCasino = async () => {
    let conn;
    let result = { status: 'SUCCESS' };

    try {
        conn = await pool.getConnection();

        conn.beginTransaction();

        conn.commit();
    } catch (err) {
        if (conn) {
            conn.rollback();
        }

        result = { status: 'FAIL', message: err.message };
    } finally {
        if (conn) {
            conn.release();
        }

        return result;
    }
}

export default {
    pool,
    runBasicQuery,
    endSDCasino
}