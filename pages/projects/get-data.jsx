import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Heading from "components/Heading";
import Paragraph from "components/Paragraph";
import Card from "components/Card";
import PrivateSidebar from "components/layout/private/PrivateSidebar";
import Container from "components/Container";
import Button from "components/buttons/Button";
import SpinnerLoad from "components/SpinnerLoad";
import BlockCode from "components/BlockCode";
import path from "utils/path";

const sidebarData = [
  {
    name: "Dashboard",
    href: path.projects.dashboard,
  },
];

function GetData() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = router.query;
  useEffect(() => {
    fetchData();
  }, [id]);

  function fetchData() {
    setLoading(true);
    fetch(`/api/projects/get-data?id=${id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(JSON.stringify(result, null, 2));
          setLoading(false);
          console.log(result);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }

  function copyCode() {
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <PrivateSidebar title="Projects" data={sidebarData} />
      <Container variant="box" className="items-center py-32">
        <Card>
          <Card.Head>
            <div className="flex flex-col">
              <Heading headingLevel="h2" className="text-white mb-3">
                Get Data
              </Heading>
              <Paragraph className="text-white">
                Get your data by copying the JSON format below. Note that, you
                can also call the API endpoint directly.
              </Paragraph>
            </div>
          </Card.Head>
          <Card.Body>
            <Paragraph className="mb-3">
              The JSON format below contains all your annotated images, aswell
              as the annotations itself, positions and dimensions.
            </Paragraph>
            {loading === true ? (
              <SpinnerLoad />
            ) : (
              <BlockCode className="mb-3">{data}</BlockCode>
            )}
            <Button onClick={copyCode} disabled={copied}>
              {copied === false ? "Copy" : "Copied"}
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

GetData.auth = true;
GetData.layout = "Private";
export default GetData;
