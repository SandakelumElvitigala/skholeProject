document.getElementById('regBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    const API_URL = "http://localhost:8080/skhole/users/register";
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const userName = document.getElementById('userName').value;
    const roleSelect = document.getElementById('role');
    const role = roleSelect.options[roleSelect.selectedIndex].value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const confirmPassword = document.getElementById('repeatPsw').value;

    // Validation checks
    if (!firstName || !lastName || !userName || !email || !password || !confirmPassword) {
        alert('Please fill in all fields!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const name = `${firstName} ${lastName}`;
    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];

    try {
        const profilePictureFile = file ? await toBase64(file) : null; // Convert file to Base64 if it exists

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                userName,
                role,
                email,
                password, // Send the password to the backend
                profilePicture: profilePictureFile,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('User registered successfully:', result);
        alert('Registration successful!');
        window.location.href = '../../login.html';
    } catch (error) {
        console.error('Error registering user:', error);
        alert('There was an error registering the user. Please try again.');
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        
        // Check if the file argument is a valid File object
        if (file && file instanceof Blob) {
            reader.readAsDataURL(file);
        } else {
            reject(new TypeError('Argument is not a valid File object.'));
        }
    });
}
