var db = require('../config/db');

exports.add = user => {
    var sql = `insert into users(userEmail, userPassword, userFname, userLname, addressline1, phone, isAdmin) 
    values('${user.email}', '${user.password}', '${user.fname}', '${user.lname}', '${user.address}', '${user.phone}','${user.role})`;
    return db.save(sql);
}

exports.login = user => {
    var sql = `select * from users where userEmail = '${user.email}' and f_Password = '${user.password}'`;
    return db.load(sql);
}


exports.single = id => {
    return new Promise((resolve, reject) => {
        var sql = `select * from users where iduser = ${id}`;
        db.load(sql).then(rows => {
            if (rows.length === 0) {
                resolve(null);
            }
            else {
                resolve(rows[0]);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

exports.update = user => {
    var sql=`update users set userPassword='${user.password}' where f_ID = ${user.id}`;
    return db.save(sql);
}
