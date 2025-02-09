"use client"
import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";

const Page = () => {
  return (
      <AuthForm
          type="SIGN_IN"
          schema={signInSchema}
          onSubmit={signInWithCredentials}
          defaultValues={{
          email: "",
          password: ""
      } } />
  );
};

export default Page;