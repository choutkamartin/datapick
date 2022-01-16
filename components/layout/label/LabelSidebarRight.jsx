import Title from "components/Heading";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useState } from "react";
import Button from "components/buttons/Button";
import { v4 as uuidv4 } from "uuid";

export default function LabelSidebarRight({
  project,
  setImageCompleted,
  image,
  complete,
  setCompleted,
  selectedObject,
  setSelectedObject,
  setTool,
  annotations,
  setAnnotations,
}) {
  const [selected, setSelected] = useState();

  /**
   * A function that sets a selected object based on the object user wants to draw and assigns a simple ID. Sets the tool based on the object type.
   * @param {Object} item The object user wants to annotate.
   */
  function newAnnotation(item) {
    setSelectedObject({ id: uuidv4(), type: item.type, name: item.name });
    setTool(item.type);
  }

  /**
   * A function that deletes the specified single annotation.
   * @param {string} id The ID of the single annotation user wants to delete.
   */
  function deleteAnnotation(id) {
    setAnnotations(annotations.filter((object) => object.id !== id));
  }

  return (
    <div className="sidebar-right flex flex-col justify-between bg-white shadow p-4">
      <div>
        <Title headingLevel="h3" className="mb-3">
          Annotations
        </Title>
        <div className="flex flex-col gap-y-4">
          {project.taxonomy.map((item) => {
            return (
              <div className="p-4 border rounded" key={item.name}>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Title headingLevel="h4">{item.name}</Title>
                  </div>
                  {selected === item.name ? (
                    <ChevronUpIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setSelected(null)}
                    />
                  ) : (
                    <ChevronDownIcon
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setSelected(item.name)}
                    />
                  )}
                </div>
                {selected === item.name && (
                  <div className="mt-3">
                    <div className="flex flex-col gap-y-4 mb-3">
                      {annotations.map((annotation) => {
                        if (annotation.name === item.name)
                          return (
                            <div
                              className="flex justify-between items-center border p-2 rounded"
                              key={annotation.name}
                            >
                              Test
                              <button
                                className="border-0"
                                onClick={() => deleteAnnotation(annotation.id)}
                              >
                                <XIcon className="h-5 w-5 text-red-700" />
                              </button>
                            </div>
                          );
                      })}
                    </div>
                    {selectedObject === null ? (
                      <button
                        className="inline-flex items-center gap-x-4 bg-indigo-700 text-white rounded p-2"
                        onClick={() => newAnnotation(item)}
                      >
                        <PlusIcon className="h-5 w-5 text-white" />
                        Add new annotation
                      </button>
                    ) : (
                      <button
                        className="inline-flex items-center gap-x-4 bg-indigo-700 text-white rounded p-2"
                        onClick={() => setSelectedObject(null)}
                      >
                        <CheckIcon className="h-5 w-5 text-white" />
                        Finish annotation
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {complete === true ? (
        <Button onClick={() => setCompleted()}>Finish</Button>
      ) : (
        <Button onClick={() => setImageCompleted(image._id)}>
          Save and continue
        </Button>
      )}
    </div>
  );
}
