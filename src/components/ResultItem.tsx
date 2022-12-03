import './ResultItem.css'

export interface ResultItemProps {
  title: string;
  description: string;
  url: string;
  ai_explanation: string;
}

export function ResultItem(props: ResultItemProps): JSX.Element {
  return (
    <div className="ResultItemContainer">
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        <cite role="text"> {props.url} </cite>
      </a>

      <a href={props.url} target="_blank" rel="noreferrer">
        <h3>{props.title}</h3>
      </a>
      <p>{props.description}</p>
      <p>{props.ai_explanation}</p>
    </div>
  );
}
