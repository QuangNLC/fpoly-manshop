import React from "react";
import styled from "styled-components";
import footerImg from "../assets/imgs/footer-img.png";
import footerPayment from "../assets/imgs/payment.png";
import MapTwoToneIcon from "@mui/icons-material/MapTwoTone";
import LocalPhoneTwoToneIcon from "@mui/icons-material/LocalPhoneTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import "../styles/footer.css";

const Container = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  padding: 20px;
  position: relative;
  margin-top: 100px;
`;

const FooterColumn = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const Title = styled.h2`
  font-size: 18px;
  text-transform: capitalize;
  font-weight: 300;
  margin-bottom: 20px;
  color: white;
`;
const AboutUs = styled.div`
  width: 100%;
`;
const Detail = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
  ${(props) => props.fullHeight && "height: 100%;"}
`;
const ImageContainer = styled.div``;
const Image = styled.img``;
const ContactList = styled.ul``;
const ContactListItem = styled.li`
  display: flex;
`;
const SupportList = styled.ul``;
const SupportListItem = styled.li`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #999;
  &:hover {
    color: white;
    cursor: pointer;
  }
`;

const Footer = () => {
  return (
    // <Container>
    //   <FooterColumn>
    //     <Title>về man shop</Title>
    //     <AboutUs>
    //       <Detail>
    //         Man Shop chuyên kinh doanh quần áo nam uy tín, nói không với hàng
    //         nhái tại Thành Phố Hà Nội.
    //       </Detail>
    //       <ImageContainer>
    //         <Image src={footerImg} />
    //       </ImageContainer>
    //     </AboutUs>
    //   </FooterColumn>
    //   <FooterColumn>
    //     <Title>liên hệ</Title>
    //     <ContactList>
    //       <ContactListItem>
    //         <MapTwoToneIcon style={{ fontSize: "30px", marginRight: "10px" }} />
    //         <Detail fullHeight={true}>
    //           Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm,
    //           Hà Nội
    //         </Detail>
    //       </ContactListItem>
    //       <ContactListItem>
    //         <LocalPhoneTwoToneIcon
    //           style={{ fontSize: "30px", marginRight: "10px" }}
    //         />
    //         <Detail fullHeight={true}>0346.410.888</Detail>
    //       </ContactListItem>
    //       <ContactListItem>
    //         <EmailTwoToneIcon
    //           style={{ fontSize: "30px", marginRight: "10px" }}
    //         />
    //         <Detail fullHeight={true}>s21manshop@gmail.com</Detail>
    //       </ContactListItem>
    //     </ContactList>
    //   </FooterColumn>
    //   <FooterColumn>
    //     <Title>hỗ trợ khách hàng</Title>
    //     <SupportList>
    //       <SupportListItem>Chính sách đổi trả</SupportListItem>
    //       <SupportListItem>Chính sách bảo mật</SupportListItem>
    //       <SupportListItem>Chính sách mua hàng online</SupportListItem>
    //       <SupportListItem>Chính sách bảo hành</SupportListItem>
    //     </SupportList>
    //   </FooterColumn>
    //   <FooterColumn>
    //     <Title>thanh toán</Title>
    //     <ImageContainer>
    //       <Image src={footerPayment} />
    //     </ImageContainer>
    //   </FooterColumn>
    // </Container>
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt" />
                <div className="cta-text">
                  <h4>Địa chỉ</h4>
                  <span>
                    Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ
                    Liêm, Hà Nội
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone" />
                <div className="cta-text">
                  <h4>Call</h4>
                  <span>9876543210 0</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open" />
                <div className="cta-text">
                  <h4>Mail</h4>
                  <span>manshop@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <h1 className="text-light">MAN SHOP</h1>
                </div>
                <div className="footer-text">
                  <p>
                    Đây là một nơi tuyệt vời cho những người muốn tiết kiệm thời
                    gian để tìm những gì muốn mua,chúng tôi sẽ cung cấp cho bạn
                    một danh sách các sản phẩm tốt nhất có thể giải quyết vấn đề
                    hiện tại của bạn.
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#">
                    <i className="fab fa-facebook-f facebook-bg" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter twitter-bg" />
                  </a>
                  <a href="#">
                    <i className="fab fa-google-plus-g google-bg" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3> Hỗ trợ khách hàng</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href="#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Mua hàng online</a>
                  </li>
                  <li>
                    <a href="#">Chính sách bảo hành</a>
                  </li>
                  <li>
                    <a href="#">Thanh toán an toàn </a>
                  </li>
                  <li>
                    <a href="#">Khuyến mãi </a>
                  </li>
                  <li>
                    <a href="#">Mua hàng nhanh </a>
                  </li>
                  <li>
                    <a href="#">Giao hàng nhanh </a>
                  </li>
                  <li>
                    <a href="#">Giá cá phù hợp</a>
                  </li>
                  <li>
                    <a href="#">Sản phẩm mới nhất</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Mọi thông tin chi tiết xin vui lòng để lại email để chúng
                    tôi hỗ trợ bạn sớm nhất.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
