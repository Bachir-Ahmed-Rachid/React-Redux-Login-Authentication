import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../../features/auth/authSlice'


const baseQuery= fetchBaseQuery({
    baseUrl:`${process.env.REACT_APP_API}`,
    credentials:'include', 
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
          headers.set("authorization", `Bearer ${token}`)
         
        }
        headers.set("Accept", "application/json");
        
        return headers
    }

})

const baseQueryWithReauth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions)
    console.log(result)
    if (result?.error){
        console.log('refrech')
        console.log('sending refresh token')
        const refreshResult=await baseQuery('/user/login',api,extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user=api.getState().auth.user
            //store the new token
            api.dispatch(setCredentials({...refreshResult.data,user}))
            result=await baseQuery(args,api,extraOptions)
        } else {
            console.log('refrech')
            api.dispatch(logout())
        }
         
    }
    return result
}

export const apiSlice=createApi({
    baseQuery,
    endpoints:builder=>({})
})






