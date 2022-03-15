import React, { useState } from "react";

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

      <button className="btn btn-success btn-block py-2">Save</button>
    </form>
  );
};
export default LinkForm;
