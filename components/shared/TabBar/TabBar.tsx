import PropTypes from "prop-types";
import "./style.css";
import { HomeIcon } from "../../icons/HomeIcon";

interface TabBarProps {
  type: "two" | "four" | "three" | "one";
  className?: string;
}

export const TabBar = ({ type, className }: TabBarProps) => {
  return (
    <div className={`tab-bar ${className}`}>
      <div className={`frame ${type}`}>
        <div className="div" />

        <div className="div-2">
          {type === "one" && <>목표</>}

          {["four", "three", "two"].includes(type) && <>그룹</>}
        </div>
      </div>

      <div className={`frame-2 type-1-${type}`}>
        {["four", "one", "three"].includes(type) && <div className="frame-3" />}

        {type === "two" && <HomeIcon className="home" color="#8A949E" />}

        <div className="div-3">
          {type === "one" && <>그룹</>}

          {["four", "three"].includes(type) && <>피드</>}

          {type === "two" && <>목표</>}
        </div>
      </div>

      <div className={`frame-4 type-4-${type}`}>
        <div className="frame-5" />

        <div className="div-4">
          {["one", "two"].includes(type) && <>피드</>}

          {["four", "three"].includes(type) && <>마이페이지</>}
        </div>
      </div>

      <div className={`frame-6 type-7-${type}`}>
        {["one", "two"].includes(type) && <div className="frame-7" />}

        {["four", "three"].includes(type) && (
          <HomeIcon className="home" color="#8A949E" />
        )}

        <div className="div-5">
          {["one", "two"].includes(type) && <>마이페이지</>}

          {["four", "three"].includes(type) && <>목표</>}
        </div>
      </div>
    </div>
  );
};

TabBar.propTypes = {
  type: PropTypes.oneOf(["two", "four", "three", "one"]),
};
