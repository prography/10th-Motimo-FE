import "./style.css";

interface ToastProps {
  text: string;
  className?: string;
}

export const Toast = ({
  text,
  className,
}: ToastProps) => {
  return (
    <div className={`toast ${className ?? ""}`}>
      <div className="toast-text">{text}</div>
    </div>
  );
}; 