import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context); // store: recoge info de la store   actions: agregar, eliminar o actualizar contactos, etc..

  return (
    <div className="text-center mt-5">
      {store.contacts?.map((contact) => (
        <ContactCard
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          email={contact.email}
          address={contact.address}
          contactId={contact.id}
        />
      ))}
    </div>
  );
};
