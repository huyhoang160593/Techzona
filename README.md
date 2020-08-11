# Techzona

**Dự án website bán hàng online để nộp môn thiết kế web**

Website có các phần chính sau:
  - Front-end: ReactJS, Redux
  - Back-end: Node.JS, Express
  - Cơ sở dữ liệu: MongoDB Atlat(kết nối với back-end thông qua trung gian là Mongoose)(cloud)
  - AWS S3: dùng làm nơi lưu trữ ảnh(cloud)
  - Thanh toán: hỗ trợ Paypal API(sử dụng sandbox mode để phục vụ việc show cho thầy)
  - Token: JWT Token để hỗ trợ việc đăng nhập
  - Cookie: JSCookie để lưu trữ thông tin đăng nhập và trạng thái giỏ hàng
  - Thực hiện các HTTP request: sử dụng axious ở phần frontend

Cùng với các package cài thêm để tăng cường tính bảo mật và độ linh hoạt cho dự án

Các chức năng chính mà trang web có:
  - Hiển thị sản phẩm
  - Xem chi tiết sản phẩm
  - Lọc theo 3 tiêu chí chính: Mới nhất, Từ thấp đến cao, ngược lại
  - Tìm kiếm theo tên mặt hàng
  - Menu chia theo danh mục: Camera, Máy tính, Điện thoại thông minh
  - Đăng nhập, đăng ký đơn giản
  - Có giỏ hàng để lưu giữ các mặt hàng đã mua
  - Phần tạo đơn hàng trong đó cần phải hoàn thiện các bước: Vận chuyển, thanh toán, đặt hàng
  - Có phần thông tin tài khoản để thay đổi thông tin: Tên, mật khẩu. Cùng với đó là quản lý các đơn hàng mình đã mua để thanh toán nếu muốn và kiểm tra tình trạng đơn hàng
  - Tài khoản admin có thêm phần quản lý sản phẩm và quản lý đơn hàng: 
    - Sản phẩm có thể chỉnh sửa, thêm sản phẩm mới hoặc xóa đi sản phẩm không bán nữa
    - Đơn hàng thì có thể xóa hoặc hoàn tất đơn hàng để đánh dấu đơn hàng đã được chuyển phát thành công. Đơn hàng đặc biệt sẽ có thêm phần thời gian thanh toán và thời gian mua để dễ dàng theo dõi
  - Giao diện dễ nhìn, dễ dùng dễ thao tác
  
 Dự án có tham khảo khóa học làm web Full ECommerce [tại đây](https://www.youtube.com/watch?v=Fy9SdZLBTOo&t=1s)(phần miễn phí, còn phần trả phí thì phải tự mò :((( )
 
 
