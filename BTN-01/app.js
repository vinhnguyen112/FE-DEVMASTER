const products = [
  {
    productId: "SP001",
    productName: "Laptop Dell Inspiron 15",
    quantity: 10,
    price: 18500000,
    image: "images/dell-inspiron.jpg",
    status: true,
  },
  {
    productId: "SP002",
    productName: "Laptop HP Pavilion 14",
    quantity: 8,
    price: 16900000,
    image: "images/hp-pavilion.jpg",
    status: true,
  },
  {
    productId: "SP003",
    productName: "Chuột Logitech M331",
    quantity: 25,
    price: 450000,
    image: "images/logitech-m331.jpg",
    status: true,
  },
  {
    productId: "SP004",
    productName: "Bàn phím cơ DareU EK87",
    quantity: 15,
    price: 890000,
    image: "images/dareu-ek87.jpg",
    status: true,
  },
  {
    productId: "SP005",
    productName: "Tai nghe Sony WH-CH520",
    quantity: 5,
    price: 1290000,
    image: "images/sony-wh-ch520.jpg",
    status: false,
  },
];

// hàm hiển thị danh sách

const fn_render = (data) => {
  $(".chuc-nang table tbody").empty();

  data.forEach((item, index) => {
    let thongBao = item.status ? "Còn hàng" : "Hết hàng";
    let row = `
    <tr>
                <td>${index + 1}</td>
                <td>${item.productId}</td>
                <td>${item.productName}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toLocaleString("vi-VN")}đ</td>
                <td>${item.image}</td>
                <td>${thongBao}</td>
                <td>
                  <button class="btn btn-xem" onclick="fn_showItem('${item.productId}')">Xem</button>
                  <button class="btn btn-sua" onclick="fn_editItem('${item.productId}')">Sửa</button>
                  <button class="btn btn-xoa" onclick="fn_deleteProduct('${item.productId}')">Xóa</button>
                </td>
              </tr>
  
  `;

    // them vao bang
    $(".chuc-nang table tbody").append(row);
  });
};

//ham xem tt san pham
const fn_showItem = (id) => {
  let item = products.find(function (item) {
    return item.productId === id;
  });

  if (!item) return;

  // hiên thị form
  $(".container-2").show();

  // hien thi len form
  $("#productId").val(item.productId);
  $("#productName").val(item.productName);
  $("#quantity").val(item.quantity);
  $("#price").val(item.price);
  $("#image").val(item.image);
  $("#status").val(item.status.toString());
  $("#productId").prop("disabled", true);

  // Cập nhật nút action
  $("#btnAction").attr("data-val", "0").text("Đóng");
};

//ham xu ly khi click vao nut sua
const fn_editItem = (id) => {
  fn_showItem(id); //goi hàm hiển thị tt lên form
  $("#btnAction").attr("data-val", "1").text("Cập nhật");
};

//hàm khi người dùng click vào nút cập nhật
const fn_updateItem = (product) => {
  // tìm vị trí của đối tượng cần sửa
  let index = products.findIndex((i) => {
    return i.productId === product.productId;
  });

  if (index === -1) return;

  products[index] = product;
  fn_render(products);
  alert("Cập nhật sản phẩm thành công!");
  $("#productId").prop("disabled", false);
  $("#btnAction").attr("data-val", "0").text("Đóng");
  $(".container-2").hide();
};

// fn_resetForm()
const fn_resetForm = () => {
  $("#productId").val("");
  $("#productName").val("");
  $("#quantity").val("");
  $("#price").val("");
  $("#image").val("");
  $("#status").val("true");

  // cập nhật nút action
  $("#btnAction").attr("data-val", "2").text("Ghi lại");
};

// Hàm xử lý thêm mới
const fn_saveProduct = (product) => {
  // Kiểm tra mã sản phẩm không được trùng
  let exists = products.some((item) => {
    return item.productId === product.productId;
  });
  if (exists) {
    alert("Mã sản phẩm " + product.productId + " đã tồn tại!");
    return;
  }

  // ghi vào mảng
  products.push(product);

  // render ->  view
  fn_render(products);
  alert("Thêm sản phẩm thành công!");
  $("#productId").prop("disabled", false);
  $("#btnAction").attr("data-val", "0").text("Đóng");
  $(".container-2").hide();
};

// Hàm thực hiện xóa
const fn_deleteProduct = (id) => {
  // hỏi trước khi xóa
  if (confirm("Bạn có chắc chắn xóa không?") === false) return;

  // Tìm vị trí và xóa
  let index = products.findIndex((x) => x.productId == id);
  if (index !== -1) {
    products.splice(index, 1);
  }

  // render
  fn_render(products);
  alert("Xóa sản phẩm thành công!");
  $(".container-2").hide();
};

// Gọi hàm hiển thị dữ liệu khi trang load
fn_render(products);

$(document).ready(() => {
  // khi click vào nút thêm mới sản phẩm thì: hiển thị form
  $(".btn-add").click(() => {
    $(".container-2").show();
    fn_resetForm();
  });

  $("#btnAction").click((event) => {
    event.preventDefault();

    // trang thái form là form xem
    console.log($("#btnAction").attr("data-val"));

    // Đóng form
    if ($("#btnAction").attr("data-val") === "0") {
      $(".container-2").hide();
      $("#productId").val("");
      $("#productName").val("");
      $("#quantity").val("");
      $("#price").val("");
      $("#image").val("");
      $("#status").val("");
      $("#btnAction").attr("data-val", "0").text("Đóng");
    }
    // Cập nhật
    if ($("#btnAction").attr("data-val") === "1") {
      // Lấy dữ liệu trên form
      let product = {
        productId: $("#productId").val().trim(),
        productName: $("#productName").val().trim(),
        quantity: Number($("#quantity").val()),
        price: Number($("#price").val()),
        image: $("#image").val().trim(),
        status: $("#status").val() === "true",
      };

      console.log(product);

      // Cập nhật
      fn_updateItem(product);
    }

    // Khi thêm mới
    if ($("#btnAction").attr("data-val") === "2") {
      // Lấy dữ liệu trên form
      let product = {
        productId: $("#productId").val().trim(),
        productName: $("#productName").val().trim(),
        quantity: Number($("#quantity").val()),
        price: Number($("#price").val()),
        image: $("#image").val().trim(),
        status: $("#status").val() === "true",
      };

      // gọi hàm xử lý thêm
      fn_saveProduct(product);
    }
  });
});
