import "./Products.css";
import { useState, useEffect } from "react";
import { Productsdata, Filterproducts } from "./Products.js";
import { useNavigate } from "react-router-dom";

function Products({ addToCart }) {
  document.title = "Products";

  const [Data, setData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    Productsdata(setData);
  }, []);

  return (
    <div>
      <section className="producttt-add">
        <h1>Products Information</h1>
        <p>Browse our wide range of products across categories. Click on any product to view details.</p>
      </section>

      <section className="product-type">
        {[
          { label: "All", value: null, img: "https://tse4.mm.bing.net/th/id/OIP.o97GRcVYCmdPsPVZmz-CFQAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3", key: "all" },
          { label: "Groceries", value: "groceries", img: "https://th.bing.com/th/id/OIP.YwtaPiTNsfJTjCC9wAMAXgHaE7?w=286&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", key: "groceries" },
          { label: "Furniture", value: "furniture", img: "https://th.bing.com/th/id/OIP.wg0_A7Qkd5KZrPmqxWLNoAHaHa?w=169&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", key: "furniture" },
          { label: "Fragrances", value: "fragrances", img: "https://th.bing.com/th/id/OIP.xWAEe6CopFB-oeFKbFa0nAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", key: "fragrances" },
          { label: "Beauty", value: "beauty", img: "https://th.bing.com/th/id/OIP.eP6MhNvjbAKvFXRwVr1bxAHaHa?w=167&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", key: "beauty" },
        ].map((cat) => (
          <div
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              Filterproducts(cat.value, setData);
            }}
            style={{
              border: activeCategory === cat.key ? "5px solid red" : "5px solid transparent",
              cursor: "pointer",
              color: activeCategory === cat.key ? "red" : "black",
              borderRadius: "10%",
              textAlign: "center",
            }}
          >
            <img src={cat.img} alt={cat.label} width={80} height={80} style={{ borderRadius: "50%", boxShadow: "0 0 15px purple" }} />
            <h4>{cat.label}</h4>
          </div>
        ))}
      </section>

      <section className="product-data">
        {Data.map((element) => (
          <div className="card" key={element.id}>
            <img src={element.thumbnail} alt={element.title} />
            <h4>{element.title}</h4>
            <p>$ {element.price}</p>
            <h4>{element.category}</h4>
            <button
              style={{ backgroundColor: "coral" }}
              onClick={() => navigate(`/product-details/${element.id}`, { state: { product: element } })}
            >
              Product-Details
            </button>
            <button
              style={{ backgroundColor: "greenyellow" }}
              onClick={() => addToCart(element)}
            >
              Add-to-Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Products;