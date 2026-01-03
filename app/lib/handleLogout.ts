"use server"

import { deleteSession } from "./auth";

const handleLogout = async () => {
  await deleteSession();
  return {success: true}
}

export default handleLogout