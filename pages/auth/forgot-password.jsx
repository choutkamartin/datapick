import { useForm } from "react-hook-form";
import Head from "next/head";
import Input from "components/inputs/Input";
import Heading from "components/Heading";
import Button from "components/buttons/Button";
import Container from "components/Container";
import Card from "components/Card";
import Paragraph from "components/Paragraph";
import Modal from "components/Modal";
import { useState } from "react";
import AlertError from "components/alerts/AlertError";

function ForgotPassword() {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    if (response.ok) {
      {
        setIsOpen(true);
      }
    } else {
      setError("User not found.");
    }
  };

  return (
    <>
      <Head>
        <title>Forgot password - Datapick</title>
        <meta
          name="description"
          content="Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model."
        />
      </Head>
      <Container variant="box" className="py-8 lg:py-36">
        <Card className="w-full">
          <Card.Head className="text-white">
            <div className="flex flex-col">
              <Heading headingLevel="h2">Forgot Password</Heading>
              <Paragraph className="text-white">
                Forgot password? No problem! Enter your e-mail address you
                signed-up with.
              </Paragraph>
            </div>
          </Card.Head>
          <Card.Body>
            {error && <AlertError title={error} className="mb-6" />}
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
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Success"
          description="We've send you an email with a recovery link."
        />
      </Container>
    </>
  );
}

ForgotPassword.layout = "Public";
export default ForgotPassword;
