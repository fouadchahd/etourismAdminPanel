import React from "react";
import CountUp from "react-countup";

const ColoredCard = (props) => {
  const [hovred, setHovred] = React.useState(false);
  const toggleHover = () => {
    setHovred(!hovred);
  };
  return (
    <div
      style={{
        padding: "20px",
        borderTop: "solid 1px #9da5b1",
        borderRight: "solid 1px #9da5b1",
        borderBottom: `solid 1px #9da5b1`,
        borderLeft: `solid 5px ${props.color}`,
        backgroundColor: hovred ? props.bgcolor : "#f1f2f6",
        borderRadius: "10px",
      }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <span
        style={{ fontSize: "25px", color: props.color, marginRight: "7px" }}
      >
        {typeof props.number !== "number" ? (
          props.number
        ) : (
          <CountUp
            start={0}
            end={props.number}
            duration={6}
            separator=","
            startOnMount={false}
          />
        )}
      </span>
      <span style={{ color: "#2f3542", fontSize: "16px" }}>
        {props.children}
      </span>
    </div>
  );
};

export default ColoredCard;
