import mysql from 'mysql';
import dbAuth from '../enviroment/dbAuth';

class Database {

    constructor() {
        this.connection = mysql.createConnection(dbAuth);
        this.connection.connect((err) => {

            if (err) throw err;

            console.log("Connected!");

        });
    }

    query (query) {
        const promise = new Promise((resolve, reject) => {
            this.connection.query(query, (err, results, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
    }

}

export default Database;