import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Grid from '../template/grid'
import IconButton from '../template/iconbutton'
import {descriptionChange, searchTodo, add, clear} from './todoAction'

class TodoForm extends Component{
    constructor(props){
        super(props)
        this.handlerKeyUp = this.handlerKeyUp.bind(this)
    }

    componentWillMount(){
        this.props.searchTodo()
    }

    handlerKeyUp(e){
        const {add, description ,searchTodo, clear} = this.props
        if(e.key === 'Enter') {
            e.shiftKey ? searchTodo() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render() {
        const {add, description ,searchTodo, clear} = this.props
        return (
            <div role='form' className='todoForm'>
        
                <Grid cols='12 9 10'>
                    <input type="text" id='description' className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={this.props.descriptionChange}
                        value={description}
                        onKeyUp={this.handlerKeyUp}>
                    </input>
                </Grid>
        
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus' 
                        onClick={() => add(description)}
                        ></IconButton>
        
                    <IconButton style='info' icon='search' 
                        onClick={() => searchTodo()}
                        ></IconButton>
        
                    <IconButton style='default' icon='close' 
                        onClick={() => clear()}
                        ></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description})
const mapDispatchProps = dispatch => 
        bindActionCreators({
            add,
            descriptionChange,
            searchTodo,
            clear
        }, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(TodoForm)