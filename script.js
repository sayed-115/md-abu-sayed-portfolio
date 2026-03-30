document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Mouse Glow Effect --- */
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    /* --- 2. Scroll Progress & Sticky Navbar --- */
    const progressBar = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Progress Bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';

        // Active Nav Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 3. Mobile Menu Toggle --- */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });

    /* --- 4. Typing Effect --- */
    const typingText = document.getElementById('typing-text');
    const words = ["Web Developer", "AI Enthusiast", "CSE Student", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }
    type();

    /* --- 5. Scroll Reveal (Intersection Observer) --- */
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    /* --- 6. GitHub API Integration --- */
    const githubContainer = document.getElementById('github-projects-container');
    const githubUsername = 'eii-sayed';

    async function fetchGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('Network response was not ok');
            const repos = await response.json();
            
            githubContainer.innerHTML = ''; // Clear loader
            
            repos.forEach((repo, index) => {
                const delayClass = `delay-${index % 4 + 1}`;
                const hasPage = repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="btn btn-sm btn-outline">Live &rarr;</a>` : '';
                
                const cardHtml = `
                    <div class="glass-card project-card fade-up visible ${delayClass}">
                        <div class="project-header">
                            <div>// repo: ${repo.name}<br>_status: active</div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${repo.name.replace(/-/g, ' ')}</h3>
                            <p class="project-desc">${repo.description || 'No description available for this repository.'}</p>
                            <div class="project-meta">
                                <div class="project-tag">
                                    <span class="tag-color"></span> ${repo.language || 'Code'}
                                </div>
                                <div><i class="fa-regular fa-star"></i> ${repo.stargazers_count} &nbsp; <i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</div>
                            </div>
                            <div class="project-links">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-primary">GitHub &rarr;</a>
                                ${hasPage}
                            </div>
                        </div>
                    </div>
                `;
                githubContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        } catch (error) {
            githubContainer.innerHTML = '<div class="glass-card empty-state" style="grid-column: 1/-1"><p>Failed to load projects. Please visit my GitHub profile directly.</p></div>';
            console.error('Error fetching repos:', error);
        }
    }
    fetchGitHubProjects();

    /* --- 7. CV Generator (html2pdf) --- */
    const cvModal = document.getElementById('cv-modal');
    const openCvBtn = document.getElementById('open-cv-btn');
    const closeCvBtn = document.getElementById('close-cv-btn');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    const cvDocument = document.getElementById('cv-document');
    const cvLoading = document.getElementById('cv-loading');

    openCvBtn.addEventListener('click', () => cvModal.classList.add('active'));
    closeCvBtn.addEventListener('click', () => cvModal.classList.remove('active'));
    
    // Close modal on outside click
    cvModal.addEventListener('click', (e) => {
        if (e.target === cvModal) cvModal.classList.remove('active');
    });

    downloadPdfBtn.addEventListener('click', () => {
        cvLoading.style.display = 'flex'; // Show loading spinner
        
        const opt = {
            margin:       0,
            filename:     'Md_Abu_Sayed_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(cvDocument).save().then(() => {
            setTimeout(() => { cvLoading.style.display = 'none'; }, 500);
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            cvLoading.style.display = 'none';
            alert('Failed to generate PDF. Please try again.');
        });
    });

    /* --- 8. Particle Canvas Background --- */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x; this.y = y; this.directionX = directionX;
            this.directionY = directionY; this.size = size; this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            // Collision detection - mouse position / particle position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            // Move particles away from mouse
            if (distance < mouse.radius + this.size){
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 1;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 1;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 1;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 1;
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 12000; 
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = 'rgba(255, 255, 255, 0.2)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 10) * (canvas.height / 10)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();

    /* --- 9. Simple Form Prevent Default --- */
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const status = document.getElementById('form-status');
        status.innerHTML = `<span class="text-primary"><i class="fa-solid fa-circle-check"></i> Message simulated successfully! (Integrate EmailJS here)</span>`;
        e.target.reset();
        setTimeout(() => status.innerHTML = '', 5000);
    });

});