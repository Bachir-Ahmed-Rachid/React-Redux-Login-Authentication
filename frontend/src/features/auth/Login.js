import React from 'react'
import { Button,Form, Input } from 'antd';
import { useLoginMutation } from './authApiSlice';
import {useDispatch} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import {FaSignInAlt } from 'react-icons/fa'
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
const Login = () => {
const dispatch=useDispatch()
const navigate=useNavigate()
const location=useLocation()
const from =location.state?.from?.pathname || "/"
const [login,{isLoading}]=useLoginMutation()


  
// };
const onFinish = async(values) => {
  try {
    const userData=await login(values).unwrap()
      dispatch(setCredentials({...userData}))    
      toast.success("successfully logedin !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark"
      });
       navigate(from,{replace:true})

  } catch (error) {
    console.log(error)
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
      <FaSignInAlt /> Login
    </h1>
    <p>Login and start setting goals</p>
    {isLoading && <Loader/>}
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
  
  return (
    <>
      {content}
    </>

  )
}

export default Login







