import { MainContext } from "@/context.ts";
import Header from "@/Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/Components/Home";
import { Container } from "@/styled.ts";

export default function App(): JSX.Element {
  return (
    <MainContext.Provider value={{}}>
      <Container>
        <Header />

        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
    </MainContext.Provider>
  );
}
