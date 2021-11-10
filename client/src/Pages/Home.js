import "./Home.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import List from "../List/list";
import LoadingOverlay from "react-loading-overlay";
import { Spinner } from "react-bootstrap";
function Home() {
  let initialRender = useRef(false);
  let loadingRef = useRef();
  let windowRef = useRef();
  const [enteredFilter, setEnteredFilter] = useState("");
  const [enteredList, setEnteredList] = useState([]);
  const [currmaxpage, setcurrmaxpage] = useState({ curr: 1, maxpage: null });
  const [loading, setloading] = useState({ condition: false, msg: "Loading" });
  const [sloading, setsloading] = useState(false);
  const [isChecked, setisChecked] = useState({
    title: true,
    genres: false,
    description: false,
  });
  const [url, seturl] = useState("https://api.aniapi.com/v1/anime?title=");

  //fetch names
  const getName = (names, pages, signal) => {
    let ids, documents;
    setloading({ condition: true, msg: "Loading" });
    setsloading(true);
    axios
      .get(`${url}${names}&page=${pages}&per_page=20`)
      .then((res) => {
        console.log(res.data);
        if (res.data.data) {
          ids = res.data.data.documents.map((item) => {
            return item.id;
          });
          documents = res.data.data.documents;
          if (signal) {
            setEnteredList([...enteredList, ...res.data.data.documents]);
            setcurrmaxpage((page) => ({ ...page, curr: pages }));
          } else {
            setEnteredList(res.data.data.documents);
            setcurrmaxpage((page) => ({
              curr: 1,
              maxpage: res.data.data.last_page + 1,
            }));
            setloading({ condition: false, msg: "Loading" });
          }
          return axios.post(
            `${process.env.REACT_APP_API_URL}/map-ratings/[${ids}]`
          );
        }
      })
      .then((res) => {
        let updated = documents.map((item) => {
          if (res.data.rating[item.id]) {
            return { ...item, OverallRating: res.data.rating[item.id] };
          } else {
            return item;
          }
        });
        setsloading(false);
        setEnteredList([...enteredList, ...updated]);
      })
      .catch((err) => {
        setsloading(false);
        return;
      });
  };

  //debouncing the api
  useEffect(() => {
    if (initialRender.current) {
      if (enteredFilter) {
        const timer = setTimeout(() => {
          getName(enteredFilter, 1, 0);
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      } else {
        setEnteredList([]);
      }
    } else {
      initialRender.current = true;
    }
  }, [enteredFilter]);

  //observer API
  useEffect(() => {
    let options = {
      root: windowRef.current,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities, observer) => {
      const first = entities[0];
      if (first.isIntersecting) {
        const nextPage = currmaxpage.curr + 1;
        if (nextPage < currmaxpage.maxpage && enteredFilter) {
          getName(enteredFilter, nextPage, 1);
        } else {
          setloading({ condition: false, msg: "End of Results" });
        }
      }
    }, options);
    observer.observe(loadingRef.current);
    return () =>
      loadingRef.current ? observer.unobserve(loadingRef.current) : "";
  }, [enteredList, currmaxpage]);

  let displaylist = enteredList.map((item, i) => {
    return (
      <List
        key={i}
        image={item.cover_image}
        name={item.titles.en}
        trailer_url={item.trailer_url}
        descriptions={item.descriptions.en}
        season_year={item.season_year}
        episodes_count={item.episodes_count}
        genres={item.genres}
        id={item.id}
        OverallRating={item.OverallRating ? item.OverallRating : "---"}
      ></List>
    );
  });
  let handleOnChange = (e) => {
    if (e.target.value === "title") {
      setisChecked({ title: true, genres: false, description: false });
      seturl("https://api.aniapi.com/v1/anime?title=");
    } else if (e.target.value === "genres") {
      setisChecked({ title: false, genres: true, description: false });
      seturl("https://api.aniapi.com/v1/anime?genres=");
    } else {
      setisChecked({ title: false, genres: false, description: true });
      seturl("https://api.aniapi.com/v1/anime?description=");
    }
  };
  return (
    <LoadingOverlay
      active={sloading}
      spinner={<Spinner animation="grow" variant="primary" size="lg" />}
    >
      <div className="App">
        <div className="wrapper">
          <div className="heading">
            <h1>Anime Search</h1>
          </div>
          <div className="search">
            <Input
              onChange={(event) => setEnteredFilter(event.target.value)}
              size="large"
              placeholder="Search here"
              prefix={<SearchOutlined />}
            />
            <input
              type="checkbox"
              value="title"
              className="boxes"
              checked={isChecked.title}
              onChange={handleOnChange}
            />
            Title
            <input
              type="checkbox"
              value="genres"
              className="boxes"
              checked={isChecked.genres}
              onChange={handleOnChange}
            />
            Genres
            <input
              className="boxes"
              type="checkbox"
              value="description"
              checked={isChecked.description}
              onChange={handleOnChange}
            />
            Description
          </div>
          <div ref={windowRef} className="listings">
            {displaylist}
            <div ref={loadingRef}>
              <span>{loading.msg}...</span>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Home;
