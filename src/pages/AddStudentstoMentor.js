import React, { useState, useEffect } from "react";
import ListData from "../config/ListAll";
import AddingStudentsToMentor from "../config/AddingStudentsToMentor";
import Loading from "./Loading";

const AddStudentstoMentor = () => {
  const [mentor, setMentor] = useState("");
  const [student, setStudent] = useState("");
  const [studentsSelected, setStudentsSelected] = useState([]);
  const [mentorSelected, setMentorSelected] = useState("");
  const [result, setResult] = useState();

  const onMountFunc = () => {
    ListData().then((resultant) => {
      setMentor(resultant.mentor);
      setStudent(
        resultant.student.filter((stud) => {
          // return !stud.mentorAssigned ? stud : null;
          return stud.mentorAssigned ? stud : null;
        })
      );
    });
  };

  useEffect(() => {
    onMountFunc();
  }, []);

  const checkboxChangeFunc = (ev) => {
    setStudentsSelected((prev) => {
      if (ev.target.checked === true) {
        if (!studentsSelected.includes(ev.target.name)) {
          return [...prev, ev.target.name];
        }
      }
      if (ev.target.checked === false) {
        if (studentsSelected.includes(ev.target.name)) {
          return prev.filter((pre) => {
            return pre !== ev.target.name ? pre : null;
          });
        }
      }
    });
  };

  const submitForm = async () => {
    console.log(studentsSelected, "studentsselected");
    console.log(mentorSelected, "mentorSelected");
    const body = {
      mentorId: mentorSelected,
      studentsArray: studentsSelected,
    };
    const r = await AddingStudentsToMentor(body);
    console.log(r, "result on Submit");
    setResult(r);
  };

  return (
    <div className="container">
      {
        student
          ? <div className="row d-flex flex-column mt-5">
            <div className="col">
              <div className="my-4">
                <label htmlFor="mentor" className="form-label">Mentor</label>
                <select
                  className="form-control"
                  id="mentor"
                  onChange={(ev) => {
                    setMentorSelected(ev.target.value);
                  }}
                >
                  <option>Select Mentor</option>
                  {mentor &&
                    mentor.map((ment) => {
                      return (
                        <option value={ment._id} key={ment._id}>
                          {ment.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="col my-4">
              <div>
                <label htmlFor="students" className="form-label ">Select Students</label>
                {student && (
                  <ul style={{ listStyle: "none" }}>
                    {student.map((stud) => {
                      return (
                        <li key={stud._id} className="my-2">
                          <input
                            className='form-check-input mx-2'
                            type="checkbox"
                            name={stud._id}
                            value={stud._id}
                            onChange={(ev) => checkboxChangeFunc(ev)}
                          />
                          {stud.name}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div className="m-3">
                <button type="button" className='btn btn-success mt-3' onClick={() => submitForm()}>
                  Submit
                </button>
              </div>
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
                <div className="toast-body">{result.data}</div>
              </div>
            )}
          </div>
          : <Loading />
      }
    </div>
  );
};

export default AddStudentstoMentor;
