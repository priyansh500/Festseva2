// Mock Data
const events = [
    { id: 1, title: "Tech Expo", description: "A tech showcase with coding contests.", date: "2025-03-10", ticketsAvailable: 50 },
    { id: 2, title: "Cultural Night", description: "Evening of music and dance.", date: "2025-03-12", ticketsAvailable: 100 },
];

const registeredEvents = [];
const quizScores = [];
let announcements = ["Welcome to FestSewa 2025!"];

function populateEvents() {
    const eventList = document.getElementById('event-list');
    events.forEach(event => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p><p>Date: ${event.date}</p><p>Tickets Left: ${event.ticketsAvailable}</p>`;
        eventList.appendChild(div);

        const select = document.getElementById('event-select');
        const option = document.createElement('option');
        option.value = event.id;
        option.text = event.title;
        select.appendChild(option);
    });
}

function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const eventId = document.getElementById('event-select').value;

    const selectedEvent = events.find(e => e.id == eventId);
    if (selectedEvent.ticketsAvailable > 0) {
        selectedEvent.ticketsAvailable -= 1;
        registeredEvents.push({ id: eventId, name, email });
        document.getElementById('registration-message').innerText = `Ticket booked for ${name} for ${selectedEvent.title}!`;
        updateDashboard();
    } else {
        document.getElementById('registration-message').innerText = 'No tickets available!';
    }
    document.getElementById('registration-form').reset();
}

function submitQuiz() {
    const answer = document.querySelector('input[name="q1"]:checked');
    if (answer) {
        const score = answer.value === 'A' ? 100 : 0; // Mock scoring
        quizScores.push({ eventId: 1, score }); // Tie to first event for simplicity
        document.getElementById('quiz-score').innerText = `Score: ${score}%`;
        updateDashboard();
    } else {
        document.getElementById('quiz-score').innerText = 'Please select an answer!';
    }
}

function updateDashboard() {
    const regEventsList = document.getElementById('registered-events');
    regEventsList.innerHTML = '';
    registeredEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `Event ID: ${event.id} - ${event.name} (${event.email})`;
        regEventsList.appendChild(li);
    });

    const quizScoresList = document.getElementById('quiz-scores');
    quizScoresList.innerHTML = '';
    quizScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `Event ${score.eventId}: ${score.score}%`;
        quizScoresList.appendChild(li);
    });
}

function showAnnouncements() {
    const announcementBox = document.getElementById('announcement-box');
    announcementBox.innerHTML = announcements.map(msg => `<p>${msg}</p>`).join('');
}

// Simulate real-time announcement
setInterval(() => {
    announcements.push(`New Update: ${new Date().toLocaleTimeString()} - Check event schedules!`);
    showAnnouncements();
}, 5000);

// Initialize
document.getElementById('registration-form').addEventListener('submit', registerUser);
populateEvents();
showAnnouncements();
updateDashboard();
