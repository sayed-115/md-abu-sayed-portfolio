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

  document.addEventListener("mouseleave", () => {
    if (cursorDot) cursorDot.style.opacity = "0";
    if (cursorOutline) cursorOutline.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    if (cursorDot) cursorDot.style.opacity = "1";
    if (cursorOutline) cursorOutline.style.opacity = "1";
  });

  function animateOutline() {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;
    
    outlineX += distX * 0.15;
    outlineY += distY * 0.15;
    
    if (cursorOutline) {
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

  /* --- 2. Scroll Progress --- */
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    // Progress Bar
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = scrollPercent + "%";
  });

  /* --- 2b. Active Nav Link (Intersection Observer) --- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserverOptions = {
    threshold: 0.3,
    rootMargin: "-10% 0px -50% 0px"
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach((section) => navObserver.observe(section));

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

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 1500; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before new word
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

      // Initialize VanillaTilt on newly added GitHub projects
      if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("#github-projects-container .glass-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1,
        });
      }
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

  /* --- 10. Vanilla Tilt Initialization --- */
  if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll(".glass-card"), {
          max: 4,
          speed: 400,
          glare: true,
          "max-glare": 0.05,
      });
  }

  /* --- 11. Cyber-Security Hexagon Matrix Background --- */
  const canvas = document.getElementById("hex-canvas");
  if (canvas) {
      const ctx = canvas.getContext("2d");
      
      let hexWidth, hexHeight, hexHorizontalStep, hexVerticalStep, cols, rows;
      const hexRadius = 35; // Size of hexagons
      let hexagons = [];
      
      class Hexagon {
          constructor(x, y) {
              this.x = x;
              this.y = y;
              this.targetGlow = 0;
              this.currentGlow = 0;
              this.isRandomTarget = false;
          }
          
          draw() {
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                  let angle = (Math.PI / 180) * (60 * i - 30);
                  let px = this.x + hexRadius * Math.cos(angle);
                  let py = this.y + hexRadius * Math.sin(angle);
                  if (i === 0) ctx.moveTo(px, py);
                  else ctx.lineTo(px, py);
              }
              ctx.closePath();
              
              // Base line faintly visible
              let strokeAlpha = 0.04 + (this.currentGlow * 0.9);
              ctx.strokeStyle = `rgba(56, 189, 248, ${strokeAlpha})`;
              ctx.lineWidth = 1;
              
              // Internal subtle fill when glowing
              if (this.currentGlow > 0.05) {
                  ctx.fillStyle = `rgba(124, 109, 255, ${this.currentGlow * 0.15})`;
                  ctx.fill();
                  ctx.shadowBlur = 15 * this.currentGlow;
                  ctx.shadowColor = "#38bdf8";
              } else {
                  ctx.shadowBlur = 0;
              }
              
              ctx.stroke();
          }
          
          update() {
              // Diminish glow smoothly
              if (!this.isRandomTarget) {
                  this.currentGlow *= 0.92;
              } else {
                  this.currentGlow += 0.03;
                  if (this.currentGlow >= 1) {
                      this.isRandomTarget = false;
                  }
              }
              
              // Trigger mouse trail
              if (mouseX && mouseY) {
                 let dist = Math.sqrt(Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2));
                 if (dist < 140) {
                     this.currentGlow = 0.8;
                 }
              }
              
              this.draw();
          }
      }
      
      function initHexagons() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          hexagons = [];
          
          hexWidth = Math.sqrt(3) * hexRadius;
          hexHeight = 2 * hexRadius;
          hexHorizontalStep = hexWidth;
          hexVerticalStep = hexHeight * 0.75;
          
          cols = Math.ceil(canvas.width / hexHorizontalStep) + 2;
          rows = Math.ceil(canvas.height / hexVerticalStep) + 2;
          
          for (let r = -1; r < rows; r++) {
             for (let c = -1; c < cols; c++) {
                  let x = c * hexHorizontalStep + (r % 2 === 1 ? hexHorizontalStep / 2 : 0);
                  let y = r * hexVerticalStep;
                  hexagons.push(new Hexagon(x, y));
             }
          }
      }
      
      function animateHexagons() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Trigger random matrix pulses
          if (Math.random() < 0.03 && hexagons.length > 0) {
              let randomHex = hexagons[Math.floor(Math.random() * hexagons.length)];
              if (randomHex.currentGlow < 0.1) {
                 randomHex.isRandomTarget = true;
              }
          }
          
          for (let hex of hexagons) {
              hex.update();
          }
          
          requestAnimationFrame(animateHexagons);
      }
      
      initHexagons();
      animateHexagons();
      
      window.addEventListener("resize", () => {
         initHexagons();
      });
  }
});


