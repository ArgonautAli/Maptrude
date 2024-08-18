import React from "react";
import { Card, Space } from "antd";
import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="flex justify-center align-middle">
      <Space direction="vertical" size={16}>
        <Card
          title={
            <div className="flex flex-col items-center">
              <span className="text-2xl">😊</span>
              <span>{label}</span>
            </div>
          }
          style={{
            width: 500,
          }}
        >
          <p
            onClick={() => {
              navigate(secondaryRoute);
            }}
          >
            {secondaryText}
          </p>
          <Form
            {...formItemLayout}
            className="mt-4"
            style={{ marginTop: "8px" }}
            form={form}
            onValuesChange={handleFormData} // Handle changes here
          >
            {label === "Signup" ? (
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
            {label === "Signup" ? (
              <Form.Item label="Confirm Password" name="confirmPassword">
                <Input placeholder="re-enter password" type="password" />
              </Form.Item>
            ) : null}
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>
    </div>
  );
};
