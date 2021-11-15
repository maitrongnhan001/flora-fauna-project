import React, { Component } from 'react';
import './Category-Item.scss';
import { Link } from 'react-router-dom';

class CategoryItem extends Component {

    ClickComponent = () => {
        const id_category = this.props.Information.id;
        this.props.ClickCategoryItem(id_category);
        localStorage.clear();
    }

    handleNoImage = (e) => {
        //function run when load image error
        e.target.src = "/Images/Categories/no-image.png"
        e.onerror = null
    }

    render() {
        return (
            <>
                <Link action="true" to="/products" onClick={this.ClickComponent}>
                    <div className="box-3 float-container img-curve">
                        <img
                            src={`/uploads/${this.props.Information.image_name}`}
                            alt="  "
                            className="img-curve"
                            onError={e => { this.handleNoImage(e) }}
                        />
                        <h3 className="float-text text-white">{this.props.Information.category_name}</h3>
                    </div>
                </Link>
            </>
        );
    }
}

export default CategoryItem;