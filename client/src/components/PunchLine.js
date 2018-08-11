import React from "react";

const PunchLine = props => {
  let id = props.match.params.id;
  let items = JSON.parse(localStorage.getItem("joke"));
  let joke = items.filter(item => {
    return item.id == id;
  });
  return (
    <div>
      <p>{joke[0].punchline}</p>
    </div>
  );
};

export default PunchLine;
