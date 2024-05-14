// db.js
import mysql2 from "mysql2";

export const db = mysql2.createPool({
    host: "sql.freedb.tech",
    user: "freedb_bdclube-user",
    password: "Ca*qBXp$&9bHq9R",
    database: "freedb_bdclube",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Conexão com o banco de dados perdida. Tentando reconectar...');
        db.getConnection((connectionError, connection) => {
            if (connectionError) {
                throw connectionError;
            } else {
                console.log('Reconexão bem-sucedida.');
                connection.release();
            }
        });
    } else {
        throw err;
    }
});

// Função para executar consultas
export async function executeQuery(sql, values) {
    const [rows, fields] = await pool.execute(sql, values);
    return rows;
}
