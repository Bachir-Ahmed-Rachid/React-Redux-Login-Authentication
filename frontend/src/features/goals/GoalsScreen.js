import React, { useState } from 'react'
import Loader from '../../components/Loader'
import {FaSignInAlt } from 'react-icons/fa'
import { Button,Form, Input,Space, Table,Modal } from 'antd';
import { useCreateGoalMutation, useDeleteGoalMutation, useGetGoalsQuery, useUpdateGoalMutation } from './goalsApiSlice';
import { toast } from 'react-toastify';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useModalForm } from 'sunflower-antd';
const { confirm } = Modal;
const GoalsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const [createGoal,{isLoading:createLoading}]=useCreateGoalMutation()
    const [updateGoal,{isLoading:UpdateLoading}]=useUpdateGoalMutation()
    const [deleteGoal,{isLoading:deleteLoading}]=useDeleteGoalMutation()
    const {data: goals,isFetching,isSuccess,isError,error}=useGetGoalsQuery()
    const [form] = Form.useForm();
    const showModal = () => {
      setIsModalOpen(true);
    };
    
    const showPromiseConfirm = (goal) => {
      confirm({
        title: 'Do you want to delete these Goal?',
        icon: <ExclamationCircleFilled />,
        confirmLoading:deleteLoading,
        onOk: async () => {
          try {
            const deletedGoal=await deleteGoal(goal).unwrap()
            console.log(deletedGoal)
            toast.success("Deleted goal successfully!", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark"
            });
          } catch (error) {
            console.log(error)
            toast.error(`${error.data.message}`, {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark"
            });
          }
         
        },
        onCancel() {},
      });
    };
const onFinishEdit=async (goal_id)=>{

  const values={...form.getFieldsValue(),id:goal_id}
  try {
    await updateGoal(values).unwrap()
    toast.success("successfully updated a goal !", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark"
    });


} catch (error) {
  toast.error(`${error.data.message}`, {
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: "dark"
  });
}

  handleOk()
}

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



              <div>
                  <Modal onOk={form.submit} onCancel={handleCancel} open={isModalOpen}  title="useModalForm" okText="submit" width={600}  confirmLoading={UpdateLoading}>
                  
                      <Form form={form} onFinish={()=>onFinishEdit(record.goal_id)} layout="inline" >
                        <Form.Item label="Goal" name="text">
                          <Input  />
                        </Form.Item>
                      </Form>
                  </Modal>
                  <Button onClick={showModal}>Edit</Button>
                </div>




              <Space wrap>
                  <Button onClick={()=>showPromiseConfirm(record.goal_id)}>Delete</Button>
              </Space>
            </Space>
          ),
        },
      ];
 


      const data = goals && goals.map((goal,index)=>(
        {
            key: `${index}`,
            goal: goal.text,
            goal_id:goal._id
        }
      ))

    const onFinish = async(values) => {

        try {
            await createGoal(values).unwrap()
            toast.success("successfully added a goal !", {
              position: toast.POSITION.BOTTOM_RIGHT,
              theme: "dark"
            });
            // form.setFieldsValue({text:''})


        } catch (error) {
          toast.error(`${error.data.message}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark"
          });
        }
        
         
        };
    let content

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
                <Button  loading={createLoading} block type="primary" htmlType="submit">
                  Add Goal
                </Button>
              </Form.Item>
      </Form>
      {isFetching?'':(
        <Table columns={columns} dataSource={data} />
      )}
      
    </section>
    
  return (
    <>   
     {content}
     </>

  )
}

export default GoalsScreen





















    

