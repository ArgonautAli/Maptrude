import React, { useState } from "react";
import { Appbar } from "../../components/appBar/Appbar";
import { FormBox } from "../../components/formBox/FormBox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";

const initialFormData = {
  username: "",
  fullname: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleFormData = (changedValues, allValues) => {
    const key = Object.keys(changedValues)[0];
    const value = changedValues[key];
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onSubmit = async () => {};

  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <div
        className="flex-grow flex items-center justify-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <FormBox
          label={"Signup"}
          secondaryText={"Already a user? Login"}
          secondaryRoute={APP_ROUTES.LOGIN}
          formData={formData}
          handleFormData={handleFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
