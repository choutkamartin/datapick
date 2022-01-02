import Container from "components/layout/Container";
import Title from "components/Title";
import Paragraph from "components/Paragraph";
import Anchor from "components/links/Anchor";

export default function NotFound() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Title headingLevel="h1">404</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, ea.
        Veniam, facilis sapiente! Ducimus id laudantium, saepe rerum magni
        deserunt magnam ullam, repellendus nihil harum non facilis quidem
        placeat qui!
      </Paragraph>
      <Anchor to="/" type="button">
        Back to the Homepage
      </Anchor>
    </Container>
  );
}
