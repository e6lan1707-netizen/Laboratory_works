const input = document.getElementById('numbersInput');
const button = document.getElementById('calcBtn');
const output = document.getElementById('outputValue');
const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');

function calcAverage(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}

function drawChart(numbers, avg) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / numbers.length;
    ctx.fillStyle = '#0078ff';

    numbers.forEach((num, i) => {
        const barHeight = (num / Math.max(...numbers)) * canvas.height * 0.8;
        const x = i * barWidth + 10;
        const y = canvas.height - barHeight;
        ctx.fillRect(x, y, barWidth - 20, barHeight);
    });

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - (avg / Math.max(...numbers)) * canvas.height * 0.8);
    ctx.lineTo(canvas.width, canvas.height - (avg / Math.max(...numbers)) * canvas.height * 0.8);
    ctx.strokeStyle = '#00ff99';
    ctx.lineWidth = 2;
    ctx.stroke();
}

button.addEventListener('click', () => {
    const inputStr = input.value.trim();
    if (!inputStr) {
        output.textContent = 'Введите хотя бы одно число!';
        return;
    }

    const numbers = inputStr.split(',').map(n => parseFloat(n)).filter(n => !isNaN(n));

    if (numbers.length === 0) {
        output.textContent = 'Некорректный ввод!';
        return;
    }

    const avg = calcAverage(numbers);

    let displayed = 0;
    const step = avg / 30;
    const interval = setInterval(() => {
        displayed += step;
        if (displayed >= avg) {
            displayed = avg;
            clearInterval(interval);
        }
        output.textContent = displayed.toFixed(2);
    }, 20);

    drawChart(numbers, avg);
});