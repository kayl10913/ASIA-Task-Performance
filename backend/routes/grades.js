const express = require('express');
const router = express.Router();
const db = require('../../db/db');

router.get('/average-by-subject', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT subject, AVG(grade) AS average_grade
             FROM grades
             GROUP BY subject`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/grade-distribution', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT grade_letter, COUNT(*) AS count
             FROM grades
             GROUP BY grade_letter`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/grades-over-time', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT grade_date, AVG(grade) AS average_grade
             FROM grades
             GROUP BY grade_date
             ORDER BY grade_date`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/students-per-class', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT class, COUNT(*) AS student_count
             FROM students
             GROUP BY class`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/top-students', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT s.name, AVG(g.grade) AS average_grade
             FROM students s
             JOIN grades g ON s.student_id = g.student_id
             GROUP BY s.student_id
             ORDER BY average_grade DESC
             LIMIT 5`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/grade-count-per-subject', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT subject, grade_letter, COUNT(*) AS count
             FROM grades
             GROUP BY subject, grade_letter`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/average-grade-per-month', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT DATE_FORMAT(grade_date, '%Y-%m') AS month, AVG(grade) AS average_grade
             FROM grades
             GROUP BY month
             ORDER BY month`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/student-averages-per-month', async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT s.name, DATE_FORMAT(g.grade_date, '%Y-%m') AS month, AVG(g.grade) AS average_grade
             FROM students s
             JOIN grades g ON s.student_id = g.student_id
             GROUP BY s.name, month
             ORDER BY month, s.name`
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/total-students', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT COUNT(*) AS total FROM students`);
        res.json({ success: true, total: rows[0].total });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/most-students-class', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT class, COUNT(*) AS count
            FROM students
            GROUP BY class
            ORDER BY count DESC
            LIMIT 1
        `);
        if (rows.length > 0) {
            res.json({ success: true, class: rows[0].class, count: rows[0].count });
        } else {
            res.json({ success: true, class: null, count: 0 });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
module.exports = router;