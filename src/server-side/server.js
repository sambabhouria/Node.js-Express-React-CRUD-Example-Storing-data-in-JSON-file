const express = require('express')
const cors = require("cors");
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const app = express();

var corsOptions = {
    origin: "http://localhost:4000"
  };


  app.use(cors(corsOptions))

//this line is required to parse the request body
app.use(express.json())

/* Create - POST method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    //get the new user data from post request
    const userData = req.body
    userData.id =  uuidv4();
    console.log(req.body)

    //check if the userData fields are missing
    if (userData.id == null || userData.name == null || userData.username == null || userData.password == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }

    //check if the username exist already
    const findExist = existUsers.find( user => user.id === userData.id && user.username === userData.username  )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'username already exist'})
    }

    //append the user data
    existUsers.push(userData)

    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})

})

/* Read - GET method */
app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})

app.get('/user/:id', (req, res) => {
     //get the existing user data
     const existUsers = getUserData();
     //get the username from url
    const id = req.params.id;
    const selectedUer = existUsers.find( user => user.id === id )
    res.send(selectedUer)
})

/* Update - Patch method */
app.patch('/user/update/:id', (req, res) => {
    //get the username from url
    const id = req.params.id

    //get the update data
    const userData = req.body

    //get the existing user data
    const existUsers = getUserData()

    //check if the username exist or not
    const findExist = existUsers.find( user => user.id === id )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }

    //filter the userdata
    const updateUser = existUsers.filter( user => user.id !== id )

    //push the updated data
    updateUser.push(userData)

    //finally save it
    saveUserData(updateUser)

    res.send({success: true, msg: 'User data updated successfully'})
})

/* Delete - Delete method */
app.delete('/user/delete/:id', (req, res) => {
    const id = req.params.id

    //get the existing userdata
    const existUsers = getUserData()

    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.id !== id )

    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }

    //save the filtered data
    saveUserData(filterUser)

    res.send({success: true, msg: 'User removed successfully'})
})


/* util functions */

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}

//get the user data from json file
const getUserData = () => {
    console.log("in the getUserData 🚀💪🐞🥂 🐼💳💎 🛳  🦁 🍰 🏅📕🌏💾 🔴 ")
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}

/* util functions ends */


// set port, listen for requests
const PORT = process.env.PORT || 8080;

//configure the server port
app.listen(PORT, () => {
    console.log(` 🚀💪🐞🥂 🐼💳💎 🛳  🦁 🍰 🏅📕🌏💾 🔴 🙌🏽🙏🏽🔥💯👍🏽🔔🔜  Server is running on port ${PORT}.`);
});
