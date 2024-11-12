document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const image = localStorage.getItem('image');

    if (userId && email && username) {
        // Use the user data on the page, e.g., display the user's name and profile picture
        document.getElementById('user-name').textContent = username;
        document.getElementById('user-email').textContent = email;
        document.getElementById('user-image').src = image; // Assuming there's an img tag with id 'user-image'
    } else {
        // If the user is not logged in, redirect to the login page
        window.location.href = 'login.html';
    }
});

