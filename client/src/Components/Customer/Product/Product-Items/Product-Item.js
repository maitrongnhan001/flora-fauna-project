import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product-Item.scss'

class ProductItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            price_text: "",
            price: ""
        };
    }

    handleClickProduct = () => {
        this.props.ClickDetails(this.props.Information);
    }

    handleNoImage = (e) => {
        //function run when load image error
        e.target.src = "/Images/Categories/no-image.png"
        e.onerror = null
    }

    ClickOrder = () => {
        //handle order product
        const id_product = this.props.Information.id;
        this.props.HandleOrder(id_product);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.Information.price !== prevState.price) {

            let price_text = String(nextProps.Information.price);

            let i = price_text.length - 3;

            while (i > 0) {
                price_text = price_text.slice(0, i) + '.' + price_text.slice(i);
                i -= 3;
            }

            return {
                price_text: price_text,
                price: nextProps.Information.price
            };
        }
        return { undefined };
    }

    render() {
        return (
            <div className="product-menu-box">
                <div className="product-menu-img">
                    <Link to='/productDetails'
                        onClick={this.handleClickProduct}
                    >
                        <img
                            src={`http://localhost:8000/uploads/${this.props.Information.image_name}`}
                            alt="Chicke Hawain Pizza"
                            className="img-responsive img-curve"
                            onError={e => { this.handleNoImage(e) }}
                        />
                    </Link>
                </div>
                <div className="product-menu-desc">
                    <Link to='/productDetails'
                        onClick={this.handleClickProduct}
                    >
                        <h4>{this.props.Information.food_name}</h4>
                    </Link>
                    <p className="product-price">{this.state.price_text} VND</p>
                    <p className="product-detail">{this.props.Information.description}</p>
                    <br />
                    <Link to="/order" onClick={() => { this.ClickOrder() }} className="btn btn-primary">Order Now</Link>
                </div>
            </div>
        );
    }
}



export default ProductItem;