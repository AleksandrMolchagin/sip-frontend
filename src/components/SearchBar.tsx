import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

interface SearchBarProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleOnSearchClick: () => void;
}

export function SearchBar(props: SearchBarProps): JSX.Element {

  function handleOnChange(value: string): void {
    props.setSearchValue(value);
  }

  return (
    <>
      <InputGroup>
        <Input  
          placeholder="Ask me anything..."
          onChange={handleOnChange}
          value={props.searchValue}
        />
        <InputGroup.Button
          onClick={props.handleOnSearchClick} 
        >
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </>
  );
}
