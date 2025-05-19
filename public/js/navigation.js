document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('#chartList .list-group-item');
    const chartSections = [
        document.getElementById('averageGrades'),
        document.getElementById('gradeDistribution'),
        document.getElementById('gradesOverTime'),
        document.getElementById('studentsPerClass'),
        document.getElementById('performanceRadar'),
        document.getElementById('topStudents')
    ];

    sidebarLinks.forEach((link, idx) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            if (idx === 0) {
                chartSections.forEach(section => section.style.display = '');
            } else {
                chartSections.forEach((section, sidx) => {
                    section.style.display = (sidx === idx - 1) ? '' : 'none';
                });
            }
        });
    });

    sidebarLinks[0].classList.add('active');
    chartSections.forEach(section => section.style.display = '');

    const mobileNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    mobileNavLinks.forEach((link, idx) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            if (idx === 0) {
                chartSections.forEach(section => section.style.display = '');
            } else {
                chartSections.forEach((section, sidx) => {
                    section.style.display = (sidx === idx - 1) ? '' : 'none';
                });
            }

            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('show')) {
                new bootstrap.Collapse(mobileNav).hide();
            }
        });
    });

    // Modal triggers
    const addStudentBtn = document.getElementById('addStudentBtn');
    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', function() {
            var addStudentModal = new bootstrap.Modal(document.getElementById('addStudentModal'));
            addStudentModal.show();
        });
    }
    const addGradesBtn = document.getElementById('addGradesBtn');
    if (addGradesBtn) {
        addGradesBtn.addEventListener('click', function() {
            var addGradesModal = new bootstrap.Modal(document.getElementById('addGradesModal'));
            addGradesModal.show();
        });
    }
});