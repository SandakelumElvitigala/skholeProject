document.getElementById('okBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("ok");

    const API_URL = "http://localhost:8080/skhole/videos/upload";

    // Get input values
    const videoFile = document.getElementById('videoFile').files[0];  // Assuming you have an input field with id="videoFile"
    const thumbnailFile = document.getElementById('thumbnailFile').files[0];  // Assuming id="thumbnailFile"
    const pdfFile = document.getElementById('pdfFile').files[0];  // Optional PDF, id="pdfFile"
    const title = document.getElementById('title').value;
    const desc = document.getElementById('desc').value;
    const grade = document.getElementById('grade').value;
    const subject = document.getElementById('subject').value;
    const userId = localStorage.getItem('userId');

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('thumbnail', thumbnailFile);
    if (pdfFile) {
        formData.append('pdf', pdfFile);  // Add PDF only if provided
    }
    formData.append('topic', title);
    formData.append('description', desc);
    formData.append('grade', grade);
    formData.append('subject', subject);
    formData.append('userId', userId);  // Attach the user ID

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData  // Send the FormData object directly
        });

        if (response.ok) {
            const videoUrl = await response.text();
            alert('Video uploaded successfully! Video URL: ' + videoUrl);
            // Redirect or further actions
        } else {
            const errorMsg = await response.text();
            alert('Upload failed: ' + errorMsg);
        }
    } catch (error) {
        console.error('Error during video upload:', error);
        alert('An error occurred during the video upload. Please try again.');
    }
});

document.getElementById('videosBtn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("okVideos");

    const API_URL = `http://localhost:8080/skhole/videos/view/${localStorage.getItem('userId')}`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const videos = await response.json();
        console.log(videos); // Log the fetched video data

        // Clear the existing videos if needed
        const videosContainer = document.getElementById('videos');
        videosContainer.innerHTML = ''; // Clear previous videos

        videos.forEach(video => {
            // Create a new row for each video
            const Row = document.createElement('div');
            Row.classList.add('row');
            const videoRow = document.createElement('div');
            videoRow.classList.add('video-row');

            // Create a thumbnail container
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.classList.add('thumbnail-container');

            // Create and append thumbnail image
            const thumbnail = document.createElement('img');
            thumbnail.src = `data:image/jpeg;base64,${video.thumbnail}`;
            thumbnail.alt = video.title;
            thumbnail.classList.add('video-thumbnail');
            thumbnailContainer.appendChild(thumbnail);

            // Create and append video title
            const title = document.createElement('h3');
            title.innerText = video.title + "| Grade" + video.grade + "|" + video.subject;
            title.classList.add('video-title');

            // Create and append video link
            const videoLink = document.createElement('a');
            videoLink.href = video.videoUrl;
            videoLink.innerText = "Watch Video";
            videoLink.target = "_blank";
            videoLink.classList.add('video-link');

            // Create a description area (optional)
            const description = document.createElement('p');
            description.innerText = video.description; // Assuming video object has a description
            description.classList.add('video-description');

            // Append all elements to the video row
            videoRow.appendChild(thumbnailContainer);
            videoRow.appendChild(title);
            videoRow.appendChild(videoLink);
            videoRow.appendChild(description);

            // Append the video row to the videos container
            Row.appendChild(videoRow);
            videosContainer.appendChild(Row);

        });

    } catch (error) {
        console.error('Error fetching videos:', error);
    }
});

async function getViews(videoId) {
    const API_URL_getviews = `http://localhost:8080/skhole/videos/get/views/${videoId}`;
    console.log(videoId);
    return fetch(API_URL_getviews)
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the response body as JSON
            } else {
                throw new Error('Failed to fetch views');
            }
        })
        .then(data => {
            console.log('Views count:', data);
            return data; // Return the views count
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}


async function getLikes(videoId) {
    const API_URL_getlikes = `http://localhost:8080/skhole/videos/get/likes/${videoId}`;
    console.log(videoId);
    try {
        const response = await fetch(API_URL_getlikes);
        if (!response.ok) {
            throw new Error('Failed to fetch likes');
        }
        const data = await response.json();
        console.log('Likes count:', data);
        return data;
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
}


async function getVideoById(videoId) {
    const API_URL_GETbyID = `http://localhost:8080/skhole/videos/get/video/${videoId}`;
    try {
        const response = await fetch(API_URL_GETbyID);
        if (!response.ok) {
            throw new Error('Failed to fetch video details');
        }
        const videoData = await response.json(); // Parse the response as JSON
        return videoData; // Return the parsed video data
    } catch (error) {
        console.error('Error fetching video details:', error);
        throw error; // Rethrow the error for handling elsewhere
    }
}



async function updateViewCount(videoId) {
    const API_URL_views = `http://localhost:8080/skhole/videos/update/views/${videoId}`;

    try {
        const response = await fetch(API_URL_views, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to update view count');
        }

        console.log('View count updated successfully');
    } catch (error) {
        console.error('Error updating view count:', error);
    }
}

async function getDisLikes(videoId) {
    const API_URL_getUnlikes = `http://localhost:8080/skhole/videos/get/unlikes/${videoId}`;
    console.log(videoId);
    try {
        const response = await fetch(API_URL_getUnlikes);
        if (!response.ok) {
            throw new Error('Failed to fetch unlikes');
        }
        const data = await response.json();
        console.log('unLikes count:', data);
        return data;
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
}