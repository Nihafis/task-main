import Task from "../model/todoModel.js";
import { errorHandler } from "../util/error.js";

export const getTask = (req, res, next) => {
  try {
    Task.getTasks((err, tasks) => {
      if (err) {
        return res.status(500).send({ message: "Error retrieving tasks" });
      }
      return res.status(200).json({
        data: {
          tasks,
          record: tasks.length,
        },
      });
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).send("Internal Server Error.");
  }
};

export const editTask = (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      next(errorHandler(400, "Task ID is required"))
      return res.status(400).send({ message: "Task ID is required" });
    }


    const { title, description, status } = req.body;
    if (!title || !title || !description || !status) {
      next(errorHandler(400, "All fields is required"))
      return res.status(400).send({ message: "datas to updated  is required" });
    }


    const editedTask = {
      id,
      title,
      description,
      status
    }

    Task.editTasks(editedTask, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error2." + err);
      }

      return res.status(200).json({ message: "Task updated successfully" });
    });

  } catch (error) {
    return res.status(500).send("Internal Server Error" + error)
  }
}

export const addTask = (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (title && description) {
      const addTask = {
        title,
        description

      };
      Task.addTask(addTask, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error2." + err);
        }
        return res
          .status(201)
          .json({ message: "Task created successfully", task: result });
      });
    } else {
      next(errorHandler(400, "All fields is required"))
      return res.status(400).send({ message: "All fields is required" });
    }


  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error.");
  }
};


export const deleteTask = (req, res) => {
  const { id } = req.params;

  if (!id) {
    next(errorHandler(400, "Task ID is required"))
    return res.status(400).send({ message: "Task ID is required" });
  }

  try {

    Task.deleteTask(id, (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error2." + err);
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Task not found" });
      }
      return res.status(200).send({ message: "Task deleted successfully" });
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error.");
  }
}

