import { useState } from "react";
import {
  loadPopularUrls,
  PopularUrl,
  usePopularUrls,
} from "../../types/popular";
import { shorten } from "../../services/shortenerService";
import { setOnChange } from "../../types/event";
import { Message } from "../../types/message";
import { None, Option, Some } from "@sniptt/monads/build";
import { MessageView } from "../MessageView/MessageView";
import styled from "styled-components";
import { SavedURL, useSavedUrls } from "../../types/savedUrl";
import { SavedURLsView } from "../SavedURLsView/SavedURLsView";
import { PopularURLsView } from "../PopularURLsView/PopularURLsView";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  gap: 12px;
`;

function App() {
  const [popularUrls, setPopularUrls] = usePopularUrls();
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState<Option<Message>>(None);
  const [savedUrls, addUrl] = useSavedUrls();

  return (
    <AppContainer>
      <input
        placeholder="Insert Url To Shorten"
        value={url}
        onChange={setOnChange(setUrl)}
      ></input>
      <button
        onClick={() =>
          onShorten(url, setMessage, setPopularUrls, setUrl, addUrl)
        }
      >
        Shorten
      </button>

      {message.isSome() && (
        <MessageView message={message.unwrap()}></MessageView>
      )}

      <SavedURLsView savedUrls={savedUrls}></SavedURLsView>

      <PopularURLsView popularUrls={popularUrls}></PopularURLsView>
    </AppContainer>
  );
}

export default App;

async function onShorten(
  url: string,
  setMessage: (message: Option<Message>) => void,
  setPopularUrls: (popularUrls: PopularUrl[]) => void,
  setUrl: (url: string) => void,
  addUrl: (url: SavedURL) => void
) {
  const result = await shorten(url);

  const message = result.match<Message>({
    err: (err) => ({ type: "fail", text: err }),
    ok: (code) => {
      loadPopularUrls(setPopularUrls);
      setUrl("");
      addUrl({ url, code });
      return { type: "success", text: `URL has been shortened` };
    },
  });

  setMessage(Some(message));
}
