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