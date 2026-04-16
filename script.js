document.addEventListener("DOMContentLoaded", () => {
  /* --- 0. Preloader --- */
  const preloader = document.getElementById("preloader");
  let minimumTimePassed = false;
  let pageLoaded = false;

  function hidePreloader() {
    if (minimumTimePassed && pageLoaded && preloader) {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }
  }

  // Ensure preloader shows for at least 1.5 seconds for the animation to play
  setTimeout(() => {
    minimumTimePassed = true;
    hidePreloader();
  }, 1500);

  window.addEventListener("load", () => {
    pageLoaded = true;
    hidePreloader();
  });
  
  // Failsafe in case window.load already fired
  if (document.readyState === "complete") {
    pageLoaded = true;
    hidePreloader();
  }

  /* --- 1. Custom Mouse Cursor --- */
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursorDot) {
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    }
  });

  function animateOutline() {
    if (cursorOutline) {
      let distX = mouseX - outlineX;
      let distY = mouseY - outlineY;
      
      outlineX += distX * 0.15;
      outlineY += distY * 0.15;
      
      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";
    }
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const clickables = document.querySelectorAll('a, button, input, textarea, .glass-card, .fa-brands, .fa-solid');
  clickables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if(cursorOutline) {
        cursorOutline.style.width = "60px";
        cursorOutline.style.height = "60px";
        cursorOutline.style.backgroundColor = "rgba(56, 189, 248, 0.1)";
        cursorOutline.style.borderColor = "var(--secondary)";
      }
    });
    el.addEventListener("mouseleave", () => {
      if(cursorOutline) {
        cursorOutline.style.width = "40px";
        cursorOutline.style.height = "40px";
        cursorOutline.style.backgroundColor = "transparent";
        cursorOutline.style.borderColor = "var(--primary)";
      }
    });
  });

  /* --- 2. Scroll Progress & Sticky Navbar --- */
  const progressBar = document.getElementById("scroll-progress");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    // Progress Bar
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";

    // Active Nav Link
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  /* --- 3. Mobile Menu Toggle --- */
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
    });
  });

  /* --- 4. Typing Effect --- */
  const typingText = document.getElementById("typing-text");
  const words = [
    "Web Developer",
    "AI Enthusiast",
    "CSE Student",
    "Problem Solver",
  ];
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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

  /* --- 6. GitHub API Integration --- */
  const githubContainer = document.getElementById("github-projects-container");
  const githubUsername = "eii-sayed";

  async function fetchGitHubProjects() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`,
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const repos = await response.json();

      githubContainer.innerHTML = ""; // Clear loader

      repos.forEach((repo, index) => {
        const delayClass = `delay-${(index % 4) + 1}`;
        const hasPage = repo.homepage
          ? `<a href="${repo.homepage}" target="_blank" class="btn btn-sm btn-outline">Live &rarr;</a>`
          : "";

        const cardHtml = `
                    <div class="glass-card project-card fade-up visible ${delayClass}">
                        <div class="project-header">
                            <div>// repo: ${repo.name}<br>_status: active</div>
                        </div>
                        <div class="project-content">
                            <h3 class="project-title">${repo.name.replace(/-/g, " ")}</h3>
                            <p class="project-desc">${repo.description || "No description available for this repository."}</p>
                            <div class="project-meta">
                                <div class="project-tag">
                                    <span class="tag-color"></span> ${repo.language || "Code"}
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
        githubContainer.insertAdjacentHTML("beforeend", cardHtml);
      });
    } catch (error) {
      githubContainer.innerHTML =
        '<div class="glass-card empty-state" style="grid-column: 1/-1"><p>Failed to load projects. Please visit my GitHub profile directly.</p></div>';
      console.error("Error fetching repos:", error);
    }
  }
  fetchGitHubProjects();

  /* --- 7. CV Generator (html2pdf) --- */
  const cvModal = document.getElementById("cv-modal");
  const openCvBtn = document.getElementById("open-cv-btn");
  const closeCvBtn = document.getElementById("close-cv-btn");
  const downloadPdfBtn = document.getElementById("download-pdf-btn");
  const cvDocument = document.getElementById("cv-document");
  const cvLoading = document.getElementById("cv-loading");

  openCvBtn.addEventListener("click", () => cvModal.classList.add("active"));
  closeCvBtn.addEventListener("click", () =>
    cvModal.classList.remove("active"),
  );

  // Close modal on outside click
  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) cvModal.classList.remove("active");
  });

  downloadPdfBtn.addEventListener("click", () => {
    cvLoading.style.display = "flex"; // Show loading spinner

    const opt = {
      margin: 0,
      filename: "Md_Abu_Sayed_Resume.pdf",
      image: { type: "jpeg", quality: 1 }, // Max quality
      html2canvas: {
        scale: 2,
        useCORS: true, // Crucial for rendering the profile image in the PDF
        allowTaint: true,
        letterRendering: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(cvDocument)
      .save()
      .then(() => {
        setTimeout(() => {
          cvLoading.style.display = "none";
        }, 500);
      })
      .catch((err) => {
        console.error("PDF Generation Error:", err);
        cvLoading.style.display = "none";
        alert("Failed to generate PDF. Please try again.");
      });
  });

  /* --- 8. Particle Canvas Background --- */
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouseState = { x: null, y: null, radius: 150 };

  window.addEventListener("mousemove", (event) => {
    mouseState.x = event.clientX;
    mouseState.y = event.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouseState.x = null;
    mouseState.y = null;
  });

  class Particle {
    constructor(x, y, size, color, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.baseSize = size;
      this.color = color;
      this.speedY = speedY;
      this.speedX = (Math.random() - 0.5) * 0.3; // Slight horizontal drift
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
    update() {
      // Antigravity drift upwards
      this.y -= this.speedY;
      this.x += this.speedX;

      // Wrap around screen seamlessly
      if (this.y < 0 - this.size * 2) {
        this.y = canvas.height + this.size * 2;
        this.x = Math.random() * canvas.width;
      }
      if (this.x > canvas.width + this.size * 2 || this.x < 0 - this.size * 2) {
        this.x = Math.random() * canvas.width;
      }

      // Mouse interaction (repel gently)
      if (mouseState.x != null && mouseState.y != null) {
        let dx = mouseState.x - this.x;
        let dy = mouseState.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseState.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseState.radius - distance) / mouseState.radius;
          
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
          
          // Glow effect when close to mouse
          if(this.size < this.baseSize * 3) {
             this.size += 0.2;
          }
        } else {
          if (this.size > this.baseSize) {
            this.size -= 0.1;
          }
        }
      } else {
         if (this.size > this.baseSize) {
            this.size -= 0.1;
         }
      }

      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 6000;
    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedY = Math.random() * 0.8 + 0.3; // Move up
      
      // Cosmic colors for antigravity look
      let r = Math.random();
      let color = r > 0.85 ? "rgba(56, 189, 248, 0.8)" : r > 0.7 ? "rgba(124, 109, 255, 0.8)" : "rgba(255, 255, 255, 0.5)";
      
      particlesArray.push(
        new Particle(x, y, size, color, speedY)
      );
    }
  }

  function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Keep transparent for the gradient background

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
  }

  window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
  });

  initParticles();
  animateParticles();

     /* --- 9. EmailJS Form Integration --- */
    // Initialize EmailJS with your Public Key
    emailjs.init("PqoyoNkEI-ns7eUZ7"); // <-- PASTE YOUR PUBLIC KEY HERE

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Change button to loading state
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // 2. Collect the data from your form
        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        // 3. Send the email!
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        emailjs.send('service_iig4zlp','template_yf49mq4'
, templateParams)
            .then(function(response) {
                // Success!
                formStatus.innerHTML = `<span class="text-primary"><i class="fa-solid fa-circle-check"></i> Message sent successfully!</span>`;
                contactForm.reset(); // Clear the form
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => formStatus.innerHTML = '', 5000);
            }, function(error) {
                // Failed :(
                formStatus.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-circle-xmark"></i> Failed to send message. Please try again.</span>`;
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                console.error('EmailJS Error:', error);
            });
    });
});


