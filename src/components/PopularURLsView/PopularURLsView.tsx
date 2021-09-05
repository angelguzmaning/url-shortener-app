import { Fragment } from "react";
import { serverUrl } from "../../services/shortenerService";
import { PopularUrl } from "../../types/popular";
import { ListItem } from "../ListItem/ListItem";

export function PopularURLsView({
  popularUrls,
}: {
  popularUrls: PopularUrl[];
}) {
  return (
    <Fragment>
      <span>Popular URLs:</span>
      <div>
        {popularUrls.map(({ code, visited }) => (
          <ListItem key={code}>
            <a
              href={`${serverUrl}/v1/${code}`}
              target="_blank"
              rel="noreferrer"
            >{`${serverUrl}/v1/${code}`}</a>
            Visited {visited} Times
          </ListItem>
        ))}
      </div>
    </Fragment>
  );
}
