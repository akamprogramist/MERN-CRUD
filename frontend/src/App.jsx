import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
