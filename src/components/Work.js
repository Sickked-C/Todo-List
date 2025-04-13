import React from "react";
import '../styles/Work.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faList, faEdit, faClock, faStar } from "@fortawesome/free-solid-svg-icons";

class Work extends React.Component {
  render() {
    const { workList, deleteWork, completeWork, toggleDailyWork } = this.props;
    return (
      <>
        {workList.length !== 0 ? (
          <>
            <p className="work-title">
              <FontAwesomeIcon icon={faList} className="listIcon" />
              Việc cần làm:
            </p>
            {workList.map((work) => (
              <div className="work" key={work.id}>
                <p>{work.name}</p>
                <p>Ưu tiên: {work.priority}</p>
                <p>Thời gian: {work.time}</p>
                <div>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="editIcon"
                    title="Sửa nội dung"
                    onClick={() => this.props.editWorkName(work.id)}
                  />
                  <FontAwesomeIcon
                    icon={faClock}
                    className="editIcon"
                    title="Sửa thời gian và mức độ"
                    onClick={() => this.props.editWorkDetails(work.id)}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`starIcon ${work.isDaily ? "active" : ""}`}
                    title="Đánh dấu công việc thường ngày"
                    onClick={() => toggleDailyWork(work.id)}
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
          </>
        ) : (
          <>
            <p className="work-title">
              <FontAwesomeIcon icon={faList} className="listIcon" />
              Việc cần làm:
            </p>
            <p className="work-describe">Chưa có việc cần làm</p>
          </>
        )}
      </>
    );
  }
}

export default Work;