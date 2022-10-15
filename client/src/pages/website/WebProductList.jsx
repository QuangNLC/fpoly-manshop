import React, { useEffect, useState } from "react";
import CardItem from "../../components/Products/CardItem";
import Grid from "@mui/material/Grid";
import "../../styles/productCard.css";
import Filters from "../../components/Products/Filters";
import Search from "../../components/Products/Search";
import ProductList from "../../components/Products/ProductList";
import { data } from "../../data";
import Products from '../../components/Products'
import productAPI from "../../api/productsAPI";

import styled from 'styled-components'
import { South } from "@mui/icons-material";

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
`
const PaginationContaier = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Page = styled.div`
  color: ${props => props.curr ? "white": "black"};
  width: 40px;
  height: 40px;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin : 10px;
  transition: all 0.25s ease-in;
  background-color: ${props => props.curr ? "rgba(0,0,0,0.65)": "transparent"};



  &:hover{
    color: white;
    background-color: rgba(0,0,0,0.65);
  }

`

const WebProductList = (props) => {
  const [products, setProducts] = useState([])
  const [currPage, setCurrPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)



  useEffect(() => {
    productAPI.getAll(false,currPage, 16)
      .then(res => {
        setProducts(res.list)
        console.log(res.list)
        setTotalPage(res.totalItems)
      })
      .catch(err =>
        console.log(err)
      )
  }, [currPage])
  return (


    <Container>
      <Wrapper>
        {
          products.length > 0 &&
          <Products items={products} />
        }
      </Wrapper>
      <PaginationContaier>
        {
          Array.from(Array(totalPage).keys()).map((item, index) => (
            <Page key={index} curr={index+1 === currPage}
              onClick={() => {setCurrPage(index+1)}}
            >
              {item + 1}
            </Page>
          ))
        }
      </PaginationContaier>
    </Container>
  );
};

export default WebProductList;
