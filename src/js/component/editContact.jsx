import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const EditContact = (props) => {
  //importamos el context, store y actions mediante el useContext(Context)
  const { store, actions } = useContext(Context);
  //inicializamos navigate con el hook useNavigate
  const navigate = useNavigate(); // redirigir al usuario a otros link (similar a un anchor) (mirar linea 30)

  /* seleccion del contacto a edit
1. creando una funcion en flux que me almacene en el store el contacto a editar **
2. hacer una busqueda del contacto a partir del id 
*/

  //estado que utilizaremos para recoger la informacion que introduce el usuario y mostrar la info del contacto seleccionado
  const [formData, setFormData] = useState({
    id: store.selected?.id || "",
    name: store.selected?.name || "",
    phone: store.selected?.phone || "",
    email: store.selected?.email || "",
    address: store.selected?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => navigate("/"); //nos devuelve a la pagina principal usando useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    actions.editContact(formData);
  };
  return (
    <form className="card form-control" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={formData.name}
        onChange={handleChange}
        name="name"
        placeholder="name"
        required
      />
      <input
        type="text"
        className="form-control"
        value={formData.phone}
        onChange={handleChange}
        name="phone"
        placeholder="phone"
        required
      />
      <input
        type="text"
        className="form-control"
        value={formData.email}
        onChange={handleChange}
        name="email"
        placeholder="email"
        required
      />
      <input
        type="text"
        className="form-control"
        value={formData.address}
        onChange={handleChange}
        name="address"
        placeholder="address"
        required
      />
      <input className="btn btn-success" type="submit" value="enviar" />
      <button className="btn btn-danger" onClick={handleCancel}>
        cancel
      </button>
    </form>
  );
};
