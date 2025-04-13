import React, { useState } from "react";
import '../styles/Add.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Add = ({ addWork }) => {
  const [workName, setWorkName] = useState("");

  const handleAdd = () => {
    if (workName.trim()) {
      addWork(workName);
      setWorkName(""); // Xóa nội dung input sau khi thêm
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd(); // Gọi hàm thêm khi nhấn Enter
    }
  };

  return (
    <div>
      <label>
        <FontAwesomeIcon icon={faPlus} className="addIcon" />
        Thêm công việc:
      </label>
      <input
        type="text"
        value={workName}
        onChange={(e) => setWorkName(e.target.value)}
        onKeyDown={handleKeyDown} // Lắng nghe sự kiện nhấn phím
        placeholder="Nhập công việc..."
      />
      <input type="submit" value="Thêm" onClick={handleAdd} />
    </div>
  );
};

export default Add;