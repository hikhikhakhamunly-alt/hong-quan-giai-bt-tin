// Dán URL Web App Apps Script của bạn vào giữa hai dấu nháy bên dưới.
const ORDER_API_URL = "https://script.google.com/macros/s/AKfycbyH3b5bnohW0v0qafJ-4VhFTmm3DXFqDycPkGruOz9nPy1Po0xhpR9hp935q_HUooZ9/exec";

const lessonSelect = document.getElementById("lesson");
for (let i = 1; i <= 50; i++) {
  const option = document.createElement("option");
  option.value = String(i);
  option.textContent = `Bài ${i}`;
  lessonSelect.appendChild(option);
}

document.getElementById("orderForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.getElementById("status");
  const form = event.currentTarget;
  const data = {
    tenTaiKhoan: form.username.value.trim(),
    mk: form.verify.value.trim(), // Mã xác nhận, tuyệt đối không phải mật khẩu đăng nhập.
    bai: form.lesson.value,
    thanhToan: form.payment.value,
    ghiChu: form.note.value.trim(),
    thoiGian: new Date().toISOString()
  };

  if (!data.tenTaiKhoan || !data.bai || !data.thanhToan) {
    status.textContent = "Vui lòng điền tên tài khoản, chọn bài và hình thức thanh toán.";
    return;
  }
  if (ORDER_API_URL.includes("DAN_URL")) {
    status.textContent = "Chưa cấu hình địa chỉ nhận yêu cầu.";
    return;
  }

  status.textContent = "Đang gửi yêu cầu…";
  try {
    // no-cors chỉ gửi yêu cầu; trình duyệt không thể xác nhận máy chủ đã lưu thành công.
    await fetch(ORDER_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data)
    });
    status.textContent = "Đã gửi yêu cầu. Vui lòng chờ người quản lý xác nhận.";
    form.reset();
    lessonSelect.selectedIndex = 0;
  } catch (error) {
    status.textContent = "Chưa gửi được. Hãy thử lại hoặc liên hệ người quản lý.";
  }
});
