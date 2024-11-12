// Function to display watched videos
function displayWatchedVideos() {
    const history = JSON.parse(localStorage.getItem('videoHistory')) || [];
    const watchedVideosContainer = document.getElementById('watchedVideos');

    // Clear the previous history
    watchedVideosContainer.innerHTML = '';

    history.forEach(video => {
        // Create a row for each watched video (same structure as suggestions)
        const watchedRow = document.createElement('div');
        watchedRow.classList.add('watched-row', 'position-relative');

        // Thumbnail container
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnail-container1');

        // Thumbnail image
        const thumbnail = document.createElement('img');
        thumbnail.src = `data:image/jpeg;base64,${video.thumbnail}`;
        thumbnail.alt = video.title;
        thumbnail.classList.add('video-thumbnail1');
        thumbnailContainer.appendChild(thumbnail);

        // Overlay container for additional video details (if needed)
        const overlayContainer = document.createElement('div');
        overlayContainer.classList.add('overlay-container1');
        overlayContainer.innerHTML = `<h5>${video.title}</h5>`; // Add video title

        // Append to watchedRow
        watchedRow.appendChild(thumbnailContainer);
        watchedRow.appendChild(overlayContainer);

        // Append watchedRow to the main container
        watchedVideosContainer.appendChild(watchedRow);

        // Add click event to re-watch the video
        watchedRow.addEventListener('click', () => {
            // Set the video URL and thumbnail in localStorage (or directly in player)
            localStorage.setItem('selectedVideoUrl', video.videoUrl);
            localStorage.setItem('selectedThumbnail', video.thumbnail);

            // Set the video source in the video player
            const videoElement = document.getElementById('video');
            const thumbnailElement = document.getElementById('video-thumbnail');

            videoElement.src = video.videoUrl; // Load video URL
            thumbnailElement.src = `data:image/jpeg;base64,${video.thumbnail}`; // Load thumbnail

            // Show the video player
            document.getElementById('videoPlayerRow').style.display = 'block';

            // Play the video
            videoElement.play();
        });
    });
}