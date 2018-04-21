import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const descriptionChange = (event) => ({
    type: 'TODOFORM_CHANGE',
    payload: event.target.value
})

export const searchTodo = () => {
    const request = axios.get(`${URL}?sort=-createdAt`)
    return {
        type: 'SEARCH_TODO',
        payload: request
    }
}

export const add = (description) => {
    return dispatch => {
        axios.post(URL, {description})
        .then(resp => dispatch({ type: 'ADD_TODO', payload: resp.data}))
        .then(resp => dispatch(searchTodo()))
    }
}

export const clear= () => ({
    type: 'CLEAR_TODO'
})