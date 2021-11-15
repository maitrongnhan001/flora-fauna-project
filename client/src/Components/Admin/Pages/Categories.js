import React from 'react'
import Category from '../Category/Table/Table'
import Form from '../Category/Form/Form'
import {getCategories, getCategoriesByName} from '../API/ConnectAPI'
class Categories extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            activeAddCategory: false,
            activeUpdateCategory: false,
            category_data_update: {},
            categories: [],
            search: [],
            offset: 0,
            limit: 10,
            loading: 0,
            activeSeeMoreButton: 1
        }
        this.category = React.createRef()
    }

    async componentDidMount() {
        document.title = 'Admin | Categories Manage'
        const categories = await getCategories(this.state.limit , this.state.offset)
        await this.setState({categories: categories.data})
        this.setState({loading: 1})
    }

    //Set state to show added form
    showAddCategory =() =>{
        this.setState(preState=>({activeAddCategory: preState.activeAddCategory ? false : true}))
        document.body.style.overflow = 'hidden'
        this.category.current.style.paddingRight = '15px'
    }

    //Set state to show updated form
    showUpdateCategory =(category) =>{
        this.setState(preState=>({activeUpdateCategory: preState.activeAddCategory ? false : true}))
        this.setState({category_data_update: category})
        document.body.style.overflow = 'hidden'
        this.category.current.style.paddingRight = '15px'
    }

    //Set state to hide form
    hideFormCategory = () =>{
        this.setState({activeAddCategory: false, activeUpdateCategory: false})
        document.body.style.overflow = 'visible'
        this.category.current.style.paddingRight = '0px'
    }

    //Load new state
    handleSubmit = (category,method, id)=>{
        const {categories} = this.state
        if(method.match(/post/i)) 
            categories.unshift(category)
        else {
            const idx = categories.findIndex(elm => elm.id === id)
            categories[idx] = category
        }
        this.setState({categories})
    }

    //Delete
    handleDelete = (category, id) =>{
        const {categories} = this.state
        const idx = categories.findIndex(elm => elm.id === id)
        categories.splice(idx, 1)
        this.setState({categories})
    }

    //Search engine
    handleSearch = async (category_name)=>{
        let categories
        if(category_name===''){
            categories = await getCategories(this.state.limit, 0)  
            await this.setState({offset: 0})
            await this.setState({activeSeeMoreButton: 1})
        }else{
            categories = await getCategoriesByName(category_name)
            await this.setState({activeSeeMoreButton: 0})
        }
        await this.setState({categories: categories.data})
    }

    //handle set offset 
    handleSetOffset = async (offset)=>{
        await this.setState({offset: offset})
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.offset !== this.state.offset) {
            const categories = await getCategories(10, this.state.offset)
            if(!categories.data || categories.data.length < 10)
                this.setState({activeSeeMoreButton: 0})
            if(categories.data) {
                await this.setState({
                    categories: [...this.state.categories, ...categories.data]
                })
            }else console.log(categories.message)

        }
    }

    render() {
        return (
            <div ref={this.category} style={{position: 'relative'}}>
                {this.state.activeAddCategory && <Form 
                                                    method='POST' 
                                                    onSubmit={this.handleSubmit} 
                                                    onCloseForm={this.hideFormCategory}
                                                    />}
                {this.state.activeUpdateCategory && <Form 
                                                    method='PUT' 
                                                    onSubmit={this.handleSubmit} 
                                                    onCloseForm={this.hideFormCategory} 
                                                    data_category={this.state.category_data_update}
                                                    />}
                <Category 
                    onSearch={this.handleSearch} 
                    onDelete={this.handleDelete} 
                    onClickToAddCategory={this.showAddCategory} 
                    onClickToUpdateCategory={this.showUpdateCategory} 
                    categories={this.state.categories}
                    history={this.props.history}
                    offset={this.state.offset} 
                    onSetOffset={this.handleSetOffset}
                    loading={this.state.loading}
                    activeSeeMoreButton = {this.state.activeSeeMoreButton}
                    limit={this.state.limit}
                />
            </div>
        )
    }
}

export default Categories