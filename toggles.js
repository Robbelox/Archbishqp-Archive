function injectToggleSwitches() {
    document.querySelector('.filter-controls').innerHTML = `
    <label class="toggle-switch">
            <input type="checkbox" data-filter="nsfw">
            <span class="slider"></span>
            NSFW
        </label>
        <label class="toggle-switch">
            <input type="checkbox" data-filter="nudity">
            <span class="slider"></span>
            Nudity
        </label>
        <label class="toggle-switch">
            <input type="checkbox" data-filter="gore">
            <span class="slider"></span>
            Gore
        </label>
        `;
}

injectToggleSwitches();

document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.toggle-switch input');
    const artworks = document.querySelectorAll('.artwork[data-content-type]');

    function updateVisibility() {
        artworks.forEach(artwork => {
            const type = artwork.dataset.contentType;
            const toggle = document.querySelector(`input[data-filter="${type}"]`);
            artwork.classList.toggle('visible', toggle.checked);
        });
    }

    toggles.forEach(toggle => {
        toggle.addEventListener('change', updateVisibility);
    });

    // Initially hide all content-typed artworks
    updateVisibility();
});