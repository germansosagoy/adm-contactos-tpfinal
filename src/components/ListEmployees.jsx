import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

const ListEmployees = () => {
  const [state, setState] = useState([]);
  const navigate = useNavigate();
  

  const editEmployee = (id) => {
    navigate("/employees/edit/" + id);
  };


  //Eliminar contacto
  const removeFunction = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      fetch("http://localhost:3000/employees/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Eliminado exitosamente!");
          setState((prevState) => prevState.filter((employee) => employee.id !== id));
        })
        .catch((error) => {
          alert(error.message)
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/employees")
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-title">
            <h3 style={{ textAlign: "center" }}>Lista de Empleados</h3>
          </div>
          <div className="card-body">
            <div className="empbtn">
              <Link className="btn btn-primary" style={{ margin: "6px", padding: "6px" }} to={"/employees/create"}>
                Agregar Nuevo (+)
              </Link>
            </div>
            {state.length > 0 ? (
              <table className="table table-bordered table-hover custom-table">
                <thead className="table-primary">
                  <tr className="">
                    <td>ID</td>
                    <td>Nombre Completo</td>
                    <td>Tel: </td>
                    <td>Email</td>
                    <td>Empresa</td>
                    <td className="text-center">Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {state.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.company}</td>
                      <td>
                        <a className="btn btn-success" onClick={() => editEmployee(item.id)}>
                        <i className="bi bi-pencil-fill"></i> Editar
                        </a>
                        <a className="btn btn-danger" onClick={() => removeFunction(item.id)}>
                        <i className="bi bi-trash-fill"></i> Eliminar
                        </a>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay empleados disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListEmployees;
