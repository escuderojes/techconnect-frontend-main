// h-bd.ts (Asegúrate de que este archivo esté correctamente configurado)
export interface Skill {
    id: string;
    name: string;
    progressEndValue: number;
    color: string;
}

export const skillsBd: Skill[] = [
    { id: 'crc-mysql', name: 'MySQL', progressEndValue: 85, color: '#5DADE2' },
    { id: 'crc-postgresql', name: 'PostgreSQL', progressEndValue: 80, color: '#336791' },
    { id: 'crc-sqlserver', name: 'SQL Server', progressEndValue: 75, color: '#A6ACAF' },
    { id: 'crc-oracle', name: 'Oracle Database', progressEndValue: 70, color: '#F80000' },
    { id: 'crc-sqlite', name: 'SQLite', progressEndValue: 65, color: '#003B57' },
    { id: 'crc-mongodb', name: 'MongoDB', progressEndValue: 90, color: '#47A248' },
    { id: 'crc-redis', name: 'Redis', progressEndValue: 60, color: '#DC382D' },
    { id: 'crc-amazonrds', name: 'Amazon RDS', progressEndValue: 50, color: '#212F3D' },
    { id: 'crc-firebase', name: 'FirebaseDatabase', progressEndValue: 55, color: '#FFCA28' },
    { id: 'crc-googlecloudsql', name: 'GoogleCloudSQL', progressEndValue: 65, color: '#4285F4' }
];

export function animateProgress(skills: Skill[]): void {
    skills.forEach(skill => {
        const circle = document.getElementById(skill.id);
        if (!circle) return;
        const circularProgress = circle.querySelector<HTMLElement>(".circular-progress");
        const progressValue = circle.querySelector<HTMLElement>(".progress-value");

        let progressStartValue = 0;
        const speed = 20;

        const progress = setInterval(() => {
            progressStartValue++;
            if (progressValue) {
                progressValue.textContent = `${progressStartValue}%`;
            }
            if (circularProgress) {
                circularProgress.style.background = `conic-gradient(${skill.color} ${progressStartValue * 3.6}deg, #ededed 0deg)`;
            }

            if (progressStartValue === skill.progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    });
}
