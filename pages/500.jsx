import Head from "next/head";
import Container from "components/Container";
import Heading from "components/Heading";
import Paragraph from "components/Paragraph";
import Anchor from "components/Anchor";

function ServerError() {
  return (
    <>
      <Head>
        <title>Datapick - 500</title>
        <meta
          name="description"
          content="Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model."
        />
      </Head>
      <Container variant="box" className="py-24 flex-col items-start gap-y-4">
        <Heading headingLevel="h1">500</Heading>
        <Paragraph>
          We are sorry, but a system error has occurred. Please, try again
          later.
        </Paragraph>
        <Anchor to="/" type="button" variant="primary">
          Back to the Homepage
        </Anchor>
      </Container>
    </>
  );
}

ServerError.layout = "Public";
export default ServerError;
