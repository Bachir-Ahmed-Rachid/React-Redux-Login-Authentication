import React from 'react'
import {FaSignInAlt } from 'react-icons/fa'
import { Button, Checkbox, Form, Input } from 'antd';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => {
  return (
    <>
       <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                      required: true,
                      message: 'Please  Confirm your password!',
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
    </>
  )
}

export default Login










