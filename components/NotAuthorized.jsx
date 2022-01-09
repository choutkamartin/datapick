import Container from "components/layout/Container";
import Title from "components/Title";
import Paragraph from "components/Paragraph";
import Anchor from "components/links/Anchor";

export default function NotAuthorized() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Title headingLevel="h1">Not Authorized</Title>
      <Paragraph>
        Dear user, you are not authorized to view this page. Please, sign in
        before proceeding.
      </Paragraph>
      <Anchor to="/" type="button" variant="primary">
        Back to the Homepage
      </Anchor>
    </Container>
  );
}
