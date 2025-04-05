document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons'); // Get the original CTA buttons container

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            // Clone and manage CTA buttons for mobile menu
            if (isActive) {
                // Clone buttons IF they don't exist in mobile yet
                if (!navLinks.querySelector('.cta-buttons-mobile')) {
                    const ctaClone = ctaButtons.cloneNode(true);
                    ctaClone.classList.add('cta-buttons-mobile'); // Add class to identify mobile clone
                    ctaClone.classList.add('mobile-active'); // Style for mobile display
                    navLinks.appendChild(ctaClone); // Append clone to nav links container
                }
                 navLinks.querySelector('.cta-buttons-mobile').classList.add('mobile-active');
            } else {
                const mobileCtas = navLinks.querySelector('.cta-buttons-mobile');
                if (mobileCtas) {
                    mobileCtas.classList.remove('mobile-active');
                    // Optional: Remove clone completely when menu closes
                    // mobileCtas.remove();
                }
            }
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Product Gallery Carousel ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryDots = document.querySelectorAll('.gallery-dots .dot');
    let galleryIndex = 0;
    let galleryInterval;

    function showGalleryItem(index) {
        if (galleryItems.length === 0) return;

        const currentActive = document.querySelector('.gallery-item.active');
        if (currentActive) {
            currentActive.classList.add('exiting');
            currentActive.classList.remove('active');
        }

        galleryDots.forEach(dot => dot.classList.remove('active'));

        // Use setTimeout to allow exit animation to start before removing display:none
        setTimeout(() => {
            if(currentActive) currentActive.classList.remove('exiting'); // Clean up exiting class

            galleryItems[index].classList.add('active');
            galleryDots[index].classList.add('active');
            galleryIndex = index; // Update current index
        }, 50); // Small delay, adjust if needed
    }

    function startGalleryInterval() {
        clearInterval(galleryInterval); // Clear existing interval
        galleryInterval = setInterval(() => {
            const nextIndex = (galleryIndex + 1) % galleryItems.length;
            showGalleryItem(nextIndex);
        }, 5000); // Change slide every 5 seconds
    }

    if (galleryItems.length > 0) {
        showGalleryItem(galleryIndex); // Show initial item
        startGalleryInterval(); // Start auto-rotation

        galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== galleryIndex) { // Only act if clicking a different dot
                    showGalleryItem(index);
                    startGalleryInterval(); // Reset interval timer on manual click
                }
            });
        });
    }

    // --- Testimonial Slider ---
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let testimonialIndex = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        if (testimonialSlides.length === 0) return;
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        testimonialIndex = index;
    }

     function startTestimonialInterval() {
        clearInterval(testimonialInterval); // Clear existing interval
        testimonialInterval = setInterval(() => {
            const nextIndex = (testimonialIndex + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }, 6000); // Change testimonial every 6 seconds
    }

    if (testimonialSlides.length > 0) {
        showTestimonial(testimonialIndex); // Show initial item
        startTestimonialInterval();

        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                 if (index !== testimonialIndex) {
                    showTestimonial(index);
                    startTestimonialInterval(); // Reset interval timer
                 }
            });
        });
    }


    // --- Enhanced File Upload Functionality ---
    const fileInput = document.getElementById('resume-upload');
    const fileLabel = document.getElementById('resume-label'); // The <label> element
    const fileNameDisplay = document.getElementById('file-name-display');
    const fileLabelDefaultContent = document.getElementById('file-label-default');
    const resumeError = document.getElementById('resume-error');


    if (fileInput && fileLabel && fileNameDisplay && fileLabelDefaultContent) {
        fileInput.addEventListener('change', handleFileSelect);
        fileLabel.addEventListener('dragover', handleDragOver);
        fileLabel.addEventListener('dragleave', handleDragLeave);
        fileLabel.addEventListener('drop', handleDrop);

        function handleFileSelect() {
            if (fileInput.files.length > 0) {
                fileNameDisplay.textContent = fileInput.files[0].name;
                fileLabel.classList.add('has-file');
                fileLabel.classList.remove('invalid'); // Clear error on new selection
                if(resumeError) resumeError.style.display = 'none';
            } else {
                resetFileLabel();
            }
        }

         function handleDragOver(event) {
            event.preventDefault();
            fileLabel.classList.add('dragover');
        }

        function handleDragLeave() {
            fileLabel.classList.remove('dragover');
        }

        function handleDrop(event) {
            event.preventDefault();
            fileLabel.classList.remove('dragover');
            // Assign dropped files to input & trigger change event
            if (event.dataTransfer.files.length > 0) {
                fileInput.files = event.dataTransfer.files;
                handleFileSelect(); // Manually trigger update
            }
        }

        function resetFileLabel() {
            fileInput.value = ''; // Clear the input value
            fileNameDisplay.textContent = '';
            fileLabel.classList.remove('has-file');
            fileLabel.classList.remove('dragover');
            // Don't remove 'invalid' class here, let validation handle it
        }
    }

    // --- Enhanced Demo Search Functionality ---
    const demoSearchInput = document.getElementById('demo-search-input');
    const demoSearchButton = document.getElementById('demo-search-button');
    const searchResults = document.getElementById('search-results');

    if (demoSearchButton && searchResults && demoSearchInput) {
        // Example placeholder cycling
        const placeholders = [
            "Find product managers who worked at Google and have AI experience",
            "Show me software engineers skilled in Python & AWS based in London",
            "Search for marketing directors with SaaS startup experience",
            "Find potential mentors in UX design with 10+ years experience"
        ];
        let placeholderIndex = 0;
        if (placeholders.length > 0) {
            demoSearchInput.placeholder = `E.g., '${placeholders[0]}'`; // Set initial
            setInterval(() => {
                placeholderIndex = (placeholderIndex + 1) % placeholders.length;
                demoSearchInput.placeholder = `E.g., '${placeholders[placeholderIndex]}'`;
            }, 4000);
        }

        demoSearchButton.addEventListener('click', performDemoSearch);
        // Optional: Allow Enter key to trigger search
        demoSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performDemoSearch();
            }
        });

        function performDemoSearch() {
            const query = demoSearchInput.value.trim();

            if (query.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Please enter a search query like the examples above.</p>';
                return;
            }

            // Show improved loading state
            searchResults.innerHTML = `
                <div class="loading-indicator">
                    <div class="spinner"></div>
                    <p>DeepLinked AI is searching...</p>
                </div>`;

            // Simulate API call
            setTimeout(() => {
                displayMockResults(query);
            }, 1500);
        }
    }

    function displayMockResults(query) {
        // Simple logic to generate mock results based on query keywords
        let resultsHTML = '';
        const sanitizedQuery = query.toLowerCase();

        // Create a more realistic result structure
        const mockProfiles = [
             { name: "Alex Kim", title: "Senior Product Manager", company: "TechCorp", match: 98, reason: "Google alumnus + AI experience", exp: "6 years at Google AI Products, 2 years at TechCorp", skills: "Product Strategy, AI/ML Products, User Research" },
             { name: "Priya Sharma", title: "Product Lead", company: "AI Solutions", match: 95, reason: "Google alumnus + AI specialization", exp: "4 years at Google, 3 years at AI Solutions", skills: "Product Management, AI Products, Strategic Planning" },
             { name: "Michael Chen", title: "Product Manager", company: "InnovateTech", match: 92, reason: "Google Cloud experience + AI project focus", exp: "3 years at Google Cloud, 2 years at InnovateTech", skills: "Product Development, AI Integration, Market Analysis" },
             { name: "Jason Lee", title: "Senior Software Engineer", company: "TechGiant", match: 97, reason: "Full-stack expertise + 7 years experience", exp: "4 years at CodeCorp, 3 years at TechGiant", skills: "React, Node.js, Python, AWS, Machine Learning" },
             { name: "Sophia Garcia", title: "Lead Developer", company: "StartupX", match: 94, reason: "Frontend specialist + startup experience", exp: "5 years at WebTech, 2 years at StartupX", skills: "JavaScript, Vue.js, React, UI/UX, Web Performance" },
             { name: "David Wilson", title: "Backend Engineer", company: "DataSystems", match: 91, reason: "Database expertise + scalability focus", exp: "6 years at various tech companies", skills: "Java, Python, SQL, MongoDB, Microservices" },
             { name: "Taylor Johnson", title: "Marketing Director", company: "BrandCo", match: 96, reason: "Industry expertise + leadership skills", exp: "8 years in digital marketing", skills: "Brand Strategy, Content Marketing, Team Leadership" },
             { name: "Jordan Smith", title: "Data Scientist", company: "AnalyticsPro", match: 93, reason: "Statistical expertise + industry knowledge", exp: "5 years in data science and analytics", skills: "Machine Learning, Python, R, Data Visualization" }
        ];

        // Filter mock profiles based on query (very simplistic filtering)
        const filteredProfiles = mockProfiles.filter(profile => {
            const profileText = `${profile.name} ${profile.title} ${profile.company} ${profile.reason} ${profile.skills}`.toLowerCase();
            const queryTerms = sanitizedQuery.split(' ').filter(term => term.length > 2); // Basic split and ignore small words
             // Check if *some* terms match (adjust logic for better matching)
             return queryTerms.some(term => profileText.includes(term));
        }).slice(0, 3); // Limit to 3 results for demo

        if (filteredProfiles.length > 0) {
             resultsHTML = `
                <div class="result-header">
                    <h3>Results for: "${query}"</h3>
                    <p>Found ${filteredProfiles.length} relevant professional${filteredProfiles.length > 1 ? 's' : ''}</p>
                </div>
                <div class="result-list">
            `;

             filteredProfiles.forEach(profile => {
                 resultsHTML += `
                    <div class="result-item">
                        <div class="result-profile">
                            <div class="result-avatar"></div>
                            <div class="result-info">
                                <h4>${profile.name}</h4>
                                <p>${profile.title} at ${profile.company}</p>
                                <div class="result-match">
                                    <span class="match-tag">${profile.match}% Match</span>
                                    <span class="match-reason">${profile.reason}</span>
                                </div>
                            </div>
                        </div>
                        <div class="result-details">
                            <p><strong>Experience:</strong> ${profile.exp}</p>
                            <p><strong>Skills:</strong> ${profile.skills}</p>
                        </div>
                    </div>
                 `;
             });

            resultsHTML += `
                </div>
                <div class="result-refine">
                    <p>Refine your search:</p>
                    <div class="refine-options">
                        <button class="refine-button" data-refine="Only Senior Level">Senior Level</button>
                        <button class="refine-button" data-refine="Add Startup Experience">Startup Experience</button>
                        <button class="refine-button" data-refine="Based in San Francisco">In San Francisco</button>
                        <button class="refine-button" data-refine="With Python skills">Python Skills</button>
                    </div>
                </div>
            `;
        } else {
             resultsHTML = `
                <div class="result-header">
                    <h3>No results found for: "${query}"</h3>
                    <p>Try adjusting your search terms or use broader keywords.</p>
                </div>
             `;
        }

        searchResults.innerHTML = resultsHTML;

        // Add event listeners to NEWLY created refine buttons
        const refineButtons = searchResults.querySelectorAll('.refine-button');
        refineButtons.forEach(button => {
            button.addEventListener('click', function() {
                const refinement = this.dataset.refine;
                // Append refinement to input and trigger search again
                demoSearchInput.value = `${query} (${refinement})`; // Modify original query
                performDemoSearch();
            });
        });
    }


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Ignore basic "#" links or links to non-existent elements
            if (href === '#' || !document.querySelector(href)) return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            const headerOffset = 70; // Height of fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                 menuToggle.click(); // Simulate click to close
            }
        });
    });

    // --- Signup Form Handling & Validation ---
    const signupForm = document.getElementById('main-signup-form');
    const signupNameInput = document.getElementById('signup-name');
    const signupEmailInput = document.getElementById('signup-email');
    // fileInput and resumeError already defined above
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const signupButton = document.getElementById('signup-button');
    const signupFormContainer = document.getElementById('signup-form-container');
    const successMessageContainer = document.getElementById('signup-success-message');


    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            if (validateSignupForm()) {
                // Simulate form submission
                signupButton.textContent = 'Processing...';
                signupButton.disabled = true;

                // --- Simulate backend processing ---
                setTimeout(() => {
                    // Show success message
                    if (signupFormContainer && successMessageContainer) {
                         signupFormContainer.style.display = 'none';
                         successMessageContainer.style.display = 'block';
                    }
                    // Optional: Reset form fields or redirect after a delay
                    // setTimeout(() => {
                    //     resetSignupForm();
                    //     signupFormContainer.style.display = 'block';
                    //     successMessageContainer.style.display = 'none';
                    // }, 5000);

                }, 2000);
            }
        });
    }

    function validateSignupForm() {
        let isValid = true;
        clearErrors();

        // Validate Name
        if (!signupNameInput.value.trim()) {
            showError(signupNameInput, nameError, 'Full Name is required.');
            isValid = false;
        }

        // Validate Email
        if (!signupEmailInput.value.trim()) {
            showError(signupEmailInput, emailError, 'Email Address is required.');
            isValid = false;
        } else if (!isValidEmail(signupEmailInput.value)) {
             showError(signupEmailInput, emailError, 'Please enter a valid Email Address.');
             isValid = false;
        }

        // Validate Resume File
        if (!fileInput.files || fileInput.files.length === 0) {
             showError(fileLabel, resumeError, 'Please upload your resume.'); // Show error next to label
             isValid = false;
        } else {
            // Optional: Add file type/size validation here
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (!allowedTypes.includes(fileInput.files[0].type)) {
                 showError(fileLabel, resumeError, 'Invalid file type. Please upload PDF, DOC, or DOCX.');
                 isValid = false;
            } else if (fileInput.files[0].size > maxSize) {
                showError(fileLabel, resumeError, 'File size exceeds 5MB limit.');
                isValid = false;
            }
        }

        return isValid;
    }

    function showError(inputElement, errorElement, message) {
        if (inputElement.tagName === 'LABEL') { // Special handling for file label
             inputElement.classList.add('invalid');
        } else {
             inputElement.classList.add('invalid');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorMessages = signupForm.querySelectorAll('.error-message');
        const invalidInputs = signupForm.querySelectorAll('.invalid');

        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.style.display = 'none';
        });
        invalidInputs.forEach(input => input.classList.remove('invalid'));
        fileLabel.classList.remove('invalid'); // Specifically clear file label error state
    }

    function isValidEmail(email) {
        // Simple regex for basic email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    function resetSignupForm() {
        signupForm.reset(); // Resets form fields
        resetFileLabel(); // Resets file input visual state
        clearErrors();
        signupButton.textContent = 'Create My AI Profile';
        signupButton.disabled = false;
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial, .pricing-card');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target); // Optional: Stop observing once visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver (optional)
        animatedElements.forEach(el => el.classList.add('visible'));
    }


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded