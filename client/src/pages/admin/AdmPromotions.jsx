import React, { useState, useRef } from 'react'
import Helmet from '../../components/Helmet'
import styled from 'styled-components'
import { useEffect } from 'react'
import productAPI from '../../api/productsAPI'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Table, Space, Tag } from 'antd'
import { formatter } from '../../utils'
import promotionsAPI from '../../api/promotionsAPI'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const Container = styled.div`
    width: 100%;
`
const Wrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const PromotionsContainer = styled.div`
    width: 100%;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
`

const ActionsContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
`

const AdmPromotions = () => {
    const [promotions, setPromotions] = useState([])
    const navigate = useNavigate();


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                    >
                        close
                    </Button> */}
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const promotionsColumn = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'T??n Khuy???n M???i',
            dataIndex: 'title',
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Ng??y B???t ?????u',
            dataIndex: 'date_after',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY')}</>),
            sorter: (a, b) => (new Date(a?.date_after)) > (new Date(b?.date_after)) ? 1 : -1
        },
        {
            title: 'Ng??y K???t Th??c',
            dataIndex: 'date_befor',
            render: (text) => (<>{moment(text).format('DD/MM/YYYY')}</>),
            sorter: (a, b) => (new Date(a?.date_after)) > (new Date(b?.date_after)) ? 1 : -1
        },
        {
            title: 'Gi???m Gi??',
            render: (record) => (<>{record?.by_persent} %</>),
            sorter: (a, b) => a.by_persent - b.by_persent
        },
        {
            title: 'Tr???ng Th??i',
            render: (record) => (<Tag color={record?.isactive ? 'blue' : 'orange'} >{record?.isactive ? 'K??ch Ho???t' : 'Kh??ng K??ch Ho???t'}</Tag>),
            sorter: (a, b) => a.by_persent - b.by_persent
        },
        {
            title: 'Thao T??c',
            render: (record) => (<Button type='primary' onClick={() => { navigate(`/admin/promotion/detail/${record?.id}`) }} icon={<RemoveRedEyeOutlinedIcon />} ></Button>)
        }
    ]


    useEffect(() => {
        promotionsAPI.getAll()
            .then(res => {
                console.log(res)
                setPromotions(res.map((item, index) => ({
                    index: index + 1,
                    key: item.id,
                    ...item
                })))
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Helmet
            title={"Qu???n L?? Khuy???n M???i"}
        >
            <Container>
                <Wrapper>
                    <ActionsContainer>
                        <Button type='primary' onClick={() => { navigate(`/admin/promotion/new`) }}>T???o Khuy???n M???i</Button>
                    </ActionsContainer>
                    <PromotionsContainer>
                        <Table bordered dataSource={promotions} columns={promotionsColumn} />
                    </PromotionsContainer>
                </Wrapper>
            </Container>
        </Helmet>
    )
}

export default AdmPromotions