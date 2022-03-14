import Container from "components/Container";
import Heading from "components/Heading";

function ImageAnnotation() {
  return (
    <Container variant="box" className="py-24 flex-col items-start gap-y-4">
      <Heading headingLevel="h1">Image Annotation</Heading>
    </Container>
  );
}

ImageAnnotation.layout = "Public";
export default ImageAnnotation;
