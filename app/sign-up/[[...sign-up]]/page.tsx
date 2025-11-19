import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignUp />
    </div>
  );
};

export default page;
