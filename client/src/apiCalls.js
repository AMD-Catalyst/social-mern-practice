import axios from "./api/axios";
import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthAction";
export const loginCall = async (userCredentials, dispatch) => {
  dispatch(LoginStart());
  try {
    const result = await axios.post("auth/login", userCredentials);
    dispatch(LoginSuccess(result.data));
  } catch (error) {
    dispatch(LoginFailure(error));
  }
};
