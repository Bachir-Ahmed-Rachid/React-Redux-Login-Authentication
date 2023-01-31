import { createSlice } from '@reduxjs/toolkit'
const loginUser=JSON.parse(localStorage.getItem('user'))
const authSlice=createSlice({
    name:'auth',
    initialState:loginUser?loginUser:{user:null,token:null},
    reducers:{
        setCredentials:(state,action)=>{
            const {name,token}=action.payload
            state.user=name
            state.token=token
            localStorage.setItem('user',JSON.stringify({user:name,token}))
        },
        logout:(state)=>{
            state.user=null
            state.token=null
            localStorage.setItem('user',JSON.stringify({user:null,token:null}))

        }

    }
})
export const {setCredentials,logout}=authSlice.actions
export default authSlice.reducer
export const selectCurrentUser=(state)=>state.auth.user
export const selectCurrentToken=(state)=>state.auth.token