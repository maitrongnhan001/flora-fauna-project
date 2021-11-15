import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './notification.scss';

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notification: "",
            total: 1,
            qty: 1,
            food_name: "",
            image_name: "",
            customer_name: "",
            customer_phone_number: "",
            customer_email: "",
            customer_address: "",
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //set data
        if (nextProps.food_name !== prevState.food_name) {
            const order_details = nextProps.order_details;
            return ({
                notification: nextProps.notification,
                image_name: order_details.image_name,
                food_name: order_details.food_name,
                total: order_details.total,
                qty: order_details.qty,
                customer_name: order_details.customer_name,
                customer_phone_number: order_details.customer_phone_number,
                customer_email: order_details.customer_email,
                customer_address: order_details.customer_address
            });
        }
    }

    handleNoImage = (e) => {
        //function run when load image error
        e.target.src = "/Images/Categories/no-image.png"
        e.onerror = null
    }

    render() {
        return (
            <div className={`background ${this.props.status_notification}`}>
                <div className="notification">
                    <h1 className="banner text-center">
                        Notification
                    </h1>
                    <div className="notification-main text-center">
                        <h3 className="success">
                            {this.state.notification}
                        </h3>
                        <fieldset>
                            <legend>Order Food</legend>
                            <div className="product-menu-img">
                                <img
                                    src={`/uploads/${this.state.image_name}`}
                                    alt={this.state.food_name}
                                    onError={e => { this.handleNoImage(e) }}
                                    className="img-responsive img-curve" />
                            </div>
                            <div className="order-details">
                                <div className="name-product">
                                    <b>Food name:</b>
                                    <p>{this.state.food_name}</p>
                                </div>
                                <div className="qty-order">
                                    <b>Quantity:</b>
                                    <p>{this.state.qty}</p>
                                </div>
                                <div className="total-order">
                                    <b>Total:</b>
                                    <p>{this.state.total} đ</p>
                                </div>

                            </div>

                            <div className="order-details">
                                <div className="name-product">
                                    <b>Customer name:</b>
                                    <p>{this.state.customer_name}</p>
                                </div>
                                <div className="name-product">
                                    <b>Customer email:</b>
                                    <p>{this.state.customer_email}</p>
                                </div>
                                <div className="qty-order">
                                    <b>Phone:</b>
                                    <p>{this.state.customer_phone_number}</p>
                                </div>
                                <div className="total-order">
                                    <b>Address:</b>
                                    <p>{this.state.customer_address}</p>
                                </div>

                            </div>
                        </fieldset>
                        <div className="group-btn">
                            <Link
                                className="btn btn-primary"
                                to="/"
                            >Keep Ordering</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification;
