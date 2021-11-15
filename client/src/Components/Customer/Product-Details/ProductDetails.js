import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.scss';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product_details: null
        }
    }

    handleNoImage = (e) => {
        //function run when load image error
        e.target.src = "/Images/Categories/no-image.png"
        e.onerror = null
    }

    static getDerivedStateFromProps(nextProps) {
        //get data product details
        if (nextProps) {
            const product_details = nextProps.ProductDetails;
            return ({
                product_details: product_details
            });
        }
        return { undefined }
    }

    ClickOrder = () => {
        //handle order
        const id_product = this.state.product_details.id;
        this.props.HandleOrder(id_product);
    }

    render() {
        return (
            <>
                <section className="product-details">
                    <div className="container">
                        <h2 className="text-center text-white">Food Details</h2>
                        <div className='details'>
                            <div className='col-img'>
                                <img
                                    src={`/uploads/${this.state.product_details.image_name}`}
                                    alt={this.state.product_details.image_name}
                                    className="img-curve"
                                    onError={e => { this.handleNoImage(e) }}
                                />
                            </div>
                            <div className='col-information'>
                                <h3 className='center'>{this.state.product_details.food_name}</h3>
                                <br></br>
                                <p><b>Category:</b>{this.state.product_details.category_name}</p>
                                <br></br>
                                <p><b>Price:</b>$ {this.state.product_details.price}</p>
                                <br></br>
                                <p><b>Description:</b>
                                    {this.state.product_details.description}
                                </p>
                                <br></br><br></br><br></br>
                                <div className='center'>
                                    <Link to='/order' onClick={() => { this.ClickOrder() }} className='btn-primary btn-contract' type='submit'>Order Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default ProductDetails;
