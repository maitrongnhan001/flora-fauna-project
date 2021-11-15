import React, { Component } from 'react';
import { getProducts, getProductsByName, getProductsByIdCategory } from '../API/Connect-API';
import Product from '../Product/Product';
import Search from '../Search/Search';
class Products extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            id_category: "",
            ContentSearch: "",
            Products: [],
        };
    }

    async componentDidMount() {
        //check click in menu
        if (localStorage.getItem('id_category') || localStorage.getItem('name_product') || localStorage.getItem('check_load_all')) {
            //run when reload web
            const name_product = localStorage.getItem('name_product');
            if (name_product) {
                const products = await getProductsByName(name_product);
                this.setState({
                    ContentSearch: name_product,
                    Products: products.data
                });
                //die process
                return;
            }

            const id_category = localStorage.getItem('id_category');
            if (id_category) {
                const products = await getProductsByIdCategory(id_category);
                this.setState({
                    id_category: id_category,
                    Products: products.data
                });
                //die process
                return;
            }

            //get list product limit 6 element
            const limit = 6;
            const products = await getProducts(limit);
            this.setState({
                Products: products.data
            });
            localStorage.clear();
            return;
        }
        //run when use function search in order page
        //get list product
        const name_product = this.props.ContentSearch;

        if (name_product) {
            //because each until store a item
            localStorage.clear()

            //store data to localstore, beacause when reload web then data on state will be remove
            localStorage.setItem('name_product', name_product);

            const products = await getProductsByName(name_product);
            this.setState({
                ContentSearch: name_product,
                Products: products.data
            });
            //die process
            return;
        }

        //get list product by id category
        const id_category = this.props.IdCategory;

        if (id_category) {
            //because each until store a item
            localStorage.clear();

            //store data to localstore, beacause when reload web then data on state will be remove
            localStorage.setItem('id_category', id_category);
            const products = await getProductsByIdCategory(id_category);
            this.setState({
                id_category: id_category,
                Products: products.data
            });
            //die process
            return;
        }

        const limit = 6;
        const products = await getProducts(limit);
        this.setState({
            ContentSearch: "",
            Products: products.data
        });
        localStorage.clear();
    }

    async componentDidUpdate(prevProps) {
        //clear id category
        try {
            if (this.props.IdCategory.length === 0 && this.props.IdCategory !== this.state.id_category) {
                this.setState({
                    id_category: ""
                });
            }
        } catch (e) {}
        //run when use function search in here
        if (prevProps.ContentSearch !== this.props.ContentSearch && this.props.ContentSearch !== null && this.props.ContentSearch.length > 0) {
            const name_product = this.props.ContentSearch;
            //get list product
            const products = await getProductsByName(name_product);

            //because each until store a item
            localStorage.clear();
            //store data to localstore, beacause when reload web then data on state will be remove
            localStorage.setItem('name_product', name_product);

            this.setState({
                ContentSearch: name_product,
                Products: products.data
            });
            return;
        }
        //check click menu
        if ((!localStorage.getItem('name_product')) && (!localStorage.getItem('id_category')) && localStorage.getItem('check_load_all')) {
            //get list product limit 6 element
            const limit = 6;
            const products = await getProducts(limit);
            this.setState({
                ContentSearch: "",
                Products: products.data
            });
            localStorage.clear();
            return;
        }
    }

    componentWillUnmount() {
        //index.js:1 Warning: Can't perform a React state update on an unmounted component.
        this.setState = (state, callback) => {
            return;
        };
    }

    render() {
        return (
            <>
                <Search
                    HandleSearch={this.props.HandleSearch}
                    ContentSearch={this.state.ContentSearch}
                ></Search>
                <Product
                    Products={this.state.Products}
                    ClickDetails={this.props.ClickDetails}
                    HandleOrder={this.props.HandleOrder}
                    status_load_element="show"
                    ContentSearch={this.state.ContentSearch}
                    id_category={this.state.id_category}
                ></Product>
            </>
        );
    }
}

export default Products;