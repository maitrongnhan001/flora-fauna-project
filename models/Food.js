const { connection } = require("../config/database");


module.exports.sortById = (limit, offset, category) => {
    return new Promise((resolve, reject) => {
        let categoryQuery = "";
        if (category !== -1) {
            categoryQuery = ` WHERE foods.category_id=${category} `;
        }
        let sql = `SELECT foods.*, categories.category_name 
                FROM foods INNER JOIN categories ON foods.category_id = categories.id 
                ${categoryQuery}
                ORDER BY foods.id DESC LIMIT ? OFFSET ?`;
        connection.query(sql, [limit, offset], function (error, result) {
            if (error) {
                reject(error);
            } else {
                if (result.length > 0) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            }
        })
    })
}

module.exports.sortByQuantity = (limit, offset, category) => {
    return new Promise((resolve, reject) => {
        let categoryQuery = "";
        if (category !== -1) {
            categoryQuery = `WHERE f.category_id=${category} `;
        }
        const sql = `SELECT f.*, cn.*, categories.category_name
                    FROM foods as f 
                    LEFT JOIN (SELECT o.food_id, COUNT(*) as cnt FROM orders as o GROUP BY o.food_id) AS cn 
                    ON cn.food_id = f.id 
                    INNER JOIN categories ON f.category_id = categories.id
                    ${categoryQuery} 
                    ORDER BY cn.cnt DESC LIMIT ? OFFSET ?`
        connection.query(sql, [limit, offset], function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}


module.exports.findFood = (search, limit, offset, sort) => {
    return new Promise((resolve, reject) => {
        let sql = "";
        if (sort !== 'id') {
            sql = `SELECT f.*, cn.*, categories.category_name 
            FROM foods as f 
            LEFT JOIN (SELECT o.food_id, COUNT(*) as cnt FROM orders as o GROUP BY o.food_id) AS cn
            ON cn.food_id = f.id 
            INNER JOIN categories ON f.category_id = categories.id
            WHERE f.food_name LIKE ?
            ORDER BY cn.cnt DESC LIMIT ? OFFSET ?`
        } else {
            sql = `SELECT foods.*, categories.category_name 
            FROM foods INNER JOIN categories ON foods.category_id = categories.id 
            WHERE foods.food_name LIKE ? 
            ORDER BY foods.id DESC LIMIT ? OFFSET ?`
        }
        connection.query(sql, [search, limit, offset], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports.findFoodID = (search) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT foods.*, categories.category_name FROM foods INNER JOIN categories ON foods.category_id = categories.id  WHERE foods.category_id LIKE ?;", search, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}

module.exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT foods.*, categories.category_name FROM foods INNER JOIN categories ON foods.category_id = categories.id WHERE foods.id = ?', id, (error, result) => {
            if (error) {
                reject(error);
            } else {
                result = JSON.parse(JSON.stringify(result))
                resolve(result[0]);
            }
        });
    })
}


module.exports.create = (newFood) => {

    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO foods SET ?", newFood, function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                result = JSON.parse(JSON.stringify(result))
                let res = {
                    ...newFood,
                    'id': result.insertId
                }
                resolve(res);
            }
        });
    })

}

module.exports.update = (food, id) => {

    return new Promise((resolve, reject) => {
        let sql = "UPDATE foods SET ? where id=?";
        connection.query(sql, [food, id], function (error, result) {
            if (error) {
                reject(error);
            }
            else {
                resolve(food);
            }
        });
    })

}


module.exports.delete = (iddelete) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM foods WHERE id = ?', iddelete, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}


