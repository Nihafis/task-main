import db from "../config/db.js";



const User = {
    signUp: (user, result) => {
        db.query("INSERT INTO users SET ?", user, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("signUp user: ", { id: res.insertId, ...user });
            result(null, { id: res.insertId, ...user });
        });
    },
    getUserbyUsername: (username, result) => {
        db.query("SELECT * FROM users WHERE username =?", username, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
            } else {
                console.log("user not found");
                result(null, null);
                return
            }
        });
    }
}

export default User;