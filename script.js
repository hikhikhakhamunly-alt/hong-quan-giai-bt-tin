
// HỒNG QUÂN GIẢI BÀI TẬP TIN
// Kết nối Google Apps Script, gửi yêu cầu về Gmail admin.

const ORDER_API_URL = "https://script.google.com/macros/s/AKfycbyo2SpfFhAUXmB-H5cFBXem6DL4un1WhRXn8zo2QmAmrjynl4rPzQmoqPMccoXvvYYUJQ/exec";

// Thêm lựa chọn bài học từ 1 đến 50
const lessonSelect = document.getElementById("lesson");

if (lessonSelect) {
  for (let i = 1; i <= 50; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Bài ${i}`;
    lessonSelect.appendChild(option);
  }
}

// Hàm gửi dữ liệu đến Apps Script
async function sendRequest(data, status, button, form) {
  if (!ORDER_API_URL.endsWith("/exec")) {
    status.textContent = "Đường dẫn Apps Script chưa hợp lệ.";
    return;
  }

  status.textContent = "Đang gửi yêu cầu...";
  if (button) button.disabled = true;

  try {
    // Dùng no-cors để gửi yêu cầu đến Apps Script.
    // Trình duyệt không đọc được phản hồi trong chế độ này.
    await fetch(ORDER_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    status.textContent =
      "Đã gửi yêu cầu. Vui lòng chờ quản lý kiểm tra Gmail và xác nhận.";

    if (form) form.reset();

    if (lessonSelect) {
      lessonSelect.selectedIndex = 0;
    }
  } catch (error) {
    console.error("Lỗi gửi yêu cầu:", error);
    status.textContent =
      "Không gửi được yêu cầu. Vui lòng kiểm tra kết nối và thử lại.";
  } finally {
    if (button) button.disabled = false;
  }
}

// Biểu mẫu đăng ký bài tập
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const status = document.getElementById("status");
    const button = form.querySelector('[type="submit"]');

    const data = {
      action: "order",
      tenTaiKhoan: form.username.value.trim(),
      bai: form.lesson.value,
      thanhToan: form.payment.value,
      ghiChu: form.note.value.trim(),
      thoiGian: new Date().toISOString()
    };

    if (!data.tenTaiKhoan || !data.bai || !data.thanhToan) {
      status.textContent =
        "Vui lòng nhập tên tài khoản, chọn bài và hình thức thanh toán.";
      return;
    }

    await sendRequest(data, status, button, form);
  });
}

// Biểu mẫu mua KEY
const keyForm = document.getElementById("keyForm");

if (keyForm) {
  keyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const status = document.getElementById("status");
    const button = form.querySelector('[type="submit"]');

    const data = {
      action: "key_order",
      name: form.name ? form.name.value.trim() : "",
      contact: form.contact ? form.contact.value.trim() : "",
      plan: form.plan ? form.plan.value : "",
      message: form.message ? form.message.value.trim() : "",
      thoiGian: new Date().toISOString()
    };

    if (!data.name || !data.plan) {
      status.textContent = "Vui lòng nhập tên và chọn gói KEY.";
      return;
    }

    await sendRequest(data, status, button, form);
  });
}
