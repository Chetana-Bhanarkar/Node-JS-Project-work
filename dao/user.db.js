const {Pool, Client , Query} = require('pg');

const dbConfig = require('../Config/dbConfig');

async function query(sql){
    const pool = new Pool(dbConfig.db);
    const [results ,] = await pool.query(sql,(err,res)=>{
        if(err){
            throw err ;
        }
        return results
    });
}


async function createUser(){
    const pool = new Pool(dbConfig.db);
    const query = `CREATE TABLE IF NOT EXISTS test.User(
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1),
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        mobile VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL
    )`

    const result = await pool.query(query);
    pool.end()
    return result ; 
}


async function insertUser(firstname , lastname , mobile , email){
    const pool = new Pool(dbConfig.db);
    const qr = `INSERT INTO test.user(firstname, lastname, mobile, email) VALUES('${firstname}' , '${lastname}' , '${mobile}' , '${email}')`;

    const res = await pool.query(qr) ; 

    if(res.affectedRows){
        message : res ; 
    }

    pool.end() ; 
    return res.rows 
}

module.exports = {
    insertUser
}