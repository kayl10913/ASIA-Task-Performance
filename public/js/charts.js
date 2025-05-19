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
// ... existing code ...