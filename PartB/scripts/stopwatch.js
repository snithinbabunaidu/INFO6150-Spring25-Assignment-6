class Stopwatch {
    constructor() {
        this.totalTime = document.getElementById('totalTime');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.datePicker = document.getElementById('datePicker');
        this.lapsDisplay = document.getElementById('lapsDisplay');

        this.isRunning = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.laps = [];
        this.lastLapTime = 0;

        this.initializeDatePicker();
        this.setupEventListeners();
    }

    initializeDatePicker() {
        const today = new Date();
        this.datePicker.valueAsDate = today;
        this.datePicker.max = today.toISOString().split('T')[0];
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
    }

    formatTime(ms) {
        const date = new Date(ms);
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const centiseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, '0');
        return `${minutes}:${seconds}.${centiseconds}`;
    }

    formatLapTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
    }

    updateDisplay() {
        return new Promise((resolve) => {
            const currentTime = this.isRunning ? Date.now() - this.startTime + this.elapsedTime : this.elapsedTime;
            this.totalTime.textContent = this.formatTime(currentTime);
            resolve();
        });
    }

    async start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startTime = Date.now();
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.resetBtn.disabled = true;
            this.datePicker.disabled = true;

            // Using async/await with Promise as required
            const updateTimer = async () => {
                await this.updateDisplay();
                if (this.isRunning) {
                    this.intervalId = setTimeout(updateTimer, 10);
                }
            };

            await updateTimer();
        }
    }

    async stop() {
        if (this.isRunning) {
            this.isRunning = false;
            clearTimeout(this.intervalId);
            this.elapsedTime += Date.now() - this.startTime;
            this.startBtn.disabled = false;
            this.stopBtn.disabled = true;
            this.resetBtn.disabled = false;
            
            // Add lap when stopping
            await this.addLap();
        }
    }

    async reset() {
        this.isRunning = false;
        clearTimeout(this.intervalId);
        this.elapsedTime = 0;
        this.startTime = 0;
        this.lastLapTime = 0;
        this.laps = [];
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.resetBtn.disabled = true;
        this.datePicker.disabled = false;
        this.lapsDisplay.innerHTML = '';
        await this.updateDisplay();
    }

    async addLap() {
        const currentTime = Date.now() - this.startTime + this.elapsedTime;
        const lapTime = currentTime - this.lastLapTime;
        this.lastLapTime = currentTime;

        const lap = {
            number: this.laps.length + 1,
            lapTime,
            totalTime: currentTime
        };

        this.laps.push(lap);
        await this.updateLapsDisplay();
    }

    async updateLapsDisplay() {
        return new Promise((resolve) => {
            const lapsHTML = this.laps.map(lap => `
                <div class="lap-row">
                    <span>Lap ${lap.number}</span>
                    <span>${this.formatLapTime(lap.lapTime)}</span>
                    <span>${this.formatLapTime(lap.totalTime)}</span>
                </div>
            `).join('');
            
            this.lapsDisplay.innerHTML = lapsHTML;
            resolve();
        });
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const stopwatch = new Stopwatch();
});