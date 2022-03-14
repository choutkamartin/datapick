import Container from "components/Container";
import Heading from "components/Heading";

function Help() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Heading headingLevel="h1">Help</Heading>
    </Container>
  );
}

Help.layout = "Public";
export default Help;
