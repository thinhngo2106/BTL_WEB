const bcrypt = require('bcryptjs');

const data = {
    users: [
      {
        userEmail: 'admin',
        userPassword: bcrypt.hashSync('12345678', 8), 
        userFname: 'Thinh',
        userLname: 'Ngo',
        address:'',
        phone: '094607186',
        isAdmin: true,
      },
      {
        userEmail: 'ngothinh2106@gmail.com',
        userPassword: bcrypt.hashSync('010820', 8), 
        userFname: 'Thinh',
        userLname: 'Ngo',
        address:'',
        phone: '094607186',
        isAdmin: false,
      },
      {
        userEmail: 'ngothinh210@gmail.com',
        userPassword: bcrypt.hashSync('0108201', 8), 
        userFname: 'Ngo',
        userLname: 'Thinh',
        address:'',
        phone: '0123456789',
        isAdmin: false,
      },                
    ],
    products:[
        {
            idProduct:1,
            productName: 'Giày Converse Chuck Taylor All Star Empowered Peace',
            productPrice:1600000,
            quantityInStock: 10,
            idBrand:1,
            idCategory:1,
        },
        {
            idProduct: 2,
            productName: 'Giày Converse Chuck Taylor All Star VLTG Chevron',
            productPrice:1500000,
            quantityInStock: 10,
            idBrand:1,
            idCategory:1,
        },
        {
            idProduct: 3,
            productName: 'Giày Converse Chuck Taylor All Star VLTG Leather And Chevron',
            productPrice:1900000,
            quantityInStock: 10,
            idBrand:1,
            idCategory:1,
        },
        {
            idProduct: 4,
            productName: 'Giày Converse Chuck Taylor All Star Renew',
            productPrice:1900000,
            quantityInStock: 10,
            idBrand:1,
            idCategory:1,
        },
        
    ],
    productdetail: [
        {
            idProduct: 1,
            productDescription:"Trở lại với mẫu giày Converse Chuck Taylor All Star Empowered Peace được thiết kế dựa trên nền đôi Chuck Taylor nguyên bản được bồi thêm cú twist với logo \"Vecro\" bên hông giày có thể tháo rời. Thông điệp \"Peace\" được thiết kế theo dạng Big Logo phối chuyển màu mát mắt mang cảm giác tươi mát cho mùa hè, đế giày Converse cao 25mm được làm từ chất liệu cao su lưu hóa tăng độ bền cho sản phẩm",
            image:"..//../image/Product/Converse/162053c-7.jpg",
        },
        {
            idProduct: 2,
            productDescription: "Mẫu giày Converse Chuck Taylor All Star 70 VLTG Chevron lấy cảm hứng từ những hoa văn táo bạo được mặc trên sân vào những năm 90, chúng tôi đã trang bị cho biểu tượng những lớp phủ chevron được cắt thành những lớp trung tính cực nhỏ. Một lớp da và da lộn phía trên và một đồ họa Chevron VLTG tạo nên một item xuất sắc.",
            image: "..//../image/Product/Converse/165958c-9.jpg",
        },
        {
            idProduct: 3,
            productDescription:"Mẫu giày Converse Chuck Taylor All Star 70 VLTG Leather And Chevron lấy cảm hứng từ những hoa văn táo bạo được mặc trên sân vào những năm 90, chúng tôi đã trang bị cho biểu tượng những lớp phủ chevron được cắt thành những lớp trung tính cực nhỏ. Một lớp da và da lộn phía trên và một đồ họa Chevron VLTG tạo nên một item xuất sắc.",
            image: "..//../image/Product/Converse/166005-9.png",
        },
        {
            idProduct: 4,
            productDescription:"Sau nhiều năm sáng tạo không ngừng nghỉ, Converse Renew luôn kiên định với mục tiêu tái chế từ những chất thải ra môi trường để sản xuất nên những đôi giày mới vừa chất vừa đẹp vừa độc đáo. Không chỉ phát triển thêm những công nghệ mới để có thể tái chế đa dạng vật liệu cũng như tối ưu hóa",
            image: "..//../image/Product/Converse/166070c-1.jpg",
        }
    ],
    brands:[
        {
            idBrand: 1,
            brandName: 'Converse',
        },
        {
            idBrand: 2,
            brandName: 'Vans',
        },
    ],
    categories:[
        {
            idCategory: 1,
            categoryName: 'Giày Converse',
        },
        {
            idCategory:2,
            categoryName:'Giày Vans',
        },
        {
            idCategory:3,
            categoryName:'Áo Converse',
        }
    ]
};
  
  module.exports = data;