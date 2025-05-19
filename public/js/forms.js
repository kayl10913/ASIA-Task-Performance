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