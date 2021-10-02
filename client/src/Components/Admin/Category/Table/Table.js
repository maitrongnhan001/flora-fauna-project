import React from 'react'
import './Table.scss'
import API from '../../../../API/ConnectAPI'

class Table extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            search: ''
        }
    }

    getData(){
        return this.props.categories.map((category, idx)=>{
            return (
                <tr className='data' key={idx}>
                    <td>{idx+1}</td>
                    <td>{category.category_name}</td>
                    <td><img src={category.image} alt=''/></td>
                    <td>
                        <button className='btn btn-update' onClick={()=>{this.props.onClickToUpdateCategory(category)}}><i className="fas fa-pen"></i>Update</button>
                        <button className='btn btn-delete' onClick={()=>{this.handleDeleteCategory(category.id)}}><i className="fas fa-eraser"></i>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    //Show added form
    onClickAddCategory = () =>{
       this.props.onClickToAddCategory()
    }

    //Show update form
    onClickUpdateCategory = (category) =>{
        this.props.onClickToUpdateCategory(category)
    }

    //Delete category 
    handleDeleteCategory = (id) =>{
        const confirm = window.confirm('Do you want to delete?')
        if(confirm){
            const data = API('DELETE', `http://localhost:4000/categories/${id}`, this.state)
            this.props.onDelete(data, id)
        }
    }

    //Update input form
    handleChange = async (e) =>{
        const  {value, name} =  e.target
        await this.setState({
            [name]: value
        })
        this.props.onSearch(this.state.search)
    }

    render() {
        return (
            <div className='table-categories'>
                <p className='label-category'>Categories Manager</p>
                <div className='add-and-search'>
                    <button className='add-category' onClick={this.onClickAddCategory}>Add Category</button>
                    <div className='search-box'>
                        <input type='text' className='search-item' name='search' value={this.state.search} onKeyPress={this.handleSearch} onChange={this.handleChange} placeholder='Click to search by categories name'/>
                        <i className='fas fa-search search-item' onClick={this.handleSearch} onKeyPress={this.handleSearch}></i>
                    </div>
                </div>
                <table>
                    <tbody>
                        <tr className='header'>
                            <th className='sn-th'>S.N.</th>
                            <th className='title-th'>Category name</th>
                            <th className='image-th'>Image</th>
                            <th className='action-th'>Actions</th>
                        </tr>
                        {this.getData()}
                    </tbody>
                </table>
                {this.props.categories.length === 0 && <p>No data found!</p>}
            </div>
        )
    }
}

export default Table