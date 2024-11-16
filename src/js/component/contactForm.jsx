import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";

export const ContactForm = () => {
  //importamos el context, store y actions mediante el useContext(Context)
  const { store, actions } = useContext(Context);
  //inicializamos navigate con el hook useNavigate
  const navigate = useNavigate();

  /* estados: 
1. crear un objeto que las propiedades sean los valores de los inputs
2. crear 4 estados separados
*/

  //estado que utilizaremos para recoger la informacion que introduce el usuario
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  //extraemos del e.target los valores de name y value para utilizarlos cuando actualizamos la info en formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //usamos navigate para ir a la ruta /
  const handleCancel = () => navigate("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    //llamamos la funcion en flux, actions, para crear contactos
    actions.createContact(formData);
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
