import React, { useState } from "react";
import { Appbar } from "../../components/appBar/Appbar";
import { FormBox } from "../../components/formBox/FormBox";
import { loginUser } from "./helper";
import { useDispatch } from "react-redux";
import { setUserData } from "./Login.slice";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormData = {
  username: "",
  password: "",
};

export const Login = () => {
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

  const onSubmit = async () => {
    await loginUser(
      formData.username,
      formData.password,
      (data) => successHandler(data),
      () => {}
    );
  };

  const successHandler = (data) => {
    console.log(data);
    dispatch(
      setUserData({
        userName: data.userName,
        userId: data.userId,
        fullName: data.fullName,
      })
    );
    navigate(APP_ROUTES.MAP, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Appbar />
      <div className="entry-page flex-grow flex items-center justify-center">
        <FormBox
          label={"Log In"}
          secondaryText={"Not a user? Signup"}
          secondaryRoute={APP_ROUTES.SIGNUP}
          formData={formData}
          handleFormData={handleFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
