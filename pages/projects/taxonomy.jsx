import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ArrowSmRightIcon, XIcon } from "@heroicons/react/outline";
import Title from "components/Title";
import Anchor from "components/links/Anchor";
import Button from "components/buttons/Button";
import Error from "components/alerts/Error";
import Input from "components/inputs/Input";
import Form from "components/forms/Form";
import VerticalLine from "components/VerticalLine";
import Card from "components/Card";
import path from "utils/path";

const objectTypes = [
  {
    id: "box",
    name: "Box",
  },
  {
    id: "polygon",
    name: "Polygon",
  },
  {
    id: "line",
    name: "Line",
  },
  {
    id: "point",
    name: "Point",
  },
];

function Taxonomy() {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState("Lorem ipsum dolor sit atmet");
  const [type, setType] = useState(null);
  const [objects, setObject] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, type) => {
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
      console.log(data);
    } else {
      console.log(data);
    }
  }

  function deleteObject(item) {
    const newObjects = objects.filter((object) => object.name !== item);
    setObject(newObjects);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="bg-white p-12 w-full lg:w-2/12 border-r">
        <Title headingLevel="h3" className="mb-8">
          User
        </Title>
        <nav className="flex flex-col gap-y-6">
          <Anchor
            to={path.user.profile}
            type="link"
            className="flex items-center gap-x-4"
          >
            Profile
          </Anchor>
          <Anchor
            to={path.user.billingInfo}
            type="link"
            className="flex items-center gap-x-4"
          >
            Billing Info
          </Anchor>
          <Anchor
            to={path.user.apiKeys}
            type="link"
            className="flex items-center gap-x-4"
          >
            API keys
          </Anchor>
          <Anchor
            to={path.user.team}
            type="link"
            className="flex items-center gap-x-4"
          >
            Team
          </Anchor>
        </nav>
      </div>
      <div className="xl:px-24 2xl:px-60 py-20 w-full">
        <Card>
          <Card.Head className="bg-gray-300 px-24 py-10 flex gap-x-8 items-center bg-indigo-700">
            <div className="flex flex-col">
              <Title headingLevel="h2" className="text-white mb-3">
                Taxonomy
              </Title>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
                nam rem sapiente suscipit repellat autem laboriosam culpa
                mollitia corporis ducimus libero accusantium est, aut aspernatur
                quae iste perspiciatis veritatis illum?
              </p>
            </div>
          </Card.Head>
          <Card.Body className="px-24 py-16 shadow relative">
            <div>
              {error && <Error title={error} className="mb-6" />}
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
                          {item.name}{" "}
                          <span>
                            (
                            {
                              objects.filter(
                                (object) => object.type === item.id
                              ).length
                            }
                            )
                          </span>
                          <ArrowSmRightIcon className="w-6 absolute right-4" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <VerticalLine />
                <div>
                  {objectTypes.map((item) => {
                    if (item.id === type) {
                      return (
                        <div className="flex flex-col gap-y-4">
                          <Title headingLevel="h3">{item.name}</Title>
                          <Title headingLevel="h4">Objects to annotate</Title>
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
                              label="Object Name"
                              id="name"
                              type="text"
                              register={register}
                              errors={errors.name}
                              required
                            />
                            <Input
                              label="Min Width"
                              id="minWidth"
                              type="number"
                              register={register}
                              errors={errors.minWidth}
                            />
                            <Input
                              label="Min Height"
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
            </div>
          </Card.Body>
          <Card.Footer>
            <Button type="button" onClick={() => createTaxonomy()}>
              Continue
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

Taxonomy.layout = "Private";
export default Taxonomy;
