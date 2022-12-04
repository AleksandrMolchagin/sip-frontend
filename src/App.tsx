import React from "react";
import "./App.css";
import { ResultItem } from "./components/ResultItem";
import { SearchBar } from "./components/SearchBar";
import axios from "axios";
import { ResultItemProps } from "./components/ResultItem";
import { Message, useToaster, Badge } from "rsuite";

function App() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [firstSearchDone, setFirstSearchDone] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<ResultItemProps[]>([]);
  const [leftCategory, setLeftCategory] = React.useState<string>("");
  const [rightCategory, setRightCategory] = React.useState<string>("");
  const [leftItems, setLeftItems] = React.useState<ResultItemProps[]>([]);
  const [rightItems, setRightItems] = React.useState<ResultItemProps[]>([]);

  const toaster = useToaster();

  async function search() {
    if (searchValue === "") {
      return;
    }
    setSearching(true);
    await getGoogleResults();
    setFirstSearchDone(true);
  }

  function parseClassifiedResults(data: any){
    const results = data.finalResults;
    const items: ResultItemProps[] = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      items.push({
        title: result.title,
        description: result.snippet,
        url: result.link,
        ai_explanation: result.ai_explanation,
        classification: result.classification,
      });
    }
    setLeftCategory(data.categories[0]);
    setRightCategory(data.categories[1]);
    setItems(items);
    setLeftItems(items.filter((item, index) => item.classification?.toLowerCase().includes(leftCategory.toLowerCase())));
    setRightItems(items.filter((item, index) => item.classification?.toLowerCase().includes(rightCategory.toLowerCase())));
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

  //http://localhost:4000/getGoogleResults  
  async function getGoogleResults() {
    await axios
      .post("http://localhost:4000/getClassifiedResults", {
        headers: {
          query: searchValue,
        },
      })
      .then((response) => {
        parseGoogleResults(response.data);
        setSearching(false);
      })
      .catch((error) => {
        console.log(error);
        toaster.push((<Message showIcon type="error" >{error.response.data}</Message>), {placement: "bottomCenter"});
      });
  }

  const dummyResult = {
    title: "How to Become a Software Engineer | ComputerScience.org",
    description:
      "Most employers prefer or require software engineers to hold at least a bachelor's degree in a relevant discipline like software engineering, computer science",
    url: "https://www.computerscience.org/software-engineering/careers/software-engineer/how-to-become/",
    ai_explanation: "This is an explanation of how to make a React app",
  };

  type Color = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';

  function randomColor(): Color {
    const colors: Color[] = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

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
      {
        searching && <h1 className="CenterText"></h1>
      }
      {firstSearchDone &&
        !searching &&
        <>
        <h5 className="CenterText">Our AI identified the following viewpoints</h5>
        <div className="AllResultsContainer">
          <div className="ResultsColumn">
            <Badge content={leftCategory} color={randomColor()} />
            <ListOfItems items={leftItems} left={true} />
          </div>
          <div className="ResultsColumn">
            <Badge content={rightCategory} color={randomColor()} />
            <ListOfItems items={rightItems} left={false} />
          </div>
          </div>
       </>}
    </div>
  );
}

function ListOfItems(props: {items: ResultItemProps[], left: boolean}): JSX.Element{
  return(
    <div className="ItemsContainer">
      {props.items.map((item) => (
            <ResultItem
              title={item.title}
              description={item.description}
              url={item.url}
              ai_explanation={item.ai_explanation}
              left={props.left}
            />
        ))
        }
    </div>
  );
}

export default App;
