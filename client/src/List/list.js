import "./list.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
const List = React.memo((props) => {
  return (
    <React.Fragment>
      <div className="list">
        <Card>
          <Link className="linkstyle" to={`/anime/${props.id}`}>
            <Card.Body>
              <Card.Title>
                <b>{props.name}</b>
              </Card.Title>
              <Card.Text>{props.descriptions}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Episodes-</b> {props.episodes_count}
              </ListGroupItem>
              <ListGroupItem>
                <b>Year- </b>
                {props.season_year}
              </ListGroupItem>
              <ListGroupItem>
                <b>Overall Avg Rating- </b>
                {props.OverallRating}
              </ListGroupItem>
              <ListGroupItem>
                <b>Genres-</b> {props.genres.join(", ")}
              </ListGroupItem>
            </ListGroup>
            <br></br>
          </Link>
          {props.trailer_url ? (
            <Card.Link href={`${props.trailer_url}`}>
              Trailer- {props.trailer_url}
            </Card.Link>
          ) : (
            ""
          )}
        </Card>
      </div>
    </React.Fragment>
  );
});

export default List;
