import { useForm } from "react-hook-form";
import VerticalLine from "components/VerticalLine";
import Input from "components/inputs/Input";
import Title from "components/Title";
import Button from "components/buttons/Button";
import Container from "components/layout/Container";
import Card from "components/layout/Card";

export default function ForgotPassword() {
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
      className="lg:bg-hero lg:bg-center lg:bg-cover lg:bg-gray-600 lg:bg-blend-multiply py-8 lg:py-36"
    >
      <Card className="w-full bg-white lg:border mx-auto lg:w-full">
        <Title headingLevel="h2" className="mb-8">
          Forgot Password
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
              register={register}
              errors={errors.email}
              required
            />
            <Button type="submit">Continue</Button>
          </form>
          <VerticalLine />
          <div className="w-full h-48 lg:h-72 bg-gray-300 rounded bg-people bg-cover bg-blend-multiply bg-center"></div>
        </div>
      </Card>
    </Container>
  );
}
