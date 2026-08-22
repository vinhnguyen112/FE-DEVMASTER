let students = [
  {
    studentId: "SV001",
    studentName: "Nguyễn Văn A",
    age: 20,
    sex: true,
    birthDate: "2002-04-23",
    birthPlace: "HN",
    address: "25, Vũ Ngọc Phan",
  },
  {
    studentId: "SV002",
    studentName: "Nguyễn Văn B",
    age: 21,
    sex: false,
    birthDate: "2001-09-09",
    birthPlace: "ĐN",
    address: "1, Ngô Quyền",
  },
  {
    studentId: "SV003",
    studentName: "Nguyễn Văn C",
    age: 19,
    sex: true,
    birthDate: "2003-07-07",
    birthPlace: "HCM",
    address: "1, Lý Tự Trọng",
  },
  {
    studentId: "SV004",
    studentName: "Nguyễn Văn D",
    age: 29,
    sex: false,
    birthDate: "2005-07-07",
    birthPlace: "HCM",
    address: "1, Lý Tự Trọng",
  },
];

let editingId = null;

const fn_render = (data) => {
  $(".table table tbody").empty();

  data.forEach((student, index) => {
    let gioiTinh = student.sex ? "Nam" : "Nữ";

    let row = `
      <tr>
        <td>${index + 1}</td>
        <td>${student.studentId}</td>
        <td>${student.studentName}</td>
        <td>${student.age}</td>
        <td>${gioiTinh}</td>
        <td class="group-btn">
          <button class="btn-action redd" onClick="fn_showStudent('${student.studentId}')">XEM</button>
          <button class="btn-action yelloww" onClick="fn_editStudent('${student.studentId}')">SỬA</button>
          <button class="btn-action bluee" onClick="fn_deleteStudent('${student.studentId}')">XÓA</button>
        </td>
      </tr>
    `;

    $(".table table tbody").append(row);
  });
};

// Hàm xem thông tin sinh viên
const fn_showStudent = (id) => {
  let student = students.find((item) => item.studentId === id);
  if (!student) return;

  $("#studentId").val(student.studentId);
  $("#studentName").val(student.studentName);
  $("#age").val(student.age);
  $("#sex").val(student.sex.toString());
  $("#birthDate").val(student.birthDate);
  $("#birthPlace").val(student.birthPlace);
  $("#address").val(student.address);

  // Chỉ xem nên khóa ô nhập Mã SV
  $("#studentId").attr("readonly", true);

  editingId = null;
  $(".form-container").show();
};

// Hàm sửa sinh viên
const fn_editStudent = (id) => {
  let student = students.find((item) => item.studentId === id);
  if (!student) return;

  $("#studentId").val(student.studentId);
  $("#studentName").val(student.studentName);
  $("#age").val(student.age);
  $("#sex").val(student.sex.toString());
  $("#birthDate").val(student.birthDate);
  $("#birthPlace").val(student.birthPlace);
  $("#address").val(student.address);

  // Sửa thông tin nên khóa không cho sửa Mã SV
  $("#studentId").attr("readonly", true);

  editingId = id;
  $(".form-container").show();
};

// Hàm xóa sinh viên
const fn_deleteStudent = (id) => {
  if (confirm("Xác nhận xóa sinh viên này?")) {
    students = students.filter((item) => item.studentId !== id);
    fn_render(students);
  }
};

$(document).ready(() => {
  // Render danh sách sinh viên ban đầu
  fn_render(students);

  // Nút thêm sinh viên
  $(".btn-add.student").click(() => {
    editingId = null;
    $("#studentForm")[0].reset();

    // Thêm mới thì gỡ bỏ readonly ở ô Mã SV
    $("#studentId").removeAttr("readonly");

    $(".form-container").show();
  });

  // Submit form
  $("#studentForm").submit((e) => {
    e.preventDefault();

    if (editingId) {
      // Cập nhật sinh viên
      let index = students.findIndex((item) => item.studentId === editingId);
      if (index !== -1) {
        students[index] = {
          studentId: $("#studentId").val(),
          studentName: $("#studentName").val(),
          age: parseInt($("#age").val()),
          sex: $("#sex").val() === "true",
          birthDate: $("#birthDate").val(),
          birthPlace: $("#birthPlace").val(),
          address: $("#address").val(),
        };
      }
    } else {
      // Thêm mới sinh viên
      students.push({
        studentId: $("#studentId").val(),
        studentName: $("#studentName").val(),
        age: parseInt($("#age").val()),
        sex: $("#sex").val() === "true",
        birthDate: $("#birthDate").val(),
        birthPlace: $("#birthPlace").val(),
        address: $("#address").val(),
      });
    }

    fn_render(students);
    $(".form-container").hide();
    $("#studentForm")[0].reset();
    editingId = null;
  });

  // Nút hủy
  $(".btn-cancel").click(() => {
    $(".form-container").hide();
    $("#studentForm")[0].reset();
    editingId = null;
  });
});
