function injectHeader() {
    document.querySelector('header').innerHTML = `
        <h1>ARCHBISHQP archive</h1>
        <nav>
        <a href="index.html">Home</a>
        ||
        <a href="commissions.html">Commission</a>
        ||
        <a href="illustrations.html">Illustrations</a>
        <a href="animations.html">Animations</a>
        <a href="paintings.html">Paintings</a>
        <a href="sketches.html">Sketches</a>
        <a href="skins.html">Skins</a>
        </nav>
    `;
}
// Optionally, call injectHeader() automatically if desired:
injectHeader();