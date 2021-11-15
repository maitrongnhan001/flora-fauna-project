import React from 'react'
import './Form.scss'
import {postCategory, putCategory} from '../../API/ConnectAPI'
class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            category_name: '',
            file: null,
            invalid: 1,
            img_review: <p className='text-center format-p'>No picture</p>
        }
        //this.btnAddImg = React.createRef()
        this.error_image = React.createRef()
    }

    //Updating state if updated form show  
    async componentDidMount(){
        if(this.props.data_category) {
            await this.setState({
                id: this.props.data_category.id,
                category_name: this.props.data_category.category_name,
                active: this.props.data_category.active
            })
        }
    }

    //Hide added form
    hideAddCategory = ()=>{
        this.props.onCloseForm()
    }

    //Update input items
    handleChange = async (e)=>{
        const {name, value} = e.target
        await this.setState(()=>({
            [name]: e.target.type === 'radio' ? parseInt(value):value
        }))
    }

    //Update image file
    handleChangeFile = async (e)=>{
        const file = e.target.files[0]
        const type = file.type.split('/').splice(0, 1)[0]
        if(type === 'image') {
            this.setState({invalid: 1})
            var File = new FileReader();
            File.readAsDataURL(file);
            File.onload = e => {
                const img_review = (<img alt={file.name} width='300px' height='200px' src={e.target.result} ></img>)
                this.setState({img_review})
            }
            await this.setState({file})
        }else {
            this.setState({invalid: 0})
        }
        
    }

    //Submit form
    handleSubmit = async (e)=>{
        e.preventDefault()
        if(this.state.invalid) {
            const formData = new FormData()
            formData.append('file', this.state.file)
            formData.append('category_name', this.state.category_name)
            let data = []
            if(this.props.method.match(/post/i)){
                data = await postCategory(formData, localStorage.getItem('accessToken'))
                await this.setState({
                    id: '',
                    category_name: '',
                    file: null,
                    invalid: 1
                })
            }else {
                data = await putCategory(this.state.id, formData, localStorage.getItem('accessToken'))
            }
            console.log(data)
            this.props.onSubmit(data.data, this.props.method, this.state.id)
            alert(data.message)
        }
    }

    render() {
        return (
            <div className={'add-category-background'}>
                <div className='add-category'>
                    <p className='banner'>{this.state.id === '' ? 'Add Category' : 'Update Category'}</p>
                    <div className='body' >
                        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                            <div className='elm'>
                                <p className='label'>Category name: </p>
                                <input type='text' name='category_name' required value={this.state.category_name} onChange={this.handleChange}/>
                            </div>
                            <div className='elm elm-files'>
                                <p>Image:</p>
                                <div className='img-review'>
                                        {this.state.img_review}
                                </div>
                                <div className='upload-file text-center'>
                                    <label htmlFor='img-category'>Choose image</label>
                                    <input type='file' name='file' id='img-category' onChange={this.handleChangeFile}/>
                                </div>
                                <p className='error-image' ref={this.error_image}></p>
                            </div>
                            <div className='elm elm-col'>
                                <input type='submit' className='btn format-btn-left' value={this.state.id === '' ? 'Add':'Update'}/>
                                <input type='button' className='btn btn-primary format-btn-right' value='Cancel' onClick={this.hideAddCategory}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form
