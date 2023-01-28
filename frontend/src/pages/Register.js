import React from 'react'
import {FaUser } from 'react-icons/fa'
import { Button, Form, Input } from 'antd';
// const formStyle={
//   name:"basic"
// labelCol:{{
//   span: 8,
//     }},
// wrapperCol:{{
//   span: 16,
// }},
// style:{{
//   maxWidth: 600,
// }},
// initialValues:{{
//   remember: true,
// }},
// }
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Register = () => {
  return (
   <>
    <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                              required: true,
                              message: 'Please input your username!',
                        },
                      ]}
                          >
                  <Input />
                </Form.Item>

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

export default Register






