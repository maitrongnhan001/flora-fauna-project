import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';

export default async function connectAPI (method, url, data) {
    //function comnunnication between client and server
    return await axios({
        method,
        url,
        data
    })
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            return res.data;
        }
        return false;
    })
    .catch(res => {});
}

async function getProducts (limit, position) {
    //get products with limti
    //if haven't limit then default limit = oo
    const end_position = (position) ? position : 0;
    if (limit) {
        const result = await connectAPI('get', `/foods/?limit=${limit}&position=${end_position}`);
        return result;
    }
    const result = await connectAPI('get', '/foods');
    return result;
}

async function getProductsByName (ContentSearch, limit, position) {
    //default limit = 6
    const end_limit = (limit) ? limit : 6;
    //default position = 0
    const end_position = (position) ? position : 0;
    const result = await connectAPI('get',`/foods/food_name/?search=${ContentSearch}&limit=${end_limit}&position=${end_position}`);
    return result;
}

async function getProductsById (IdProduct) {
    const result = await connectAPI('get', `/foods/id/${IdProduct}`);
    return result;
}

async function getProductsByIdCategory (id_category) {
    //get list products by id category
    const result =  await connectAPI('get', `/foods/id_category/${id_category}`);
    return result;
}

async function postOrder (data) {
    //get status order
    const result = await connectAPI('post', '/order', data);
    return result;
}

async function postMessage (data) {
    //get status order
    const result = await connectAPI('post', '/contract', data);
    return result;
}

async function getCategories (limit, position) {
    //get products with limti
    //if haven't limit then default limit = oo
    const end_position = (position) ? position : 0;
    if (limit) {
        const result = await connectAPI('get', `/categories/?limit=${limit}&position=${end_position}`);
        return result;
    }
    const result = await connectAPI('get', '/categories');
    return result;
}

//export get products
export {
    getProducts,
    getProductsByName,
    getProductsByIdCategory,
    getProductsById
}

//export post order
export {
    postOrder
}

//export get categories
export {
    getCategories
}

//export get contract
export {
    postMessage
}