import React from "react";
import { Card, Space, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./formBox.css";

export const FormBox = ({
  label,
  secondaryText,
  secondaryRoute,
  formData,
  handleFormData,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4,
    },
  };

  const validatePassword = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Passwords do not match!"));
  };

  return (
    <div className="formBox-cont">
      <Space direction="vertical" size={16}>
        <Card
          title={
            <div className="card-title">
              <span className="emoji">🐙</span>
              <span className="text">{label}</span>
              <span
                className="sub"
                onClick={() => {
                  navigate(secondaryRoute);
                }}
              >
                {secondaryText}
              </span>
            </div>
          }
          style={{
            width: 500,
          }}
        >
          <Form
            {...formItemLayout}
            className="mt-4"
            style={{ marginTop: "8px" }}
            form={form}
            onValuesChange={handleFormData} // Handle changes here
            onFinish={onSubmit} // Handle form submission
          >
            {label === "Sign Up" ? (
              <Form.Item label="Fullname" name="fullname">
                <Input placeholder="input fullname" />
              </Form.Item>
            ) : null}
            <Form.Item label="Username" name="username">
              <Input placeholder="input username" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="input password" type="password" />
            </Form.Item>
            {label === "Sign Up" ? (
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]} // Ensure this field revalidates when password changes
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input placeholder="re-enter password" type="password" />
              </Form.Item>
            ) : null}
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};
