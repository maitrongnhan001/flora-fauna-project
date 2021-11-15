import React from 'react'
import Table from '../Foods/Table/Table'
import Form from '../Foods/Form/Form'
import { getFoods, getCategories, getFoodByName} from '../API/ConnectAPI'
class Foods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeAddFoodsForm: false,
            activeUpdateFoodsForm: false,
            offset: 0,
            limit: 10,
            food_data_update: {},
            foods:[],
            categories:[],
            loading: 0,
            activeSeeMoreButton: 1
        }
        this.food = React.createRef()
    }

    //Load data
    async componentDidMount() {
        document.title = 'Admin | Foods Manage'
        const foods= await getFoods(this.state.limit, this.state.offset)
        await this.setState({foods: foods.data})
        const categories = await getCategories(10000, 0)
        this.setState({categories: categories.data})
        this.setState({loading: 1})
    }

    //Set state to show added form
    onShowAddFoodForm = ()=>{
        this.setState({activeAddFoodsForm: this.state.activeAddFoodsForm ? false: true})
        document.body.style.overflow = 'hidden'
        this.food.current.style.paddingRight = '15px'
    }

    //Set state to show updated form
    onShowUpdateFoodForm = (food)=>{
        this.setState({activeUpdateFoodsForm: this.state.activeUpdateFoodsForm ? false: true})
        this.setState({food_data_update : food})
        document.body.style.overflow = 'hidden'
        this.food.current.style.paddingRight = '15px'
    }

    //Set state to hide form
    onHideFoodForm = () =>{
        this.setState({activeAddFoodsForm: false, activeUpdateFoodsForm: false})
        document.body.style.overflow = 'visible'
        this.food.current.style.paddingRight = '0px'
    }

    //Load new state
    handleSubmit = (food, method, id='')=>{
        const {foods} = this.state
        if(method.match(/post/i)){
            foods.unshift(food)
        }else {
            const idx = foods.findIndex(element=>element.id === id)
            foods[idx] = food
        }
        this.setState({foods: foods})
    }

    //Set state to delete
    handleDelete = (id) =>{
        const {foods} = this.state
        const idx = foods.findIndex(element=>element.id === id)
        foods.splice(idx, 1)
        this.setState({foods: foods})
    }

    //Search engine
    handleSearch = async (food_name)=>{
        let food;
        if(food_name === ''){
            food = await getFoods(this.state.limit, 0)
            await this.setState({offset: 0})
            await this.setState({activeSeeMoreButton: 1})
        }    
        else{
            food = await getFoodByName(food_name)
            await this.setState({activeSeeMoreButton: 0})
        }
        await this.setState({foods: food.data})
    }

    //handle set offset 
    handleSetOffset = async (offset)=>{
        await this.setState({offset: offset})
    }

    async componentDidUpdate(prevProps, prevState) {
        if(prevState.offset !== this.state.offset) {
            const foods = await getFoods(10, this.state.offset)
            console.log(foods)
            if(!foods || foods.length < 10)
                this.setState({activeSeeMoreButton: 0})
            if(foods)
                await this.setState({
                    foods: [...this.state.foods, ...foods.data]
                })
            else console.log(foods.message)
        }
    }

    render() {
        return (
            <div ref={this.food} style={{position: 'relative'}}>
                {this.state.activeAddFoodsForm && <Form 
                                                    onSubmit={this.handleSubmit} 
                                                    method='POST' 
                                                    onHideAddFoodForm={this.onHideFoodForm} 
                                                    categories={this.state.categories}
                                                    />}
                {this.state.activeUpdateFoodsForm && <Form 
                                                    onSubmit={this.handleSubmit} 
                                                    method='PUT' 
                                                    onHideAddFoodForm={this.onHideFoodForm} 
                                                    data_food={this.state.food_data_update} 
                                                    categories={this.state.categories}
                                                    />}
                <Table 
                    onSearch={this.handleSearch} 
                    onDelete={this.handleDelete} 
                    onShowAddFoodForm={this.onShowAddFoodForm} 
                    onShowUpdateFoodForm={this.onShowUpdateFoodForm} 
                    foods={this.state.foods}
                    offset={this.state.offset}
                    onSetOffset={this.handleSetOffset}
                    loading={this.state.loading}
                    activeSeeMoreButton={this.state.activeSeeMoreButton}
                    limit={this.state.limit}
                />
            </div>
        )
    }
}

export default Foods
