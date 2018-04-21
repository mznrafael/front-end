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
        this.handlerRemove = this.handlerRemove.bind(this)
        this.handlerMarkDone = this.handlerMarkDone.bind(this)
        this.handlerMarkAsPending = this.handlerMarkAsPending.bind(this)
        this.handlerSearch = this.handlerSearch.bind(this)
        this.handlerClear = this.handlerClear.bind(this)
        this.refresh()
    }
    
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(res => this.setState({...this.state, description, list: res.data}))
    }

    handlerSearch() {
        this.refresh(this.state.description)
    }

    handlerChange(e) {
        this.setState({...this.state, description: e.target.value})
    }

    handlerAdd() {
        const description  = this.state.description
        axios.post(URL, {description})
            .then(resp => this.refresh())
    }

    handlerRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(res => this.refresh(this.state.description))
    }

    handlerMarkDone(todo) {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(res => this.refresh(this.state.description))
    }
    handlerMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
            .then(res => this.refresh(this.state.description))
    }

    handlerClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoFrom
                        description={this.state.description}
                        handlerChange={this.handlerChange} 
                        handlerAdd={this.handlerAdd}
                        handlerSearch={this.handlerSearch}
                        handlerClear={this.handlerClear}
                    />
                <TodoList 
                        list={this.state.list}
                        handlerRemove={this.handlerRemove}
                        handlerMarkDone={this.handlerMarkDone}
                        handlerMarkAsPending={this.handlerMarkAsPending}
                        />
            </div>
        )
    }
}