document.getElementById('btn').addEventListener('click', async (event) => {
    event.preventDefault(); 

    const API_URL = "http://localhost:8080/skhole/users/login";
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = { email, password };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('userId', userData.id);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('username', userData.userName);
            localStorage.setItem('image', userData.image);
            localStorage.setItem('type',userData.role);
            if(userData.role=='student'){window.location.href = '../dashboardStudent.html';}
            else{window.location.href = '../dashboard.html';}
            
        } else {
            // Login failed, display an error message
            const errorMsg = await response.text();
            alert(`Login failed: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
    
});
