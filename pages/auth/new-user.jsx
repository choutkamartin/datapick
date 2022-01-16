import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Heading from "components/Heading";
import AlertError from "components/alerts/AlertError";
import Container from "components/Container";
import Card from "components/Card";

function NewUser({ user, error }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.passwordRepeat) {
      const response = await fetch("/api/auth/set-password", {
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
          callbackUrl: "http://localhost:3000/user/profile",
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
      <main className="bg-primary-100 p-20 shadow mx-auto min-w-6/12">
        <Heading headingLevel="h2" className="mb-8">
          Set up your account
        </Heading>
        <AlertError title={error.message} className="mb-6" />
      </main>
    );
  }

  return (
    <Container
      variant="box"
      className="py-8 lg:py-36 bg-gradient-to-r from-indigo-500 to-violet-500"
    >
      <Card className="mx-auto w-8/12">
        <Card.Head className="text-white">
          <Heading headingLevel="h2">Set up your account</Heading>
        </Card.Head>
        <Card.Body>
          <div className="relative gap-x-36 gap-y-8">
            <form
              className="flex flex-col gap-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
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
                  label="Name"
                  id="name"
                  type="text"
                  register={register}
                  errors={errors.name}
                  required
                />
              </div>
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

NewUser.layout = "Public";
export default NewUser;

export async function getServerSideProps({ query }) {
  const url = process.env.NEXTAUTH_URL;
  const { token } = query;
  const response = await fetch(`${url}/api/auth/verify-token?token=${token}`);
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
