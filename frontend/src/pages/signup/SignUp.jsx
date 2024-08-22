import React, { useState } from "react";
import { Appbar } from "../../components/appBar/Appbar";
import { FormBox } from "../../components/formBox/FormBox";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { signUpUser } from "./helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const onSubmit = async () => {
    await signUpUser(
      formData.fullname,
      formData.username,
      formData.password,
      (data) => successHandler(data),
      (data) => {
        errorHandler(data);
      }
    );
  };

  const successHandler = (data) => {
    toast.success(data.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(data);
  };

  const errorHandler = (data) => {
    console.log("data", data);
    toast.error(data, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Appbar />
      <div className="entry-page flex-grow flex items-center justify-center">
        <FormBox
          label={"Sign Up"}
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
