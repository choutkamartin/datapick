import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LineVertical from "components/LineVertical";
import Card from "components/Card";
import PictureProfile from "components/PictureProfile";
import Container from "components/Container";
import PrivateSidebar from "components/layout/private/PrivateSidebar";
import AlertError from "components/alerts/AlertError";
import AlertSuccess from "components/alerts/AlertSuccess";
import NotAuthorized from "components/NotAuthorized";
import Heading from "components/Heading";
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import Form from "components/forms/Form";
import Paragraph from "components/Paragraph";
import path from "utils/path";

const sidebarData = [
  {
    name: "Profile",
    href: path.user.profile,
  },
];

function Profile() {
  const { data: session, status } = useSession();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    const response = await fetch("/api/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      setResult(data);
    } else {
      setError(data);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col lg:flex-row">
        <PrivateSidebar title="User" data={sidebarData} />
        <Container variant="box" className="w-full items-center py-24">
          <Card>
            <Card.Head className="flex-col lg:flex-row gap-y-4 gap-x-8 lg:items-center">
              <PictureProfile
                src={session.user.image}
                alt="Profile picture"
                className="h-12 w-12 ring-white"
              />
              <div>
                <Heading headingLevel="h2" className="text-white">
                  Hi, {session.user.name}
                </Heading>
                <Paragraph className="text-white">
                  On this page you can edit your profile.
                </Paragraph>
              </div>
            </Card.Head>
            <Card.Body>
              {result && <AlertSuccess title={result.message} className="mb-6" />}
              {error && <AlertError title={error.message} className="mb-6" />}
              <Form className="relative grid lg:grid-cols-2 gap-x-28">
                <Form.Body>
                  <Input
                    label="E-mail address"
                    id="email"
                    type="text"
                    register={register}
                    errors={errors.email}
                    defaultValue={session.user.email}
                    readOnly
                    required
                  />
                  <Input
                    label="Name"
                    id="name"
                    type="text"
                    register={register}
                    errors={errors.name}
                    defaultValue={session.user.name}
                    required
                  />
                </Form.Body>
                <LineVertical />
                <Form.Body>
                  <Input
                    label="Current password"
                    id="currentPassword"
                    type="password"
                    register={register}
                    errors={errors.currentPassword}
                  />
                  <Input
                    label="New password"
                    id="newPassword"
                    type="password"
                    register={register}
                    errors={errors.currentPassword}
                  />
                  <Input
                    label="Repeat new password"
                    id="repeatNewPassword"
                    type="password"
                    register={register}
                    errors={errors.currentPassword}
                  />
                </Form.Body>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    );
  }

  return <NotAuthorized />;
}

Profile.layout = "Private";
export default Profile;
