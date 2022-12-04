import React from "react";
import "./App.css";
import { ResultItem } from "./components/ResultItem";
import { SearchBar } from "./components/SearchBar";
import axios from "axios";
import { ResultItemProps } from "./components/ResultItem";

function App() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [firstSearchDone, setFirstSearchDone] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<ResultItemProps[]>([]);

  async function search() {
    if (searchValue === "") {
      return;
    }
    setSearching(true);
    await getGoogleResults();
    setSearching(false);
    setFirstSearchDone(true);
  }

  function parseGoogleResults(data: any) {
    const results = data;
    const items: ResultItemProps[] = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      items.push({
        title: result.title,
        description: result.snippet,
        url: result.link,
        ai_explanation: "",
      });
    }
    setItems(items);
  }

  
  async function getGoogleResults() {
    await axios
      .get("http://localhost:4000/getGoogleResults", {
        params: {
          query: searchValue,
        },
      })
      .then((response) => {
        parseGoogleResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const dummyResult = {
    title: "How to Become a Software Engineer | ComputerScience.org",
    description:
      "Most employers prefer or require software engineers to hold at least a bachelor's degree in a relevant discipline like software engineering, computer science",
    url: "https://www.computerscience.org/software-engineering/careers/software-engineer/how-to-become/",
    ai_explanation: "This is an explanation of how to make a React app",
  };

  return (
    <div className="MainContainer">
      <div
        className={firstSearchDone ? "SearchInProgress" : "SearchBarContainer"}
      >
        <div className="TitleContainer">
          <img src="/logo1024.png" className="LogoIconText"></img>
          <h1 className="CenterText LogoText">search</h1>

        </div>
        <SearchBar
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleOnSearchClick={search}
        />
      </div>
      {firstSearchDone &&
        !searching &&
        <div className="ResultsContainer">
        {items.map((item) => (
            <ResultItem
              title={item.title}
              description={item.description}
              url={item.url}
              ai_explanation={item.ai_explanation}
            />
        ))
        }</div>}
    </div>
  );
}

export default App;
