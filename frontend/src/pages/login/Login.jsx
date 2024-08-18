import React, { useState } from "react";
import { Appbar } from "../../components/appBar/Appbar";
import { FormBox } from "../../components/formBox/FormBox";
import { loginUser } from "./helper";
import { useDispatch } from "react-redux";
import { setUserData } from "./Login.slice";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils";

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
      successHandler,
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
    navigate("/map");
    console.log("done");
  };

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
          label={"Login"}
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
