const fs = require("fs");
const PORT = process.env.PORT || 3000;
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const User = require("./utils/user");

app.get("/", (req, res) => {
    res.send("Bank Api");
});

app.get("/users", (req, res) => {
    if (User.getAllusers()) {
        res.send(User.getAllusers());
    } else {
        res.send("There is no users yet")
    }
});

app.get("/users/:id", (req, res) => {
    const user = User.getUserId(req.params.id);
    console.log(user)
    user.length > 0?res.send(user):res.status(500).send({error: "Does not exist"})
});

app.put("/users/deposite/:id", (req, res) => {
    const user = User.increaseAmount(req.params.id, req.body.amount);
    if (user) {
        res.send(user)
    }
});

app.put("/users/withdraw/:id", (req, res) => {
    if (req.body.amount > 4000) {
        return res.send("You can withdraw up to 4000 at a time")
    }
    const user = User.decreaseAmount(req.params.id, req.body.amount);
    if (user) {
        res.send(user)
    } else {
        res.send({error: "You cant perform this action credit limit"})
    }
});

app.put("/users/transfer/:senderId/:recieverId", (req, res) => {
    const sender = User.decreaseAmount(req.params.senderId, req.body.amount);
    if (sender) {
        const reciever = User.increaseAmount(req.params.recieverId, req.body.amount);
        res.send(reciever)
    }else {
        res.send({error: "You cant perform this action credit limit"})
    }
});


app.post("/users/adduser", (req, res) => {
    const user = new User(req.body.name)
    const newUser = user.saveUser()
    res.send(newUser);
});

app.delete("/users/:id", (req, res) => {
    const user = User.removeUser(req.params.id)
    console.log(user)
    res.send(user);
});

app.listen(PORT, () => {
    console.log("Server is up and running on port", PORT)
});
