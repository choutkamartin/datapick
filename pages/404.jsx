import Head from "next/head";
import Container from "components/Container";
import Heading from "components/Heading";
import Paragraph from "components/Paragraph";
import Anchor from "components/Anchor";

function NotFound() {
  return (
    <>
      <Head>
        <title>Datapick - 404</title>
        <meta
          name="description"
          content="Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model."
        />
      </Head>
      <Container variant="box" className="py-24 flex-col items-start gap-y-4">
        <Heading headingLevel="h1">404</Heading>
        <Paragraph>
          The page you were looking for does not exist. Probably it has been
          deleted?
        </Paragraph>
        <Anchor to="/" type="button" variant="primary">
          Back to the Homepage
        </Anchor>
      </Container>
    </>
  );
}

NotFound.layout = "Public";
export default NotFound;
