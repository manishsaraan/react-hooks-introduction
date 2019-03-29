import React, { useEffect, useState } from "react";
import Summary from "./Summary";
import useHttp from "../hooks/http";

const Character = props => {
  console.log(
    "Sending Http request for new character with id " + props.selectedChar
  );

  const [isLoading, fetchedData] = useHttp(
    "https://swapi.co/api/people/" + props.selectedChar,
    [props.selectedChar]
  );
  let loadedCharacter = null;
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }

  // componentDidUpdate
  useEffect(() => {
    console.log("fetching data");
    // work as componentWillUnmount
    return () => {
      console.log("cleaning up");
    };
  }, [props.selectedChar]);

  // compnentdidMount
  useEffect(() => {
    console.log("componentDidMount");
    // componentdidUnmount
    return () => {
      console.log("componentdidunmount");
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

// with memo component will not re-render untill input changes
export default React.memo(Character);
