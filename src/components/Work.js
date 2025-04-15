import React from "react";
import "../styles/Work.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faClock, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const Work = ({ workList, deleteWork, completeWork, editWorkName, editWorkDetails }) => {
  const sortedWorkList = workList.sort((a, b) => {
    const dayOrder = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];

    // Sắp xếp theo thứ trong tuần
    const dayDiff = dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;

    // Sắp xếp theo ngày/tháng/năm
    const dateDiff = new Date(a.date.split("-").reverse().join("-")) - new Date(b.date.split("-").reverse().join("-"));
    if (dateDiff !== 0) return dateDiff;

    // Sắp xếp theo thời gian (hh:mm)
    const timeDiff =
      parseInt(a.time.replace(":", ""), 10) - parseInt(b.time.replace(":", ""), 10);
    if (timeDiff !== 0) return timeDiff;

    // Sắp xếp theo ưu tiên (Thấp -> Cao)
    const priorityOrder = { Thấp: 1, "Trung bình": 2, Cao: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="work-list">
      <div className="work-header">
        <span>Công việc</span>
        <span>Thứ</span>
        <span>Ngày</span>
        <span>Thời gian</span>
        <span>Ưu tiên</span>
        <span>Hành động</span>
      </div>
      {sortedWorkList.map((work) => (
        <div className="work-item" key={work.id}>
          <span>{work.name}</span>
          <span>{work.day}</span>
          <span>{work.date.split("-").reverse().join("-")}</span>
          <span>{work.time}</span>
          <span>{work.priority}</span>
          <div className="work-actions">
            <FontAwesomeIcon
              icon={faEdit}
              className="editIcon"
              title="Sửa nội dung"
              onClick={() => editWorkName(work.id)}
            />
            <FontAwesomeIcon
              icon={faClock}
              className="editIcon"
              title="Sửa thời gian"
              onClick={() => editWorkDetails(work.id, "time")}
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="editIcon"
              title="Sửa ngày"
              onClick={() => editWorkDetails(work.id, "date")}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="checkIcon"
              title="Hoàn thành"
              onClick={() => completeWork(work.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work;