import React, { useEffect, useState } from "react";
import "../../styles/productCard.css";
import Filters from "../../components/Products/Filters";
import Search from "../../components/Products/Search";
import ProductList from "../../components/Products/ProductList";
import Products from '../../components/Products'
import productAPI from "../../api/productsAPI";

import styled from 'styled-components'
import Helmet from "../../components/Helmet";
import DialogHOC from "../../hoc/DialogHOC";
import { Popconfirm, Pagination, Spin, Select, Tooltip, Typography } from 'antd'

const Container = styled.div`
  width: 100%;
`
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`
const FiltersContainer = styled.div`
  width: 20%;
  padding: 20px;
`
const FilterItem = styled.div`
  width: 100%;
`

const FilterItemTitle = styled.div`
  width: 100%;
`
const ProductListContainer = styled.div`
  padding: 20px;
  width: 80%;
`
const ProductListWrrapper = styled.div`
  width: 100%;
`
const ProductFilterContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`

const ProductFilerItem = styled.div`
  padding: 5px;
`


const sortOption = [
  { id: 1, by: 'name', sort: 'asc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ A-Z' },
  { id: 2, by: 'name', sort: 'desc', byTitle: 'Theo Tên Sản Phẩm', title: 'Từ Z-A' },
  { id: 3, by: 'price', sort: 'asc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá tăng dần' },
  { id: 4, by: 'price', sort: 'desc', byTitle: 'Theo Giá Sản Phẩm', title: 'Giá giảm dần' },
  { id: 5, by: 'createdAt', sort: 'asc', byTitle: 'Theo Ngày Ra Mắt', title: 'Mới nhất' },
  { id: 6, by: 'createdAt', sort: 'desc', byTitle: 'Theo Ngày Ra Mắt', title: 'Cũ nhất' }
]

const WebProductList = (props) => {


  const [products, setProducts] = useState([])
  const [showProducts, setShowProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currPage, setCurrPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [sizes, setSizes] = useState([])
  const [payloadOption, setPayloadOption] = useState({
    categoryId: 0,
    page: 1,
    sort: {
      by: 'name',
      order: 'asc'
    },
    sizeId: []
  })


  useEffect(() => {
    if (sizes) {
      console.log(sizes)
    }
  }, [sizes])

  useEffect(() => {
    productAPI.getAll()
      .then(res => {
        if (!res.status) {
          setProducts(res)
          setIsLoading(false)
        } else {
          console.log(res)
        }
      })
      .catch(err => console.log(err))
    productAPI.getFilterInfo()
      .then(res => {
        if (!res.status) {
          console.log(res)
          setCategories(res.categories)
          setSizes([...res.sizes])
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <Helmet
      title="Sản Phẩm"
    >
      <Container>
        <Wrapper>
          <FiltersContainer>
            <FilterItem>
              <FilterItemTitle>
                <Typography.Title level={4}>Size</Typography.Title>
              </FilterItemTitle>
            </FilterItem>
          </FiltersContainer>
          <ProductListContainer>
            {
              isLoading ?
                (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    Loading ...<Spin />
                  </div>
                )
                :
                (
                  <ProductListWrrapper>
                    <ProductFilterContainer>
                      <ProductFilerItem>
                        <Select style={{ width: 120 }} defaultValue={0}>
                          <Select.Option value={0}>
                            Tất Cả
                          </Select.Option>
                          {
                            categories.map(item => (
                              <Select.Option value={item.id} key={item.id}>
                                {item.title}
                              </Select.Option>
                            ))
                          }
                        </Select>
                      </ProductFilerItem>
                      <ProductFilerItem>
                        <Select style={{ width: 120 }} defaultValue={1}>
                          {
                            sortOption.map(item => (
                              <Select.Option value={item.id} key={item.id}>
                                {item.title}
                              </Select.Option>
                            ))
                          }
                        </Select>
                      </ProductFilerItem>
                    </ProductFilterContainer>
                    <Products items={products} />
                  </ProductListWrrapper>
                )
            }
          </ProductListContainer>
        </Wrapper>
      </Container>
    </Helmet>
  )
};

export default WebProductList;
