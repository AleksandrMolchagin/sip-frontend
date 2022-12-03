import React from "react";
import "./App.css";
import { ResultItem } from "./components/ResultItem";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [firstSearchDone, setFirstSearchDone] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);

  function search() {
    if (searchValue === "") {
      return;
    }
    setSearching(false);
    setFirstSearchDone(true);
  }

  const dummyResult = {
    title: "How to Become a Software Engineer | ComputerScience.org",
    description: "Most employers prefer or require software engineers to hold at least a bachelor's degree in a relevant discipline like software engineering, computer science",
    url: "https://www.computerscience.org/software-engineering/careers/software-engineer/how-to-become/",
    ai_explanation: "This is an explanation of how to make a React app",
  };

  return (
    <div className="MainContainer">
      <div
        className={firstSearchDone ? "SearchInProgress" : "SearchBarContainer"}
      >
        <h1 className="CenterText Logo">AI Search</h1>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleOnSearchClick={search}
        />
      </div>
      {firstSearchDone && !searching && <ResultItem {...dummyResult} />}
    </div>
  );
}

export default App;
