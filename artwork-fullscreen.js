document.addEventListener('DOMContentLoaded', () => {
    // Add play overlays to grid videos and gifs
    document.querySelectorAll('.artwork').forEach(artwork => {
        const video = artwork.querySelector('video');
        const img = artwork.querySelector('img');

        if (video) {
            if (!artwork.querySelector('.play-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'play-overlay';
                overlay.innerHTML = `<svg viewBox="0 0 60 60"><polygon points="20,15 50,30 20,45" /></svg>`;
                artwork.appendChild(overlay);
            }

            video.removeAttribute('controls');
            video.pause();
            video.currentTime = 0;
        }
    });

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.style.cursor = 'zoom-out';
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = 0;
    overlay.style.transition = 'opacity 0.2s';

    const fullImg = document.createElement('img');
    fullImg.style.maxWidth = '90vw';
    fullImg.style.maxHeight = '90vh';
    fullImg.style.boxShadow = '0 4px 32px #000';
    fullImg.style.display = 'none';

    const fullVideo = document.createElement('video');
    fullVideo.style.maxWidth = '90vw';
    fullVideo.style.maxHeight = '90vh';
    fullVideo.style.boxShadow = '0 4px 32px #000';
    fullVideo.style.background = '#000';
    fullVideo.controls = true;
    fullVideo.style.display = 'none';

    overlay.appendChild(fullImg);
    overlay.appendChild(fullVideo);
    document.body.appendChild(overlay);

    function showFullscreenImg(src, alt) {
        fullImg.src = src;
        fullImg.alt = alt || '';
        fullImg.style.display = '';
        fullVideo.style.display = 'none';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
        document.body.style.overflow = 'hidden';
    }

    function showFullscreenVideo(src, isGif) {
        fullImg.style.display = 'none';
        fullVideo.style.display = '';
        fullVideo.src = src;
        fullVideo.loop = true;
        fullVideo.controls = true;
        fullVideo.currentTime = 0;
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
        document.body.style.overflow = 'hidden';

        if (isGif) {
            fullVideo.style.display = 'none';
            fullImg.style.display = '';
            fullImg.src = src;
            fullImg.alt = '';
        } else {
            fullVideo.play();
        }
    }

    function hideFullscreen() {
        overlay.style.opacity = 0;
        setTimeout(() => {
            overlay.style.visibility = 'hidden';
            fullImg.src = '';
            fullVideo.pause();
            fullVideo.src = '';
            document.body.style.overflow = '';
        }, 200);
    }

    document.body.addEventListener('click', (e) => {
        const artwork = e.target.closest('.artwork');
        if (!artwork) return;

        const video = artwork.querySelector('video');
        const img = artwork.querySelector('img');

        if (video) {
            showFullscreenVideo(video.src, false);
        } else if (img && img.src.match(/\.gif($|\?)/i)) {
            showFullscreenVideo(img.src, true);
        } else if (img) {
            // Replace "-thumbnail" before extension with empty string
            const fullSrc = img.src.replace(/-thumbnail(?=\.\w+$)/, '');
            showFullscreenImg(fullSrc, img.alt);
        }
    });

    overlay.addEventListener('click', hideFullscreen);

    document.addEventListener('keydown', (e) => {
        if (overlay.style.visibility === 'visible' && e.key === 'Escape') {
            hideFullscreen();
        }
    });
});
