import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Title from "components/Title";
import Button from "components/buttons/Button";
import Input from "components/inputs/Input";
import Form from "components/forms/Form";
import VerticalLine from "components/VerticalLine";
import Paragraph from "components/Paragraph";
import Select from "components/inputs/Select";
import Error from "components/alerts/Error";
import TextArea from "components/inputs/TextArea";
import Card from "components/Card";
import UserSidebar from "components/layout/UserSidebar";
import Container from "components/layout/Container";
import path from "utils/path";

const sidebarData = [
  {
    name: "Dashboard",
    href: path.projects.dashboard,
  },
];

function NewProject() {
  const { data: session, status } = useSession();

  const router = useRouter();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await fetch("/api/projects/new-project", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const { _id } = await response.json();
      router.push(`/projects/upload-data?id=${_id}`);
    } else {
      const test = await response.json();
      setError(test.error);
    }
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        <UserSidebar title="Projects" data={sidebarData} />
        <Container variant="box" className="w-full items-center">
          <Card>
            <Card.Head>
              <div className="flex flex-col">
                <Title headingLevel="h2" className="text-white mb-3">
                  New Project
                </Title>
                <Paragraph className="text-white">
                  Create a new project. Think of a unique descriptive project
                  name. You can also specify a description. Select a project
                  type according to your project needs.
                </Paragraph>
              </div>
            </Card.Head>
            <Card.Body>
              {error && <Error title={error} className="mb-6" />}
              <div className="relative grid md:grid-cols-2 gap-x-48">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Project Name"
                    id="projectName"
                    type="text"
                    register={register}
                    errors={errors.projectName}
                    required
                  />
                  <TextArea
                    label="Project Description"
                    id="projectDescription"
                    type="text"
                    register={register}
                    errors={errors.projectDescription}
                  />
                  <Select
                    label="Project Type"
                    id="projectType"
                    register={register}
                    errors={errors.projectType}
                    required
                  >
                    <option value="image">Image annotation</option>
                    <option value="text">Text Annotation</option>
                    <option value="video">Video Annotation</option>
                  </Select>
                  <Button type="submit">Create project</Button>
                </Form>
                <VerticalLine />
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return <div></div>;
}

NewProject.layout = "Private";
export default NewProject;
