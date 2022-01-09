import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Input from "components/inputs/Input";
import Button from "components/buttons/Button";
import Title from "components/Title";
import VerticalLine from "components/VerticalLine";
import Error from "components/alerts/Error";
import Container from "components/layout/Container";
import Card from "components/layout/Card";

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
        <Title headingLevel="h2" className="mb-8">
          Set up your account
        </Title>
        <Error title={error.message} className="mb-6" />
      </main>
    );
  }

  return (
    <Container
      variant="box"
      className="lg:bg-hero lg:bg-center lg:bg-cover lg:bg-gray-600 lg:bg-blend-multiply py-8 lg:py-36"
    >
      <Card className="bg-white lg:border mx-auto">
        <Title headingLevel="h2" className="mb-8">
          Set up your account
        </Title>
        <div className="relative grid md:grid-cols-2 gap-x-36 gap-y-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
              <Input
                label="First Name"
                id="firstName"
                type="text"
                register={register}
                errors={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                id="lastName"
                type="text"
                register={register}
                errors={errors.lastName}
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
          <VerticalLine />
          <div className="h-48 w-full lg:h-full bg-gray-300 rounded bg-people bg-cover bg-blend-multiply bg-center"></div>
        </div>
      </Card>
    </Container>
  );
}

NewUser.layout = "Public";
export default NewUser;

export async function getServerSideProps({ query }) {
  const url = process.env.NEXTAUTH_URL;
  const { token } = query;
  const response = await fetch(`${url}api/auth/verify-token?token=${token}`);
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
