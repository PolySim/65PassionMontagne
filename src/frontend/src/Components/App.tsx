import { MainContext } from "@/context.ts";
import Header from "@/Components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "@/Components/Home";
import { Container } from "@/styled.ts";
import Footer from "@/Components/Footer";
import Hiking from "@/Components/Hiking";

export default function App(): JSX.Element {
  return (
    <MainContext.Provider value={{}}>
      <Container>
        <Header />

        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/hiking/1/:hikingId" element={<Hiking />} />
        </Routes>

        <Footer />
      </Container>
    </MainContext.Provider>
  );
}
