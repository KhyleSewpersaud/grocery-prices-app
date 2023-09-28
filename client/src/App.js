import "./App.css";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("");

  async function query(e) {
    e.preventDefault()
    await axios.post('http://localhost:4040/searches', {
      body: JSON.stringify(search)
    }).then(response => {
      loadData()
      console.log(response)
    })
  }

  useEffect(() => {
    axios.get('http://localhost:4040/dataGet')
    .then(response => {
      console.log(response.data)
    })
  }, [])

  async function loadData() {
    await axios.get('http://localhost:4040/searchesGet')
    .then(response => {
      console.log('ran')
    })
  }


  return (
    <div>
      <h1>Grocery Store Steals</h1>

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
        <div className="walmart store">
          <h4>Walmart</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="metro store">
          <h4>Metro</h4>
          <img src="https://product-images.metro.ca/images/ha5/h5e/8874225205278.jpg" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="amazon store">
          <h4>Amazon</h4>
          <img src="https://assets.shop.loblaws.ca/products/21340952/b1/en/front/21340952_front_a01.png" />
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
