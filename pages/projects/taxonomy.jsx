import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ArrowSmRightIcon, XIcon } from "@heroicons/react/outline";
import Heading from "components/Heading";
import Container from "components/Container";
import Button from "components/buttons/Button";
import AlertError from "components/alerts/AlertError";
import Input from "components/inputs/Input";
import Form from "components/forms/Form";
import LineVertical from "components/LineVertical";
import PrivateSidebar from "components/layout/private/PrivateSidebar";
import Card from "components/Card";
import path from "utils/path";
import Paragraph from "components/Paragraph";

const objectTypes = [
  {
    id: "box",
    name: "Box",
  },
  {
    id: "polygon",
    name: "Polygon",
  },
];

function Taxonomy() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState();
  const [type, setType] = useState(null);
  const [objects, setObject] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, type) => {
    setError(null);
    reset();
    if (objects.filter((e) => e.name === data.name).length === 0) {
      data.type = type;
      setObject((objects) => [...objects, data]);
    } else {
      setError("Please select a unique name for the object.");
    }
  };

  async function createTaxonomy() {
    const response = await fetch(`/api/projects/create-taxonomy?id=${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objects),
    });
    const data = await response.json();
    if (response.ok) {
      router.push(path.projects.dashboard);
    } else {
      setError(data);
    }
  }

  function deleteObject(item) {
    const newObjects = objects.filter((object) => object.name !== item);
    setObject(newObjects);
  }

  const sidebarData = [
    {
      name: "Dashboard",
      href: path.projects.dashboard,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <PrivateSidebar title="Projects" data={sidebarData} />
      <Container variant="box" className="items-center py-32">
        <Card>
          <Card.Head className="flex-col">
            <Heading headingLevel="h2" className="text-white mb-3">
              Taxonomy
            </Heading>
            <Paragraph className="text-white">
              Select which type of object you would like to label. You can label
              boxes or polygons. Then, type the name of the object and save it.
            </Paragraph>
          </Card.Head>
          <Card.Body className="px-24 py-16 shadow relative">
            {error && <AlertError title={error} className="mb-6" />}
            <div className="relative grid grid-cols-2 gap-x-36">
              <div className="flex flex-col justify-between gap-y-20">
                <div className="flex flex-col gap-y-4">
                  {objectTypes.map((item) => {
                    return (
                      <Button
                        type="button"
                        onClick={() => setType(item.id)}
                        className="relative"
                        key={item.id}
                      >
                        {item.name}
                        <span className="ml-1">
                          (
                          {
                            objects.filter((object) => object.type === item.id)
                              .length
                          }
                          )
                        </span>
                        <ArrowSmRightIcon className="w-6 absolute right-4" />
                      </Button>
                    );
                  })}
                </div>
              </div>
              <LineVertical />
              <div>
                {objectTypes.map((item) => {
                  if (item.id === type) {
                    return (
                      <div className="flex flex-col gap-y-4">
                        <Heading headingLevel="h3">{item.name}</Heading>
                        <Heading headingLevel="h4">Objects to annotate</Heading>
                        <div className="grid grid-cols-3 gap-4">
                          {objects.map((item) => {
                            if (item.type === type) {
                              return (
                                <div
                                  className="relative border border-gray-300 px-4 py-2 rounded flex justify-between items-center text-sm"
                                  key={item.name}
                                >
                                  {item.name}
                                  <XIcon
                                    className="absolute right-4 h-4 w-4 items-center cursor-pointer text-red-600 hover:text-red-700"
                                    onClick={() => deleteObject(item.name)}
                                  />
                                </div>
                              );
                            }
                          })}
                        </div>
                        <Form
                          onSubmit={handleSubmit((data) =>
                            onSubmit(data, type)
                          )}
                          className="items-stretch"
                        >
                          <Input
                            label="Object name"
                            id="name"
                            type="text"
                            register={register}
                            errors={errors.name}
                            required
                          />
                          <Input
                            label="Min. width"
                            id="minWidth"
                            type="number"
                            register={register}
                            errors={errors.minWidth}
                          />
                          <Input
                            label="Min. height"
                            id="minHeight"
                            type="number"
                            register={register}
                            errors={errors.minHeight}
                          />
                          <Button type="submit">Create object</Button>
                        </Form>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <Button type="button" onClick={() => createTaxonomy()}>
              Continue
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}

Taxonomy.auth = true;
Taxonomy.layout = "Private";
export default Taxonomy;
