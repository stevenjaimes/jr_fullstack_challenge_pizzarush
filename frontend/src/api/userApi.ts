import axios from "axios";

export const registerUserInBackend = async (uid: string, email: string, token: string) => {
  await axios.post(
    "http://localhost:3000/api/users/register-user",
    { uid, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
