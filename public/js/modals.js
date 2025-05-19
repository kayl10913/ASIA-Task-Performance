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