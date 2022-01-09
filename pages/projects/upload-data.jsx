import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/outline";
import Title from "components/Title";
import Anchor from "components/links/Anchor";
import Button from "components/buttons/Button";
import { useState } from "react";
import Error from "components/alerts/Error";
import Card from "components/Card";
import Paragraph from "components/Paragraph";
import FileInput from "components/inputs/FileInput";
import VerticalLine from "components/VerticalLine";
import NotAuthorized from "components/NotAuthorized";
import UserSidebar from "components/layout/UserSidebar";
import Form from "components/forms/Form";
import Container from "components/layout/Container";
import { formatBytes } from "utils/helpers";
import path from "utils/path";

function NewProject() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [filesSelected, setFilesSelected] = useState();
  const [files, setFiles] = useState();
  const [uploadedFile, setUploadedFile] = useState([]);

  const changeHandler = (event) => {
    setFilesSelected(event.target.files);
  };

  const listObjects = async () => {
    const res = await fetch(
      `/api/s3/list-objects?prefix=${session.user.email}/${id}/`
    );
    const data = await res.json();
    if (data.Contents) {
      const loop = data.Contents.map((item) => {
        item.Name = item.Key.substr(item.Key.lastIndexOf("/") + 1);
        return item;
      });
      setFiles(loop);
    }
  };

  const handleSubmission = async () => {
    const loop = [];
    Array.from(filesSelected).forEach((item) => {
      loop.push({ name: item.name, size: item.name });
    });
    const res = await fetch(`/api/s3/create-post?user=${session.user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loop),
    });
    const data = await res.json();
    const fileArr = [];

    for (const item of data) {
      for (var i = 0; i < filesSelected.length; i++) {
        const file = filesSelected[i];
        if (item.fields.key === file.name) {
          const { url, fields } = item;
          const formData = new FormData();
          Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          const upload = await fetch(url, {
            method: "POST",
            body: formData,
          });
          if (upload.ok) {
            fileArr.push({ name: file.name, size: file.size });
            console.log("Uploaded successfully!");
          } else {
            console.error("Upload failed.");
          }
        }
      }
    }
    setUploadedFile((uploadedFile) => [...uploadedFile, ...fileArr]);
    await fetch(`/api/projects/upload-data?projectId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fileArr),
    });
  };

  const [error, setError] = useState(null);

  const sidebarData = [
    {
      name: "Dashboard",
      href: path.projects.dashboard,
    },
  ];

  if (status === "authenticated") {
    return (
      <div className="flex flex-col lg:flex-row">
        <UserSidebar title="Projects" data={sidebarData} />
        <Container variant="box" className="w-full items-center py-32">
          <Card>
            <Card.Head className="flex flex-col">
              <Title headingLevel="h2" className="text-white mb-3">
                Upload Data
              </Title>
              <Paragraph className="text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                nam rem sapiente suscipit repellat autem laboriosam culpa
                mollitia corporis ducimus libero accusantium est, aut aspernatur
                quae iste perspiciatis veritatis illum?
              </Paragraph>
            </Card.Head>
            <Card.Body>
              {error && <Error title={error} className="mb-6" />}
              <div className="relative grid grid-cols-2 gap-x-36">
                <Form>
                  <Form.Body className="flex flex-col gap-y-8">
                    <FileInput
                      title="Upload files"
                      onChange={changeHandler}
                      multiple
                      accept="image/png, image/jpeg"
                    />
                    <Button type="button" onClick={handleSubmission}>
                      Upload
                    </Button>
                  </Form.Body>
                </Form>
                <VerticalLine />
                <div>
                  <Title headingLevel="h4">Uploaded data</Title>
                  <Paragraph>
                    Below you can find your uploaded data, which you can delete.
                  </Paragraph>
                  {uploadedFile.length != 0 ? (
                    <div className="rounded-md overflow-hidden border border-gray-300 mt-4 overflow-x-auto">
                      <table className="min-w-full divide-y">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Filename
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Size
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Delete</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white overflow-hidden divide-y">
                          {uploadedFile.map((item) => {
                            return (
                              <tr key={item.name}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name.substring(0, 26)}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {formatBytes(item.size)}
                                  </div>
                                </td>
                                <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a
                                    href="#"
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="mt-4 font-semibold">No uploaded files</div>
                  )}
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Anchor
                to={`/projects/taxonomy?id=${id}`}
                type="button"
                variant="primary"
              >
                Continue
              </Anchor>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    );
  }

  return <NotAuthorized />;
}

NewProject.layout = "Private";
export default NewProject;
