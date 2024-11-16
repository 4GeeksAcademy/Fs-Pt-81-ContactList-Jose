const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      url: "https://playground.4geeks.com/contact",
    },
    actions: {
      // getActions() nos permite llamar una accion dentro de otra accion
      // getStore() nos permite traernos a una accion variables del store
      selectContact: (contact) => setStore({ selected: contact }),
      createAgenda: async () => {
        try {
          const resp = await fetch(getStore().url + "/agendas/joselito", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!resp.ok) throw new Error("Error creando agenda");
          //si no hay errores, ocurre getActions().getAgenda()
          getActions().getAgenda(); // Actualizar lista (en este caso de tareas)
        } catch (error) {
          console.error(error);
        }
      },
      getAgenda: async () => {
        try {
          const resp = await fetch(getStore().url + "/agendas/joselito");
          if (resp.status === 404) return getActions().createAgenda(); //si no existe la agenda, se ejecuta createAgenda para crearla
          if (!resp.ok) throw new Error("Error haciendo fetch en agenda");
          const data = await resp.json();
          setStore({ contacts: data.contacts });
        } catch (error) {
          console.error(error);
        }
      },
      createContact: async (contact) => {
        try {
          const resp = await fetch(
            getStore().url + "/agendas/joselito/contacts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contact), //se le da el body del componente Contact
            }
          );
          if (!resp.ok) throw new Error("Error creando el contacto");
          return getActions().getAgenda();
        } catch (error) {
          console.error(error);
        }
      },
      editContact: async (contact) => {
        try {
          const resp = await fetch(
            getStore().url + "/agendas/joselito/contacts/" + contact.id,
            {
              //necesita ID
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contact),
            }
          );
          if (!resp.ok) throw new Error("Error editando el contacto");
          //si no hubieron errores, pedimos la lista actualizada de tareas
          getActions().getAgenda();
        } catch (error) {
          console.error(error);
        }
      },
      deleteContact: async (id) => {
        try {
          const resp = await fetch(
            getStore().url + "/agendas/joselito/contacts/" + id,
            {
              method: "DELETE",
            }
          );
          if (!resp.ok) throw new Error("Error borrando el contacto");
          getActions().getAgenda();
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
