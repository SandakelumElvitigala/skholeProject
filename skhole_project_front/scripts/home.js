document.addEventListener('DOMContentLoaded', async () => {
    console.log("okVideos");

    const API_URL = `http://localhost:8080/skhole/videos/get/recent`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const videos = await response.json();
        console.log(videos); // Log the fetched video data

        // Clear the existing videos if needed
        const videosContainer = document.getElementById('videosShow');
        videosContainer.innerHTML = ''; // Clear previous videos

        videos.forEach(video => {
            // Create a new row for each video
            const row = document.createElement('div');
            row.classList.add('row');

            // Create video row container
            const videoRow = document.createElement('div');
            videoRow.classList.add('video-row', 'position-relative');

            // Create thumbnail container
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.classList.add('thumbnail-container');

            // Create and append thumbnail image
            const thumbnail = document.createElement('img');
            thumbnail.src = `data:image/jpeg;base64,${video.thumbnail}`;
            thumbnail.alt = video.title;
            thumbnail.classList.add('video-thumbnail');
            thumbnailContainer.appendChild(thumbnail);

            // Create an overlay container for video details
            const overlayContainer = document.createElement('div');
            overlayContainer.classList.add('overlay-container');
            overlayContainer.innerHTML = `<h4>${video.title}</h4>`; // Add video title

            // Append thumbnail and overlay to videoRow
            videoRow.appendChild(thumbnailContainer);
            videoRow.appendChild(overlayContainer);

            // Append videoRow to the row div
            row.appendChild(videoRow);

            // Add click event to play video when clicked
            videoRow.addEventListener('click', async () => {
                // Save video details to localStorage
                localStorage.setItem('selectedVideoUrl', video.videoUrl);
                localStorage.setItem('selectedThumbnail', video.thumbnail);
                localStorage.setItem('selectedId', video.id);

                // Save to watch history
                const videoDetails = {
                    videoUrl: video.videoUrl,
                    thumbnail: video.thumbnail,
                    title: video.title
                };
                saveToHistory(videoDetails);

                // Redirect to the player page immediately
                window.location.href = 'player.html';

                // Fetch views, likes, and dislikes asynchronously (these can continue in the background)
                try {
                    const views = await getViews(video.id);
                    localStorage.setItem('videoViews', views);

                    const likes = await getLikes(video.id);
                    localStorage.setItem('videoLikes', likes);

                    const dislikes = await getDislikes(video.id);
                    localStorage.setItem('videoDisLikes', dislikes);
                } catch (error) {
                    console.error('Error fetching views or likes/dislikes:', error);
                }
            });

            // Append row to the main container
            videosContainer.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
    }

    // Display watched videos on page load
    displayWatchedVideos();
});

// Function to save the video to the watch history
function saveToHistory(video) {
    let history = JSON.parse(localStorage.getItem('videoHistory')) || [];

    // Check if the video is already in the history
    const videoExists = history.find(item => item.videoUrl === video.videoUrl);

    if (!videoExists) {
        // Add new video to the beginning of the array
        history.unshift(video);

        // Keep only the latest 5 videos in history
        if (history.length > 100) {
            history.pop(); // Remove the oldest video
        }

        // Save updated history to localStorage
        localStorage.setItem('videoHistory', JSON.stringify(history));
    }
}

// Function stubs for getViews, getLikes, and getDislikes (replace with actual implementation)
async function getViews(videoId) {
    // Simulating API call for views
    return Math.floor(Math.random() * 1000);
}

async function getLikes(videoId) {
    // Simulating API call for likes
    return Math.floor(Math.random() * 100);
}

async function getDislikes(videoId) {
    // Simulating API call for dislikes
    return Math.floor(Math.random() * 10);
}
