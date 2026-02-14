import axios from "axios";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

const studentCookieData = atom(async () => {
  try {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/getUser`,
      {
        withCredentials: true,
      },
    );

    const { name } = userRes.data.jwtDecoded;

    if (!name) {
      return "no data";
    }
    return userRes.data;
  } catch (error) {
    console.error("Error during admin dashboard data fetch:", error);
  }
});
export const loadableStudentCookieData = loadable(studentCookieData);
