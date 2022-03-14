import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import Anchor from "components/Anchor";
import PrivateSidebar from "components/layout/private/PrivateSidebar";
import SpinnerLoad from "components/SpinnerLoad";
import path from "utils/path";
import { faTasks } from "@fortawesome/free-solid-svg-icons";

const sidebarData = [
  {
    name: "Dashboard",
    href: path.projects.dashboard,
    icon: faTasks,
  },
];

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/projects/list-projects")
      .then((res) => res.json())
      .then(
        (result) => {
          setProjects(result);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  };

  const state = (project) => {
    if (project.data.length != 0 && project.taxonomy.length != 0) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      );
    } else {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Not active
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <PrivateSidebar title="Projects" data={sidebarData} />
      <div className="xl:px-24 2xl:px-60 py-20 w-full">
        {loading === true ? (
          <SpinnerLoad />
        ) : (
          <div className="flex flex-col items-start gap-4 mb-4">
            {projects.length != 0 ? (
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Project Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Progress
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            State
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((item) => (
                          <tr key={item.name}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {item.type}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {format(new Date(item.date), "dd.MM.yyyy")}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {
                                item.data.filter(
                                  (object) => object.done === true
                                ).length
                              }
                              /{item.data.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {state(item)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href="#">
                                <a className="text-indigo-600 hover:text-indigo-900 mr-6">
                                  Edit
                                </a>
                              </Link>
                              {item.data.filter(
                                (object) => object.done === true
                              ).length === item.data.length ? (
                                <Link
                                  href={`/projects/get-data?id=${item._id}`}
                                >
                                  <a className="text-indigo-600 hover:text-indigo-900">
                                    Get data
                                  </a>
                                </Link>
                              ) : (
                                <Link
                                  href={`${path.projects.label}?id=${item._id}`}
                                >
                                  <a className="text-indigo-600 hover:text-indigo-900">
                                    Label
                                  </a>
                                </Link>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 font-semibold">You have no projects.</div>
            )}
            <Anchor to="/projects/new-project" type="button" variant="primary">
              Create project
            </Anchor>
          </div>
        )}
      </div>
    </div>
  );
}

Dashboard.auth = true;
Dashboard.layout = "Private";
export default Dashboard;
