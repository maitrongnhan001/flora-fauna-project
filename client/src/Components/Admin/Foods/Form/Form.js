import React from 'react'
import './Form.scss'
import {postFood, putFood} from '../../API/ConnectAPI'
class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            id: '',
            food_name: '',
            price: 0,
            description: '',
            active: 0 ,
            file: null,
            category_name: '',
            invalid: 1
        }
        this.btnAddImg = React.createRef()
        this.error_image = React.createRef()
    }

    //Updating form if updated form show
    componentDidMount() {
        if(this.props.data_food)
            this.setState({
                id: this.props.data_food.id,
                food_name: this.props.data_food.food_name,
                price: this.props.data_food.price,
                description: this.props.data_food.description, 
                active:  this.props.data_food.active,
                category_name: this.props.data_food.category_name
            })
        else{
            this.setState({
                category_name: this.props.categories[0].category_name
            })
        }
    }

    //Hide added form
    onHideAddFoodForm = ()=> {
        this.props.onHideAddFoodForm()
    }

    //Update input items
    handleChange= (e)=>{
        const {name, value} = e.target
        this.setState(()=>{
            return{
            [name]: e.target.type === 'radio' || e.target.type === 'number' ? parseInt(value):value,
        }})
    }

    //Update image file
    handleChangeFile = async (e)=>{
        const file = e.target.files[0]
        const type = file.type.split('/').splice(0, 1)[0]
        this.btnAddImg.current.innerHTML = file.name
        if(type === 'image') {
            this.setState({invalid: 1})
            this.error_image.current.innerHTML = ''
            await this.setState({file})
        }else {
            this.setState({invalid: 0})
            this.error_image.current.innerHTML = 'Invalid image.'
        }
    }

    //review image
    

    //Submit form
    handleSubmit = async (e)=>{
        e.preventDefault()
        if(this.state.invalid){
            const formData = new FormData()
            formData.append('file', this.state.file)
            formData.append('food_name', this.state.food_name)
            formData.append('price', this.state.price)
            formData.append('description', this.state.description)
            formData.append('active', this.state.active)
            formData.append('category_name', this.state.category_name)
            let data = []
            if(this.props.method.match(/post/i)) {
                data = await postFood(formData, localStorage.getItem('accessToken'))
                this.props.onSubmit(data.data, this.props.method, this.state.id)
                await this.setState({
                    id: '',
                    food_name: '',
                    price: 0,
                    description: '',
                    active: 0 ,
                    file: null,
                    category: ''
                })
            }else{
                data = await putFood(this.state.id, formData, localStorage.getItem('accessToken'))
                this.props.onSubmit(data.data, this.props.method, this.state.id)
            }
            alert(data.message)
        }
    }

    render() {
        return (
            <div className='add-food-background'>
                <div className='add-food'>
                    <p className='banner'>{this.state.id === '' ? 'Add Food' : 'Update Food'}</p>
                    <div className='body'>
                        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            <div className='elm'>
                                <p>Title:</p>
                                <input type='text' name='food_name' required value={this.state.food_name} onChange={this.handleChange}/>
                            </div>
                            <div className='elm elm-textarea'>
                                <p>Description:</p>
                                <textarea name='description'  value={this.state.description} onChange={this.handleChange}/>
                            </div>
                            <div className='elm elm-files'>
                                <p>Image:</p>
                                <div className='upload-file'>
                                    <button ref={this.btnAddImg}>Choose image</button>
                                    <input type='file' name='file' onChange={this.handleChangeFile}/>
                                </div>
                                <p className='error-image' ref={this.error_image}></p>
                            </div>
                            <div className='elm elm-col'>
                                <div className='col'>
                                    <p>Price:</p>
                                    <input type='number' name='price' required min={0} value={this.state.price} onChange={this.handleChange}/>
                                </div>
                                <div className='col'>
                                    <p>Category:</p>
                                    <select name='category_name' value={this.state.category_name} onChange={this.handleChange}>
                                        {this.props.categories.map((elm, idx)=>{
                                            return (<option value={elm.category_name} key={idx}>{elm.category_name}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='elm '>
                                <p>Active:</p>
                                <div className='col'>
                                    <div className='check-radio'>
                                        <input type='radio' name='active' value={1} onChange={this.handleChange} checked={this.state.active}/>
                                        <label>Yes</label>
                                    </div>
                                    <div className='check-radio'>
                                        <input type='radio' name='active' value={0} onChange={this.handleChange} checked={!this.state.active}/>
                                        <label>No</label>
                                    </div>
                                </div>
                            </div>
                            <div className='elm elm-col'>
                                <input type='submit' className='btn' value={this.state.id === '' ? 'Add':'Update'}/>
                                <input type='button' className='btn btn-primary' value='Cancel' onClick={this.onHideAddFoodForm}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form
