import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { quizAPI } from "../api";
import SystemStatus from "./SystemStatus";
import "../Styles/Admin.css";

function Admin() {
  const navigate = useNavigate();
  const [showAddClass, setShowAddClass] = useState(false);
  const [activeTab, setActiveTab] = useState("quiz");
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [backendQuizzes, setBackendQuizzes] = useState([]);
  
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      className: "",
      timeLimit: 30,
      questions: [{ question: "", options: ["", "", "", ""], answer: 0, imageId: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  const { register: registerClass, handleSubmit: handleSubmitClass, reset: resetClass } = useForm();

  useEffect(() => {
    loadStudents();
    loadBackendQuizzes();
  }, []);

  function loadStudents() {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    const uniqueStudents = Array.from(new Map(
      results.map(r => [r.rollNo, r])
    ).values()).filter(s => s && s.name && s.rollNo);
    setStudents(uniqueStudents);
  }

  async function loadBackendQuizzes() {
    const data = await quizAPI.getQuizzes();
    if (data) {
      setBackendQuizzes(data);
    }
  }

  async function onSubmitQuiz(data) {
    const quizData = {
      title: data.title,
      className: data.className,
      timeLimit: parseInt(data.timeLimit),
      questions: data.questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: parseInt(q.answer),
        imageId: q.imageId || ""
      }))
    };

    const result = await quizAPI.createQuiz(quizData);
    if (result) {
      alert("Quiz created successfully!");
      reset();
      loadBackendQuizzes();
      const localQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
      localQuizzes.push(result.quiz);
      localStorage.setItem("quizzes", JSON.stringify(localQuizzes));
    } else {
      alert("Failed to create quiz");
    }
  }

  function onSubmitClass(data) {
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const newClass = {
      id: Date.now(),
      name: data.className.toUpperCase(),
      createdAt: new Date().toISOString()
    };
    classes.push(newClass);
    localStorage.setItem("classes", JSON.stringify(classes));
    alert("Class created successfully!");
    resetClass();
    setShowAddClass(false);
  }

  function deleteStudent(rollNo) {
    if (window.confirm("Are you sure you want to delete this student's records?")) {
      const results = JSON.parse(localStorage.getItem("results")) || [];
      const filtered = results.filter(r => r.rollNo !== rollNo);
      localStorage.setItem("results", JSON.stringify(filtered));
      loadStudents();
    }
  }

  const classes = JSON.parse(localStorage.getItem("classes")) || [];
  const filteredStudents = students.filter(s => 
    s && s.name && s.rollNo && (
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-header">Admin Dashboard</h2>
        
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            Quiz Management
          </button>
          <button 
            className={`tab-btn ${activeTab === "crm" ? "active" : ""}`}
            onClick={() => setActiveTab("crm")}
          >
            Student CRM
          </button>
          <button 
            className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
          <button 
            className={`tab-btn ${activeTab === "status" ? "active" : ""}`}
            onClick={() => setActiveTab("status")}
          >
            System Status
          </button>
        </div>

        {activeTab === "quiz" && (
          <div className="tab-content">
            <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
              <button 
                onClick={() => setShowAddClass(!showAddClass)} 
                className="add-question-btn"
              >
                {showAddClass ? "Hide Add Class" : "Add New Class"}
              </button>
              <button 
                onClick={() => navigate("/quiz/feedbacks")} 
                className="add-question-btn"
              >
                View Feedbacks
              </button>
            </div>

            {showAddClass && (
              <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
                <h3>Add New Class</h3>
                <form onSubmit={handleSubmitClass(onSubmitClass)}>
                  <input
                    {...registerClass("className", { required: true })}
                    placeholder="Class Name (e.g., CSE, ECE, IT)"
                    className="admin-input"
                  />
                  <button type="submit" className="create-quiz-btn">Create Class</button>
                </form>
              </div>
            )}

            <h3 style={{ marginTop: "30px" }}>Create Quiz</h3>
            <form onSubmit={handleSubmit(onSubmitQuiz)}>
              <input {...register("title", { required: true })} placeholder="Quiz Title" className="admin-input" />
              
              <select {...register("className", { required: true })} className="admin-input">
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>

              <input {...register("timeLimit", { required: true })} type="number" placeholder="Time Limit (seconds per question)" className="admin-input" />

              {fields.map((field, qIdx) => (
                <div key={field.id} className="question-box">
                  <h4>Question {qIdx + 1}</h4>
                  <input {...register(`questions.${qIdx}.question`, { required: true })} placeholder="Question" className="admin-input" />
                  <input {...register(`questions.${qIdx}.imageId`)} placeholder="Cloudinary Image ID (optional)" className="admin-input" />
                  {[0, 1, 2, 3].map(oIdx => (
                    <input key={oIdx} {...register(`questions.${qIdx}.options.${oIdx}`, { required: true })} placeholder={`Option ${oIdx + 1}`} className="admin-input" />
                  ))}
                  <select {...register(`questions.${qIdx}.answer`, { required: true })} className="admin-input">
                    <option value={0}>Option 1</option>
                    <option value={1}>Option 2</option>
                    <option value={2}>Option 3</option>
                    <option value={3}>Option 4</option>
                  </select>
                  {fields.length > 1 && <button type="button" onClick={() => remove(qIdx)} className="add-question-btn">Remove</button>}
                </div>
              ))}
              <button type="button" onClick={() => append({ question: "", options: ["", "", "", ""], answer: 0, imageId: "" })} className="add-question-btn">Add Question</button>
              <button type="submit" className="create-quiz-btn">Create Quiz</button>
            </form>
          </div>
        )}

        {activeTab === "crm" && (
          <div className="tab-content">
            <div className="crm-header">
              <h3>Student Management</h3>
              <input 
                type="text" 
                placeholder="Search by name or roll number..." 
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {filteredStudents.length === 0 ? (
              <p className="no-data">No students found</p>
            ) : (
              <div className="crm-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Class</th>
                      <th>Score</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map(student => (
                      <tr key={student.rollNo}>
                        <td>{student.name || "N/A"}</td>
                        <td>{student.rollNo || "N/A"}</td>
                        <td>{student.className || "N/A"}</td>
                        <td><span className="score-badge">{student.score || 0}</span></td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => deleteStudent(student.rollNo)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="tab-content">
            <button 
              onClick={() => navigate("/quiz/feedbacks")} 
              className="create-quiz-btn"
            >
              View All Feedbacks
            </button>
          </div>
        )}

        {activeTab === "status" && (
          <SystemStatus />
        )}
      </div>
    </div>
  );
}

export default Admin;
