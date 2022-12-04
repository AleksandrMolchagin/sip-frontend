import './ResultItem.css'

export interface ResultItemProps {
  title: string;
  description: string;
  url: string;
  ai_explanation: string;
  left?: boolean;
  classification?: string
}

export function ResultItem(props: ResultItemProps): JSX.Element {
  return (
    <a className="disable-underline" href={props.url} target="_blank" rel="noopener noreferrer">
        <div className={"ResultItemContainer " + (props.left ? " LeftItem" : " RightItem")  } >
        <a href={props.url} target="_blank" rel="noopener noreferrer">
            <cite role="text"> {props.url} </cite>
        </a>

        <a href={props.url} target="_blank" rel="noreferrer" className='disable-underline'>
            <h3>{props.title}</h3>
        </a>
        <p className='ResultItemDescription'>{props.description}</p>
        <p className='ResultItemExplanationNOitalic'>AI Comment:<span className='ResultItemExplanation'> {props.ai_explanation}</span></p>
        </div>
    </a>
  );
}
