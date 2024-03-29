 drop database ManShopV2

create database  ManShopV2
USE [ManShopV2]
GO

select * from categories

INSERT [dbo].[categories]( [createdat],[isactive],[title]) VALUES ( GETDATE(),1,N'Áo thun')
INSERT [dbo].[categories]( [createdat],[isactive],[title]) VALUES ( GETDATE(),1,N'Áo sơ mi')
INSERT [dbo].[categories]( [createdat],[isactive],[title]) VALUES ( GETDATE(),1,N'Áo nỉ')
INSERT [dbo].[categories]( [createdat],[isactive],[title]) VALUES ( GETDATE(),1,N'Áo khoác')
INSERT [dbo].[categories]( [createdat],[isactive],[title]) VALUES ( GETDATE(),1,N'Quần âu')

select * from materials

INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải Cotton', N'Loại vải thường được sử dụng nhiều nhất trong may mặc')
INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải Polyester', N'Vải PE viết tắt của polyester là loại vải sợi tổng hợp có nguồn gốc chính từ than đá, không khí và dầu mỏ. Vải PE rất dày, chúng có khả năng chống nước, chịu nhiệt tốt và độ bền cao nên thường sử dụng được trong thời gian dài ')
INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải lanh', N'Giống với tên gọi của nó, vải lanh hay linen được dệt nên bởi những sợi nhỏ từ thân cây lanh. Quy trình tạo nên vải lanh là hoàn toàn thủ công, các sợi vải được dệt rất chặt tay và khá to ')
INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải Jean', N'Vải Jean hay còn được gọi là vải bò, được dệt từ vải cotton Duck với các sợi dọc và sợi ngang xen kẽ, với hầu hết là màu xanh đặc trưng ')
INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải nỉ', N'Vải nỉ là sự kết hợp hoàn hảo giữa sợi vải thông thường và sợi len. Bề mặt vải tạo nên cảm giác mềm mịn với một lớp lông mỏng bao phủ bên ngoài ')
INSERT materials (createdat, isactive ,title, descriptions) VALUES ( GETDATE(), 1, N'Vải thô', N'Vải thô hay còn gọi là vải bạt, được dệt từ những nguyên liệu tự nhiên như bông và gai, có khả năng co giãn bốn chiều rất tốt ')

select * from colors

INSERT colors (colorcode, createdat, isactive, description) VALUES('#f75036', GETDATE(), 1, N'Đỏ Tươi')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#f28e3d', GETDATE(), 1, N'Cam Đất')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#f2d73d', GETDATE(), 1, N'Vàng')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#c8ed42', GETDATE(), 1, N'Xanh Nõn Chuối')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#9aed3b', GETDATE(), 1, N'Xanh Lá')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#3f7e91', GETDATE(), 1, N'Xanh Than')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#463f91', GETDATE(), 1, N'Tím Than')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#6f3f91', GETDATE(), 1, N'Tím')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#913f78', GETDATE(), 1, N'Tím Ánh Hồng')
INSERT colors (colorcode, createdat, isactive, description) VALUES('#960e24', GETDATE(), 1, N'Nâu')

select * from product

-----------T-shirt-------------
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 ,'2022-10-04', 1, 1,N'T-SHIRT WHITE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,1,N'T-SHIRT BLACK',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,1,N'T-SHIRT MELANGE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,1,N'T-SHIRT DARK NAVY',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,1,N'T-SHIRT CHARCOAL MELANGE',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,1,N'T-SHIRT DUSTY GREEN',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,1,N'T-SHIRT BURGUNDY',N'Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn. Như cổ điển, đây là trang phục nói với mọi người đàn ông. Được thiết kế để đứng vững trước sự thử thách của thời gian, chiếc áo phông cổ thuyền cắt thẳng đặc trưng của chúng tôi được làm từ áo bông Ai Cập dày dặn cao cấp và được nhấn nhá bằng đường viền cổ áo có gân. Đóng vai trò vừa đóng vai trò chủ chốt, vừa là món đồ thiết yếu, đây sẽ là món đồ được mặc nhiều nhất trong tủ quần áo của bạn.',200000,1)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,2,N'The Long Sleeve T-Shirt WHITE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,2,N'The Long Sleeve T-Shirt GRAY MELANGE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,2,N'The Long Sleeve T-Shirt DARK NAVY',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,2,N'The Long Sleeve T-Shirt BLACK',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,2,N'The Long Sleeve T-Shirt OFF WHITE',N'Một mặt hàng chủ lực dễ sử dụng quanh năm có trong tủ quần áo của mỗi người đàn ông. Áo phông dài tay của chúng tôi được làm thủ công từ loại bông chải kỹ nặng tùy chỉnh, được thiết kế để giữ cho bạn mát mẻ và được cắt cho vừa vặn để tạo ra một chiếc rèm sắc nét nhưng thoải mái. Cho dù nó được đeo một mình hay đế để xếp lớp, nó sẽ là một bổ sung linh hoạt cho dòng sản phẩm cốt lõi của bạn. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',250000,1)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,3,N'The Pique Polo WHITE',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,3,N'The Pique Polo DARK NAVY',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,3,N'The Pique Polo BLACK',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,3,N'The Pique Polo DARK OLIVE',N'Ra mắt trên sân quần vợt vào những năm 1920, chiếc áo Pique Polo lấp đầy khoảng trống giữa áo sơ mi và áo phông. Được giới thiệu lần đầu tiên trong bộ sưu tập vĩnh viễn của chúng tôi vào năm 2016, đây là bản cập nhật phiên bản thứ năm của chúng tôi: Cốt lõi của nó là một loại vải dệt kim hữu cơ mềm mại và đáng kể, thoáng khí được phát triển tùy chỉnh. Hình bóng cắt thẳng của chúng tôi được tô điểm bằng một cổ áo cân đối hoàn hảo và một chiếc áo khoác dạ kiểu Pháp liền mạch với những chiếc cúc xà cừ có tông màu đặc trưng của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',220000,1)


---- SHIRT -------

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,4,N'The Oxford Shirt WHITE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,4,N'The Oxford Shirt LIGHT GREY',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,4,N'The Oxford Shirt BLUE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,4,N'The Oxford Shirt DARK NAVY',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,4,N'The Oxford Shirt DARK GREEN',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,4,N'The Oxford Shirt BLUE STRIPE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,4,N'The Oxford Shirt LIGHT GREY STRIPE',N'Là món đồ cổ điển không thể thiếu trong mọi tủ quần áo, chiếc áo sơ mi cài nút bằng vải Oxford là thiết yếu vượt thời gian. Áo sơ mi của chúng tôi có kiểu dáng cắt thẳng, vải Oxford 100% cotton hữu cơ được chải mềm và các nút Mother of Pearl tùy chỉnh. Cho dù bạn kết hợp nó với denim hay quần tây, không có tủ quần áo nào là hoàn chỉnh nếu thiếu một chiếc. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,2)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,4,N'The Denim Shirt STONE BLEACH',N'Áo sơ mi denim đã phát triển từ nguồn gốc trang phục bảo hộ lao động truyền thống của nó thành một kiểu dáng cổ điển mới. Loại bỏ các chi tiết không cần thiết, chiếc áo của chúng tôi được cắt từ một cấu trúc dệt nhuộm chàm dày đặc, có tay cầm mềm mại sẽ chỉ tốt hơn theo thời gian. Cho dù bạn mặc nó một mình, nhiều lớp hay mặc như một chiếc áo sơ mi - đó là một sự lựa chọn đáng tin cậy. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',365000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,4,N'The Denim Shirt STONE WASH',N'Áo sơ mi denim đã phát triển từ nguồn gốc trang phục bảo hộ lao động truyền thống của nó thành một kiểu dáng cổ điển mới. Loại bỏ các chi tiết không cần thiết, chiếc áo của chúng tôi được cắt từ một cấu trúc dệt nhuộm chàm dày đặc, có tay cầm mềm mại sẽ chỉ tốt hơn theo thời gian. Cho dù bạn mặc nó một mình, nhiều lớp hay mặc như một chiếc áo sơ mi - đó là một sự lựa chọn đáng tin cậy. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',365000,2)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,1,N'The Linen Shirt WHITE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,1,N'The Linen Shirt BEIGE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,1,N'The Linen Shirt DARK NAVY',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,1,N'The Linen Shirt OLIVE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,1,N'The Linen Shirt BLUE STRIPE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,1,N'The Linen Shirt LIGHT BLUE',N'Một sự lựa chọn tự nhiên cho những ngày hè và nơi nghỉ ngơi ấm áp. Được cắt từ vải lanh 100% chỉ mềm hơn khi giặt và mặc, được thiết kế riêng để vừa vặn thoải mái và có các nút khảm xà cừ. Một sự lựa chọn nhẹ nhàng hơn, sẽ phù hợp với các bữa tiệc nướng cuối tuần cũng như trong mùa cưới. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',360000,2)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,5,N'The Overshirt DARK NAVY',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,5,N'The Overshirt OLIVE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,5,N'The Overshirt BEIGE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,5,N'The Overshirt TAUPE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,5,N'The Overshirt KHAKI GREEN',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,5,N'The Overshirt BLACK',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)


insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,5,N'The Wool Overshirt KHAKI GREEN',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,5,N'The Wool Overshirt CHARCOAL MELANGE',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,5,N'The Wool Overshirt DARK NAVY',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,6,N'TThe Flannel Shirt CHARCOAL MELANGE',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,6,N'TThe Flannel Shirt DARK NAVY',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,6,N'TThe Flannel Shirt KHAKI GREEN',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,6,N'TThe Flannel Shirt GREY MELANGE MELANGE',N'Chúng tôi mang phong cách cổ điển về trang phục bảo hộ lao động của Mỹ vượt qua cả văn hóa hipster thập niên 90 và thập niên 00 với đường cắt không rườm rà, cổ áo cài nút cổ điển và cấu trúc đan chéo tinh tế được thiết kế cho hàng ngày. Được cắt từ vải chéo mềm, chải kỹ, được phát triển tùy chỉnh của Ý được làm từ 100% bông hữu cơ, Áo sơ mi Flannel là một sự thay thế chắc chắn cho áo sơ mi trang trọng bằng cách kết hợp sự thoải mái và phong cách không giống như những chiếc áo sơ mi khác trong dòng sản phẩm của chúng tôi. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',420000,2)



--The Sweatshirt---


insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,1,N'The Sweatshirt GREY MELANGE',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,1,N'The Sweatshirt DARK NAVY',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,1,N'The Sweatshirt BLACK',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,1,N'The Sweatshirt DUSTY GREEN',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,1,N'The Sweatshirt BURGUNDY',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,1,N'The Sweatshirt OFF WHITE',N'Chúng tôi đã làm lại một tác phẩm cổ điển với sự tối giản của chúng tôi về bộ đồng phục cầu thủ bóng đá Mỹ nguyên bản. Được cắt từ loại bông Ai Cập không chải được phát triển tùy chỉnh của chúng tôi, có thiết kế vừa vặn nhưng cực kỳ thoải mái và nội thất mềm mại của chúng tôi. Hoàn hảo cho những ngày Chủ nhật chậm rãi ở nhà, nhưng vẫn đủ sắc nét để dạo phố. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',230000,3)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,1,N'The Hoodie GREY MELANGE',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,1,N'The Hoodie DARK NAVY',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,1,N'The Hoodie BLACK',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,1,N'The Hoodie MUD GREEN',N'Với nguồn gốc từ điền kinh và phản văn hóa, áo hoodie đã phát triển thành một mặt hàng thiết yếu. Được cắt từ sợi dây quấn vải cotton 100% hữu cơ được phát triển tùy chỉnh của chúng tôi, The Hoodie có mũ trùm đầu hai lớp có kích thước rộng rãi, nhưng được loại bỏ khỏi các chi tiết thông thường, không cần thiết. Bằng cách tối ưu hóa cho hình thức và chức năng thực tế (loại bỏ những thứ tương tự như túi đựng đồ), chúng tôi đã tạo ra một phần nâng cao đánh vần sự tinh tế, thay vì mặc thiếu, làm cho nó trở thành một lớp đi kèm cả khi bật - và tắt - đồng hồ. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',280000,3)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,1,N'The Zip Hoodie MUD GREEN',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,1,N'The Zip Hoodie GREY MELANGE',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,1,N'The Zip Hoodie DARK NAVY',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,1,N'The Zip Hoodie BLACK',N'Vượt qua khuôn mẫu trẻ trung, The Zip Hoodie đã phát triển thành một chiếc áo lớp giản dị với chức năng. Được cắt từ sợi dây quấn ngược được phát triển tùy chỉnh, có trọng lượng nặng, không có lông tơ từ 100% cotton hữu cơ, nó có mũ trùm đầu hai lớp có kích thước rộng rãi, túi bên ẩn và khóa kéo hai chiều. Là hai bộ phận bằng nhau giữa áo len và áo khoác, nó kết hợp tính thiết thực, thoải mái và phong cách không giống ai. Mặc nó với quần chinos và brogues yêu thích của bạn - hoặc chơi nó thật ngầu với denim và giày thể thao trắng. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',330000,3)


----OuterWear------

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,1,N'The Car Coat DARK NAVY',N'Một chiếc áo khoác cho tất cả các mùa. Áo khoác Xe hơi được cắt từ một loại vải dệt chéo sợi bông hữu cơ chắc chắn, được xử lý bề mặt không thấm nước và các đường nối dán băng keo để giữ cho bạn khô ráo quanh năm. Từ vải vỏ cho đến lớp lót, đường khâu và thậm chí cả phần gài và khóa kéo, mọi thành phần đều được phát triển để tối đa hóa tuổi thọ của nó trong khi giảm thiểu tác động đến hành tinh của chúng ta. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',690000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 10,1,N'The Car Coat BEIGE',N'Một chiếc áo khoác cho tất cả các mùa. Áo khoác Xe hơi được cắt từ một loại vải dệt chéo sợi bông hữu cơ chắc chắn, được xử lý bề mặt không thấm nước và các đường nối dán băng keo để giữ cho bạn khô ráo quanh năm. Từ vải vỏ cho đến lớp lót, đường khâu và thậm chí cả phần gài và khóa kéo, mọi thành phần đều được phát triển để tối đa hóa tuổi thọ của nó trong khi giảm thiểu tác động đến hành tinh của chúng ta. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',690000,4)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 1,1,N'The Wool Overshirt KHAKI GREEN',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 2,1,N'The Wool Overshirt CHARCOAL MELANGE',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 3,1,N'The Wool Overshirt DARK NAVY',N'Một kiểu trang phục cổ điển khác được tái sinh, The Wool Overshirt được lấy cảm hứng từ bộ đồng phục ban đầu của công nhân Pháp "Bleu de Travail". Được may từ sợi len đan chéo có trọng lượng trung bình, được làm từ 100% len tái chế, nó sẽ giúp bạn giữ ấm và khô ráo trong phong cách và là lớp trên cùng lý tưởng cho thời tiết chuyển mùa. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',450000,4)

insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 4,1,N'The Overshirt DARK NAVY',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 5,1,N'The Overshirt OLIVE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 6,1,N'The Overshirt BEIGE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 7,1,N'The Overshirt TAUPE',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 8,1,N'The Overshirt KHAKI GREEN',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)
insert Product(isactive,createdat, color , material, name, desc_title, price, Category) values(1 , '2022-10-04', 9,1,N'The Overshirt BLACK',N'Một cổ điển bảo hộ lao động tái sinh. Lấy cảm hứng từ bộ đồng phục công nhân nguyên bản “Bleu de Travail” của Pháp, The Overshirt có đường cắt thẳng, 3 túi trước cổ điển và được thiết kế từ 100% sợi cotton hữu cơ. Dù bạn là MacGyver hay chưa bao giờ sử dụng một công cụ điện nào trong đời, sự kết hợp giữa vải cấp độ quân sự và đường may cẩn thận của The Overshirt sẽ hoàn thiện vẻ ngoài của bạn. Đây là lớp trên cùng hoàn hảo cho những ngày ấm áp và là lớp giữa khi nhiệt độ giảm xuống. Hiểu và trân trọng giá trị của trang phục là điều cơ bản trong việc học cách sống tiết kiệm. Chúng ta càng biết nhiều, chúng ta càng đưa ra quyết định tốt hơn, chúng ta càng trân trọng những gì chúng ta có, nó sẽ tồn tại lâu hơn và - kết quả là chúng ta càng cần ít hơn.',310000,4)


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

select * from sizes

INSERT [dbo].[sizes]( [title]) VALUES ( 'XS')
INSERT [dbo].[sizes]( [title]) VALUES ( 'S')
INSERT [dbo].[sizes]( [title]) VALUES ( 'M')
INSERT [dbo].[sizes]( [title]) VALUES ( 'L')
INSERT [dbo].[sizes]( [title]) VALUES ( 'XL')
INSERT [dbo].[sizes]( [title]) VALUES ( 'XXL')

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 1, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 2, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 3, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 4, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 5, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 6, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 7, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 8, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 9, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 10, 6)


INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 11, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 12, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 13, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 14, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 15, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 16, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 17, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 18, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 19, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 20, 6)


INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 21, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 22, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 23, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 24, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 25, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 26, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 27, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 28, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 29, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 30, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 31, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 32, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 33, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 34, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 35, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 36, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 37, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 38, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 39, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 40, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 41, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 42, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 43, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 44, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 45, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 46, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 47, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 48, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 49, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 50, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 51, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 52, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 53, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 54, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 55, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 56, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 57, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 58, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 59, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 60, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 61, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 62, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 63, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 64, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 65, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 66, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 67, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 68, 6)

INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 1)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 2)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 3)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 4)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 5)
INSERT [dbo].[product_size]([isactive],[quantity],[product_id],[size_id]) VALUES (1, 30 , 69, 6)

INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_ADMIN')
INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_STAFF')
INSERT [dbo].[role]( [rolename]) VALUES (  N'ROLE_USER')

select * from role

select * from users

Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'Admin',1,'Admin@gmail.com','admin','123345612','default-avt.jpg','admin','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'nhanvien1',1,'Admin@gmail.com','le van luyen','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'nhanvien2',1,'Admin@gmail.com','luyen văn lê','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',1)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'MimosaChu',1,'Chuvietdung@gmail.com','Chu Viet Dung','123456789','default-avt.jpg','sachu','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'docco',1,'dococaubai@gmail.com','Doc co cau bai','123345612','default-avt.jpg','ssssssssssss','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'htk2200',1,'motconvit@gmail.com','Nguyen van dung','123456789','default-avt.jpg','s','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'duytien123',1,'duytien45@gmail.com','Khuat Duy Tien','123345612','default-avt.jpg','ssssssssss','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'hoangton111',1,'hoangton@gmail.com','hoang van ton','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'mattatca',0,'nguyenvantu@gmail.com','le thi dieu huyen','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'hoangtumua',1,'nguyenthanhtung@gmail.com','tran van tac','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'visaoemkhoc',1,'viembuon@gmail.com','le van huy','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'congchuabongbong',1,'baothy@gmail.com','tran kim ly','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'mattroibecon',1,'trandieuly@gmail.com','trinh thi thanh hoa','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'boideptrai',1,'bedenema@gmail.com','nguyen cong thang','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'thuynguyen',0,'thuybeo@gmail.com','duong thi thu thuy','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'giotnuocmat',1,'nuocmatemroi@gmail.com','Tran thi thanh tam','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'RPTMKC',1,'nguyenhoanglong@gmail.com','Nguyen Hoang Long','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'LowG97',1,'longnguyen@gmail.com','Nguyen Hoang Long','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'simple',1,'simple@gmail.com','Pham Van Hai','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'faker',1,'nguoihanquoc@gmail.com','Duong Minh Tien','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'hideonbush',1,'nguoihanquoc2@gmail.com','Vo Dong Giang','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'alicemeof',1,'ngocanh98@gmail.com','Chu Kieu Ngoc Anh','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'nhandante',1,'tapcanbinh@gmail.com','Trung cua dan','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'flashingalong',1,'csgoc4@gmail.com','Tran Anh Tuan','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'asa33',1,'asssa33@gmail.com','Vo van Kiet','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'rushbcykablyat',1,'csgo@gmail.com','Dinh van Dinh','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'nhomnhom',1,'nhomnhom@gmail.com','Mai ngoc lan','123456789','default-avt.jpg','nv1','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'viendanho199x',1,'hatcatto@gmail.com','Nguyen Thi Thu Trang','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'hoangtubanggia',0,'congchuanongbong@gmail.com','Dinh Van Thai','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'bongbong123',1,'bangbang@gmail.com','Nguyen The Cong','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'daychuyenbac',1,'mauden@gmail.com','Nguyen The Quyen','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'laohac',0,'cauvang@gmail.com','Duong Van Long','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'taolaisoquaco',1,'dungvaythuangai@gmail.com','Nguyen Van THinh','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'quangno',0,'emanhquang@gmail.com','Nguyen Khac Quang','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'16typm',1,'hoacai@gmail.com','Tran Van Tru','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'toidaidot1104',1,'toidaidot@gmail.com','Le Cong Hoa','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'chuatecuabautroi',1,'chimung11@gmail.com','Dinh Van Giap','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'doihoanho',1,'doihoanho@gmail.com','Nguyen Thi Anh Hien','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'hoahong96',1,'trinhthihoa98@gmail.com','Dao Thi Ngoc Mai','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'kimchicucai',1,'hanquoc@gmail.com','Kieu Diem My','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'motchinchinhai',1,'motchinchinhai@gmail.com','Trinh Thi Ly Ly','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'thanhthuy99',1,'nguyenthanhthuy@gmail.com','Le Thi Ngoc Thuy','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'son12',1,'sonla@gmail.com','Trinh Cong Son','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'admchat',1,'admchat@gmail.com','Admin Chat','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',2)
Insert into users(createdat ,username,activated,email,fullname,phone,photo,verificode,password,role) values(GETDATE() ,'khachle',1,'khachle@gmail.com','KhachLe','123345612','default-avt.jpg','nv2','$2a$12$8wuieUGIyBwdv7i/yhRQOOrtz0lPZK4iOtfm/UolNBesjYc98fgbu',3)


select * from users where username='niq'
update users set password = '$2a$10$PE7d5Z2Lw3HgylMDNwkn8.6RhcZ9tN7rsPjV7dfDfnMQE.AHh4LeG'
select* from role
select * from status_order
	
INSERT [dbo].[status_order]( [title]) VALUES ( N'Chờ Xác Nhận')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Đã Xác Nhận')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Giao Hàng')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Hoàn Thành')
INSERT [dbo].[status_order]( [title] ) VALUES ( N'Hoàn Trả')
INSERT [dbo].[status_order]( [title]) VALUES ( N'Hủy Đơn')
INSERT [dbo].[status_order]( [title]) VALUES ( N'Cập Nhật')

select * from payment
insert into payment(title) values(N'Thanh Toán')
insert into payment(title) values( N'Hoàn Tiền')
insert into payment(title) values( N'Chưa Thanh Toán')



------------------------------------------------------------------------
--1--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-01-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2022-01-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 1, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,1, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',1,1)


--3--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-01-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2022-01-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 2, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,2, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',2,1)


--3--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-01-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2022-01-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 3, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,3, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',3,1)


--4--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-02-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,400000.0,'2022-02-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 4, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-02-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,4, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-02-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',4,1)


--5--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-03-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,400000.0,'2022-03-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 400000,1,'XS',1, 5, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-03-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,5, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-03-10 00:00:00',N' ',436000, 0,N'chuyển khoản', N'admin',5,1)


--6--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-04-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,800000.0,'2022-04-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 6, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-04-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,6, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-04-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',6,1)


--7--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-05-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2022-05-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 7, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-05-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,7, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-05-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',7,1)


--8--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-06-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,600000.0,'2022-06-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 8, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-06-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,8, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-06-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',8,1)



--9--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-07-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,1000000.0,'2022-07-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 9, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-07-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,9, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-07-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',9,1)




--10--
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-08-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2022-08-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 10, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-08-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,10, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-08-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',10,1)


--11
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-09-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,600000.0,'2022-09-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 11, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-08-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,11, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-08-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',11,1)



--12
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-10-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,500000.0,'2022-10-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 12, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-10-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,12, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-10-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',12,1)




--13
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-11-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,800000.0,'2022-11-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 13, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-11-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,13, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-11-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',13,1)




--14
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2022-12-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,600000.0,'2022-12-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 14, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-12-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,14, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-12-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',14,1)


--15
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-01-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,2050000.0,'2021-01-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 15, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2021-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,15, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2021-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',15,1)



--16
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-01-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,600000.0,'2021-02-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 16, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2021-02-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,16, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2021-02-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',16,1)



--17
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-03-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,800000.0,'2021-01-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 17, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2021-03-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,17, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2021-03-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',17,1)



--18
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-04-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,1000000.0,'2021-04-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 18, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2021-04-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,18, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2021-04-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',18,1)



--19
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-05-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,750000.0,'2021-05-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 19, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,19, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',19,1)



--20
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-06-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,2200000.0,'2021-06-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 20, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,20, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',20,1)



--21
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-07-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2021-07-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 21, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,21, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',21,1)



--22
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-08-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2021-08-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 22, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,22, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',22,1)



--23
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-09-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,600000.0,'2021-09-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 23, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,23, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',23,1)


--24
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-10-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,660000.0,'2022-10-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 24, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,24, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',24,1)


--25
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-11-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,2000000.0,'2021-11-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 25, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,25, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',25,1)

--26
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-12-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,200000.0,'2021-12-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 26, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,26, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',26,1)

--27
insert into orders(citycode,cityname,createdat,discount ,district,districtname,fullname,location,note,ordertype,phone,refund,shipfee,surcharge,totalprice,updatedat,wardcode,wardname,orderstatusid,paymentid,username)
values(268,N'Hưng Yên','2021-12-10 00:00:00',0.0,2046,N'Huyện Văn Lâm',N'nguyen van a',N'ss','o',N'giao hàng','0968046545',0.0,36500.0,0,300000.0,'2021-12-10 00:00:00','220909',N'Xã Tân Quang',4,1,'admin')
insert into order_detail(prdiscount, price, quantity, size, status,orders,product) values(0, 200000,1,'XS',1, 27, 2)
insert into status_order_detail(createdat, description, updatedat,orderid,statusid, username) values( '2022-01-10 00:00:00',N'hóa đơn thanh toán tại quầy',null,27, 4, N'admin')
insert into payment_order_detail(createdat, description, paymentfee,paymentrefund,paymenttype,username,orderid,paymentid) values( '2022-01-10 00:00:00',N' ',236000, 0,N'chuyển khoản', N'admin',27,1)

