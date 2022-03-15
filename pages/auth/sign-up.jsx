import { useState } from "react";
import { useForm } from "react-hook-form";
import Head from "next/head";
import LineVertical from "components/LineVertical";
import Input from "components/inputs/Input";
import Heading from "components/Heading";
import Modal from "components/Modal";
import Anchor from "components/Anchor";
import AlertError from "components/alerts/AlertError";
import Button from "components/buttons/Button";
import Form from "components/forms/Form";
import ButtonsOAuth from "components/buttons/ButtonsOAuth";
import Container from "components/Container";
import Card from "components/Card";
import path from "utils/path";

function SignUp() {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
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
      const data = await response.json();
      setError(data.error);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Datapick</title>
        <meta
          name="description"
          content="Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model."
        />
      </Head>
      <Container variant="box" className="py-8 lg:py-36">
        <Card>
          <Card.Head className="text-white">
            <Heading headingLevel="h2">Sign Up</Heading>
          </Card.Head>
          <Card.Body>
            {error && <AlertError title={error} className="mb-6" />}
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
              <LineVertical />
              <div className="text-center">
                <div className="flex flex-col items-center gap-y-4">
                  <ButtonsOAuth />
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Success"
          description="We've send you an email with a verification link."
        />
      </Container>
    </>
  );
}

export default SignUp;
