const uniqid = require("uniqid");
const fs = require("fs");
const path = require("path")

module.exports = class User {
    constructor(name) {
        this.name = name;
        this.id = uniqid();
        this.cash = 0;
        this.credit = 0;
        this.isActive = true;
    }

    creditLimit = 500;

    static getAllusers = () => {
        try {
            const users = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/data.json")).toString());
            return users
        } catch (e) {
            return false
        }
    }

    static getUserId = (id) => User.getAllusers().filter((user, idx) => user.id === id);

    static updateData = (data) => fs.writeFileSync(path.join(__dirname, "../db/data.json"), JSON.stringify(data));

    static decreaseAmount = (id, amount) => {
        const users = User.getAllusers();
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                if (users[i].cash === 0 && users[i].credit < -499 || amount > users[i].cash && amount > users[i].credit) {
                    return false
                }
            
                if (users[i].cash > 0) {
                    while (users[i].cash > 0 && amount > 0) {
                        users[i].cash -= 1;
                        amount--
                    }
                } else {
                    while (users[i].credit > -500 && amount > 0) {
                        users[i].credit -= 1;
                        amount--
                    }
                }
            }
        }
        User.updateData(users)
        return User.getUserId(id).length>0?User.getUserId(id): {error: "user does not exist"}
    }


    static increaseAmount = (id, amount) => {
        const users = User.getAllusers()
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) {
                let left = amount;
                if (users[i].credit < 0) {
                    while (users[i].credit < 0) {
                        users[i].credit += 1
                        left--
                    }
                    users[i].cash += left
                    if (users[i].cash < 0) {
                        users[i].credit = users[i].cash;
                        users[i].cash = 0
                    }
                } else {
                    users[i].cash += left
                }
            }
        }

        User.updateData(users)
        return User.getUserId(id).length>0?User.getUserId(id): {error: "user does not exist"}
    }

    static removeUser(id) {
        const users = User.getAllusers().filter(user => user.id !== id);
        const deletedUser = User.getUserId(id)
        User.updateData(users)
        return deletedUser.lenght > 0? deletedUser: {error: "user does not exist"}
    }

    doesExist = () => {
        const users = User.getAllusers();
        return users.filter(user => user.name === this.name).length > 0;
    }

    saveUser = () => {
        const user = {
            name: this.name,
            id: this.id,
            cash: this.cash,
            credit: this.credit,
            isActive: this.isActive,
        }

        if (User.getAllusers() === false) {
            let data = []
            data.push(user)
            fs.writeFileSync(path.join(__dirname, "../db/data.json"), JSON.stringify(data));
            return user
        } else {
            if (!this.doesExist()) {
                const users = User.getAllusers()
                users.push(user)
                fs.writeFileSync(path.join(__dirname, "../db/data.json"), JSON.stringify(users));
                return user
            } else {
                return "user already exist"
            }

        }
    }

}