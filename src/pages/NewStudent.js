import React, { useState } from "react";
import createData from "../config/createData";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const NewStudent = () => {
  const [state, setState] = useState({ name: "", email: "", course: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const submitForm = async () => {
    setLoading((prev) => !prev);
    const r = await createData("student", state);
    setResult(r);
    setLoading((prev) => !prev);
    setState({ name: "", email: "", course: "" });
    navigate('/')
  };

  if (loading) {
    return <Loading />
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="text-center my-4">Add New Student</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={state.name}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, name: ev.target.value }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className='form-control'
                id='email'
                value={state.email}
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, email: ev.target.value }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="form-label">Course</label>
              <select
                id="course"
                className="form-control"
                onChange={(ev) => {
                  setState((prev) => ({ ...prev, course: ev.target.value }));
                }}
                value={state.course}
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
            <div className="mb-4">
              <button type="button" class="btn btn-success" onClick={() => submitForm()}>
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
            <div className="toast-body">Student Added</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewStudent;
