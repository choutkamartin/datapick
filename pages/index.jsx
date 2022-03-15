import {
  faAws,
  faDhl,
  faFacebookF,
  faGoogle,
  faSpotify,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import Container from "components/Container";
import Heading from "components/Heading";
import Anchor from "components/Anchor";
import IconBrand from "components/icons/IconBrand";
import Paragraph from "components/Paragraph";
import path from "utils/path";

function Index() {
  return (
    <>
      <Head>
        <title>Datapick - Data labelling tool</title>
        <meta
          name="description"
          content="Datapick is a tool for labelling raw data. These labelled data can be later used for a machine learning model."
        />
      </Head>
      <div className="flex flex-col gap-y-36 py-8 lg:py-24">
        <Container variant="box">
          <div className="bg-hero w-full bg-cover bg-gray-700 bg-blend-multiply bg-center rounded-xl text-gray-100 px-8 lg:px-48 py-24 flex flex-col items-center text-center">
            <Heading headingLevel="h1" className="mb-4">
              Get labeled data
              <br />
              <span className="text-indigo-300">fast and easily</span>
            </Heading>
            <Paragraph className="mb-3">
              Datapick is a data labelling tool, used for labelling various
              sorts of data, such as images or text. With those data, you can
              train your ML model.
            </Paragraph>
            <div className="flex flex-wrap gap-4">
              <Anchor to={path.auth.signUp} type="button" variant="primary">
                Get started
              </Anchor>
              <Anchor to="/" type="button">
                Take a look
              </Anchor>
            </div>
          </div>
        </Container>
        <Container variant="box">
          <div className="flex flex-col w-full items-center">
            <Heading headingLevel="h2" className="mb-4 uppercase">
              Our Partners
            </Heading>
            <div className="flex flex-wrap gap-4">
              <IconBrand icon={faFacebookF} />
              <IconBrand icon={faSpotify} />
              <IconBrand icon={faAws} />
              <IconBrand icon={faGoogle} />
              <IconBrand icon={faWordpress} />
              <IconBrand icon={faDhl} />
            </div>
          </div>
        </Container>
        <Container variant="box">
          <div className="flex flex-col gap-y-4 items-center w-full text-center">
            <Heading headingLevel="h2" className="uppercase">
              Ready to get started?
            </Heading>
            <div className="flex gap-x-8">
              <Anchor
                to={path.auth.signUp}
                type="button"
                className="w-full"
                variant="primary"
              >
                Sign Up
              </Anchor>
              <Anchor to={path.auth.signIn} type="button" className="w-full">
                Sign In
              </Anchor>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

Index.layout = "Public";
export default Index;
