
const router = require("express").Router()
const{
    getConversation 
} = require("../controller/messageController")

router.get("/conversation", getConversation)

module.exports = router
