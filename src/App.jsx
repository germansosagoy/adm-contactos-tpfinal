import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/Loader";
import ListEmployees from "./components/ListEmployees";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
      <h2 style={{ textAlign: "center" }}>Administrador de Contactos | Empleados</h2>
      <br />
      <Routes>
        <Route path="/" element={<ListEmployees />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:empid" element={<EditEmployee />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
