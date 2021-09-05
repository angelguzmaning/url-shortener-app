import { Fragment } from "react";
import { serverUrl } from "../../services/shortenerService";
import { SavedURL } from "../../types/savedUrl";
import { ListItem } from "../ListItem/ListItem";

export function SavedURLsView({ savedUrls }: { savedUrls: SavedURL[] }) {
  return (
    <Fragment>
      <span>Your shortened URLs:</span>
      <div>
        {savedUrls.map(({ code, url }) => (
          <ListItem key={code}>
            <span>{url}</span>
            <a
              href={`${serverUrl}/v1/${code}`}
              target="_blank"
              rel="noreferrer"
            >{`${serverUrl}/v1/${code}`}</a>
          </ListItem>
        ))}
      </div>
    </Fragment>
  );
}
