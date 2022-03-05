import React from "react";
import { Component } from "react";

import { variables } from "./variables";

export class Alumno extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      alumnos: [],
      tituloModal: "",
      IdAlumno: 0,
      NombreAlumno: "",
      CedulaAlumno: "",
      TelefonoAlumno: "",
      ImagenArchivoAlumno: "",
      Curso: "",
      RutaFoto:variables.PHOTO_URL
    };
  }

  refreshList() {
    fetch(variables.API_URL + "/alumno")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ alumnos: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  cambiarnombre = (e) => {
    this.setState({ NombreAlumno: e.target.value });
  };

  cambiarcedula = (e)=> {
    this.setState({ CedulaAlumno: e.target.value });
  }

  cambiartelefono = (e) => {
    this.setState({ TelefonoAlumno: e.target.value });
  }

  cambiarimagen = (e) => {
    this.setState({ ImagenArchivoAlumno: e.target.value });
  }

  cambiarCuarto = (e) => {
    this.setState({ Curso: e.target.value });
  }

  addClick() {
    this.setState({
      tituloModal: "Agregar Alumno",
      IdAlumno: 0,
      NombreAlumno: "",
      CedulaAlumno: "",
      TelefonoAlumno: "",
      ImagenArchivoAlumno: "foto1.png",
      Curso: "",
    });
  }

  editClick(alu) {
    this.setState({
      tituloModal: "Editar Alumno",
      IdAlumno: alu.Id,
      NombreAlumno:alu.Nombre ,
      CedulaAlumno: alu.Cedula,
      TelefonoAlumno: alu.Telefono,
      ImagenArchivoAlumno: alu.ImagenArchivo,
      Curso: alu.Curso
    });
  }

  crearClick() {
    fetch(variables.API_URL + "/curso", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: this.state.NombreCurso,
        Descripcion: this.state.DescripcionCurso,
        Duracion: this.state.DuracionCurso,
        FechaInicio: this.state.FechaInicioCurso,
        FechaFin: this.state.FechaFinCurso,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (err) => {
          alert("Fallo en la operacion");
        }
      );
  }

  actualizarClick() {
    fetch(variables.API_URL + "/curso", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: this.state.IdCurso,
        Nombre: this.state.NombreCurso,
        Descripcion: this.state.DescripcionCurso,
        Duracion: this.state.DuracionCurso,
        FechaInicio: this.state.FechaInicioCurso,
        FechaFin: this.state.FechaFinCurso,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (err) => {
          alert("Fallo en la operacion");
        }
      );
  }

  eliminarClick(id) {
    if (window.confirm("¿Esta seguro que desea elinimar este registro?")) {
      fetch(variables.API_URL + "/curso/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (err) => {
            alert("Fallo en la operacion");
          }
        );
    }
  }

  render() {
    const {
      cursos,
      tituloModal,
      IdCurso,
      NombreCurso,
      DescripcionCurso,
      DuracionCurso,
      FechaInicioCurso,
      FechaFinCurso,
    } = this.state;

    return (
      <div>
        <div>
          <button
            type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#ejemploModal"
            onClick={() => {
              this.addClick();
            }}
          >
            Agregar Curso
          </button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Duracion</th>
                <th>FechaInicio</th>
                <th>FechaFin</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((cur) => (
                <tr key={cur.Id}>
                  <td>{cur.Id}</td>
                  <td>{cur.Nombre}</td>
                  <td>{cur.Descripcion}</td>
                  <td>{cur.Duracion}</td>
                  <td>{cur.FechaInicio}</td>
                  <td>{cur.FechaFin}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-light mr-1"
                      data-bs-toggle="modal"
                      data-bs-target="#ejemploModal"
                      onClick={() => {
                        this.editClick(cur);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="btn btn-light mr-1"
                      onClick={() => {
                        this.eliminarClick(cur.Id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="ejemploModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{tituloModal}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="input-group mb-3">
                    <span className="input-group-text">Nombre Curso</span>
                    <input
                      type="text"
                      className="form-control"
                      value={NombreCurso}
                      onChange={this.cambiarnombre}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Descripcion</span>
                    <input
                      type="text"
                      className="form-control"
                      value={DescripcionCurso}
                      onChange={this.cambiardescripcion}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Duracion</span>
                    <input
                      type="time"
                      className="form-control"
                      value={DuracionCurso}
                      onChange={this.cambiarduracion}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Fecha Inicio</span>
                    <input
                      type="date"
                      className="form-control"
                      value={FechaInicioCurso}
                      onChange={this.cambiarFechaInicio}
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text">Fecha Fin</span>
                    <input
                      type="date"
                      className="form-control"
                      value={FechaFinCurso}
                      onChange={this.cambiarFechaFin}
                    />
                  </div>

                  {IdCurso === 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.crearClick()}
                    >
                      Crear
                    </button>
                  ) : null}

                  {IdCurso !== 0 ? (
                    <button
                      type="button"
                      className="btn btn-primary float-start"
                      onClick={() => this.actualizarClick()}
                    >
                      Actualizar
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
