import React from 'react'
import styled from 'styled-components'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const Featured = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const Title = styled.span`
    font-size: 20px;
`
const MoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`
const Money = styled.span`
    font-size: 30px;
    font-weight: 600;
`
const MoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 12px;
    color: ${props => props.negative ? "red":"green"};
`
const Sub = styled.div`
    font-size: 15px;
    color: gray;
`

const AdmFeaturedInfo = () => {
    return (
        <Wrapper>
            <Featured>
                <Title>Revanue</Title>
                <MoneyContainer>
                    <Money>$2,415</Money>
                    <MoneyRate negative>
                        -11.4 <ArrowDownwardIcon />
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month.</Sub>
            </Featured>
            <Featured>
                <Title>Sales</Title>
                <MoneyContainer>
                    <Money>$5,415</Money>
                    <MoneyRate negative>
                        -11.4 <ArrowDownwardIcon />
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month.</Sub>
            </Featured>
            <Featured>
                <Title>Cost</Title>
                <MoneyContainer>
                    <Money>$2,288</Money>
                    <MoneyRate>
                        +2.4 <ArrowUpwardIcon />
                    </MoneyRate>
                </MoneyContainer>
                <Sub>Compared to last month.</Sub>
            </Featured>
        </Wrapper>
    )
}

export default AdmFeaturedInfo