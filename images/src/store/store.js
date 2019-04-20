import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userId: '',
        name: '',
        avatar: '',
        password: '',
        phone: '',
        sex: '',
        signature: '',
        albumList: []
    },
    mutations: {
        changeUserId (state, userId) {
            state.userId = userId
        },
        changeName (state, name) {
            state.name = name
        },
        changeAvatar (state, avatar) {
            state.avatar = avatar
        },
        changePassword (state, password) {
            state.password = password
        },
        changePhone (state, phone) {
            state.phone = phone
        },
        changeSex (state, sex) {
            state.sex = sex
        },
        changeSignature (state, signature) {
            state.signature = signature
        },
        changeAlbumList (state, albumList) {
            state.albumList = albumList
        }
    }
})
export default store