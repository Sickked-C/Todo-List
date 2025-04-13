// Lấy dữ liệu học từ Local Storage
export const getLearningData = () => {
    const data = localStorage.getItem("learningData");
    return data ? JSON.parse(data) : [];
  };
  
  // Lưu dữ liệu học vào Local Storage
  export const saveLearningData = (data) => {
    localStorage.setItem("learningData", JSON.stringify(data));
  };
  
  // Cập nhật dữ liệu học khi người dùng chỉnh sửa
  export const updateLearningData = (taskName, priority, time) => {
    const learningData = getLearningData();
    const existingEntry = learningData.find((entry) => entry.taskName === taskName);
  
    if (existingEntry) {
      // Cập nhật dữ liệu nếu công việc đã tồn tại
      existingEntry.priority = priority;
      existingEntry.time = time;
    } else {
      // Thêm dữ liệu mới nếu công việc chưa tồn tại
      learningData.push({ taskName, priority, time });
    }
  
    saveLearningData(learningData);
  };
  
  // Dự đoán mức độ ưu tiên và thời gian dựa trên dữ liệu học
  export const predictFromLearningData = (taskName) => {
    const learningData = getLearningData();
    const matchingEntry = learningData.find((entry) => taskName.includes(entry.taskName));
  
    if (matchingEntry) {
      return {
        priority: matchingEntry.priority,
        time: matchingEntry.time,
      };
    }
  
    // Mặc định nếu không tìm thấy dữ liệu phù hợp
    return {
      priority: "Trung bình",
      time: "1 giờ",
    };
  };