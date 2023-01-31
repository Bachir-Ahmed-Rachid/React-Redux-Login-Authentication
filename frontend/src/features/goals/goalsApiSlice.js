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
                url:`/goals/${text.id}`,
                method:'PUT',
                body:text
            }),
            invalidatesTags: ['Goal'],
        }),

        deleteGoal: build.mutation({
            query:(id)=>({
                url:`/goals/${id}`,
                method:'DELETE',
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