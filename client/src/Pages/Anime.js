import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import ReactStars from "react-rating-stars-component";
import { Spinner } from "react-bootstrap";
import "./Anime.css";
function Anime(props) {
  const params = useParams();
  const [data, setdata] = useState({});
  const [rating, setrating] = useState("");
  const [avgrating, setavgrating] = useState(null);
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [all, setall] = useState([]);

  useEffect(() => {
    setloading(true);
    axios
      .get(`https://api.aniapi.com/v1/anime/${params.id}`)
      .then((res) => {
        setdata(res.data.data);
        return axios.get(
          `${process.env.REACT_APP_API_URL}/get-rating/${params.id}`,
          {
            withCredentials: true,
          }
        );
      })
      .then((res) => {
        if (res.data.rating.length) {
          setdescription(res.data.rating[0].description);
          setrating(res.data.rating[0].rating);
        }
        setavgrating(res.data.avg);

        return axios.get(
          `${process.env.REACT_APP_API_URL}/all-ratings/${params.id}`,
          {
            withCredentials: true,
          }
        );
      })
      .then((res) => {
        setall(res.data.rating);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        return;
      });
  }, []);
  let submitReview = () => {
    let data = {
      description,
      rating,
      Avgrating: calculaterating(),
    };
    setloading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/give-rating/${params.id}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        return axios.get(
          `${process.env.REACT_APP_API_URL}/get-rating/${params.id}`,
          {
            withCredentials: true,
          }
        );
      })
      .then((res) => {
        if (res.data.rating.length) {
          setdescription(res.data.rating[0].description);
          setrating(res.data.rating[0].rating);
        }
        setavgrating(res.data.avg);

        return axios.get(
          `${process.env.REACT_APP_API_URL}/all-ratings/${params.id}`,
          {
            withCredentials: true,
          }
        );
      })
      .then((res) => {
        setall(res.data.rating);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  };
  let ratingChanged = (e) => {
    setrating(e);
  };
  let descriptionAdd = (e) => {
    setdescription(e.target.value);
  };
  let calculaterating = () => {
    if (all.length) {
      let sum = 0;
      let count = 0;
      all.forEach((item) => {
        if (
          item.email !=
          JSON.parse(localStorage.getItem("isAuthenticated")).email
        ) {
          sum += item.rating;
          count += 1;
        }  
      });
      sum = sum + rating;
      let avg = sum / (count + 1);
      return avg;
    } else {
      return rating;
    }
  };
  return (
    <LoadingOverlay
      active={loading}
      spinner={<Spinner animation="grow" variant="primary" size="lg" />}
    >
      <div className="App">
        {data.id ? (
          <Card style={{ width: "100%", height: "100%" }}>
            <Card.Img
              variant="top"
              style={{ width: "20%", margin: "auto" }}
              src={data.cover_image}
            />
            <Card.Body>
              <Card.Title>
                <b>
                  {data.titles.en} / {data.titles.jp}
                </b>
              </Card.Title>
              <Card.Text>
                {data.descriptions.en.replace(/(<([^>]+)>)/gi, "")}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>End Date- </b>
                {data.end_date}
              </ListGroupItem>
              <ListGroupItem>
                <b>Start Date- </b>
                {data.start_date}
              </ListGroupItem>
              <ListGroupItem>
                <b>Episode Duration- </b>
                {data.episode_duration}
              </ListGroupItem>
              <ListGroupItem>
                <b>Episodes Count- </b>
                {data.episodes_count}
              </ListGroupItem>
              <ListGroupItem>
                <b>Genres- </b>
                {data.genres.join(", ")}
              </ListGroupItem>
              <ListGroupItem>
                <b>Score- </b>
                {data.score}
              </ListGroupItem>
              <ListGroupItem>
                <b>Season Period- </b>
                {data.season_period}
              </ListGroupItem>
              <ListGroupItem>
                <b>Season Year- </b>
                {data.season_year}
              </ListGroupItem>
              <ListGroupItem>
                <b>Overall Avg Rating- </b>
                {avgrating}
              </ListGroupItem>
            </ListGroup>

            <Card.Body>
              {data.trailer_url ? (
                <Card.Link href={`${data.trailer_url}`}>
                  Trailer- {data.trailer_url}
                </Card.Link>
              ) : (
                ""
              )}
            </Card.Body>
            <div className="reviews">
              <h5>All Reviews</h5>
              {all.map((item, ind) => {
                return (
                  <div key={ind}>
                    User Email- {item.email}, Rating- {item.rating},
                    Description-
                    {item.description}
                  </div>
                );
              })}
            </div>
            <div className="rating">
              <h4>Give Your Review (Your Current Rating- {rating})</h4>
              <ReactStars
                isHalf={true}
                count={5}
                onChange={ratingChanged}
                size={44}
                activeColor="#ffd700"
              />
              <textarea
                name="content"
                autoComplete="off"
                onChange={descriptionAdd}
                className="form-control"
                placeholder="Enter comment"
                type="text"
                style={{ width: "100%" }}
                value={description}
              />
              <button className="btn btn-success mt-3" onClick={submitReview}>
                Submit
              </button>
            </div>
          </Card>
        ) : (
          ""
        )}
      </div>
    </LoadingOverlay>
  );
}

export default Anime;
