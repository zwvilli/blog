const localInfo = JSON.parse(localStorage.getItem('userInfo'))

let userName = ''
let avatarUrl = ''
if (localInfo) {
    userName = localInfo.name
    avatarUrl = localInfo.avatarUrl
}

export default {
    state: {
        username: userName,
        avatarUrl: avatarUrl
    },
    reducers: {
        updateUserName: (state, { payload }) => {
            return {
                ...state,
                ...payload
            }
        }
    }
}