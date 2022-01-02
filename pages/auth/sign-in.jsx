import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import VerticalLine from "components/VerticalLine";
import Input from "components/inputs/Input";
import Title from "components/Title";
import Button from "components/buttons/Button";
import Anchor from "components/links/Anchor";
import Error from "components/alerts/Error";
import Form from "components/forms/Form";
import OAuthButtons from "components/buttons/OAuthButtons";
import Card from "components/layout/Card";
import Container from "components/layout/Container";
import path from "utils/path";

const authErrors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

export default function SignIn() {
  const router = useRouter();
  const { error } = router.query;
  const errorMessage = error && (authErrors[error] ?? authErrors.default);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "http://localhost:3000/user/profile",
    });
  };

  return (
    <Container
      variant="box"
      className="lg:bg-hero lg:bg-center lg:bg-cover lg:bg-gray-600 lg:bg-blend-multiply py-8 lg:py-36"
    >
      <Card className="bg-white lg:border mx-auto">
        <Title headingLevel="h2" className="mb-8">
          Sign In
        </Title>
        {error && <Error title={errorMessage} className="mb-6" />}
        <div className="relative grid md:grid-cols-2 gap-x-36 gap-y-8">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="E-mail address"
              id="email"
              type="text"
              register={register}
              errors={errors.email}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              register={register}
              errors={errors.password}
              required
            />
            <Button type="submit">Continue</Button>
            <Anchor to={path.auth.forgotPassword} type="link">
              Forgot password?
            </Anchor>
          </Form>
          <VerticalLine />
          <div className="text-center">
            <div className="flex flex-col items-center gap-y-4">
              <OAuthButtons />
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
