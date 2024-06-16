const skills = [
    { id: 'crc-mysql', name: 'MySQL', progressEndValue: 85, color: '#5DADE2' },
    { id: 'crc-postgresql', name: 'PostgreSQL', progressEndValue: 80, color: '#336791' },
    { id: 'crc-sqlserver', name: 'Microsoft SQL Server', progressEndValue: 75, color: '#A6ACAF' },
    { id: 'crc-oracle', name: 'Oracle Database', progressEndValue: 70, color: '#F80000' },
    { id: 'crc-sqlite', name: 'SQLite', progressEndValue: 65, color: '#003B57' },
    { id: 'crc-mongodb', name: 'MongoDB', progressEndValue: 90, color: '#47A248' },
    { id: 'crc-redis', name: 'Redis', progressEndValue: 60, color: '#DC382D' },
    { id: 'crc-amazonrds', name: 'Amazon RDS', progressEndValue: 50, color: '#212F3D ' },
    { id: 'crc-firebase', name: 'Firebase Realtime Database', progressEndValue: 55, color: '#FFCA28' },
    { id: 'crc-googlecloudsql', name: 'Google Cloud SQL', progressEndValue: 65, color: '#4285F4' }
];

skills.forEach(skill => {
    let circle = document.getElementById(skill.id);
    let circularProgress = circle.querySelector(".circular-progress");
    let progressValue = circle.querySelector(".progress-value");

    let progressStartValue = 0;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(${skill.color} ${progressStartValue * 3.6}deg, #ededed 0deg)`;

        if (progressStartValue == skill.progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
});
