import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import LabelToolbar from "components/layout/label/LabelToolbar";
import LabelSidebarLeft from "components/layout/label/LabelSidebarLeft";
import LabelSidebarRight from "components/layout/label/LabelSidebarRight";
import ToolLabel from "components/label/ToolLabel";
import AlertError from "components/alerts/AlertError";
import path from "utils/path";

export async function getServerSideProps({ query }) {
  const url = process.env.NEXTAUTH_URL;
  const { id } = query;
  const response = await fetch(`${url}/api/projects/get-project?id=${id}`);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

function Label({ data }) {
  const [error, setError] = useState();
  const [project, setProject] = useState(data);
  const [image, setImage] = useState();
  const [complete, setComplete] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [tool, setTool] = useState(null);
  const [brightness, setBrightness] = useState(100);

  const router = useRouter();

  // Run only on start and when project const changes
  useEffect(() => {
    getNextImage();
  }, [project]);

  async function saveDatabase() {
    return await fetch(`/api/projects/save-project?id=${project._id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    });
  }

  async function setCompleted() {
    const response = saveDatabase();

    if (response.ok) {
      router.push(path.projects.dashboard);
    } else {
      const test = await response.json();
      setError(test.error);
    }
  }

  function setImageCompleted(id) {
    const updatedList = project.data.map((item) => {
      if (item._id == id) {
        return { ...item, done: true, data: annotations };
      }
      return item;
    });

    setProject({ ...project, data: updatedList }, () => {});
    saveData();
  }

  function saveData() {}

  const getNextImage = useCallback(() => {
    const image = project.data.find((item) => item.done != true);
    console.log(image);
    if (image != null) {
      setImage(image);
    } else {
      setComplete(true);
    }
  }, [project]);

  function conditional() {
    if (image != null && complete == false) {
      return (
        <ToolLabel
          selectedObject={selectedObject}
          project={project}
          annotations={annotations}
          setAnnotations={setAnnotations}
          tool={tool}
          brightness={brightness}
          image={image}
        />
      );
    } else {
      return <div>Nothing to label</div>;
    }
  }

  if (data === undefined) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="label bg-slate-100 h-screen">
        <LabelToolbar />
        <LabelSidebarLeft setBrightness={setBrightness} brightness={brightness} />
        <div className="flex items-center justify-center p-16">
          {conditional()}
        </div>
        <div>{error && <AlertError title={error} className="mb-6" />}</div>
        <LabelSidebarRight
          annotations={annotations}
          project={project}
          setImageCompleted={setImageCompleted}
          image={image}
          complete={complete}
          setCompleted={setCompleted}
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          setTool={setTool}
          setAnnotations={setAnnotations}
        />
      </div>
    );
  }
}

Label.layout = "Label";
export default Label;
