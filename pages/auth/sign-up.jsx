import { useState } from "react";
import { useForm } from "react-hook-form";
import VerticalLine from "components/VerticalLine";
import Input from "components/inputs/Input";
import Title from "components/Title";
import Modal from "components/modals/Modal";
import Anchor from "components/links/Anchor";
import Error from "components/alerts/Error";
import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import OAuthButtons from "components/buttons/OAuthButtons";
import Container from "components/layout/Container";
import Card from "components/layout/Card";
import path from "utils/path";

export default function SignIn() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setIsOpen(true);
    } else {
      const test = await response.json();
      setError(test.error);
    }
  };

  return (
    <Container
      variant="box"
      className="lg:bg-hero lg:bg-center lg:bg-cover lg:bg-gray-600 lg:bg-blend-multiply py-8 lg:py-36"
    >
      <Card className="bg-white lg:border mx-auto">
        <Title headingLevel="h2" className="mb-8">
          Sign Up
        </Title>
        {error && <Error title={error} className="mb-6" />}
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
            <Button type="submit">Continue</Button>
            <Anchor to={path.auth.signIn} type="link">
              Already have an account?
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
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Success"
        description="We've send you an email with a verification link."
      />
    </Container>
  );
}
