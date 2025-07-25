"use client";
import Modal from "@/components/shared/Modal/_compound/Modal";
import { ReactNode, SVGProps, useState } from "react";

import CloseSvg from "@/components/shared/public/Close_SM.svg";
import ReactionBest from "@/components/shared/public/reactions/Reaction_Best.svg";
import ReactionCheerUp from "@/components/shared/public/reactions/Reaction_CheerUp.svg";
import ReactionCool from "@/components/shared/public/reactions/Reaction_Cool.svg";
import ReactionGood from "@/components/shared/public/reactions/Reaction_Good.svg";
import ReactionLove from "@/components/shared/public/reactions/Reaction_Love.svg";

import ReactionTypes from "@/types/reactionTypes";

interface ReactionModalProps extends ModalCommon {
  onLeaveReaction: (selectedType: ReactionTypes) => Promise<void>;
}

const ReactionModal = ({ onLeaveReaction, onClose }: ReactionModalProps) => {
  const [selectedType, setSelected] = useState<null | ReactionTypes>(null);
  return (
    <>
      <Modal
        backdropProps={{ onClick: () => onClose() }}
        bodyNode={
          <div className="w-80 p-5 justify-start items-center flex flex-col gap-5 relative bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] overflow-hidden">
            <div className="w-full inline-flex justify-between items-center">
              <p className="justify-start text-label-strong text-base font-bold font-['SUIT_Variable'] leading-tight">
                리액션
              </p>
              <button
                onClick={() => onClose()}
                type="button"
                className="w-6 h-6 relative overflow-hidden"
              >
                <CloseSvg />
              </button>
            </div>
            <section className="flex justify-center items-center flex-wrap gap-2">
              {ReactionSvgs.map(({ comp: ReactionSvg, type }) => {
                const selected = selectedType === type;
                const selectedOther = selectedType && selectedType !== type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelected(type)}
                    type="button"
                    className={`flex justify-center items-center w-[88px] h-[88px] relative bg-background-alternative rounded  outline-1 outline-offset-[-1px]  overflow-hidden
                     ${selected ? " outline-line-strong shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] " : "outline-line-normal"}
                     ${selectedOther ? "opacity-50 " : ""}
                    `}
                  >
                    {ReactionSvg}
                  </button>
                );
              })}
            </section>
          </div>
        }
        footerNode={[
          <Modal.Button
            onClick={() => selectedType && onLeaveReaction(selectedType)}
            key={"leave"}
            text="남기기"
            color="primary"
            disabled={selectedType === null}
          />,
        ]}
      />
    </>
  );
};
export default ReactionModal;

const ReactionSvgs: {
  comp: ReactNode;
  type: ReactionTypes;
}[] = [
  { comp: <ReactionGood />, type: "good" },
  { comp: <ReactionCool />, type: "cool" },
  { comp: <ReactionCheerUp />, type: "cheerUp" },
  { comp: <ReactionBest />, type: "best" },
  { comp: <ReactionLove />, type: "love" },
];

interface ReactionButtonProps {
  ReactionSVG: ReactNode;
  selected: boolean;
}
const ReactionButton = ({ ReactionSVG, selected }: ReactionButtonProps) => {
  return (
    <>
      <div
        className={`w-24 h-24 relative bg-background-alternative rounded  outline-1 outline-offset-[-1px]  overflow-hidden
        ${selected ? " outline-line-strong shadow-[0px_1px_4px_0px_rgba(0,0,0,0.10)] " : "outline-line-normal"}
        `}
      ></div>
    </>
  );
};
