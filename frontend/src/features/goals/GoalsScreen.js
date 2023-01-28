import React from 'react'
import Loader from '../../components/Loader'
import {FaSignInAlt } from 'react-icons/fa'
import { Button,Form, Input,notification,Space, Table, Tag } from 'antd';
import { useCreateGoalMutation, useDeleteGoalMutation, useGetGoalsQuery, useUpdateGoalMutation } from './goalsApiSlice';
import { useLoginMutation } from '../auth/authApiSlice';

const GoalsScreen = () => {
    const [createGoal,{isLoading:createLoading}]=useCreateGoalMutation()
    const [updateGoal,{isLoading:UpdateLoading}]=useUpdateGoalMutation()
    const [deleteGoal,{isLoading:deleteLoading}]=useDeleteGoalMutation()
    const {data: goals,isFetching,isSuccess,isError,error}=useGetGoalsQuery()
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message,type) => {
        if( type==='error'){
          return api.error({
            message: `${message}`,
            placement:'top',
          })
        } else if(type==='success'){
          return  api.success({
            message: `${message}`,
            placement:'top',
          })
        }
       
        
      };
    const columns = [
        {
          title: 'Goal',
          dataIndex: 'goal',
          key: 'goal',
          width:'80%'
        },
       
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={handelEdit}>Edit</a>
              <a  onClick={handelDelete}>Delete</a>
            </Space>
          ),
        },
      ];
    const handelDelete=(id)=>{
        console.log(id)
    }
    const handelEdit=(id)=>{
        console.log(id)
    }

      const data = goals && goals.map((goal,index)=>(
        {
            key: `${index}`,
            goal: goal.text,
        }
      ))

    const onFinish = async(values) => {
        try {
            await createGoal(values)
            openNotification(' Goal successfully add','success')

        } catch (error) {
            openNotification(error.data.message,'error')
        }
        
         
        };
    let content
    if(isFetching){
      content=<Loader/>
    } 
    else{
      content=
      <section className='heading'>
      <h1>
        <FaSignInAlt /> Add a new Goal
      </h1>
      <p>Start setting goals</p>
      
      <Form
          onFinish={onFinish}
          
          >


              <Form.Item
                    label="Goal"
                    name="text"
                    rules={[
                      {
                            required: true,
                            message: 'Please input a goal!',
                      },
                    ]}
                        >
                  <Input />
              </Form.Item>
             
              <Form.Item
                    wrapperCol={{
                      offset: 0,
                      span: 25,
                    }}
                  >
                <Button block type="primary" htmlType="submit">
                  Add Goal
                </Button>
              </Form.Item>
      </Form>
      {isFetching?'':(
        <Table columns={columns} dataSource={data} />
      )}
      
    </section>
    }
  return (
    <>   
     {contextHolder}
     {content}
     </>

  )
}

export default GoalsScreen















