import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface WebSocketProps {
    setWebSocketUserID : (userID : string) => void;
    setProgress : (progress : number) => void;
}

interface Message {
    type: string;
    data: any;
}

export function WebSockets(props: WebSocketProps): JSX.Element {

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [URL, setURL] = useState("ws://localhost:4500");

  const [messageHistory, setMessageHistory] = useState<any>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sendMessage, lastMessage, readyState } = useWebSocket(URL);
    

  useEffect(() => {
    if (lastMessage !== null) {
        setMessageHistory([...messageHistory, lastMessage.data]);

        const message = lastMessage
        let data = JSON.parse(message.data);
        const dataFromServer: Message = data
        switch (dataFromServer.type) {
            case "connected":
                props.setWebSocketUserID(dataFromServer.data);
                break;
            case "progress":
                props.setProgress(dataFromServer.data);

        }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


    return (
      <>
        <div style={{display: "none", flexDirection: "column"}}>
        <div className="ToastContainerAccess">
        </div>

          <span>The WebSocket is currently {connectionStatus}</span>
          {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
          <ul>
            {messageHistory.map((message: { data: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, idx: Key | null | undefined) => (
              <span key={idx}>{message ? message.data : null}</span>
            ))}
          </ul>
        </div>
        </>
      );
}
