import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to WipeMyTears Frontend!</h1>
      <Image
        src="/favicon.ico"
        alt="WipeMyTears Logo"
        width={200}
        height={200}
      />
    </main>
  );
}
