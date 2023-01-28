import React from 'react'
import { Button,Form, Input,notification } from 'antd';
import { useLoginMutation } from './authApiSlice';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import {FaSignInAlt } from 'react-icons/fa'
import Loader from '../../components/Loader';
const Login = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const [api, contextHolder] = notification.useNotification();
const [login,{isLoading,isSuccess}]=useLoginMutation()
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

    const onFinish = async(values) => {
      try {
        const userData=await login(values).unwrap()
        console.log('hey')
         dispatch(setCredentials({...userData}))
        
         navigate('/welcome')
         openNotification('successfully login','success')

      } catch (error) {
        console.log(error)
        openNotification(error.data.message,'error')
      }
       
      };


      let content
      if(isLoading){
        content=<Loader/>
      } 
      else{
        content=
        <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
        
        <Form
            onFinish={onFinish}
            
            >


                <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                              required: true,
                              message: 'Please input your email!',
                        },
                      ]}
                          >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                            required: true,
                            message: 'Please input your password!',
                          },
                    ]}
                  >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                      wrapperCol={{
                        offset: 0,
                        span: 25,
                      }}
                    >
                  <Button block type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
        </Form>
      </section>
      }
  return (
    <>
    {contextHolder}
      {content}
    </>

  )
}

export default Login







