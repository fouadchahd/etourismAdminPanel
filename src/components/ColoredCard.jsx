import React from "react";
import CountUp from "react-countup";

const ColoredCard = (props) => {
  return (
    <div
      style={{
        padding: "20px",
        borderTop: "solid 1px #9da5b1",
        borderRight: "solid 1px #9da5b1",
        borderBottom: `solid 1px #9da5b1`,
        borderLeft: `solid 5px ${props.color}`,
        borderRadius: "10px",
      }}
    >
      <span
        style={{ fontSize: "25px", color: props.color, marginRight: "7px" }}
      >
        <CountUp
          start={0}
          end={props.number}
          duration={6}
          separator=","
          startOnMount={false}
        />
      </span>
      {props.children}
    </div>
  );
};

export default ColoredCard;
