const INITIAL_STATE = {
        description: '',
        list: []
    }

export default  (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'TODOFORM_CHANGE':
        return {
            ...state, description: action.payload
        }
        case 'SEARCH_TODO':
        return {
            ...state, list: action.payload.data
        }
        case 'ADD_TODO':
        return {
            ...state, description: ''
        }
        case 'CLEAR_TODO':
        return {
            ...state, description: ''
        }
        default: 
            return state
    }
}