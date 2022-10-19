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
import { Filter, South } from "@mui/icons-material";
import Helmet from "../../components/Helmet";

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`
const FilterContainer = styled.div`
  padding: 20px;
  width: 20%;
  position: fixed;
  height: 100%;
  top: 80px;
  left: 0px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

const FilterTitle = styled.div`
  width: 100%;
  text-align:center;
  text-transform: capitalize;
  font-size: 20px;
  font-weight: 400;
  margin-top: 30px;
  
`
const FilterItemContainer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 10px;
`
const FilterItemTitle = styled.p`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 600;
  margin-bottom: 10px;
`

const CategorySelect = styled.select`
  padding : 10px;
  border-radius: 10px;
  font-size: 18px;
`
const CategorySelectOption = styled.option`
  padding : 10px;
  font-size: 18px;
`
const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
const SizeOption = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  align-items: center;
`
const SizeCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`
const SizeCheckboxLabel = styled.label`
  font-size: 14px;
`
const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const MinPrice = styled.div`
  width: 40%;
  padding: 5px;
  display: flex;
  flex-direction: column;
`
const MinPriceInPut = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  outline: none;
`
const MaxPrice = styled.div`
  width: 40%;
  padding: 5px;
  display: flex;
  flex-direction: column;
`
const MaxPriceInPut = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  outline: none;
`
const FilterButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const FilterButton = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  color: white;
  background-color: teal;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.25s ease-in;

  &:hover{
    background-color: darkblue;
  }
`
const ProductListContainer = styled.div`
  transform: translateX(25%);
  padding: 20px;
  width: 80%;
`
const PaginationContaier = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Page = styled.div`
  color: ${props => props.curr ? "white" : "black"};
  width: 40px;
  height: 40px;
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin : 10px;
  transition: all 0.25s ease-in;
  background-color: ${props => props.curr ? "rgba(0,0,0,0.65)" : "transparent"};



  &:hover{
    color: white;
    background-color: rgba(0,0,0,0.65);
  }

`

const WebProductList = (props) => {
  const [products, setProducts] = useState([])
  const [currPage, setCurrPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [filterInfo, setFilterInfo] = useState({
    categoryId: -1,
    sizes: [],
    minPrice: 0,
    maxPrice: undefined,
  })

  const onChangeCate = (e) => {
    setFilterInfo({
      ...filterInfo,
      categoryId: e.target.value
    })
  }

  const onChangeSizes = (e) => {
    if (e.target.checked) {
      if (!checkSizeCheckbox(filterInfo.sizes, e.target.value)) {
        const newSizes = filterInfo.sizes;
        newSizes.push(e.target.value)
        setFilterInfo({
          ...filterInfo,
          sizes: newSizes
        })
      }
    } else {
      if (checkSizeCheckbox(filterInfo.sizes, e.target.value)) {
        const newSizes = filterInfo.sizes.filter(item => item !== e.target.value);
        setFilterInfo({
          ...filterInfo,
          sizes: newSizes
        })
      }
    }
  }

  console.log(filterInfo)

  const checkSizeCheckbox = (arr, id) => {
    let result = false;

    if (arr.find(item => item === id)) {
      result = true;
    }

    return result;
  }

  useEffect(() => {
    productAPI.getAll(false, currPage, 16)
      .then(res => {
        setProducts(res.list)
        setTotalPage(res.totalItems)
      })
      .catch(err =>
        console.log(err)
      )
  }, [currPage])

  useEffect(() => {
    productAPI.getFilterInfo()
      .then(res => {
        if (!res.status) {
          console.log(res);
          setCategories(res.categories)
          setSizes(res.sizes)
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (

    <Helmet
      title="Danh sách sản phẩm"
    >
      <Container>
        <Wrapper>
          <FilterContainer>
            <FilterTitle>bộ lọc sản phẩm</FilterTitle>
            <FilterItemContainer>
              <FilterItemTitle>sắp xếp theo</FilterItemTitle>
            </FilterItemContainer>
            <FilterItemContainer>
              <FilterItemTitle>thể loại</FilterItemTitle>
              <CategorySelect
                onChange={onChangeCate}
                name="categoryId"
              >
                <CategorySelectOption value={-1} >Tất cả</CategorySelectOption>
                {
                  categories.length > 0 && categories.map((item, index) => (
                    <CategorySelectOption key={item.id} value={item.id}>{item.title}</CategorySelectOption>
                  ))
                }
              </CategorySelect>
            </FilterItemContainer>
            <FilterItemContainer>
              <FilterItemTitle>Size</FilterItemTitle>
              <SizeContainer>
                {
                  sizes.length > 0 && sizes.map((item, index) => (
                    <SizeOption key={item.id}>
                      <SizeCheckbox type='checkbox' value={item.id} onChange={onChangeSizes} />
                      <SizeCheckboxLabel>{item.title}</SizeCheckboxLabel>
                    </SizeOption>
                  ))
                }
              </SizeContainer>
            </FilterItemContainer>
            <FilterItemContainer>
              <FilterItemTitle>Giá</FilterItemTitle>
              <PriceContainer>
                <MinPrice>
                  Từ <MinPriceInPut />
                </MinPrice>
                <MaxPrice>
                  Đến <MaxPriceInPut />
                </MaxPrice>
              </PriceContainer>
            </FilterItemContainer>
            <FilterButtonContainer>
              <FilterButton>xóa bộ lọc</FilterButton>
              <FilterButton>lọc sản phẩm</FilterButton>
            </FilterButtonContainer>
          </FilterContainer>
          <ProductListContainer>
            {
              products.length > 0 &&
              <Products items={products} />
            }
            <PaginationContaier>
              {
                Array.from(Array(totalPage).keys()).map((item, index) => (
                  <Page key={index} curr={index + 1 === currPage}
                    onClick={() => { setCurrPage(index + 1) }}
                  >
                    {item + 1}
                  </Page>
                ))
              }
            </PaginationContaier>
          </ProductListContainer>
        </Wrapper>
      </Container>
    </Helmet>
  );
};

export default WebProductList;
