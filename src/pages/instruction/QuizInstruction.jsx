import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { verifyAuth } from "../../helpers";
import Navbar from "../../components/navbar/Navbar";
import TrInput from "../../components/tables/TrInput";

const QuizInstruction = () => {
  const { role } = useParams();
  const [state, setState] = useState({
    name: "",
    authData: {},
  });

  useEffect(() => {
    const authData = verifyAuth();
    setState((prevState) => ({
      ...prevState,
      authData,
    }));
  }, [role]);

  const handleOnChange = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section>
      <Navbar authData={state?.authData} page={`${role}-dashboard`} />
      <div className="header-columns-container">
        <h2 className="header"> Test Information </h2>
        <h2 className="header"> Instructions to Learner </h2>
      </div>

      <div className="content-columns-container">
        <div className="content">
          <table>
            <tbody>
              <TrInput
                type="name"
                name="name"
                label="Name"
                labelClassName="td-label"
                required={true}
                value={state?.name}
                onChange={handleOnChange}
              />
              <TrInput
                label="Level"
                labelValue="GCSE"
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
              <TrInput
                label="Tier"
                labelValue="..."
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
              <TrInput
                label="Description"
                labelValue="Foundation"
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
              <TrInput
                label="Questions"
                labelValue="21"
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
              <TrInput
                label="Calculator"
                labelValue="Allowed"
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
              <TrInput
                label="Total Marks"
                labelValue="..."
                labelClassName="td-label"
                labelValueClassName="td-value"
              />
            </tbody>
          </table>
        </div>
        <div className="content">
          <div>
            <p> - In front of you, you should have a pen </p>
            <p> - In front of you, you should have a paper </p>
            <p> - In front of you, you should have a calculator </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizInstruction;
