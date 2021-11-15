import axios from 'axios'

axios.defaults.baseURL = '/api'

export default async function connectAPI(method, url, token = null, data = null) {
    return await axios({
        method,
        url,
        headers: { 'Authorization': token !== null && 'Bearer ' + token },
        data
    })
        .then(res => res.data)
        .catch(err => console.log(err))
}



//API FOOD
async function getFoods(limit = 100000, offset = 0) {
    const res = await connectAPI('get', `/foods?limit=${limit}&position=${offset}&sort=id`)
    return res
}

async function getFoodByName(food_name) {
    const res = await connectAPI('get', `/foods/food_name/${food_name}`)
    return res
}

async function postFood(data, token = null) {
    const res = await connectAPI('post', `/foods`, token, data)
    return res
}

async function putFood(food_id, data, token = null) {
    const res = await connectAPI('put', `/foods/${food_id}`, token, data)
    return res
}

async function deleteFood(food_id, token = null) {
    const res = await connectAPI('delete', `/foods/${food_id}`, token)
    return res
}



//API CATEGORIES
async function getCategories(limit = 10000, offset = 0) {
    const res = await connectAPI('get', `/categories?limit=${limit}&position=${offset}&sort=id`)
    return res
}

async function getCategoriesByName(category_name) {
    const res = await connectAPI('get', `/categories/categories_name/${category_name}`)
    return res
}

async function postCategory(data, token = null) {
    const res = await connectAPI('post', `/categories`, token, data)
    return res
}

async function putCategory(category_id, data, token = null) {
    const res = await connectAPI('put', `/categories/${category_id}`, token, data)
    return res
}

async function deleteCategory(category_id, token = null) {
    const res = await connectAPI('delete', `/categories/${category_id}`, token)
    return res
}



//API USERS
async function getUsers(limit = 100000, offset = 0) {
    const res = await connectAPI('get', `/users?limit=${limit}&position=${offset}`)
    return res
}

async function getUserByName(username) {
    const res = await connectAPI('get', `/users/username/${username}`)
    return res
}

async function getUserById(user_id) {
    const res = await connectAPI('get', `/users/user_id/${user_id}`)
    return res
}

async function putUser(user_id, data, token = null) {
    const res = await connectAPI('put', `/users/${user_id}`, token, data)
    return res
}

async function deleteUser(user_id, token = null) {
    const res = await connectAPI('delete', `/users/${user_id}`, token)
    return res
}

async function userChangePassword(data, token = null) {
    const res = await connectAPI('post', '/user/change-password', token, data)
    return res
}





//API ORDERS
async function getOrders(limit = 100000, offset = 0) {
    const res = await connectAPI('get', `/orders?limit=${limit}&position=${offset}`)
    return res
}

async function getOrdersByName(customer_name) {
    const res = await connectAPI('get', `/orders/customer_name/${customer_name}`)
    return res
}

async function getOrderStatistic(year, token = null) {
    const res = await connectAPI('get', `/orders/statistic/${year}`, token)
    return res
}

async function putActiveOrders(id, data, token = null) {
    const res = await connectAPI('put', `/orders/${id}`, token, data)
    return res
}

//API CONTRACT
async function getContacts(limit = 100000, offset = 0) {
    const res = await connectAPI('get', `/contact?limit=${limit}&position=${offset}`)
    return res
}

async function getContactsByName(name) {
    const res = await connectAPI('get', `/contact/search/${name}`)
    return res
}


//API Auth
async function userLogin(data, token = null) {
    const res = await connectAPI('post', '/auth/login', token, data)
    return res
}

async function userRegister(data, token = null) {
    const res = await connectAPI('post', '/auth/register', token, data)
    return res
}


//EXPORT AUTH API
export {
    userLogin,
    userRegister,
    userChangePassword,
}


//EXPORT FOOD API
export {
    getFoods,
    getFoodByName,
    postFood,
    putFood,
    deleteFood
}


//EXPORT CATEGORIES API
export {
    getCategories,
    getCategoriesByName,
    postCategory,
    putCategory,
    deleteCategory
}


//EXPORT USERS API
export {
    getUsers,
    getUserById,
    getUserByName,
    putUser,
    deleteUser
}


//EXPORT ORDERS API
export {
    getOrders,
    getOrdersByName,
    getOrderStatistic,
    putActiveOrders
}

//EXPORT contracts
export {
    getContacts,
    getContactsByName
}




