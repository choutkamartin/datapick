import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Heading from "components/Heading";
import AlertError from "components/alerts/AlertError";
import Container from "components/Container";
import Card from "components/Card";

function SetNewPassword({ user, error }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.passwordRepeat) {
      const response = await fetch("/api/auth/set-new-password", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          callbackUrl: "/user/profile",
        });
      } else {
      }
    } else {
      setError("password", {
        type: "manual",
        message: "Passwords don't match.",
      });
    }
  };

  if (error) {
    return (
      <Container
        variant="box"
        className="py-8 lg:py-36 bg-gradient-to-r from-indigo-500 to-violet-500"
      >
        <Card>
          <Card.Head className="text-white">
            <Heading headingLevel="h2">Set up your account</Heading>
          </Card.Head>
          <Card.Body>
            <AlertError title={error.message} className="mb-6" />
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container
      variant="box"
    >
      <Card className="w-full">
        <Card.Head className="text-white">
          <Heading headingLevel="h2">Set up your account</Heading>
        </Card.Head>
        <Card.Body>
          <div className="relative gap-x-36 gap-y-8">
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="E-mail address"
                id="email"
                type="text"
                placeholder="email@email.com"
                register={register}
                errors={errors.email}
                defaultValue={user.email}
                readOnly
                required
              />
              <Input
                label="Password"
                id="password"
                type="password"
                register={register}
                errors={errors.passwordRepeat}
                required
              />
              <Input
                label="Repeat password"
                id="passwordRepeat"
                type="password"
                register={register}
                errors={errors.passwordRepeat}
                required
              />
              <Button type="submit">Continue</Button>
            </form>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SetNewPassword;

export async function getServerSideProps({ query }) {
  const url = process.env.NEXTAUTH_URL;
  const { token } = query;
  const response = await fetch(
    `${url}/api/auth/verify-recovery-token?token=${token}`
  );
  if (!response.ok) {
    const error = await response.json();
    return {
      props: {
        error,
      },
    };
  }
  const user = await response.json();
  return {
    props: {
      user,
    },
  };
}
