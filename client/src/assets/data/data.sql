

drop database ManShop

create database  ManShop
USE [ManShop]
GO
select * from product
select * from users


INSERT [dbo].[categorys]( [title]) VALUES ( N'Áo thun')
INSERT [dbo].[categorys]( [title]) VALUES ( N'Áo sơ mi')
INSERT [dbo].[categorys]( [title]) VALUES ( N'Áo nỉ')
INSERT [dbo].[categorys]( [title]) VALUES ( N'Áo khoác')
INSERT [dbo].[categorys]( [title]) VALUES ( N'Quần âu')

-----------T-shirt-------------
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT WHITE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT BLACK',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT MELANGE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT DARK NAVY',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT CHARCOAL MELANGE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT DUSTY GREEN',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'T-SHIRT BURGUNDY',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Long Sleeve T-Shirt WHITE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Long Sleeve T-Shirt GRAY MELANGE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Long Sleeve T-Shirt DARK NAVY',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Long Sleeve T-Shirt BLACK',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Long Sleeve T-Shirt OFF WHITE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Pique Polo WHITE',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Pique Polo DARK NAVY',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Pique Polo BLACK',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Pique Polo DARK OLIVE',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)


---- SHIRT -------

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt WHITE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt LIGHT GREY',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt BLUE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt DARK NAVY',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt DARK GREEN',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt BLUE STRIPE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Oxford Shirt LIGHT GREY STRIPE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Denim Shirt STONE BLEACH',N'Áo sơ mi denim đã phát triển từ nguồn gốc trang phục bảo hộ lao động truyền thống của nó thành một kiểu dáng cổ điển mới. Loại bỏ các chi tiết không cần thiết, chiếc áo của chúng tôi được cắt từ một cấu trúc dệt nhuộm chàm dày đặc, có tay cầm mềm mại sẽ chỉ tốt hơn theo thời gian. Cho dù bạn mặc nó một mình, nhiều lớp hay mặc như một chiếc áo sơ mi - đó là một sự lựa chọn đáng tin cậy. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',365000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Denim Shirt STONE WASH',N'Áo sơ mi denim đã phát triển từ nguồn gốc trang phục bảo hộ lao động truyền thống của nó thành một kiểu dáng cổ điển mới. Loại bỏ các chi tiết không cần thiết, chiếc áo của chúng tôi được cắt từ một cấu trúc dệt nhuộm chàm dày đặc, có tay cầm mềm mại sẽ chỉ tốt hơn theo thời gian. Cho dù bạn mặc nó một mình, nhiều lớp hay mặc như một chiếc áo sơ mi - đó là một sự lựa chọn đáng tin cậy. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',365000,2)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt WHITE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt BEIGE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt DARK NAVY',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt OLIVE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt BLUE STRIPE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Linen Shirt LIGHT BLUE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt DARK NAVY',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt OLIVE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt BEIGE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt TAUPE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt KHAKI GREEN',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt BLACK',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)


insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt KHAKI GREEN',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt CHARCOAL MELANGE',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt DARK NAVY',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'TThe Flannel Shirt CHARCOAL MELANGE',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'TThe Flannel Shirt DARK NAVY',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'TThe Flannel Shirt KHAKI GREEN',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'TThe Flannel Shirt GREY MELANGE MELANGE',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)



--The Sweatshirt---


insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt GREY MELANGE',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt DARK NAVY',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt BLACK',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt DUSTY GREEN',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt BURGUNDY',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Sweatshirt OFF WHITE',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Hoodie GREY MELANGE',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Hoodie DARK NAVY',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Hoodie BLACK',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Hoodie MUD GREEN',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Zip Hoodie MUD GREEN',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Zip Hoodie GREY MELANGE',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Zip Hoodie DARK NAVY',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Zip Hoodie BLACK',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)


----OuterWear------

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Car Coat DARK NAVY',N'Một chiếc áo khoác cho tất cả các mùa. Áo khoác Xe hơi được cắt từ một loại vải dệt chéo sợi bông hữu cơ chắc chắn, được xử lý bề mặt không thấm nước và các đường nối dán băng keo để giữ cho bạn khô ráo quanh năm. Từ vải vỏ cho đến lớp lót, đường khâu và thậm chí cả phần gài và khóa kéo, mọi thành phần đều được phát triển để tối đa hóa tuổi thọ của nó trong khi giảm thiểu tác động đến hành tinh của chúng ta. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',690000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Car Coat BEIGE',N'Một chiếc áo khoác cho tất cả các mùa. Áo khoác Xe hơi được cắt từ một loại vải dệt chéo sợi bông hữu cơ chắc chắn, được xử lý bề mặt không thấm nước và các đường nối dán băng keo để giữ cho bạn khô ráo quanh năm. Từ vải vỏ cho đến lớp lót, đường khâu và thậm chí cả phần gài và khóa kéo, mọi thành phần đều được phát triển để tối đa hóa tuổi thọ của nó trong khi giảm thiểu tác động đến hành tinh của chúng ta. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',690000,4)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt KHAKI GREEN',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt CHARCOAL MELANGE',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Wool Overshirt DARK NAVY',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)

insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt DARK NAVY',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt OLIVE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt BEIGE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt TAUPE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt KHAKI GREEN',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(created_date, update_create, import_price, name, title, export_price, Category) values( '2022-10-04', '2022-10-04',150000,N'The Overshirt BLACK',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)

----NVHA

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC LOOSE', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC LOOSE BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC LOOSEREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC LOOSEREGULAR', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC REGULAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC REGULAR ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC KAKI REGULAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 300000, 595000, 'ÁO KHOÁC LAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁÁO KHOÁC A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC KAKI', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC KAKASHI', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC ÁO KHOÁC', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC BE A REAMe', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC AMERW', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC REAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC YASUOON', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC KHSA', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC DMMMS', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 595000, 'ÁO KHOÁC BE A LOSW', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO KHOAC KKSS', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'AO KHOAC SWSAA', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)


INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO SƠ KHOAC MU NHUNG BI THUA 3-6', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 4)
INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 450000, 'ÁO SƠ MI REGULAR CARO ASM112', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 400000, 'ÁO SƠ MI REGULAR CÔ  NUT ASM114 ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 420000, 'ÁO SƠ MI LIMFIT GIAP NUP ASM113 ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 420000, 'ÁO SƠ MI LOOSE ESCAPE ASM095 ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 420000, 'ÁO SƠ MI LOOSE BASIC ASM090', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 420000, 'ÁO SƠ MI LOOSE SUMMER PATTERN ASM093', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 420000, 'Áo Sơ Mi Loose Summer Escape ASM094', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 350000, 'ÁO SƠ MI IN HOA TIÊT ASM084', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 375000, 'ÁO SƠ MI OXFORD THÊU LOGO 4M ASM085', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 375000, 'Áo Sơ Mi NAZAFU ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 385000, 'ÁO SƠ MI TRƠN OXFORD ASM070', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 385000, 'ÁO SƠ MI CARO ASM040', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO SƠ MI CARO Nâu ASM043', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO SƠ MI REGULAR GENTLEMAN', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO SƠ MI REGULAR RED', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO SƠ MI REGULAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 2)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR AT112', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)


INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR BETTT ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR BE ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR BE ', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR BE A DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO STHUN REGULAR', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULARRss', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULARA DREAMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR GRAPHICMER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR GRAPHIC', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR FRIENDLY MayBE', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR FRIENDLY SAS', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR FRIENDLYxxx', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR FRIENDLY', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)

INSERT [dbo].[product]([created_date], [export_price], [import_price], [name], [title], [update_create], [category])
VALUES (  '2022-10-04', 200000, 395000, 'ÁO THUN REGULAR GRAPHICER', 'This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it.This is prodcuct and i dont know yo, but you have to buy it', '2022-10-04', 1)


select * from product

select * from  images

insert images(isdefault, product, photo) values(1, 1,N't-shirt-1-1.jpg')
insert images(isdefault, product, photo) values(0, 1,N't-shirt-1-2.jpg')
insert images(isdefault, product, photo) values(1, 2,N't-shirt-2-1.jpg')
insert images(isdefault, product, photo) values(0, 2,N't-shirt-2-2.jpg')
insert images(isdefault, product, photo) values(1, 3,N't-shirt-3-1.jpg')
insert images(isdefault, product, photo) values(0, 3,N't-shirt-3-2.jpg')
insert images(isdefault, product, photo) values(1, 4,N't-shirt-4-1.jpg')
insert images(isdefault, product, photo) values(0, 4,N't-shirt-4-2.jpg')
insert images(isdefault, product, photo) values(1, 5,N't-shirt-5-1.jpg')
insert images(isdefault, product, photo) values(0, 5,N't-shirt-5-2.jpg')
insert images(isdefault, product, photo) values(1, 6,N't-shirt-6-1.jpg')
insert images(isdefault, product, photo) values(0, 6,N't-shirt-6-2.jpg')
insert images(isdefault, product, photo) values(1, 7,N't-shirt-7-1.jpg')
insert images(isdefault, product, photo) values(0, 7,N't-shirt-7-2.jpg')
insert images(isdefault, product, photo) values(1, 8,N't-shirt-8-1.jpg')
insert images(isdefault, product, photo) values(0, 8,N't-shirt-8-2.jpg')
insert images(isdefault, product, photo) values(1, 9,N't-shirt-9-1.jpg')
insert images(isdefault, product, photo) values(0, 9,N't-shirt-9-2.jpg')
insert images(isdefault, product, photo) values(1, 10,N't-shirt-10-1.jpg')
insert images(isdefault, product, photo) values(0, 10,N't-shirt-10-2.jpg')
insert images(isdefault, product, photo) values(1, 11,N't-shirt-11-1.jpg')
insert images(isdefault, product, photo) values(0, 11,N't-shirt-11-2.jpg')
insert images(isdefault, product, photo) values(1, 12,N't-shirt-12-1.jpg')
insert images(isdefault, product, photo) values(0, 12,N't-shirt-12-2.jpg')
insert images(isdefault, product, photo) values(1, 13,N't-shirt-13-1.jpg')
insert images(isdefault, product, photo) values(0, 13,N't-shirt-13-2.jpg')
insert images(isdefault, product, photo) values(1, 14,N't-shirt-14-1.jpg')
insert images(isdefault, product, photo) values(0, 14,N't-shirt-14-2.jpg')
insert images(isdefault, product, photo) values(1, 15,N't-shirt-15-1.jpg')
insert images(isdefault, product, photo) values(0, 15,N't-shirt-15-2.jpg')
insert images(isdefault, product, photo) values(1, 16,N't-shirt-16-1.jpg')
insert images(isdefault, product, photo) values(0, 16,N't-shirt-16-2.jpg')
insert images(isdefault, product, photo) values(1, 17,N'shirt-1-1.jpg')
insert images(isdefault, product, photo) values(1, 18,N'shirt-2-1.jpg')
insert images(isdefault, product, photo) values(1, 19,N'shirt-3-1.jpg')
insert images(isdefault, product, photo) values(1, 20,N'shirt-4-1.jpg')
insert images(isdefault, product, photo) values(1, 21,N'shirt-5-1.jpg')
insert images(isdefault, product, photo) values(1, 22,N'shirt-6-1.jpg')
insert images(isdefault, product, photo) values(1, 23,N'shirt-7-1.jpg')
insert images(isdefault, product, photo) values(1, 24,N'shirt-8-1.jpg')
insert images(isdefault, product, photo) values(1, 25,N'shirt-9-1.jpg')
insert images(isdefault, product, photo) values(1, 26,N'shirt-10-1.jpg')
insert images(isdefault, product, photo) values(1, 27,N'shirt-11-1.jpg')
insert images(isdefault, product, photo) values(1, 28,N'shirt-12-1.jpg')
insert images(isdefault, product, photo) values(1, 29,N'shirt-13-1.jpg')
insert images(isdefault, product, photo) values(1, 30,N'shirt-14-1.jpg')
insert images(isdefault, product, photo) values(1, 31,N'shirt-15-1.jpg')
insert images(isdefault, product, photo) values(1, 32,N'shirt-16-1.jpg')
insert images(isdefault, product, photo) values(1, 33,N'shirt-17-1.jpg')
insert images(isdefault, product, photo) values(1, 34,N'shirt-18-1.jpg')
insert images(isdefault, product, photo) values(1, 35,N'shirt-19-1.jpg')
insert images(isdefault, product, photo) values(1, 36,N'shirt-20-1.jpg')
insert images(isdefault, product, photo) values(1, 37,N'shirt-21-1.jpg')
insert images(isdefault, product, photo) values(1, 38,N'shirt-22-1.jpg')
insert images(isdefault, product, photo) values(1, 39,N'shirt-23-1.jpg')
insert images(isdefault, product, photo) values(1, 40,N'shirt-24-1.jpg')
insert images(isdefault, product, photo) values(1, 41,N'shirt-25-1.jpg')
insert images(isdefault, product, photo) values(1, 42,N'shirt-26-1.jpg')
insert images(isdefault, product, photo) values(1, 43,N'shirt-27-1.jpg')
insert images(isdefault, product, photo) values(1, 44,N'shirt-28-1.jpg')
insert images(isdefault, product, photo) values(1, 45,N'sw-shirt-1-1.jpg')
insert images(isdefault, product, photo) values(1, 46,N'sw-shirt-2-1.jpg')
insert images(isdefault, product, photo) values(1, 47,N'sw-shirt-3-1.jpg')
insert images(isdefault, product, photo) values(1, 48,N'sw-shirt-4-1.jpg')
insert images(isdefault, product, photo) values(1, 49,N'sw-shirt-5-1.jpg')
insert images(isdefault, product, photo) values(1, 50,N'sw-shirt-6-1.jpg')
insert images(isdefault, product, photo) values(1, 51,N'sw-shirt-7-1.jpg')
insert images(isdefault, product, photo) values(1, 52,N'sw-shirt-8-1.jpg')
insert images(isdefault, product, photo) values(1, 53,N'sw-shirt-9-1.jpg')
insert images(isdefault, product, photo) values(1, 54,N'sw-shirt-10-1.jpg')
insert images(isdefault, product, photo) values(1, 55,N'sw-shirt-11-1.jpg')
insert images(isdefault, product, photo) values(1, 56,N'sw-shirt-12-1.jpg')
insert images(isdefault, product, photo) values(1, 57,N'sw-shirt-13-1.jpg')
insert images(isdefault, product, photo) values(1, 58,N'sw-shirt-14-1.jpg')
insert images(isdefault, product, photo) values(1, 59,N'out-wear-1-1.jpg')
insert images(isdefault, product, photo) values(1, 60,N'out-wear-2-1.jpg')
insert images(isdefault, product, photo) values(1, 61,N'out-wear-3-1.jpg')
insert images(isdefault, product, photo) values(1, 62,N'out-wear-4-1.jpg')
insert images(isdefault, product, photo) values(1, 63,N'out-wear-5-1.jpg')
insert images(isdefault, product, photo) values(1, 64,N'out-wear-6-1.jpg')
insert images(isdefault, product, photo) values(1, 65,N'out-wear-7-1.jpg')
insert images(isdefault, product, photo) values(1, 66,N'out-wear-8-1.jpg')
insert images(isdefault, product, photo) values(1, 67,N'out-wear-9-1.jpg')
insert images(isdefault, product, photo) values(1, 68,N'out-wear-10-1.jpg')
insert images(isdefault, product, photo) values(1, 69,N'out-wear-11-1.jpg')
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-70-img-1.jpg', 70)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-70-img-2.jpg', 70)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-71-img-1.jpg', 71)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-71-img-2.jpg', 71)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-72-img-1.jpg', 72)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-72-img-2.jpg', 72)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-73-img-1.jpg', 73)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-73-img-2.jpg', 73)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-74-img-1.jpg', 74)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-74-img-2.jpg', 74)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-75-img-1.jpg', 75)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-75-img-2.jpg', 75)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-76-img-1.jpg', 76)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-76-img-2.jpg', 76)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-77-img-1.jpg', 77)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-77-img-2.jpg', 77)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-78-img-1.jpg', 78)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-78-img-2.jpg', 78)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-79-img-1.jpg', 79)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-79-img-2.jpg', 79)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-80-img-1.jpg', 80)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-80-img-2.jpg', 80)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-81-img-1.jpg', 81)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-81-img-2.jpg', 81)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-82-img-1.jpg', 82)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-82-img-2.jpg', 82)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-83-img-1.jpg', 83)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-83-img-2.jpg', 83)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-84-img-1.jpg', 84)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-84-img-2.jpg', 84)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-85-img-1.jpg', 85)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-85-img-2.jpg', 85)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-86-img-1.jpg', 86)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-86-img-2.jpg', 86)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-87-img-1.jpg', 87)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-87-img-2.jpg', 87)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-88-img-1.jpg', 88)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-88-img-2.jpg', 88)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-89-img-1.jpg', 89)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-89-img-2.jpg', 89)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-90-img-1.jpg', 90)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-90-img-2.jpg', 90)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-91-img-1.jpg', 91)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-91-img-2.jpg', 91)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-92-img-1.jpg', 92)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-92-img-2.jpg', 92)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-93-img-1.jpg', 93)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-93-img-2.jpg', 93)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-94-img-1.jpg', 94)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-94-img-2.jpg', 94)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-95-img-1.jpg', 95)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-95-img-2.jpg', 95)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-96-img-1.jpg', 96)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-96-img-2.jpg', 96)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-97-img-1.jpg', 97)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-97-img-2.jpg', 97)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-98-img-1.jpg', 98)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-98-img-2.jpg', 98)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-99-img-1.jpg', 99)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-99-img-2.jpg', 99)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-100-img-1.jpg', 100)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-100-img-2.jpg', 100)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-101-img-1.jpg', 101)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-101-img-2.jpg', 101)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-102-img-1.jpg', 102)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-102-img-2.jpg', 102)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-103-img-1.jpg', 103)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-103-img-2.jpg', 103)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-104-img-1.jpg', 104)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-104-img-2.jpg', 104)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-105-img-1.jpg', 105)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-105-img-2.jpg', 105)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-106-img-1.jpg', 106)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-106-img-2.jpg', 106)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-107-img-1.jpg', 107)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-107-img-2.jpg', 107)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-108-img-1.jpg', 108)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-108-img-2.jpg', 108)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-109-img-1.jpg', 109)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-109-img-2.jpg', 109)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-110-img-1.jpg', 110)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-110-img-2.jpg', 110)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-111-img-1.jpg', 111)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-111-img-2.jpg', 111)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-112-img-1.jpg', 112)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-112-img-2.jpg', 112)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-113-img-1.jpg', 113)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-113-img-2.jpg', 113)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-114-img-1.jpg', 114)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-114-img-2.jpg', 114)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-115-img-1.jpg', 115)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-115-img-2.jpg', 115)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-116-img-1.jpg', 116)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-116-img-2.jpg', 116)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-117-img-1.jpg', 117)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-117-img-2.jpg', 117)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-118-img-1.jpg', 118)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-118-img-2.jpg', 118)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-119-img-1.jpg', 119)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-119-img-2.jpg', 119)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-120-img-1.jpg', 120)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-120-img-2.jpg', 120)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-121-img-1.jpg', 121)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-121-img-2.jpg', 121)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-122-img-1.jpg', 122)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-122-img-2.jpg', 122)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-123-img-1.jpg', 123)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-123-img-2.jpg', 123)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  1, 'pr-124-img-1.jpg', 124)
INSERT [dbo].[images](  [isdefault], [photo], [product]) VALUES (  0, 'pr-124-img-2.jpg', 124)





select * from sizes

INSERT [dbo].[sizes]( [title]) VALUES ( 'XS')
INSERT [dbo].[sizes]( [title]) VALUES ( 'S')
INSERT [dbo].[sizes]( [title]) VALUES ( 'M')
INSERT [dbo].[sizes]( [title]) VALUES ( 'L')
INSERT [dbo].[sizes]( [title]) VALUES ( 'XL')
INSERT [dbo].[sizes]( [title]) VALUES ( 'XXL')

select * from product_size

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 1, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 2, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 3, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 4, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 5, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 6, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 7, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 8, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 9, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 10, 6)


INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 11, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 12, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 13, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 14, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 15, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 16, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 17, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 18, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 19, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 20, 6)


INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 21, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 22, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 23, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 24, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 25, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 26, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 27, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 28, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 29, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 30, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 31, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 32, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 33, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 34, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 35, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 36, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 37, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 38, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 39, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 40, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 41, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 42, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 43, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 44, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 45, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 46, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 47, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 48, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 49, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 50, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 51, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 52, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 53, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 54, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 55, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 56, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 57, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 58, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 59, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 60, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 61, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 62, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 63, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 64, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 65, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 66, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 67, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 68, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 69, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 70, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 71, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 72, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 73, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 74, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 75, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 76, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 77, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 78, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 79, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 80, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 81, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 82, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 83, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 84, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 85, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 86, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 87, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 88, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES ( 30 , 89, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 90, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 91, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 92, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 93, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 94, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 95, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 96, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 97, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 98, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 99, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 100, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 101, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 102, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 103, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 104, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 105, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 106, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 107, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 108, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 109, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 110, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 111, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 112, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 113, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 114, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 115, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 116, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 117, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 118, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 119, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 120, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 121, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 122, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 123, 6)

INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 1)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 2)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 3)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 4)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 5)
INSERT [dbo].[product_size]([quantity],[product_id],[size_id]) VALUES (30 , 124, 6)

INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_ADMIN')
INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_STAFF')
INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_USER')


select * from users

Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('Admin',1,'Admin@gmail.com','admin','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','admin','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('nhanvien1',1,'Admin@gmail.com','le van luyen','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('nhanvien2',1,'Admin@gmail.com','luyen văn lê','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('MimosaChu',1,'Chuvietdung@gmail.com','Chu Viet Dung','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','sachu','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('docco',1,'dococaubai@gmail.com','Doc co cau bai','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','ssssssssssss','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('htk2200',1,'motconvit@gmail.com','Nguyen van dung','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','s','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('duytien123',1,'duytien45@gmail.com','Khuat Duy Tien','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','ssssssssss','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('hoangton111',1,'hoangton@gmail.com','hoang van ton','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('mattatca',0,'nguyenvantu@gmail.com','le thi dieu huyen','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('hoangtumua',1,'nguyenthanhtung@gmail.com','tran van tac','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('visaoemkhoc',1,'viembuon@gmail.com','le van huy','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('congchuabongbong',1,'baothy@gmail.com','tran kim ly','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('mattroibecon',1,'trandieuly@gmail.com','trinh thi thanh hoa','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('boideptrai',1,'bedenema@gmail.com','nguyen cong thang','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('thuynguyen',0,'thuybeo@gmail.com','duong thi thu thuy','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('giotnuocmat',1,'nuocmatemroi@gmail.com','Tran thi thanh tam','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('RPTMKC',1,'nguyenhoanglong@gmail.com','Nguyen Hoang Long','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('LowG97',1,'longnguyen@gmail.com','Nguyen Hoang Long','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('simple',1,'simple@gmail.com','Pham Van Hai','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('faker',1,'nguoihanquoc@gmail.com','Duong Minh Tien','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('hideonbush',1,'nguoihanquoc2@gmail.com','Vo Dong Giang','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('alicemeof',1,'ngocanh98@gmail.com','Chu Kieu Ngoc Anh','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('nhandante',1,'tapcanbinh@gmail.com','Trung cua dan','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('flashingalong',1,'csgoc4@gmail.com','Tran Anh Tuan','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('asa33',1,'asssa33@gmail.com','Vo van Kiet','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('rushbcykablyat',1,'csgo@gmail.com','Dinh van Dinh','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('nhomnhom',1,'nhomnhom@gmail.com','Mai ngoc lan','123456789','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('viendanho199x',1,'hatcatto@gmail.com','Nguyen Thi Thu Trang','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('hoangtubanggia',0,'congchuanongbong@gmail.com','Dinh Van Thai','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('bongbong123',1,'bangbang@gmail.com','Nguyen The Cong','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('daychuyenbac',1,'mauden@gmail.com','Nguyen The Quyen','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('laohac',0,'cauvang@gmail.com','Duong Van Long','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('taolaisoquaco',1,'dungvaythuangai@gmail.com','Nguyen Van THinh','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('quangno',0,'emanhquang@gmail.com','Nguyen Khac Quang','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('16typm',1,'hoacai@gmail.com','Tran Van Tru','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('toidaidot1104',1,'toidaidot@gmail.com','Le Cong Hoa','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('chuatecuabautroi',1,'chimung11@gmail.com','Dinh Van Giap','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('doihoanho',1,'doihoanho@gmail.com','Nguyen Thi Anh Hien','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('hoahong96',1,'trinhthihoa98@gmail.com','Dao Thi Ngoc Mai','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('kimchicucai',1,'hanquoc@gmail.com','Kieu Diem My','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('motchinchinhai',1,'motchinchinhai@gmail.com','Trinh Thi Ly Ly','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('thanhthuy99',1,'nguyenthanhthuy@gmail.com','Le Thi Ngoc Thuy','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('son12',1,'sonla@gmail.com','Trinh Cong Son','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(username,activated,email,fullname,phone,photo,verificode,password,role) values('admchat',1,'admchat@gmail.com','Admin Chat','123345612','https://i.pinimg.com/236x/cc/16/0c/cc160c19dbd165c43046c176223f10fe.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)


update  users set password = '1'
update users set photo = 'default-avt.jpg'

select * from users
select * from address

update users set address = 4 where username ='test2'

	
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Chờ Xác Nhận')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Đã Xác Nhận')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Đang Giao')
INSERT [dbo].[status_order]( [title]) VALUES ( N'Hoàn Tất')
INSERT [dbo].[status_order]( [title]) VALUES ( N'Đang Chờ')
select * from users where username = N'testpm'

select * from  images
select * from status_order

select * from oders

select  * from customer


select* from messages

select * from users where username = 'test'

select COUNT(status) from messages join users on messages.sendeduser = users.username where users.username = 'test' and status = 0 

update messages set status = 1 where receiveduser = 'admchat' and sendeduser = 'tu1'

select u.username, MAX(m.createdat) as latedmessage, COUNT(status) from users u join messages m on u.username = m.sendeduser where m.receiveduser = 'admchat' group by username 

select users.* from users join messages on users.username = messages.sendeduser where messages.receiveduser = 'admchat' group by username, activated, adress, email, fullname,password, photo,phone,verificode,role

select sendeduser, MAX(createdat) as latestmessage, COUNT(status) as newmessage from messages where (receiveduser = 'admchat' and sendeduser ='test' and status = 0) group by status, sendeduser



----------------------------VietNam 63 Districts Data-------------------------

select COUNT(*) from  citys
select count(*) from districts
select count(*) from wards



select * from citys
select * from districts
select * from wards



select * from customer

select * from oders


select * from order_noti