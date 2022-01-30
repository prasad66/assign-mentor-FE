import React, { useState } from "react";
import createData from "../config/createData";
import { useNavigate } from 'react-router-dom'
import Loading from "./Loading";

const NewMentor = () => {
  const [state, setState] = useState({ name: "", email: "", expertise: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const submitForm = async () => {
    setLoading((prev) => !prev);
    const r = await createData("mentor", state);
    setResult(r);
    setLoading((prev) => !prev);
    setState({ name: "", email: "", expertise: "" })
    navigate('/')
  };

  if (loading) {
    return <p><Loading /></p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center my-4">Add New Mentor</h2>
          <form className="form d-flex flex-column align-content-center">
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={state.name}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, name: ev.target.value }));
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id='email'
                value={state.email}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, email: ev.target.value }));
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="expertise" className="form-label">Expertise</label>
              <select
                id="expertise"
                className="form-control"
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, expertise: ev.target.value }));
                }}
                value={state.expertise}
                required
              >
                <option value="">Select any value</option>
                <option value="react">react</option>
                <option value="nodejs">nodejs</option>
                <option value="frontend">frontend</option>
                <option value="backend">backend</option>
                <option value="gameDev">gameDev</option>
                <option value="MERN stack	">MERN stack</option>
                <option value="dataScience">dataScience</option>
              </select>
            </div>
            <div>
              <button type="button" className='btn btn-success' onClick={() => submitForm()}>
                Submit
              </button>
            </div>
          </form>
        </div>
        {result && (
          <div
            id="liveToast"
            className={result.status === 200 ? "toast show" : "toast"}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Status</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">Mentor Added</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMentor;
