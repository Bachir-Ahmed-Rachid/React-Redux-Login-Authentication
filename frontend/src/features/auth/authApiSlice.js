import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice=apiSlice.injectEndpoints({
    endpoints: build=>({
        login: build.mutation({
            query:(values)=>({
                url:'/user/login',
                method:'POST',
                body:values
            })
            }),
            
   
  
})
})
export const{useLoginMutation}=authApiSlice