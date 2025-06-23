"use client";

import { useState } from "react";
import TextField from "../TextField/TextField";
import Modal from "./_compound/Modal";

import CloseSvg from "../public/Close_SM.svg";

const ModalAddingSubGoal = () => {
  return (
    <>
      <Modal
        bodyNode={<Body />}
        footerNode={[
          <Modal.Button form="subGoalAdding" text="추가하기" color="primary" />,
        ]}
      />
    </>
  );
};
export default ModalAddingSubGoal;

const Body = () => {
  const [subGoal, setSubGoal] = useState("");
  return (
    <div className="w-full p-5 flex flex-col gap-4">
      <div className="w-full inline-flex justify-between items-center">
        <p className="justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
          세부목표 추가
        </p>
        <button type="button" className="w-6 h-6 relative overflow-hidden">
          임시 svg
          {/* <CloseSvg /> */}
        </button>
      </div>
      <form id="subGoalAdding" className="w-full">
        <TextField
          isError={false}
          onChange={(e) => setSubGoal(e.target.value)}
          value={subGoal}
        />
      </form>
    </div>
  );
};
