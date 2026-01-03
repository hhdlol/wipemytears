"use server"

import { getUserFromSession } from "@/app/lib/auth";
import Modal from "@/components/Modal";
import ParchmentInbox from "@/components/ParchmentInbox";

export default async function InboxModalPage() {

  const user = await getUserFromSession();

  return (
    <Modal>
      <ParchmentInbox user={user}/>
    </Modal>
  );
}