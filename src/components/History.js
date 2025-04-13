import React, { useState } from "react";
import '../styles/History.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

const History = ({ history, deleteHistoryItem, restoreTask }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc lịch sử dựa trên từ khóa tìm kiếm
  const filteredHistory = history.filter((work) =>
    work.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="history">
      <h2>Lịch sử công việc</h2>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="no-data">
          <FontAwesomeIcon icon={faInbox} className="no-data-icon" />
          <p className="no-data-text">Không có công việc nào trong lịch sử.</p>
        </div>
      ) : (
        <div className="history-grid">
          {filteredHistory.map((work) => (
            <div className="history-card" key={work.id}>
              <p><strong>Tên:</strong> {work.name}</p>
              <p><strong>Thời gian tạo:</strong> {work.createdAt}</p>
              <p><strong>Hoàn thành lúc:</strong> {work.completedAt}</p>
              <div className="history-buttons">
                <button onClick={() => restoreTask(work.id)}>Quay lại</button>
                <button onClick={() => deleteHistoryItem(work.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;