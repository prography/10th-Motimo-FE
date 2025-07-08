import {
  Children,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import ModalButton, { ModalButtonProps } from "./ModalButton";

interface ModalContainerProps {
  backdropProps?: HTMLAttributes<HTMLDivElement>;
  bodyNode: ReactNode;
  footerNode?: ReactElement<ModalButtonProps>[];
}

const ModalContainer = ({
  backdropProps,
  bodyNode,
  footerNode,
}: ModalContainerProps) => {
  return (
    <>
      <div
        {...backdropProps}
        className={`fixed bg-neutral-700/50 top-0 left-0 w-full h-full flex justify-center items-center ${backdropProps?.className || ""} z-40`}
      >
        <section
          className="w-80  flex flex-col justify-between relative bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] overflow-hidden"
          onClick={
            // backdrop에 존재하는 click event trigger로 버블링 막기
            (e) => e.stopPropagation()
          }
        >
          {bodyNode && (
            <div className="flex justify-center items-center flex-1">
              {bodyNode}
            </div>
          )}
          <div className="w-full h-[1px] bg-background-normal"></div>
          {footerNode && (
            <div className="flex overflow-visible">
              {footerNode.map((node, idx) => {
                return (
                  <div key={idx} className="flex-1">
                    {idx % 2 == 1 && (
                      <div className="w-[1px]  bg-background-normal"></div>
                    )}
                    <div
                      key={idx}
                      className="flex-1"
                      style={{
                        position: "relative",
                        borderBottomLeftRadius: idx === 0 ? "8px" : 0,
                        borderBottomRightRadius:
                          idx === footerNode.length - 1 ? "8px" : 0,
                      }}
                    >
                      {node}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const Modal = Object.assign(ModalContainer, {
  Button: ModalButton,
});

export default Modal;
export { ModalContainer };
