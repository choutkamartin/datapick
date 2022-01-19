import { useForm } from "react-hook-form";
import Input from "components/inputs/Input";
import Heading from "components/Heading";
import Button from "components/buttons/Button";
import Container from "components/Container";
import Card from "components/Card";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/send-recovery-link", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <Container
      variant="box"
      className="py-8 lg:py-36 bg-gradient-to-r from-indigo-500 to-violet-500"
    >
      <Card className="w-full mx-auto lg:w-6/12">
        <Card.Head className="text-white">
          <Heading headingLevel="h2">Forgot Password</Heading>
        </Card.Head>
        <Card.Body>
          <form
            className="flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="E-mail address"
              id="email"
              type="text"
              register={register}
              errors={errors.email}
              required
            />
            <Button type="submit">Continue</Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

ForgotPassword.layout = "Public";
export default ForgotPassword;
