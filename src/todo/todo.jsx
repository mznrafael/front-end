import React from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoFrom from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends React.Component {

    constructor(props){
        super(props)
        this.state = {description: '', list: []}
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerAdd = this.handlerAdd.bind(this)
    }
    
    handlerChange(e) {
        this.setState({...this.state, description: e.target.value})
    }

    handlerAdd() {
        const description  = this.state.description
        axios.post(URL, {description})
            .then(resp => console.log('Funcionou'))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoFrom
                        handlerChange={this.handlerChange} 
                        handlerAdd={this.handlerAdd}
                        description={this.state.description}
                    />
                <TodoList/>
            </div>
        )
    }
}