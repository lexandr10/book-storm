"use client"
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";

const Page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      onSubmit={signUp}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: ""
      }}
    />
  );
};

export default Page;