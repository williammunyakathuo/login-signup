const bcrypt = require('bcrypt');

const sql = require('mssql');

const { sqlConfig } = require('../serverconfig');
const { getUser } = require('../services/getuserservice');
const { createToken } = require('../services/jwt');


module.exports = {
    getUsers: async (req, res) => {

        // res.json(people)
        try {
            // make sure that any items are correctly URL encoded in the connection string
            await sql.connect(sqlConfig)
            const result = await sql.query`SELECT * FROM dummyusers `
            res.json(result)
        } catch (err) {
            // ... error checks
            console.log(err)
        }

    },

    createUser: async (req, res) => {
        const details = req.body;
        // let hashpwd = await bcrypt.hash(details.passwords, 8)

        try {
            // console.log(hashedpass)
            await sql.connect(sqlConfig)
            const result = await sql.query`INSERT INTO dummyusers values (${details.full_name}, ${details.username},
                     ${details.email},${details.phone_number},${details.passwords})`

            if (result.rowsAffected.length) res.json({ succes: true, message: 'user created' })

        } catch (error) {
            console.log(error)
        }
    },

    userLogin: async (req, res) => {
        let credentials = req.body;
        let user = await getUser(credentials.user_id);
        if(user){
            let match = await bcrypt.compare(credentials.passwords, user.passwords)
            let token = await createToken({username: user.username, user_id: user.user_id})
            match? res.json({succes:true, message: ' login succesfull', token}): 
            res.json({succes: false, message: 'incorrect cridentials'})
       
        }else{
            res.status(404).json({ message: 'user not found' })
        }


    },

    getAUser: async (req, res) => {
        const { user_id } = req.params;

        try {
            let user = await getUser(user_id)
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'user not found' })
            }
        } catch (error) {
            console.log(error)
        }
    }


}







