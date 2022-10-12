import React from 'react'
import styled from 'styled-components';
import AdmChart from '../../components/AdmChart';
import AdmFeaturedInfo from '../../components/AdmFeaturedInfo';
import { userStatsData } from '../../assets/data/data';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Container = styled.div`
    width: 100%;
`
const WidgetsContainer = styled.div`
    padding: 20px;
    display: flex;
`
const WidgetSm = styled.div`
    flex:1;
    padding: 20px;
    margin-right: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const WidgetSmTitle = styled.span`
    font-size: 32px;
    font-weight: 600;
`
const WidgetSmList = styled.ul`
    list-style:none;
`
const WidgetSmListItem = styled.li`
    display:flex;
    align-items:center;
    justify-content: space-between;
    margin: 20px 0;
`
const WidgetSmListItemImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const WidgetSmUser = styled.div`
    display: flex;
    flex-direction: column;
`
const WidgetSmUsername = styled.span`
    font-weight: 600;
`
const WidgetSmUserTitle = styled.span`
    font-weight: 300;
`
const WidgetSmButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    padding: 8px 10px;
    background-color: #eeeef7;
    color: #555;
    cursor: pointer;
`
const WidgetLg = styled.div`
    flex:2;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`
const WidgetLgTitle = styled.span`
    font-size: 22px;
    font-weight: 600;
    padding: 20px;
`
const WidgetLgTable = styled.table`
    width: 100%;
    border-spacing: 20px;
`
const WidgetLgTr = styled.tr`
`
const WidgetLgTh = styled.th`
    text-align: left;
`
const WidgetLgUser = styled.td``
const WidgetLgImgContainer = styled.td``
const WidgetLgImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`
const WidgetLgNameContaienr = styled.td``
const WidgetLgName = styled.span`
    font-weight: 500;
`
const WidgetLgDate = styled.td`
    font-weight: 300;
`
const WidgetLgAmount = styled.td`
    font-weight: 300;
`
const WidgetLgStatus = styled.td``
const WidgetLgButton = styled.button`
    padding: 8px 4px;
    border: none;
    border-radius: 10px;
    ${props => {
        switch (props.status) {
            case ("Approved"): {
                return "background-color: #e5fef2;color: #3bb077;"
            }
            case ("Declined"): {
                return "background-color: #fff0f1;color: #d95087;"
            }
            case ("Pending"): {
                return "background-color: #ebf1fe;color: #2a7ade;"
            }
            default: {
                return "background-color: #e5fef2;color: #3bb077;"
            }
        }
    }

    }
`


const AdmDashboard = () => {
    return (
        <Container>
            <AdmFeaturedInfo />
            <AdmChart title={"Users Activated"} data={userStatsData} dataKey={"activeUser"} grid />
            <WidgetsContainer>
                <WidgetSm>
                    <WidgetSmTitle>New Join Members</WidgetSmTitle>
                    <WidgetSmList>
                        <WidgetSmListItem>
                            <WidgetSmListItemImg src={"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"} />
                            <WidgetSmUser>
                                <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                                <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                            </WidgetSmUser>
                            <WidgetSmButton>
                                <VisibilityIcon style={{ fontSize: "16px", marginRight: "5px" }} />
                                Display
                            </WidgetSmButton>
                        </WidgetSmListItem>
                        <WidgetSmListItem>
                            <WidgetSmListItemImg src={"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"} />
                            <WidgetSmUser>
                                <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                                <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                            </WidgetSmUser>
                            <WidgetSmButton>
                                <VisibilityIcon style={{ fontSize: "16px", marginRight: "5px" }} />
                                Display
                            </WidgetSmButton>
                        </WidgetSmListItem>
                        <WidgetSmListItem>
                            <WidgetSmListItemImg src={"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"} />
                            <WidgetSmUser>
                                <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                                <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                            </WidgetSmUser>
                            <WidgetSmButton>
                                <VisibilityIcon style={{ fontSize: "16px", marginRight: "5px" }} />
                                Display
                            </WidgetSmButton>
                        </WidgetSmListItem>
                        <WidgetSmListItem>
                            <WidgetSmListItemImg src={"https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"} />
                            <WidgetSmUser>
                                <WidgetSmUsername>Anna Keller</WidgetSmUsername>
                                <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
                            </WidgetSmUser>
                            <WidgetSmButton>
                                <VisibilityIcon style={{ fontSize: "16px", marginRight: "5px" }} />
                                Display
                            </WidgetSmButton>
                        </WidgetSmListItem>
                    </WidgetSmList>
                </WidgetSm>
                <WidgetLg>
                    <WidgetLgTitle>Latest Transactions</WidgetLgTitle>
                    <WidgetLgTable>
                        <thead>
                            <WidgetLgTr>
                                <WidgetLgTh>Customner</WidgetLgTh>
                                <WidgetLgTh>Name</WidgetLgTh>
                                <WidgetLgTh>Date</WidgetLgTh>
                                <WidgetLgTh>Amount</WidgetLgTh>
                                <WidgetLgTh>Status</WidgetLgTh>
                            </WidgetLgTr>
                        </thead>
                        <tbody>
                            <WidgetLgTr>
                                <WidgetLgImgContainer>
                                    <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                                </WidgetLgImgContainer>
                                <WidgetLgNameContaienr>
                                    <WidgetLgName>Susan Carol</WidgetLgName>
                                </WidgetLgNameContaienr>
                                <WidgetLgDate>2 Jun 2021</WidgetLgDate>
                                <WidgetLgAmount>$122.00</WidgetLgAmount>
                                <WidgetLgStatus>
                                    <WidgetLgButton status={"Approved"} >Approved</WidgetLgButton>
                                </WidgetLgStatus>
                            </WidgetLgTr>
                            <WidgetLgTr>
                                <WidgetLgImgContainer>
                                    <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                                </WidgetLgImgContainer>
                                <WidgetLgNameContaienr>
                                    <WidgetLgName>Susan Carol</WidgetLgName>
                                </WidgetLgNameContaienr>
                                <WidgetLgDate>2 Jun 2021</WidgetLgDate>
                                <WidgetLgAmount>$122.00</WidgetLgAmount>
                                <WidgetLgStatus>
                                    <WidgetLgButton status={"Declined"}>Declined</WidgetLgButton>
                                </WidgetLgStatus>
                            </WidgetLgTr>
                            <WidgetLgTr>
                                <WidgetLgImgContainer>
                                    <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                                </WidgetLgImgContainer>
                                <WidgetLgNameContaienr>
                                    <WidgetLgName>Susan Carol</WidgetLgName>
                                </WidgetLgNameContaienr>
                                <WidgetLgDate>2 Jun 2021</WidgetLgDate>
                                <WidgetLgAmount>$122.00</WidgetLgAmount>
                                <WidgetLgStatus>
                                    <WidgetLgButton status={"Pending"} >Pending</WidgetLgButton>
                                </WidgetLgStatus>
                            </WidgetLgTr>
                            <WidgetLgTr>
                                <WidgetLgImgContainer>
                                    <WidgetLgImg src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
                                </WidgetLgImgContainer>
                                <WidgetLgNameContaienr>
                                    <WidgetLgName>Susan Carol</WidgetLgName>
                                </WidgetLgNameContaienr>
                                <WidgetLgDate>2 Jun 2021</WidgetLgDate>
                                <WidgetLgAmount>$122.00</WidgetLgAmount>
                                <WidgetLgStatus>
                                    <WidgetLgButton status={"Approved"} >Approved</WidgetLgButton>
                                </WidgetLgStatus>
                            </WidgetLgTr>
                        </tbody>
                    </WidgetLgTable>
                </WidgetLg>
            </WidgetsContainer>
        </Container>
    )
}

export default AdmDashboard