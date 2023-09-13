import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("");
  let lastSearch;

  async function query(e) {
    axios.post('http://localhost:4040/searches', {
      body: JSON.stringify(search)
    }).then(response => {
      console.log(response)
    })
  }


  useEffect(() => {
    axios.get('http://localhost:4040/searchesGet')
    .then(response => {
      lastSearch = JSON.parse(response.data[response.data.length-1].search).body
      console.log(lastSearch)
    })
  }, [])

  // useEffect(() => {
  //   axios.post('http://localhost:4040/lastSearch', {
  //     body: lastSearch
  //   }).then(response => {
  //     console.log(response)
  //   })
  // })

  // const nofrills = async () => {
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();
  //   await page.goto(url+lastSearch)
  //   browser.close();
  // }

  return (
    <div>
      <h1>Grocery Price Comparison</h1>

      <form onSubmit={query}>
        <input
          type="text"
          placeholder="Search Food"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>

      <h2>Recent Searches</h2>
      <div className="results">
        <div className="no-frills store">
          <h4>No Frills</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="metro store">
          <h4>Metro</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="loblaws store">
          <h4>Loblaws</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="food-basics store">
          <h4>Food Basics</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
