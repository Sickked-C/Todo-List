import React, { useState } from "react";
import "../styles/Add.scss";

const Add = ({ addWork }) => {
  const [workName, setWorkName] = useState("");
  const [day, setDay] = useState("Thứ Hai");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = () => {
    if (!workName.trim() || !date || !time) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Tự động tính thứ từ ngày
    const calculatedDay = getDayFromDate(date);
    addWork(workName, calculatedDay, date, time);

    setWorkName(""); // Xóa nội dung input sau khi thêm
    setDate("");
    setTime("");
  };

  // Hàm tính toán thứ từ ngày
  const getDayFromDate = (date) => {
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  return (
    <div className="task-form">
      <div className="form-row">
        <label>Công việc:</label>
        <input
          type="text"
          placeholder="Nhập công việc..."
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Ngày:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Thời gian:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAdd}>
        Thêm
      </button>
    </div>
  );
};

export default Add;