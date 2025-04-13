import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import '../styles/App.scss';
import Add from "../components/Add";
import Work from "../components/Work";
import History from "../components/History";
import { predictFromLearningData, updateLearningData } from "../utils/learningAI";

class App extends React.Component {
  state = {
    workList: [], // Danh sách công việc
    history: [], // Lịch sử công việc đã hoàn thành
  };

  // Lưu danh sách công việc vào Local Storage
  saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Tải danh sách công việc từ Local Storage
  loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  // Thêm công việc mới
  addWork = (workName) => {
    const prediction = predictFromLearningData(workName);
    const newWork = {
      id: Date.now(),
      name: workName,
      priority: prediction.priority,
      time: prediction.time,
      isDaily: false,
      createdAt: new Date().toLocaleString(),
    };
    this.setState(
      (prevState) => {
        const updatedWorkList = [...prevState.workList, newWork];
        this.saveToLocalStorage("workList", updatedWorkList);
        return { workList: updatedWorkList };
      }
    );
  };

  // Xóa công việc
  deleteWork = (id) => {
    this.setState(
      (prevState) => {
        const updatedWorkList = prevState.workList.filter((work) => work.id !== id);
        this.saveToLocalStorage("workList", updatedWorkList);
        return { workList: updatedWorkList };
      }
    );
  };

  // Đánh dấu công việc là hoàn thành
  completeWork = (id) => {
    const completedAt = new Date().toLocaleString();
    this.setState(
      (prevState) => {
        const completedWork = prevState.workList.find((work) => work.id === id);
        const updatedHistory = [
          ...prevState.history,
          { ...completedWork, completedAt },
        ];
        const updatedWorkList = prevState.workList.filter((work) => work.id !== id);

        this.saveToLocalStorage("history", updatedHistory);
        this.saveToLocalStorage("workList", updatedWorkList);

        return { workList: updatedWorkList, history: updatedHistory };
      }
    );
  };

  // Xóa một mục trong lịch sử
  deleteHistoryItem = (id) => {
    this.setState(
      (prevState) => {
        const updatedHistory = prevState.history.filter((work) => work.id !== id);
        this.saveToLocalStorage("history", updatedHistory);
        return { history: updatedHistory };
      }
    );
  };

  // Khôi phục công việc từ lịch sử về trang chủ
  restoreTask = (id) => {
    this.setState(
      (prevState) => {
        const restoredTask = prevState.history.find((work) => work.id === id);
        const updatedWorkList = [...prevState.workList, restoredTask];
        const updatedHistory = prevState.history.filter((work) => work.id !== id);

        this.saveToLocalStorage("workList", updatedWorkList);
        this.saveToLocalStorage("history", updatedHistory);

        return { workList: updatedWorkList, history: updatedHistory };
      }
    );
  };

  // Tải dữ liệu khi ứng dụng khởi động
  componentDidMount() {
    const workList = this.loadFromLocalStorage("workList");
    const history = this.loadFromLocalStorage("history");
    this.setState({ workList, history });
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Trang chính</Link> | <Link to="/history">Lịch sử</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <p className="app-title">TODO LIST</p>
                  <Add addWork={this.addWork} />
                  <Work
                    workList={this.state.workList}
                    deleteWork={this.deleteWork}
                    completeWork={this.completeWork}
                  />
                </div>
              }
            />
            <Route
              path="/history"
              element={
                <History
                  history={this.state.history}
                  deleteHistoryItem={this.deleteHistoryItem}
                  restoreTask={this.restoreTask}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;