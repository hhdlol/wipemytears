"use server"

import { getUserFromSession } from "@/app/lib/auth";
import Modal from "@/components/Modal";
import ParchmentNew from "@/components/ParchmentNew";

export default async function NewModalPage() {

  const user = await getUserFromSession();

  return (
    <Modal>
      <ParchmentNew username={user?.username} usercountry={user?.country}/>
    </Modal>
  );
}