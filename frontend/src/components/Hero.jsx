import { Container, Card } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN-CRUD</h1>
          <p className="text-center mb-4">add or update or delet a card</p>
          <FormContainer />
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
