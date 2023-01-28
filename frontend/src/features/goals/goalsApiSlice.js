import { apiSlice } from "../../app/api/apiSlice";

export const goalsApiSlice=apiSlice.injectEndpoints({
    tagTypes: ['Goal'],
    endpoints: build=>({
        getGoals: build.query({
            query: () => '/goals',
            providesTags: ['Goal'],
        }),
        createGoal: build.mutation({
            query:(text)=>({
                url:'/goals',
                method:'POST',
                body:text
            }),
            invalidatesTags: ['Goal'],
        }),

        updateGoal: build.mutation({
            query:(text)=>({
                url:'/:id',
                method:'PUT',
                body:text
            }),
            invalidatesTags: ['Goal'],
        }),

        deleteGoal: build.mutation({
            query:(text)=>({
                url:'/:id',
                method:'DELETE',
                body:text
            }),
            invalidatesTags: ['Goal'],
        }),
            
   
  
    })
})
export const{
    useCreateGoalMutation,
    useUpdateGoalMutation,
    useDeleteGoalMutation,
    useGetGoalsQuery,
}=goalsApiSlice