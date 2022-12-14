import React from "react";
import "../../styles/aboutUs.css";
import about01 from "../../assets/imgs/about01.jpg";
import about02 from "../../assets/imgs/about02.jpg";

const WebAboutUs = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="heading text-center">
          <h2>Về chúng tôi</h2>
          <p>
            Đây là một nơi tuyệt vời cho những người muốn tiết kiệm thời gian để
            tìm những gì muốn mua, <br /> chúng tôi sẽ cung cấp cho bạn một danh
            sách các sản phẩm tốt nhất có thể giải quyết vấn đề hiện tại của
            bạn. <br />
            Kết quả là bạn có thể đưa ra quyết định mua sắm dễ dàng và cho bạn
            biết cách làm thế nào để lựa chọn <br /> một sản phẩm tốt mà bạn có
            thể nhận nó ngay bây giờ.
          </p>
        </div>
        <div className="row mb-5">
          <div className="col-lg-5 text-center ">
            <img
              src={about01}
              alt="about"
              className="rounded-circle"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-lg-7">
            <h3>Bạn sẽ nhận được gì từ chúng tôi?</h3>
            <p>
              Trong nhiều năm gần đây nhu cầu mua sắm trực tuyến luôn là sự lựa
              chọn của mỗi gia đình, chỉ cần một chiếc điện thoại có kết nối
              Internet bạn có thể tìm kiếm những thông tin cần thiết liên quan
              đến các sản phẩm mà bạn quan tâm. <br />
              Chính vì thế, đội nhóm thành viên của chúng tôi đã dành cả tuổi
              thanh xuân của mình để xây dựng website “” hy vọng sẽ giúp bạn có
              được những kinh nghiệm mua sắm hữu ích thông qua những bài đánh
              giá sản phẩm chân thực nhất. <br /> Tất cả các sản phẩm được đăng
              tải trên website của chúng tôi đều phải trải qua quá trình phân
              tích so sánh giữa hàng trăm sản phẩm khác nhau để tìm 5 sản phẩm
              tốt nhất phù hợp với tiêu chí “
              <em>Chất lượng – Giá rẻ – Uy tín – Tốt nhất</em>” để giới thiệu
              đến những người dùng thông minh đem&nbsp;lại giá trị lâu dài cho
              cộng đồng người Việt.
            </p>

            <div className="row">
              <div className="col-md-6">
                <h4>
                  <i className="far fa-star" />
                  Miễn phí vận chuyển
                </h4>
              </div>
              <div className="col-md-6">
                <h4>
                  <i className="far fa-star" />
                  Khuyến mãi giảm đến 50%
                </h4>
              </div>
              <div className="col-md-6">
                <h4>
                  <i className="far fa-star" />
                  Hỗ trợ tận tâm ,nhiệt tình
                </h4>
              </div>
              <div className="col-md-6">
                <h4>
                  <i className="far fa-star" />
                  Chính hãng 100%
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-7">
            <h3>Tất cả sản phẩm này đến từ đâu? </h3>
            <p>
              Đây là nơi phù hợp để bạn tìm được bất kỳ sản phẩm nào với các lời
              khuyên đúng đắn nhất mà chúng tôi không quảng cáo hay nhắc tới
              vì&nbsp;bất kỳ mối quan hệ kinh doanh nào khác. <br />
              Vì vậy, bạn sẽ tìm được một sản phẩm chất lượng cao ở đây mà không
              cần thêm bất kỳ khoản phí nào khác. <br />
              Đặc biệt, chúng tôi sẽ giới thiệu cho bạn những sản phẩm tốt nhất
              thông qua hệ thống website thương mại điện tử uy tín nhất tại Việt
              Nam như Tiki, Lazada, Adayroi, Shopee.
            </p>
          </div>
          <div className="col-lg-5 text-center">
            <img
              src={about02}
              alt="about"
              className="rounded-circle"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
      <div className="row mt-5 container ml-5">
        <div className="col-md-12 ml-5">
          <div className="heading text-center ">
            <h2>Lời nói cuối cùng từ chúng tôi</h2>
            <p className="text-left">
              Khi đến trang web của chúng tôi bạn sẽ tìm được những bài hướng
              dẫn chi tiết về cách chọn sản phẩm phù hợp cho chính mình, <br />{" "}
              một số người có thể tìm kiếm các sản phẩm bền bỉ trong khi những
              người khác quan tâm đến thiết kế. <br />
              Kết quả là bạn có thể đưa ra quyết định mua sắm dễ dàng và cho bạn
              biết cách làm thế nào để lựa chọn một sản phẩm tốt mà bạn có thể
              nhận nó ngay bây giờ. <br /> Bạn không phải lo lắng về vấn đề này
              vì chúng tôi sẽ cung cấp cho bạn lời khuyên tốt nhất, và sau đó
              bạn sẽ không bao giờ hối tiếc sau khi thực hiện mua hàng thực tế.{" "}
              <br />
              Để liên hệ bạn có thể liên hệ với tôi thông qua trang liên hệ hoặc
              gửi trực tiếp đến địa chỉ. <br />
              Liên hệ với admin website qua email:
              <a href="mailto:admin.manshop@gmail.com">
                quangdz@gmail.com
              </a>{" "}
              <br />
              Điện thoại: 0393403570 hoặc Facebook:{" "}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer nofollow">
                Hồ Bá Thiện
              </a>{" "}
              <br />
              Liên hệ qua fanpage:{" "}
              <a href="https://www.facebook.com/" rel="nofollow noopener">
                https://www.facebook.com/manshop
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebAboutUs;
