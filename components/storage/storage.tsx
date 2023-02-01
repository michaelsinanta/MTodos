import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const accessTokenState = atom({
    key: 'accessTokenState',
    default: null,
    effects_UNSTABLE: [persistAtom],
})

export const userNameState = atom({
    key: 'userNameState',
    default: null,
    effects_UNSTABLE: [persistAtom],
})

export const updatingDataState = atom({
    key: 'updatingDataState',
    default: false
})

export const formDataState = atom({
    key: 'formDataState',
    default: {
        title: '',
        content : '',
        isDone : false,
    },
})

export const isModalOpenState = atom({
    key: 'isModalOpenState',
    default: false,
})


export const todosUpdateIdState = atom({
    key: 'todosUpdateIdState',
    default: null
})