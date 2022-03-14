import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import LineVertical from "components/LineVertical";
import Input from "components/inputs/Input";
import Heading from "components/Heading";
import Button from "components/buttons/Button";
import Anchor from "components/Anchor";
import AlertError from "components/alerts/AlertError";
import Form from "components/forms/Form";
import ButtonsOAuth from "components/buttons/ButtonsOAuth";
import Card from "components/Card";
import Container from "components/Container";
import path from "utils/path";
import Paragraph from "components/Paragraph";
import PublicLayout from "components/layout/public/PublicLayout";

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

function SignIn() {
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
      callbackUrl: "/user/profile",
    });
  };

  return (
    <Container variant="box" className="py-8 lg:py-36">
      <Card className="w-full">
        <Card.Head className="text-white">
          <div className="flex flex-col">
            <Heading headingLevel="h2" className="text-white mb-3">
              Sign In
            </Heading>
            <Paragraph className="text-white">
              Login to your account with one of the following methods.
            </Paragraph>
          </div>
        </Card.Head>
        <Card.Body>
          {error && <AlertError title={errorMessage} className="mb-6" />}
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
            <LineVertical />
            <div className="text-center">
              <div className="flex flex-col items-center gap-y-4">
                <ButtonsOAuth />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

SignIn.layout = "Public";
export default SignIn;
