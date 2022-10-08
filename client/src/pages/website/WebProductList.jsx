import React from "react";
import CardItem from "../../components/Products/CardItem";
import Grid from "@mui/material/Grid";
import "../../styles/productCard.css";
import Filters from "../../components/Products/Filters";
import Search from "../../components/Products/Search";
import ProductList from "../../components/Products/ProductList";
import { data } from "../../data";

const WebProductList = (props) => {
  return (
    <div className="productContainer">
      <div className="filtersProduct">
        <Filters title="lọc sản phẩm" />
      </div>
      <div className="productCard">
        <div className="searchProduct">
          <Search />
        </div>
        <ProductList data={data} />
      </div>
    </div>
  );
};

export default WebProductList;
