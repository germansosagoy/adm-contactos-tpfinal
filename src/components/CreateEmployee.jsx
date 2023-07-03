import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';

const CreateEmployee = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    company: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, company} = employee;
    
    // Validar los campos requeridos
    if (!name || !phone || !email || !company) {
      setErrors({
        name: !name && "Por favor, ingresar un nombre",
        phone: !phone && "Por favor, ingresar un teléfono",
        email: !email && "Por favor, ingresar un email",
        company: !company && "Por favor, ingresar una empresa",
      });
      return;
    }
    setShowLoader(true)
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(employee),
    })
      .then(() => {
        alert("¡Guardado exitosamente!");
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
        setShowLoader(false);
      })
      .finally(() => {
        setShowLoader(false);
      })
  };

  const { id, name, phone, email, company, active } = employee;

  return (
    <div>
      {showLoader ? (
        <Loader />
      ) : (
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 style={{ margin: "5px", padding: "9px" }}>
                  Crear Empleado | Contacto
                </h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input value={id} disabled="disabled" className="form-control"/>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Nombre</label>
                      <input value={name} name="name" onChange={handleChange} className="form-control" required
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input value={phone} name="phone" onChange={handleChange} className="form-control" required
                      />
                      {errors.phone && (
                        <span className="text-danger">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={email} name="email" onChange={handleChange} className="form-control" required />
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Empresa</label>
                      <input value={company} name="company" onChange={handleChange} className="form-control" required />
                      {errors.company && (
                        <span className="text-danger">{errors.company}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-check">
                      <input checked={active} name="active" onChange={(e) =>
                          setEmployee((prevEmployee) => ({
                            ...prevEmployee,
                            active: e.target.checked,
                          }))
                        }
                        type="checkbox"
                        className="form-check-input"
                      />
                      <label className="form-check-label">Emp. Activo</label>
                    </div>
                  </div>
                  <br />
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">Guardar</button>
                      <Link to="/" className="btn btn-danger">
                        Cancelar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      )};
    </div>
  );
};

export default CreateEmployee;
