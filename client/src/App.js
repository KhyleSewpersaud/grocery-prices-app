import './App.css'

function App() {
  return (
    <div>
      <h1>Grocery Price Comparison</h1>

      <form>
        <input type="text" placeholder="Search Food"></input>
        <button type="submit">Search</button>
      </form>

      <h2>Recent Searches</h2>
      <div className="results">
        <div className="no-frills">
          <h4>No Frills</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg"/>
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="metro">
          <h4>Metro</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg"/>
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="loblaws">
          <h4>Loblaws</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg"/>
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
        <div className="food basics">
          <h4>Food Basics</h4>
          <img src="https://assets.epicurious.com/photos/62f16ed5fe4be95d5a460eed/3:2/w_6948,h_4632,c_limit/RoastChicken_RECIPE_080420_37993.jpg"/>
          <p>Chicken</p>
          <h5>$100</h5>
        </div>
      </div>
    </div>
  );
}

export default App;
