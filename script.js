// Mock Data
let events = [
    { id: 1, title: "Tech Expo", description: "A tech showcase with coding contests.", date: "2025-03-10", ticketsAvailable: 50, hostEmail: "host1@example.com" },
    { id: 2, title: "Cultural Night", description: "Evening of music and dance.", date: "2025-03-12", ticketsAvailable: 100, hostEmail: "host2@example.com" },
];

let currentUser = null;
let registeredEvents = [];
let announcements = ["Welcome to FestSewa!"];

// Populate Events
function populateEvents(filteredEvents = events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = '';
    filteredEvents.forEach(event => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${event.title}</h3><p>${event.description}</p><p>Date: ${event.date}</p><p>Tickets Left: ${event.ticketsAvailable}</p>`;
        div.onclick = () => showEventDetails(event);
        eventList.appendChild(div);
    });
}

// Register User (Host or Attender)
document.getElementById('registration-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    currentUser = { name, email, role };
    document.getElementById('registration-message').innerText = `Registered as ${role}!`;

    // Show relevant sections based on role
    document.getElementById('add-event').style.display = role === 'attender' ? 'block' : 'none';
    document.getElementById('view-events').style.display = role === 'host' ? 'block' : 'none';
    document.getElementById('send-announcement').style.display = role === 'host' ? 'block' : 'none';
    document.getElementById('registration-form').reset();
});

// Attender: Add Event
document.getElementById('add-event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const event = {
        id: events.length + 1,
        title: document.getElementById('event-title').value,
        description: document.getElementById('event-description').value,
        date: document.getElementById('event-date').value,
        ticketsAvailable: parseInt(document.getElementById('event-tickets').value),
        hostEmail: document.getElementById('event-host-email').value,
    };
    events.push(event);
    document.getElementById('add-event-form').reset();
    populateEvents(); // Refresh event list for Hosts
});

// Host: Search Events
document.getElementById('search-events').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query)
    );
    populateEvents(filteredEvents);
});

// Host: Show Event Details
function showEventDetails(event) {
    const details = document.getElementById('event-details');
    const content = document.getElementById('event-details-content');
    content.innerHTML = `
        <h4>${event.title}</h4>
        <p>Description: ${event.description}</p>
        <p>Date: ${event.date}</p>
        <p>Tickets Available: ${event.ticketsAvailable}</p>
        <p>Host Email: ${event.hostEmail}</p>
    `;
    details.style.display = 'block';
    details.dataset.eventId = event.id; // Store event ID for registration
}

// Host: Register for Event
function registerForEvent() {
    if (!currentUser || currentUser.role !== 'host') {
        alert('Please register as a Host to book events!');
        return;
    }
    const eventId = document.getElementById('event-details').dataset.eventId;
    const event = events.find(e => e.id == eventId);
    if (event.ticketsAvailable > 0) {
        event.ticketsAvailable -= 1;
        registeredEvents.push({ id: eventId, title: event.title });
        updateDashboard();
        alert(`Successfully registered for ${event.title}!`);
        populateEvents();
    } else {
        alert('No tickets available!');
    }
}

// Update Dashboard
function updateDashboard() {
    const regEventsList = document.getElementById('registered-events');
    regEventsList.innerHTML = '';
    registeredEvents.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `Event: ${event.title}`;
        regEventsList.appendChild(li);
    });
}

// Announcements
function showAnnouncements() {
    const announcementBox = document.getElementById('announcement-box');
    announcementBox.innerHTML = announcements.map(msg => `<p>${msg}</p>`).join('');
}

// Host: Send Announcement to Contact Attender
document.getElementById('announcement-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('announcement-message').value;
    announcements.push(`From ${currentUser.name} (${currentUser.email}): ${message}`);
    document.getElementById('announcement-form').reset();
    showAnnouncements();
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    document.getElementById('contact-message').innerText = `Message sent from ${name} (${email}): ${message}`;
    document.getElementById('contact-form').reset();
});

// Initialize
populateEvents();
showAnnouncements();
updateDashboard();
