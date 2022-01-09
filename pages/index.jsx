import {
  faAws,
  faDhl,
  faFacebookF,
  faGoogle,
  faSpotify,
  faWordpress,
} from "@fortawesome/free-brands-svg-icons";
import Container from "components/layout/Container";
import Title from "components/Title";
import Anchor from "components/links/Anchor";
import Brand from "components/logos/Brand";
import Paragraph from "components/Paragraph";
import path from "utils/path";

const Index = () => {
  return (
    <div className="flex flex-col gap-y-36 py-8 lg:py-24">
      <Container variant="box">
        <div className="bg-hero w-full bg-cover bg-gray-700 bg-blend-multiply bg-center rounded-xl text-gray-100 px-8 lg:px-48 py-24 flex flex-col items-center text-center">
          <Title headingLevel="h1" className="mb-4">
            Get labeled data
            <br />
            <span className="text-indigo-300">fast and easily</span>
          </Title>
          <Paragraph className="mb-3">
            Datapick is a data labelling tool, used for labelling various sorts
            of data, such as images or text. With those data, you can train your
            ML model.
          </Paragraph>
          <div className="flex flex-wrap gap-4">
            <Anchor to="/" type="button" variant="primary">
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
          <Title headingLevel="h2" className="mb-4 uppercase">
            Our Partners
          </Title>
          <div className="flex flex-wrap gap-4">
            <Brand icon={faFacebookF} />
            <Brand icon={faSpotify} />
            <Brand icon={faAws} />
            <Brand icon={faGoogle} />
            <Brand icon={faWordpress} />
            <Brand icon={faDhl} />
          </div>
        </div>
      </Container>
      <Container variant="box">
        <div className="flex flex-col gap-y-4 items-center w-full text-center">
          <Title headingLevel="h2" className="uppercase">
            Ready to get started?
          </Title>
          <div className="flex gap-x-8">
            <Anchor
              to={path.auth.signUp}
              type="button"
              className="w-full"
              variant="primary"
            >
              Sign Up
            </Anchor>
            <Anchor to={path.company.company} type="button" className="w-full">
              Contact Us
            </Anchor>
          </div>
        </div>
      </Container>
    </div>
  );
};

Index.layout = "Public";
export default Index;
