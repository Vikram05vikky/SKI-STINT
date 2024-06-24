import "../assets/css/tasks.css";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import tasksData from "./TaskDetails.json";
import Button from "@mui/material/Button";
import "../assets/css/TaskCard.css";
import myimage from "../assets/img/goal.png";

function Tasks({ filterType, title }) {
  const data = tasksData;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (filterType) {
      setFilteredData(data.filter((item) => item.type === filterType));
    } else {
      setFilteredData(data);
    }
  }, [filterType, data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getTaskStatusColor = (type) => {
    switch (type) {
      case "yet":
        return "var(--yettostart)";
      case "progress":
        return "var(--progress)";
      case "completed":
        return "var(--completed)";
      default:
        return "inherit";
    }
  };

  const displayedData = filteredData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <>
      <div className="land-container4">
        <div className="main-bar4" style={{ width: "100%" }}>
          <div
            className="search-container4"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              borderRadius: "50px",
              backgroundColor: "var(--search-nav)",
            }}
          >
            <input
              type="text"
              className="main-search4"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                flex: 1,
                border: "none",
                padding: "10px",
                borderRadius: "50px 0 0 50px",
                outline: "none",
              }}
            />
            <div
              style={{
                width: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0 50px 50px 0",
                backgroundColor: "var(--search-nav)",
              }}
            >
              <SearchIcon
                className="search-icon4"
                style={{ fontSize: "18px", fontWeight: "bold", color: "black" }}
              />
            </div>
          </div>
        </div>
        <div className="taskbar4">
          <h3>{title}</h3>
          <div className="task-list4">
            {displayedData.map((item, index) => (
              <div
                key={index}
                className="vertical-tag"
                id={item.type}
                onClick={() => handleTaskClick(item)}
              >
                <div className="task-details4" style={{ height: "5.5rem" }}>
                  <h3 style={{ fontWeight: "500" }}>
                    Task assigned by {item.title}
                  </h3>
                  <div className="task-info4">
                    <p>Task Description: {item.description}</p>
                    <p style={{ marginRight: "1rem" }}>Date: {item.date}</p>
                  </div>
                </div>
                <div
                  className="task-status4"
                  style={{ backgroundColor: getTaskStatusColor(item.type) }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
        fullWidth
        maxWidth="md"
        className="custom-dialog"
      >
        <DialogContent dividers>
          <div className="logo">
            <img src={myimage} alt="Logo"></img>
          </div>
          {selectedTask && (
            <div className="task-description">
              <div className="boxassign">
                <div className="texts">
                  <p>Assigned by: {selectedTask.title}</p>
                </div>
              </div>
              <div className="boxtask">
                <div className="texts">
                  <p>Task Name: {selectedTask.description}</p>
                </div>
              </div>
              <div className="boxdesc">
                <div className="texts">
                  <p>Description: {selectedTask.description}</p>
                </div>
              </div>
              <div className="boxdate">
                <div className="texts">
                  <p>Due date: {selectedTask.date}</p>
                </div>
              </div>
              <div className="boxstatus">
                <div className="texts">
                  <p>Task Status: {selectedTask.type}</p>
                </div>
              </div>
              <div className="piththaan">
                <div>
                  <Button className="piththaan1" onClick={handleCloseDialog}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Tasks;
