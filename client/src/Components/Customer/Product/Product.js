import React, { Component } from 'react';
import { getProducts, getProductsByName, getProductsByIdCategory } from '../API/Connect-API';
import "./Product.scss";
import ProductItem from './Product-Items/Product-Item';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Products: [],
            position: 0,
            status_load_element: "hide",
            content_search: "",
            id_category: ""
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Products.length !== prevState.Products.length) {
            //get status for component
            const status_load_element = (nextProps.status_load_element) ?? "hide";
            const content_search = (nextProps.ContentSearch) ?? "";
            const id_category = (nextProps.id_category) ?? "";
            //get position
            const position = nextProps.Products.length;
            //load product in category name
            return {
                Products: nextProps.Products,
                position: position,
                status_load_element: status_load_element,
                content_search: content_search,
                id_category: id_category
            }
        }
        return { undefined }
    }

    LoadMoreProduct = async (e) => {
        //function load more product
        e.target.innerHTML = 'Loading...';
        //two case
        //1: load by all products
        //2: load by search result
        //3: load by category
        if (this.state.content_search.length === 0) {
            if (this.state.id_category.length === 0) {
                //case 1
                const limit = 6;
                const position = this.state.position;
                const list_products = await getProducts(limit, position);

                let new_list_products = this.state.Products;

                if (list_products.data.length === 0) {
                    //if It's over element then don't show element load more product
                    this.setState({
                        status_load_element: "hide"
                    });
                }

                new_list_products.push(...list_products.data);

                this.setState({
                    Products: new_list_products,
                    position: position + limit
                });
            } else {
                //case 3
                const limit = 6;
                const position = this.state.position;
                const list_products = await getProductsByIdCategory(this.state.id_category ,limit, position);

                let new_list_products = this.state.Products;

                if (list_products.data.length === 0) {
                    //if It's over element then don't show element load more product
                    this.setState({
                        status_load_element: "hide"
                    });
                }

                new_list_products.push(...list_products.data);

                this.setState({
                    Products: new_list_products,
                    position: position + limit
                });
            }

        } else {
            //case 2
            const limit = 6;
            const position = this.state.position;
            const list_products = await getProductsByName(this.state.content_search, limit, position);

            let new_list_products = this.state.Products;

            if (list_products.data.length === 0) {
                //if It's over element then don't show element load more product
                this.setState({
                    status_load_element: "hide"
                });
            }

            new_list_products.push(...list_products.data);

            this.setState({
                Products: new_list_products,
                position: position + limit
            });
        }
        e.target.innerHTML = 'See More Foods';
    }

    render() {
        return (
            <section className="product-menu">
                <div className="container">
                    <h2 className="text-center">Foods Menu</h2>
                    {this.state.Products.map((Element, Index) => {
                        //render row
                        return (
                            <div className="product-reposive" key={Index}>
                                <ProductItem
                                    key={Index}
                                    Information={Element}
                                    ClickDetails={this.props.ClickDetails}
                                    HandleOrder={this.props.HandleOrder}
                                ></ProductItem>
                            </div>
                        );
                    })}
                </div>
                <div className="clearfix" />
                {this.props.Products.length === 0 ? <p className='text-center'>{'Loading..'}</p> : ""}
                <p className={`text-center ${this.state.status_load_element}`}>
                    <span className="pink pointer" onClick={(e) => this.LoadMoreProduct(e)}>See More Foods</span>
                </p>
            </section>

        );
    }
}

export default Product;