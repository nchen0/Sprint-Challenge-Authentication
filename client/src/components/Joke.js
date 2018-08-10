import React from "react";

const Joke = props => {
  console.log("hiiii");
  return (
    <div>
      <p>{props.joke.setup}</p>
    </div>
  );
};

export default Joke;
