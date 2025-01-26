import { Navbar } from "./_components/navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-secondary">
      <Navbar />
      {children}
    </div>
  );
}
