const {Pool, Client , Query} = require('pg');

const dbConfig = require('../Config/dbConfig');


//Connection

async function query(sql){
    const pool = new Pool(dbConfig.db);
    const [results ,] = await pool.query(sql,(err,res)=>{
        if(err){
            throw err ;
        }
        return results
    });
}



//Create user table

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



//Check user given email is exists or not in database

async function existbyEmail(email){
    const pool = new Pool(dbConfig.db);
    const qr = `SELECT * FROM test.user where email = '${email}'`
    const res = await pool.query(qr);
    const isQuery = res.rows.length > 0 ? true : false ; 
    if(isQuery){
        message : "data exists"
    }else{
        message : "data not exists"
    }

    pool.end() ; 
    return isQuery ; 
}


// exists user by id

async function existsbyId(id){
    const pool = new Pool(dbConfig.db);
    const qr = `select * from test.user where id = ${id}`;
    const res = await pool.query(qr);
    const isQuery = res.rows.length > 0 ? true : false ; 
    if(isQuery){
        message : res.rows ; 
    }
    pool.end();
    console.log(isQuery);
    return isQuery ; 
}


//Insert user

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




// Export functions

module.exports = {
    insertUser,
    existbyEmail,
    editUser,
    existsbyId
}