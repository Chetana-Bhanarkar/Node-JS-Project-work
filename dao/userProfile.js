const {Pool , Query , Client} = require('pg');

const dbConfig = require('../Config/dbConfig');

async function query(sql){
    const pool = new Pool(dbConfig.db);

    const [results,] = pool.query(sql,(err,res)=>{
        if(err){
            throw err ; 
        }
        return results ; 
    })
}


async function createUserProfile(){
    const pool = new Pool(dbConfig.db);

    const qr = `CREATE TABLE IF NOT EXISTS test.userAddress(
        id bigint NOT NULL GENERATED ALWAYS AS IDENTITY (INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1),
        houseNo VARCHAR(100) NOT NULL,
        area VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        u_id VARCHAR(100) NOT NULL,
        CONSTRAINT app_userAddress_pk PRIMARY KEY (id)
    )`

    const result = await pool.query(qr);
    pool.end();
    return result ; 
}

createUserProfile();




