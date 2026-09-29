
// URL Web App Apps Script
const ORDER_API_URL = "https://script.google.com/macros/s/AKfycbyH3b5bnohW0v0qafJ-4VhFTmm3DXFqDycPkGruOz9nPy1Po0xhpR9hp935q_HUooZ9/exec";

// Thêm danh sách bài học
const lessonSelect = document.getElementById("lesson");

if (lessonSelect) {
  for (let i = 1; i <= 50; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = `Bài ${i}`;
    lessonSelect.appendChild(option);
  }
}

// Gửi yêu cầu đặt bài
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const status = document.getElementById("status");
    const submitButton = form.querySelector('[type="submit"]');

    const data = {
      action: "order",
      tenTaiKhoan: form.username.value.trim(),
      mk: form.verify.value.trim(),
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

    if (!ORDER_API_URL.endsWith("/exec")) {
      status.textContent = "Địa chỉ Apps Script chưa đúng.";
      return;
    }

    status.textContent = "Đang gửi yêu cầu...";
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data),
        redirect: "follow"
      });

      if (!response.ok) {
        throw new Error("Máy chủ trả về lỗi HTTP " + response.status);
      }

      const result = await response.json();

      if (result.success === true) {
        status.textContent =
          "Đã gửi yêu cầu thành công. Vui lòng chờ quản lý xác nhận.";
        form.reset();

        if (lessonSelect) {
          lessonSelect.selectedIndex = 0;
        }
      } else {
        status.textContent =
          result.message || "Máy chủ chưa xác nhận lưu yêu cầu.";
      }
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      status.textContent =
        "Không xác nhận được kết quả. Kiểm tra kết nối hoặc cấu hình Apps Script.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
