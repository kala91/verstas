// Funktio projektien lataamiseen
function loadProjects() {
    const portfolioContainer = document.getElementById("portfolio-container");
    
    // Jos container ei ole vielä DOM:ssa, odota hetki
    if (!portfolioContainer) {
        setTimeout(loadProjects, 100);
        return;
    }
    
    // Tyhjennä container ennen uusien projektien lisäämistä
    portfolioContainer.innerHTML = '';

    // Lista projekteista. Voit lisätä uusia projekteja täällä.
    // type: 'markdown' lataa .md tiedoston, 'external' avaa linkin uuteen välilehteen, 'demo' linkki demoihin
    const projects = [
        {
            title: 'ERPG - Educational RPG Engine',
            description: 'Simppeli formaatti opetuksellisten peliympäristöjen rakentamiseen selaimella',
            type: 'demo',
            link: './demot/ERPG-test.html',
            tags: ['JavaScript', 'Game Dev', 'Education']
        },
        {
            title: 'Teknologia Verstas',
            description: 'Tämä sivusto - henkilökohtainen portfolio ja testausympäristö',
            type: 'external',
            link: 'https://github.com/kala91/verstas',
            tags: ['Web Dev', 'Portfolio', 'GitHub']
        },
        {
            title: 'Hallintapaneeli kokeilut',
            description: 'Feikki avaruusaluksen ohjauspaneeli - UI/UX harjoituksia',
            type: 'demo',
            link: './demot/ohjaamo1.html',
            tags: ['UI/UX', 'JavaScript', 'CSS']
        },
        {
            title: 'Staattinen vs Dynaaminen',
            description: 'Vertailu staattisen ja dynaamisen sivun rakentamisesta',
            type: 'demo',
            link: './demot/staticdynamic.html',
            tags: ['Web Dev', 'Tutorial']
        }
    ];

    // Luo ruudukko jokaiselle projektille
    projects.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("laatikko", "project-card");

        // Luo tagit
        const tagsHTML = project.tags 
            ? project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')
            : '';

        // Määritä linkki ja toiminto tyypin mukaan
        let actionButton = '';
        if (project.type === 'markdown') {
            actionButton = `<button class="project-btn" onclick="loadMarkdown('${project.link}')">📄 Lue lisää</button>`;
        } else if (project.type === 'external') {
            actionButton = `<a href="${project.link}" target="_blank" class="project-btn">🔗 Avaa GitHub</a>`;
        } else if (project.type === 'demo') {
            actionButton = `<a href="${project.link}" target="_blank" class="project-btn">🚀 Kokeile demoa</a>`;
        }

        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagsHTML}</div>
            ${actionButton}
        `;

        portfolioContainer.appendChild(projectElement);
    });
}

// Käynnistä lataus heti kun skripti suoritetaan
loadProjects();

// Varmista myös DOMContentLoaded:lla
document.addEventListener("DOMContentLoaded", loadProjects);

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
                    <button onclick="location.reload()">← Takaisin portfolioon</button>
                    ${htmlContent}
                </div>
            `;
        })
        .catch(error => console.error('Error loading markdown file:', error));
}