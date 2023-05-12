const sql = require('mssql');
const { sqlConfig } = require('../serverconfig')

module.exports = {
    getUser: async(user_id)=>{
        await sql.connect(sqlConfig)
        let results = await (await (sql.query `SELECT * FROM dummyusers WHERE user_id = ${user_id}`)).recordset;
        if(results.length){
            return results[0]
        }else{
            return undefined;
        }
    }
}