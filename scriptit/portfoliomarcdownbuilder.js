// Kun DOM sisältö on ladattu, tämä skripti luo projektien kortit
document.addEventListener("DOMContentLoaded", function() {

    const portfolioContainer = document.getElementById("portfolio-container");

    // Lista markdown-tiedostoista. Voit lisätä uusia projekteja täällä.
    const projects = [
        'project1.md',
        'project2.md',
        'project3.md'
    ];

    // Luo ruudukko jokaiselle markdown-projektille
    projects.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("laatikko");

        projectElement.innerHTML = `
            <h3>Project ${index + 1}</h3>
            <p>Click to load the project</p>
            <button onclick="loadMarkdown('${project}')">View Project</button>
        `;

        portfolioContainer.appendChild(projectElement);
    });
});

// Lataa markdown-tiedosto ja näytä sen sisältö
function loadMarkdown(filename) {
    fetch(`portfolio/${filename}`)
        .then(response => response.text())
        .then(markdownText => {
            // Käytetään "marked"-kirjastoa markdownin muuttamiseksi HTML-formaattiin
            const htmlContent = marked.parse(markdownText);
            
            // Näytetään uusi näkymä markdown-sisällöstä
            document.body.innerHTML = `
                <div class="container">
                    <button onclick="location.reload()">Back to Portfolio</button>
                    ${htmlContent}
                </div>
            `;
        })
        .catch(error => console.error('Error loading markdown file:', error));
}