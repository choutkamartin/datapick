import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/outline";
import Heading from "components/Heading";
import Anchor from "components/Anchor";
import Button from "components/buttons/Button";
import AlertError from "components/alerts/AlertError";
import Card from "components/Card";
import Paragraph from "components/Paragraph";
import InputFile from "components/inputs/InputFile";
import LineVertical from "components/LineVertical";
import NotAuthorized from "components/NotAuthorized";
import PrivateSidebar from "components/layout/private/PrivateSidebar";
import Form from "components/forms/Form";
import Container from "components/Container";
import { formatBytes } from "utils/helpers";
import path from "utils/path";

function UploadData() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [filesSelected, setFilesSelected] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState([]);

  const changeHandler = (e) => {
    setFilesSelected(e.target.files);
  };

  const createPost = async () => {
    const filesSelectedArray = [];
    Array.from(filesSelected).forEach((item) => {
      const key = `${session.user._id}/${id}/${encodeURIComponent(item.name)}`;
      filesSelectedArray.push({ name: item.name, key: key, size: item.size });
    });
    const res = await fetch(`/api/s3/create-post?user=${session.user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filesSelectedArray),
    });
    return await res.json();
  };

  const uploadToS3 = async (data) => {
    const filesArray = [];
    for (const item of data) {
      for (var i = 0; i < filesSelected.length; i++) {
        const file = filesSelected[i];
        const key = `${session.user._id}/${id}/${encodeURIComponent(
          file.name
        )}`;
        if (item.fields.key === key) {
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
            filesArray.push({ name: file.name, key: key, size: file.size });
            return filesArray;
          } else {
            setError("An error occured when uploading the files to S3.");
          }
        }
      }
    }
  };

  const handleSubmission = async () => {
    const data = await createPost();
    const filesArray = await uploadToS3(data);
    setFilesUploaded((filesUploaded) => [...filesUploaded, ...filesArray]);
    await fetch(`/api/projects/upload-data?projectId=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filesArray),
    });
  };

  const sidebarData = [
    {
      name: "Dashboard",
      href: path.projects.dashboard,
    },
  ];

  if (status === "authenticated") {
    return (
      <div className="flex flex-col lg:flex-row">
        <PrivateSidebar title="Projects" data={sidebarData} />
        <Container variant="box" className="items-center py-32">
          <Card>
            <Card.Head className="flex flex-col">
              <Heading headingLevel="h2" className="text-white mb-3">
                Upload Data
              </Heading>
              <Paragraph className="text-white">
                Upload images you wish to label in your project.
              </Paragraph>
            </Card.Head>
            <Card.Body>
              {error && <AlertError title={error} className="mb-6" />}
              <div className="relative grid grid-cols-2 gap-x-36">
                <Form>
                  <Form.Body className="flex flex-col gap-y-8">
                    <InputFile
                      title="Upload files"
                      onChange={changeHandler}
                      multiple
                      accept="image/png, image/jpeg"
                    />
                    {filesSelected.length != 0 && (
                      <Button type="button" onClick={handleSubmission}>
                        Upload
                      </Button>
                    )}
                  </Form.Body>
                </Form>
                <LineVertical />
                <div>
                  <Heading headingLevel="h4">Uploaded data</Heading>
                  <Paragraph>
                    Below you can find your uploaded files. You can delete also
                    delete the uploaded files.
                  </Paragraph>
                  {filesUploaded.length != 0 ? (
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
                          {filesUploaded.map((item) => {
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

UploadData.layout = "Private";
export default UploadData;
