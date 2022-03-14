import Container from "components/Container";
import Heading from "components/Heading";

function Api() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Heading headingLevel="h1">API</Heading>
    </Container>
  );
}

Api.layout = "Public";
export default Api;
