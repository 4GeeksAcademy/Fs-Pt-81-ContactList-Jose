import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const ContactCard = (props) => {
  //importamos el context, store y actions mediante el useContext(Context)
  const { store, actions } = useContext(Context);
  //inicializamos navigate con el hook useNavigate
  const navigate = useNavigate();
  //llamamos la accion deleteContact de las acciones de Flux y le pasmos el contactId que recibimos mediante props
  const handleDelete = () => actions.deleteContact(props.contactId);

  const handleEdit = () => {
    //primero buscamos el contacto
    let contact = store.contacts.filter((el) => el.id === props.contactId)[0];
    //ejecutamos la funcion para seleccionar el contacto y le pasamos el contacto que queremos
    actions.selectContact(contact);
    //usamos el navigate para ir a la vista de edicion. Completamos la ruta con el contactId recibido por props
    navigate("/edit/" + props.contactId);
  };

  return (
    <div className="card">
      <div className="d-flex">
        <img
          width={"150px"}
          src="https://imgs.search.brave.com/JAHeWxUYEwHB7KV6V1IbI9oL7wxJwIQ4Sbp8dHQL09A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjAx/MzkxNTc2NC9waG90/by91c2VyLWljb24t/aW4tZmxhdC1zdHls/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9UEotMnZvUWZh/Q3hhZUNsdzZYYlVz/QkNaT3NTTjlIVWVC/SUg1Qk82VmRScz0"
          alt={props.name}
        />
        <div>
          <p>name: {props.name}</p>
          <p>phone: {props.phone}</p>
          <p>email: {props.email} </p>
          <p>address: {props.address}</p>
          <button onClick={handleEdit} className="btn btn-warning">
            edit
          </button>

          <button onClick={handleDelete} className="btn btn-danger">
            delete
          </button>
        </div>
      </div>
    </div>
  );
};
