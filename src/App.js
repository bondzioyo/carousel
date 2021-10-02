import React from "react";
import "./App.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 1,
      z: 2,
      Data: {},
    };
  }

  componentDidMount() {
    const url = new URL(
      "https://integrations.yaxint.com/api/products?api_token=70876bc3a88f6644c53af702622edcd8"
    );

    let params = {
      orderBy: "name",
      page: "1",
      limit: "50",
      product_field_name: "axpol",
      with_variants: "1",
      with_categories: "1",
      with_prints: "1",
      with_stock: "1",
    };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    let headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ Data: json });
      });

    setInterval(() => {
      if (this.state.x === this.state.Data.data.length - 1) {
        this.setState({ x: 0 });
      } else {
        this.setState({ x: this.state.x + 1 });
      }
      if (this.state.y === this.state.Data.data.length - 1) {
        this.setState({ y: 0 });
      } else {
        this.setState({ y: this.state.y + 1 });
      }
      if (this.state.z === this.state.Data.data.length - 1) {
        this.setState({ z: 0 });
      } else {
        this.setState({ z: this.state.z + 1 });
      }
    }, 5000);
  }

  componentDidUpdate() {
    const firstImage = document.querySelector("#first");
    const secondImage = document.querySelector("#second");
    const thirdImage = document.querySelector("#third");
    const leftProductName = document.querySelector(".left-product h5");
    const middleProductName = document.querySelector(".middle-product h5");
    const rightProductName = document.querySelector(".right-product h5");
    const leftProductDescription = document.querySelector(".left-product p");
    const middleProductDescription =
      document.querySelector(".middle-product p");
    const rightProductDescription = document.querySelector(".right-product p");

    firstImage.setAttribute(
      "src",
      `${this.state.Data.data[this.state.x].main_image}`
    );
    secondImage.setAttribute(
      "src",
      `${this.state.Data.data[this.state.y].main_image}`
    );
    thirdImage.setAttribute(
      "src",
      `${this.state.Data.data[this.state.z].main_image}`
    );

    leftProductName.innerText = `${this.state.Data.data[this.state.x].name}`;
    middleProductName.innerText = `${this.state.Data.data[this.state.y].name}`;
    rightProductName.innerText = `${this.state.Data.data[this.state.z].name}`;

    leftProductDescription.innerText = `${
      this.state.Data.data[this.state.x].description
    }`;
    middleProductDescription.innerText = `${
      this.state.Data.data[this.state.y].description.substring(0, 30) + "..."
    }`;
    rightProductDescription.innerText = `${this.state.Data.data[
      this.state.z
    ].description.substring(0, 30)}`;
  }

  render() {
    const next = () => {
      if (this.state.x === this.state.Data.data.length - 1) {
        this.setState({ x: 0 });
      } else {
        this.setState({ x: this.state.x + 1 });
      }
      if (this.state.y === this.state.Data.data.length - 1) {
        this.setState({ y: 0 });
      } else {
        this.setState({ y: this.state.y + 1 });
      }
      if (this.state.z === this.state.Data.data.length - 1) {
        this.setState({ z: 0 });
      } else {
        this.setState({ z: this.state.z + 1 });
      }
    };

    const previous = () => {
      if (this.state.x === 0) {
        this.setState({ x: this.state.Data.data.length - 1 });
      } else {
        this.setState({ x: this.state.x - 1 });
      }
      if (this.state.y === 0) {
        this.setState({ y: this.state.Data.data.length - 1 });
      } else {
        this.setState({ y: this.state.y - 1 });
      }
      if (this.state.z === 0) {
        this.setState({ z: this.state.Data.data.length - 1 });
      } else {
        this.setState({ z: this.state.z - 1 });
      }
    };

    const differentImage = (event) => {
      event.target.src = this.state.Data.data[this.state.y].images[1];
    };

    const mainImage = (event) => {
      event.target.src = this.state.Data.data[this.state.y].main_image;
    };

    const fadeIn = (event) => {
      event.target.classList.add("erase")
      setTimeout(()=>{event.target.classList.remove("erase")},500)
    }

    const expandDesc = (event) => {
      event.target.innerText = `${this.state.Data.data[this.state.y].description}`;
    }

    const collapseDesc = (event) => {
      event.target.innerText = `${this.state.Data.data[this.state.y].description.substring(0, 30) + '...'}`;
    }


    return (
      <div className="carousel">
        <div className="product left-product secondary">
          <img
            id="first"
            onClick={previous}
            onLoad={fadeIn}
              src=""
              alt=""
          ></img>
          <h5>
            </h5>
          <p>
            </p>
        </div>
        <div className="product middle-product main">
          <img
            id="second"
            onMouseOver={differentImage}
            onMouseOut={mainImage}
            onLoad={fadeIn}
            src=""
            alt=""
          ></img>
          <h5>
          </h5>
          <p onMouseOver={expandDesc} onMouseOut={collapseDesc}>
            </p>
        </div>
        <div className="product right-product secondary">
          <img
            id="third"
            onClick={next}
            onLoad={fadeIn}
            src=""
            alt=""
          ></img>
          <h5>
            </h5>
          <p>
            </p>
        </div>
      </div>
    );
  }
}
