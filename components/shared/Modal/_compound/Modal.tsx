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
        className={`fixed top-0 left-0 w-full h-full flex justify-center items-center ${backdropProps?.className || ""}`}
      >
        <section className="w-80  flex flex-col justify-between relative bg-white rounded-lg shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)] overflow-hidden">
          {bodyNode && (
            <div className="flex justify-center items-center flex-1">
              {bodyNode}
            </div>
          )}
          {footerNode && (
            <div className="flex  gap-[1px] pt-[1px] bg-background-normal">
              {footerNode.map((node, idx) => {
                return (
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
