import Container from "components/layout/Container";
import Title from "components/Title";
import Paragraph from "components/Paragraph";
import Anchor from "components/links/Anchor";

function NotFound() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Title headingLevel="h1">404</Title>
      <Paragraph>
        The page you were looking for does not exist. Probably it has been
        deleted?
      </Paragraph>
      <Anchor to="/" type="button" variant="primary">
        Back to the Homepage
      </Anchor>
    </Container>
  );
}

NotFound.layout = "Public";
export default NotFound;
