export const initialState = {
    userList: {}
};

const userList = (state, action) => {
    switch (action.type) {
        case 'userList':
            return Object.assign({}, state, action.payload);
        default:
            throw new Error();
    }
}


function resetStore() {
    return initialState;
}

/**
 * Used to combine all reducers defined for the store or React Context
 * First define all reducers and then execute
 * @param {Object} state - contains previous state
 * @param {Object} action - contains redcuer type,reducer name, payload
 * @returns reduce method based on action.reducer
 */
const reducers = { resetStore, userList };
export const combineReducers = function (state, action) {
    return reducers[action.reducer](state, action);
}
