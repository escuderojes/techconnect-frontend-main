const skillsB = [
    { id: 'crcjs', name: 'JS', progressEndValue: 40, color: '#F1C40F ' },
    { id: 'crcpy', name: 'Python', progressEndValue: 82, color: '#21618C ' },
    { id: 'crcja', name: 'Java', progressEndValue: 50, color: '#A6ACAF' },
    { id: 'crc#', name: 'C#', progressEndValue: 50, color: '#4A235A' },
    { id: 'crc++', name: 'C++', progressEndValue: 50, color: '#3168CF' },
    { id: 'crcphp', name: 'PHP', progressEndValue: 50, color: '#A569BD' },
    { id: 'crcts', name: 'TypeScript', progressEndValue: 50, color: '#5DADE2' },
    { id: 'crcsw', name: 'Swift', progressEndValue: 50, color: '#D35400 ' },
    { id: 'crcrb', name: 'Ruby', progressEndValue: 50, color: '#C0392B' },
    { id: 'crckt', name: 'Kotlin', progressEndValue: 33, color: '#7F97CF' }
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

