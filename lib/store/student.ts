import axios from "axios";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const studentCookieData = atom(async () => {
  try {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/getUser`,
      {
        withCredentials: true,
      },
    );

    console.log("User data:", userRes.data);

    const { name } = userRes.data.jwtDecoded;

    if (!name) {
      return "no data";
    }
    return userRes.data;
  } catch (error) {
    console.error("Error during admin dashboard data fetch:", error);
  }
});
export const loadableStudentCookieData = unwrap(studentCookieData);
