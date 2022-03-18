import React, { useState, useEffect } from "react";
import db from "../firebase";
import {
    getDoc,
    doc
 } from "firebase/firestore";


const LinkForm = (props) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(
    initialStateValues,
  );

  const handleInputChange = (e) => {
      const {name, value} = e.target 
      //name corresponde al input que ejecuta el target
      setValues ({...values, [name]:value})
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({...initialStateValues})
  };

  const getLinkById = async(id) => {
const docEdit = await getDoc(doc(db, "links", id));
    setValues({...docEdit.data()})
  }

  useEffect(()=>{
      //primero se chequea si no hay id para establecer los valores en cero y crearlo, caso contrario seteamos en para editar
if (props.currentId === ""){
    setValues({...initialStateValues})
} else {
   getLinkById(props.currentId)
}
  }, [props.currentId])

  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group py-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="https://"
          name="url"
          value={values.url}
        />
      </div>

      <div className="form-group input-group py-2">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Website name"
          name="name"
          value={values.name}
        />
      </div>

      <div className="form-group py-2">
        <textarea
          onChange={handleInputChange}
          name="description"
          rows="3"
          className="form-control"
          placeholder="Write a description"
          value={values.description}
        />
      </div>

      <button className="btn btn-success btn-block py-2">
          {props.currentId === "" ? "Save" : "Edit"} </button>
    </form>
  );
};
export default LinkForm;
