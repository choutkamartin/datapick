import Container from "components/layout/Container";
import Title from "components/Title";
import Paragraph from "components/Paragraph";
import Anchor from "components/links/Anchor";

function ServerError() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Title headingLevel="h1">500</Title>
      <Paragraph>A system error has occured</Paragraph>
      <Anchor to="/" type="button" variant="primary">
        Back to the Homepage
      </Anchor>
    </Container>
  );
}

ServerError.layout = "Public";
export default ServerError;
