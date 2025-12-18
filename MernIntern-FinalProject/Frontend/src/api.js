const API_BASE_URL = "http://localhost:5000/api";
const BACKEND_URL = "http://localhost:5000";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const options = {
    method,
    headers: { "Content-Type": "application/json" }
  };

  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export const statusAPI = {
  getStatus: async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/status`);
      if (!response.ok) throw new Error("Status check failed");
      return await response.json();
    } catch (error) {
      return {
        backend: { connected: false, message: "Backend Disconnected" },
        database: { connected: false, message: "Database Disconnected" }
      };
    }
  }
};

export const authAPI = {
  register: (userData) => apiCall("/auth/register", "POST", userData),
  login: (credentials) => apiCall("/auth/login", "POST", credentials),
  getUsers: () => apiCall("/auth/users")
};

export const quizAPI = {
  createQuiz: (quizData) => apiCall("/quiz/create", "POST", quizData),
  getQuizzes: () => apiCall("/quiz"),
  getQuizById: (id) => apiCall(`/quiz/${id}`),
  submitQuiz: (submissionData) => apiCall("/quiz/submit", "POST", submissionData),
  getResults: () => apiCall("/quiz/results/all"),
  deleteQuiz: (id) => apiCall(`/quiz/${id}`, "DELETE")
};
