const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getTasks, createTask, updateTask, deleteTask,getTasksbyCategory } = require("../controllers/taskcontroller");

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.get("/", auth, getTasks);
router.post("/", auth, createTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 *   delete:
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
/**
 * @openapi
 * /api/tasks/category/{category}:
 *   get:
 *     summary: Get tasks by category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category to filter tasks
 *     responses:
 *       200:
 *         description: List of tasks in the category
 */
router.get("/category/:category", auth, getTasksbyCategory);

module.exports = router;