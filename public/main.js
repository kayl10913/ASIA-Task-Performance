window.renderBarChart = function(canvas) {
    fetch('http://localhost:3000/api/grades/average-by-subject')
        .then(response => response.json())
        .then(result => {
            const data = result.data;
            const labels = data.map(item => item.subject);
            const averages = data.map(item => Number(item.average_grade));
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Grade',
                        data: averages,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        title: { display: true, text: 'Average Grades by Subject' },
                        tooltip: { enabled: true }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Average Grade' }
                        },
                        x: {
                            title: { display: true, text: 'Subject' }
                        }
                    }
                }
            });
        });
};

window.renderPieChart = function(canvas) {
    fetch('http://localhost:3000/api/grades/grade-distribution')
        .then(response => response.json())
        .then(result => {
            const data = result.data;
            const labels = data.map(item => item.grade_letter);
            const counts = data.map(item => item.count);
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Grade Distribution',
                        data: counts,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        title: { display: true, text: 'Grade Distribution' },
                        tooltip: { enabled: true }
                    }
                }
            });
        });
};

window.renderLineChart = function(canvas) {
    fetch('http://localhost:3000/api/grades/grades-over-time')
        .then(response => response.json())
        .then(result => {
            const data = result.data;
            const labels = data.map(item => item.grade_date);
            const averages = data.map(item => Number(item.average_grade));
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Grade',
                        data: averages,
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        title: { display: true, text: 'Grades Over Time' },
                        tooltip: { enabled: true }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Average Grade' }
                        },
                        x: {
                            title: { display: true, text: 'Date' }
                        }
                    }
                }
            });
        });
};

window.renderRadarChart = function(canvas) {
    fetch('http://localhost:3000/api/grades/average-by-subject')
        .then(response => response.json())
        .then(result => {
            const data = result.data;
            const labels = data.map(item => item.subject);
            const averages = data.map(item => Number(item.average_grade));
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Average Grade',
                        data: averages,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        title: { display: true, text: 'Performance Comparison' },
                        tooltip: { enabled: true }
                    }
                }
            });
        });
};

window.renderStudentsPerClassChart = function(canvas) {
    fetch('http://localhost:3000/api/grades/students-per-class')
        .then(response => response.json())
        .then(result => {
            const data = result.data;
            const labels = data.map(item => item.class);
            const counts = data.map(item => item.student_count);
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Student Count',
                        data: counts,
                        backgroundColor: 'rgba(255, 206, 86, 0.7)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'top' },
                        title: { display: true, text: 'Student Count per Class' },
                        tooltip: { enabled: true }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Number of Students' }
                        },
                        x: {
                            title: { display: true, text: 'Class' }
                        }
                    }
                }
            });
        });
};
window.renderTopStudentsChart = function(canvasElementOrId) {
    fetch('http://localhost:3000/api/grades/student-averages-per-month')
        .then(response => response.json())
        .then(result => {
            const dataArr = result.data;
            const canvas = typeof canvasElementOrId === 'string' ? document.getElementById(canvasElementOrId) : canvasElementOrId;
            if (!dataArr || dataArr.length === 0) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = "16px Arial";
                ctx.fillStyle = "#888";
                ctx.textAlign = "center";
                ctx.fillText("No data available", canvas.width / 2, canvas.height / 2);
                return;
            }

            const months = [...new Set(dataArr.map(item => item.month))].sort();

            const studentAverages = {};
            dataArr.forEach(item => {
                if (!studentAverages[item.name]) studentAverages[item.name] = [];
                studentAverages[item.name].push(Number(item.average_grade));
            });
            const topStudents = Object.entries(studentAverages)
                .map(([name, grades]) => ({
                    name,
                    avg: grades.reduce((a, b) => a + b, 0) / grades.length
                }))
                .sort((a, b) => b.avg - a.avg)
                .slice(0, 5)
                .map(s => s.name);

            const colors = [
                'rgb(75, 192, 192)',
                'rgb(255, 99, 132)',
                'rgb(255, 206, 86)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)'
            ];

            const datasets = topStudents.map((student, idx) => ({
                label: student,
                data: months.map(month => {
                    const found = dataArr.find(item => item.name === student && item.month === month);
                    return found ? Number(found.average_grade) : null;
                }),
                fill: false,
                borderColor: colors[idx % colors.length],
                backgroundColor: colors[idx % colors.length],
                tension: 0.1
            }));

            const data = {
                labels: months,
                datasets: datasets
            };

            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Grade' }
                        },
                        x: {
                            title: { display: true, text: 'Month' }
                        }
                    }
                }
            };
            return new Chart(canvas, config);
        })
        .catch(() => {
            const canvas = typeof canvasElementOrId === 'string' ? document.getElementById(canvasElementOrId) : canvasElementOrId;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#888";
            ctx.textAlign = "center";
            ctx.fillText("Error loading data", canvas.width / 2, canvas.height / 2);
        });
};

window.onload = function() {
    fetch('http://localhost:3000/api/grades/total-students')
        .then(res => res.json())
        .then(data => {
            document.getElementById('totalStudents').textContent = data.total ?? '...';
        });

    fetch('http://localhost:3000/api/grades/most-students-class')
        .then(res => res.json())
        .then(data => {
            document.getElementById('mostStudentsCount').textContent = data.count ?? '...';
            document.getElementById('mostStudentsClass').textContent = data.class ? `Class: ${data.class}` : '';
        });

    const barCanvas = document.getElementById('averageGradesChart');
    if (barCanvas) window.renderBarChart(barCanvas);

    const pieCanvas = document.getElementById('gradeDistributionChart');
    if (pieCanvas) window.renderPieChart(pieCanvas);

    const lineCanvas = document.getElementById('gradesOverTimeChart');
    if (lineCanvas) window.renderLineChart(lineCanvas);

    const radarCanvas = document.getElementById('performanceRadarChart');
    if (radarCanvas) window.renderRadarChart(radarCanvas);

    const studentsPerClassCanvas = document.getElementById('studentsPerClassChart');
    if (studentsPerClassCanvas) window.renderStudentsPerClassChart(studentsPerClassCanvas);
    const topStudentsCanvas = document.getElementById('topStudentsChart');
    if (topStudentsCanvas) window.renderTopStudentsChart(topStudentsCanvas);
};

document.addEventListener('DOMContentLoaded', function() {
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('studentName').value;
            const studentClass = document.getElementById('studentClass').value;
            const enrollment_date = document.getElementById('enrollmentDate').value; 

            fetch('http://localhost:3000/api/grades/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, class: studentClass, enrollment_date })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showModalAlert('Student added successfully!');
                    studentForm.reset();
                } else {
                    showModalAlert('Failed to add student.');
                }
            })
            .catch(() => showModalAlert('Error adding student.'));
        });
    }

    const gradeInput = document.getElementById('grade');
    const gradeLetterInput = document.getElementById('gradeLetter');
    if (gradeInput && gradeLetterInput) {
        gradeInput.addEventListener('input', function() {
            const grade = Number(gradeInput.value);
            let letter = '';
            if (grade >= 90 && grade <= 100) letter = 'A';
            else if (grade >= 80 && grade <= 89) letter = 'B';
            else if (grade >= 70 && grade <= 79) letter = 'C';
            else if (grade >= 60 && grade <= 69) letter = 'D';
            else if (grade < 60 && grade !== '') letter = 'F';
            gradeLetterInput.value = letter;
        });
    }

    const gradesForm = document.getElementById('gradesForm');
    if (gradesForm) {
        gradesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const student_id = document.getElementById('gradeStudentId').value;
            const subject = document.getElementById('subject').value;
            const grade = document.getElementById('grade').value;
            const grade_letter = document.getElementById('gradeLetter').value;

            fetch('http://localhost:3000/api/grades/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id, subject, grade, grade_letter })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showModalAlert('Grade added successfully!');
                    gradesForm.reset();
                    document.getElementById('gradeLetter').value = '';
                } else {
                    showModalAlert('Failed to add grade.');
                }
            })
            .catch(() => showModalAlert('Error adding grade.'));
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const studentIdInput = document.getElementById('gradeStudentId');
    const studentNameDisplay = document.getElementById('studentNameDisplay');
    if (studentIdInput && studentNameDisplay) {
        studentIdInput.addEventListener('input', function() {
            const id = studentIdInput.value;
            if (!id) {
                studentNameDisplay.value = '';
                return;
            }
            fetch(`http://localhost:3000/api/grades/students/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        studentNameDisplay.value = data.name;
                    } else {
                        studentNameDisplay.value = 'Not found';
                    }
                })
                .catch(() => {
                    studentNameDisplay.value = 'Error';
                });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.getElementById('viewAllStudentsGradesBtn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            var modal = new bootstrap.Modal(document.getElementById('allStudentsGradesModal'));
            modal.show();

            const studentsListContainer = document.getElementById('studentsListContainer');
            const studentGradesContainer = document.getElementById('studentGradesContainer');
            studentsListContainer.innerHTML = '<div class="text-center py-3">Loading students...</div>';
            studentGradesContainer.innerHTML = '<div class="text-center py-3">Select a student to view grades.</div>';

            fetch('http://localhost:3000/api/grades/students')
                .then(res => res.json())
                .then(data => {
                    if (!data.success || !data.data.length) {
                        studentsListContainer.innerHTML = '<div class="text-center py-3 text-danger">No students found.</div>';
                        return;
                    }
                    let html = '<ul class="list-group">';
                    data.data.forEach(student => {
                        html += `<li class="list-group-item list-group-item-action student-name-item" data-student-id="${student.id}" style="cursor:pointer">${student.name}</li>`;
                    });
                    html += '</ul>';
                    studentsListContainer.innerHTML = html;

                    studentsListContainer.querySelectorAll('.student-name-item').forEach(item => {
                        item.addEventListener('click', function() {
                            const studentId = this.getAttribute('data-student-id');
                            const studentName = this.textContent;
                            studentGradesContainer.innerHTML = '<div class="text-center py-3">Loading grades...</div>';
                            fetch(`http://localhost:3000/api/grades/students/${studentId}/grades`)
                                .then(res => res.json())
                                .then(gradesData => {
                                    if (!gradesData.success || !gradesData.data.length) {
                                        studentGradesContainer.innerHTML = `<div class="text-center py-3 text-danger">No grades found for ${studentName}.</div>`;
                                        return;
                                    }
                                    let gradesHtml = `<h6>${studentName}'s Grades</h6>`;
                                    gradesHtml += `<table class="table table-bordered table-striped"><thead><tr><th>Subject</th><th>Grade</th><th>Letter</th></tr></thead><tbody>`;
                                    gradesData.data.forEach(g => {
                                        gradesHtml += `<tr><td>${g.subject}</td><td>${g.grade}</td><td>${g.grade_letter}</td></tr>`;
                                    });
                                    gradesHtml += '</tbody></table>';
                                    studentGradesContainer.innerHTML = gradesHtml;
                                })
                                .catch(() => {
                                    studentGradesContainer.innerHTML = `<div class="text-center py-3 text-danger">Error loading grades for ${studentName}.</div>`;
                                });
                        });
                    });
                })
                .catch(() => {
                    studentsListContainer.innerHTML = '<div class="text-center py-3 text-danger">Error loading students.</div>';
                });
        });
    }
});

// Helper function to show modal alert
function showModalAlert(message) {
    let modal = document.getElementById('alertModal');
    let msgElem = document.getElementById('alertModalMessage');
    if (!modal || !msgElem) {
        // fallback to alert if modal not found
        alert(message);
        return;
    }
    msgElem.textContent = message;
    let bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
}
