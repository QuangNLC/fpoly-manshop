import React from "react";
import styled from "styled-components";
import "../../styles/contact.css";

// const RowFlex = styled.div`
//     display: flex;
//     gap: 40px;
//     flex-direction: row;
// `

// const ChildFlex = styled.div`
//     width: 50%;
// `

// const Title = styled.h3`
//     padding: 20px 0;
// `

// const Content = styled.p`
//     padding-bottom: 10px;
// `

const WebContact = () => {
  return (
    // <div style={{ paddingLeft: "100px", paddingRight: "100px", paddingTop: "50px" }}>
    //     <div className="main-content">
    //         <div className="page-title">
    //             <h1>Liên hệ</h1>
    //         </div>
    //         <Title>Hỗ trợ Khách hàng mua online</Title>
    //         <RowFlex>
    //             <ChildFlex>
    //                 <Content>Tổng đài: 1800 8888</Content>
    //                 <Content>9-17h thứ 2 - 6</Content>
    //             </ChildFlex>
    //             <ChildFlex>
    //                 <Content>Email: s21manshop@gmail.com</Content>
    //                 <Content>Địa chỉ: Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
    //             </ChildFlex>
    //         </RowFlex>
    //         <hr />
    //         <RowFlex>
    //             <ChildFlex>
    //                 <Title>Chăm sóc khách hàng:</Title>
    //                 <Content>Điện thoại: 1800.6061</Content>
    //                 <Content>Email: chamsockhachhang@gmail.com</Content>
    //             </ChildFlex>
    //             <ChildFlex>
    //                 <Title>Đặt số lượng lớn</Title>
    //                 <Content>Mss. Cúc</Content>
    //                 <Content>Điện thoại: 0949.604.941</Content>
    //                 <Content>Email: cucmanshop@gmail.com</Content>
    //             </ChildFlex>
    //         </RowFlex>
    //         <RowFlex>
    //             <ChildFlex>
    //                 <Title>Văn phòng miền Bắc</Title>
    //                 <Content>Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
    //                 <Content>Điện thoại: +8424-7303.8888</Content>
    //                 <Content>Fax: +8424 - 6277.9999 </Content>
    //                 <Content>Email: s21manshop@gmail.com</Content>
    //                 <Content>Website: www.manshop.com</Content>
    //             </ChildFlex>
    //             <ChildFlex>
    //                 <Title>Văn phòng miền Nam</Title>
    //                 <Content>Địa chỉ:  Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội</Content>
    //                 <Content>Điện thoại: +8424-7303.8888</Content>
    //                 <Content>Email: s21manshop@gmail.com</Content>
    //             </ChildFlex>
    //         </RowFlex>
    //         <hr />
    //         {/* <RowFlex>
    //             <ChildFlex>
    //                 <Title>Liên hệ làm đại lý <br /><small>(KV miền Bắc)</small><br /></Title>
    //                 <Content>Điện thoại: +8424-7303.0222 (Ext:629)</Content>
    //                 <Content>Mr. Nguyễn Đức Bằng</Content>
    //                 <Content>Điện thoại: 0904.530.833</Content>
    //                 <Content>Email: bangnd@canifa.com</Content>
    //             </ChildFlex>
    //             <ChildFlex>
    //                 <Title>Liên hệ làm đại lý <br /><small>(KV miền Nam)</small><br /></Title>
    //                 <Content>Điện thoại: +8428-3824.7141</Content>
    //                 <Content>Mr. Nguyễn Đức Bằng</Content>
    //                 <Content>Điện thoại: 0904.530.833</Content>
    //                 <Content>Email: bangnd@canifa.com</Content>
    //             </ChildFlex>
    //         </RowFlex> */}
    //         {/* <RowFlex>
    //             <div>
    //                 <Title>Nhà máy</Title>
    //                 <Content>Đường Nguyễn Văn Linh, Phường Bần Yên Nhân, T.X Mỹ Hào, Hưng Yên</Content>
    //                 <Content>Điện thoại: +84-221- 394 2234</Content>
    //                 <Content>Fax: +84 - 221-394 2235</Content>
    //             </div>
    //         </RowFlex> */}
    //     </div>
    // </div>

    <section className="contact-sec sec-pad .bg-light">
      <div className="container">
        <h1 className="section-title text-center pb-4">LIÊN HỆ</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="contact-detail">
              <div>
                <h4>Văn phòng miền bắc</h4>
                <ul className="contact-ul">
                  <li>
                    <i className="fas fa-map-marker-alt text-primary" /> Địa
                    chỉ: Tòa nhà FPT Polytechnic, P.Trịnh Văn Bô, Xuân Phương,
                    Nam Từ Liêm, Hà Nội
                  </li>
                  <li>
                    <i className="fas fa-phone text-danger" />
                    <a href="tel:0949604941">
                      <b>0949604941</b>
                    </a>
                  </li>
                  <li>
                    <i className=" fa fa-envelope" />
                    <a href="mailto:pardeepkumar4bjp@gmail.com">
                      <b>s21manshop@gmail.com</b>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h4>Văn phòng miền nam</h4>
              <ul className="contact-ul">
                <li>
                  <i className="fas fa-map-marker-alt text-primary" /> Địa chỉ:
                  391A Đ. Nam Kỳ Khởi Nghĩa, Phường 14, Quận 3, Thành phố Hồ Chí
                  Minh
                </li>
                <li>
                  <i className="fas fa-phone text-danger" />
                  <a href="tel:094967841" className="text-dark">
                    <b>0988889999</b>
                  </a>
                </li>
                <li>
                  <i className=" fa fa-envelope" />
                  <a
                    href="mailto:pardeepkumar4bjp@gmail.com"
                    className="text-dark">
                    <b> s21manshop@gmail.com</b>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col-md-8 ">
            <h4>Liên hệ với chúng tôi</h4>
            <form action="#" className="contFrm" method="POST">
              <div className="row">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ tên"
                    className="inptFld"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="inptFld"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại"
                    className="inptFld"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="sub"
                    placeholder="Địa chỉ"
                    className="inptFld"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    className="inptFld"
                    rows
                    cols
                    placeholder="Ghi chú"
                    required
                    defaultValue={""}
                  />
                </div>
                <div className="col-12 ">
                  <input
                    type="submit"
                    name="submit"
                    defaultValue="Gửi"
                    className="inptBtn bg-success d-md-block"
                  />
                </div>
              </div>
            </form>
          </div>
          <div classname="col-md-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558813973!2d105.74459841428761!3d21.0381327928356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x53cefc99d6b0bf6f!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1671113458436!5m2!1svi!2s"
              width={350}
              height={300}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebContact;
