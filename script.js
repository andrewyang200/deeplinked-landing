document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const ctaButtons = document.querySelector('.cta-buttons');
  
  if (menuToggle) {
      menuToggle.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          ctaButtons.classList.toggle('active');
          menuToggle.classList.toggle('active');
      });
  }
  
  // Testimonial slider functionality
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  
  function showTestimonial(index) {
      // Hide all testimonials
      testimonials.forEach(testimonial => {
          testimonial.style.display = 'none';
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
          dot.classList.remove('active');
      });
      
      // Show the current testimonial and activate its dot
      testimonials[index].style.display = 'block';
      dots[index].classList.add('active');
  }
  
  // Initialize testimonials
  if (testimonials.length > 0) {
      showTestimonial(currentIndex);
      
      // Add click event to dots
      dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              currentIndex = index;
              showTestimonial(currentIndex);
          });
      });
      
      // Auto-rotate testimonials
      setInterval(() => {
          currentIndex = (currentIndex + 1) % testimonials.length;
          showTestimonial(currentIndex);
      }, 5000);
  }
  
  // File upload functionality
  const fileInput = document.getElementById('resume-upload');
  const fileLabel = document.querySelector('.file-text');
  
  if (fileInput) {
      fileInput.addEventListener('change', function() {
          if (fileInput.files.length > 0) {
              fileLabel.textContent = fileInput.files[0].name;
          } else {
              fileLabel.textContent = 'Upload Your Résumé';
          }
      });
  }
  
  // Demo search functionality
  const demoSearchInput = document.getElementById('demo-search-input');
  const demoSearchButton = document.getElementById('demo-search-button');
  const searchResults = document.getElementById('search-results');
  
  if (demoSearchButton && searchResults) {
      demoSearchButton.addEventListener('click', function() {
          const query = demoSearchInput.value.trim();
          
          if (query.length === 0) {
              searchResults.innerHTML = '<p>Please enter a search query.</p>';
              return;
          }
          
          // Show loading state
          searchResults.innerHTML = '<p>Searching...</p>';
          
          // Simulate API call with timeout
          setTimeout(() => {
              // Generate mock results based on the query
              displayMockResults(query);
          }, 1500);
      });
  }
  
  function displayMockResults(query) {
      // Simple logic to generate mock results based on query keywords
      let results = '';
      
      if (query.toLowerCase().includes('product') && query.toLowerCase().includes('manager')) {
          results = `
              <div class="result-header">
                  <h3>Search Results for: "${query}"</h3>
                  <p>Found 3 relevant professionals</p>
              </div>
              <div class="result-list">
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Alex Kim</h4>
                              <p>Senior Product Manager at TechCorp</p>
                              <div class="result-match">
                                  <span class="match-tag">98% Match</span>
                                  <span class="match-reason">Google alumnus + AI experience</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 6 years at Google AI Products, 2 years at TechCorp</p>
                          <p><strong>Skills:</strong> Product Strategy, AI/ML Products, User Research</p>
                      </div>
                  </div>
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Priya Sharma</h4>
                              <p>Product Lead at AI Solutions</p>
                              <div class="result-match">
                                  <span class="match-tag">95% Match</span>
                                  <span class="match-reason">Google alumnus + AI specialization</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 4 years at Google, 3 years at AI Solutions</p>
                          <p><strong>Skills:</strong> Product Management, AI Products, Strategic Planning</p>
                      </div>
                  </div>
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Michael Chen</h4>
                              <p>Product Manager at InnovateTech</p>
                              <div class="result-match">
                                  <span class="match-tag">92% Match</span>
                                  <span class="match-reason">Google Cloud experience + AI project focus</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 3 years at Google Cloud, 2 years at InnovateTech</p>
                          <p><strong>Skills:</strong> Product Development, AI Integration, Market Analysis</p>
                      </div>
                  </div>
              </div>
              <div class="result-refine">
                  <p>Refine your search:</p>
                  <div class="refine-options">
                      <button class="refine-button">Only Senior Level</button>
                      <button class="refine-button">Only in San Francisco</button>
                      <button class="refine-button">Add Startup Experience</button>
                  </div>
              </div>
          `;
      } else if (query.toLowerCase().includes('developer') || query.toLowerCase().includes('engineer')) {
          results = `
              <div class="result-header">
                  <h3>Search Results for: "${query}"</h3>
                  <p>Found 3 relevant professionals</p>
              </div>
              <div class="result-list">
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Jason Lee</h4>
                              <p>Senior Software Engineer at TechGiant</p>
                              <div class="result-match">
                                  <span class="match-tag">97% Match</span>
                                  <span class="match-reason">Full-stack expertise + 7 years experience</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 4 years at CodeCorp, 3 years at TechGiant</p>
                          <p><strong>Skills:</strong> React, Node.js, Python, AWS, Machine Learning</p>
                      </div>
                  </div>
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Sophia Garcia</h4>
                              <p>Lead Developer at StartupX</p>
                              <div class="result-match">
                                  <span class="match-tag">94% Match</span>
                                  <span class="match-reason">Frontend specialist + startup experience</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 5 years at WebTech, 2 years at StartupX</p>
                          <p><strong>Skills:</strong> JavaScript, Vue.js, React, UI/UX, Web Performance</p>
                      </div>
                  </div>
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>David Wilson</h4>
                              <p>Backend Engineer at DataSystems</p>
                              <div class="result-match">
                                  <span class="match-tag">91% Match</span>
                                  <span class="match-reason">Database expertise + scalability focus</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 6 years at various tech companies</p>
                          <p><strong>Skills:</strong> Java, Python, SQL, MongoDB, Microservices</p>
                      </div>
                  </div>
              </div>
              <div class="result-refine">
                  <p>Refine your search:</p>
                  <div class="refine-options">
                      <button class="refine-button">Filter by Language</button>
                      <button class="refine-button">Only Remote Workers</button>
                      <button class="refine-button">Add Cloud Experience</button>
                  </div>
              </div>
          `;
      } else {
          results = `
              <div class="result-header">
                  <h3>Search Results for: "${query}"</h3>
                  <p>Found 2 relevant professionals</p>
              </div>
              <div class="result-list">
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Taylor Johnson</h4>
                              <p>Marketing Director at BrandCo</p>
                              <div class="result-match">
                                  <span class="match-tag">96% Match</span>
                                  <span class="match-reason">Industry expertise + leadership skills</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 8 years in digital marketing</p>
                          <p><strong>Skills:</strong> Brand Strategy, Content Marketing, Team Leadership</p>
                      </div>
                  </div>
                  <div class="result-item">
                      <div class="result-profile">
                          <div class="result-avatar"></div>
                          <div class="result-info">
                              <h4>Jordan Smith</h4>
                              <p>Data Scientist at AnalyticsPro</p>
                              <div class="result-match">
                                  <span class="match-tag">93% Match</span>
                                  <span class="match-reason">Statistical expertise + industry knowledge</span>
                              </div>
                          </div>
                      </div>
                      <div class="result-details">
                          <p><strong>Experience:</strong> 5 years in data science and analytics</p>
                          <p><strong>Skills:</strong> Machine Learning, Python, R, Data Visualization</p>
                      </div>
                  </div>
              </div>
              <div class="result-refine">
                  <p>Refine your search:</p>
                  <div class="refine-options">
                      <button class="refine-button">Specific Industry</button>
                      <button class="refine-button">Years of Experience</button>
                      <button class="refine-button">Location Filter</button>
                  </div>
              </div>
          `;
      }
      
      // Add CSS for the mock results
      const resultStyles = `
          <style>
              .result-header {
                  margin-bottom: 1.5rem;
              }
              
              .result-header h3 {
                  font-size: 1.3rem;
                  margin-bottom: 0.5rem;
              }
              
              .result-list {
                  display: flex;
                  flex-direction: column;
                  gap: 1rem;
              }
              
              .result-item {
                  background-color: white;
                  border-radius: 8px;
                  padding: 1rem;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              
              .result-profile {
                  display: flex;
                  gap: 1rem;
                  margin-bottom: 0.5rem;
              }
              
              .result-avatar {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  background-color: #e2e8f0;
              }
              
              .result-info h4 {
                  margin: 0 0 0.2rem;
                  font-weight: 600;
              }
              
              .result-info p {
                  margin: 0 0 0.5rem;
                  color: #718096;
                  font-size: 0.9rem;
              }
              
              .result-match {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
              }
              
              .match-tag {
                  background-color: rgba(52, 101, 255, 0.1);
                  color: #3465ff;
                  font-size: 0.8rem;
                  padding: 0.2rem 0.5rem;
                  border-radius: 4px;
                  font-weight: 500;
              }
              
              .match-reason {
                  font-size: 0.8rem;
                  color: #718096;
              }
              
              .result-details {
                  margin-top: 0.5rem;
                  padding-top: 0.5rem;
                  border-top: 1px solid #e2e8f0;
              }
              
              .result-details p {
                  margin: 0.5rem 0;
                  font-size: 0.9rem;
              }
              
              .result-refine {
                  margin-top: 1.5rem;
                  padding-top: 1rem;
                  border-top: 1px solid #e2e8f0;
              }
              
              .result-refine p {
                  margin-bottom: 0.5rem;
                  font-weight: 500;
              }
              
              .refine-options {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.5rem;
              }
              
              .refine-button {
                  background-color: white;
                  border: 1px solid #e2e8f0;
                  border-radius: 4px;
                  padding: 0.5rem 1rem;
                  font-size: 0.9rem;
                  cursor: pointer;
                  transition: all 0.2s ease;
              }
              
              .refine-button:hover {
                  background-color: #f7fafc;
                  border-color: #cbd5e0;
              }
          </style>
      `;
      
      searchResults.innerHTML = resultStyles + results;
      
      // Add event listeners to refine buttons
      const refineButtons = document.querySelectorAll('.refine-button');
      refineButtons.forEach(button => {
          button.addEventListener('click', function() {
              const originalQuery = demoSearchInput.value;
              const refinement = button.textContent;
              demoSearchInput.value = `${originalQuery} (${refinement})`;
              
              // Trigger new search
              demoSearchButton.click();
          });
      });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80, // Offset for fixed header
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Form submission handling
  const signupButton = document.getElementById('signup-button');
  
  if (signupButton) {
      signupButton.addEventListener('click', function(e) {
          e.preventDefault();
          
          const nameInput = document.getElementById('signup-name');
          const emailInput = document.getElementById('signup-email');
          const resumeInput = document.getElementById('resume-upload');
          
          let isValid = true;
          
          // Simple validation
          if (!nameInput.value.trim()) {
              nameInput.style.borderColor = '#e53e3e';
              isValid = false;
          } else {
              nameInput.style.borderColor = '';
          }
          
          if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
              emailInput.style.borderColor = '#e53e3e';
              isValid = false;
          } else {
              emailInput.style.borderColor = '';
          }
          
          if (!resumeInput.files.length) {
              document.querySelector('.file-label').style.borderColor = '#e53e3e';
              isValid = false;
          } else {
              document.querySelector('.file-label').style.borderColor = '';
          }
          
          if (isValid) {
              // Simulate form submission with loading state
              signupButton.textContent = 'Creating Account...';
              signupButton.disabled = true;
              
              setTimeout(() => {
                  // Show success message
                  const signupContent = document.querySelector('.signup-content');
                  signupContent.innerHTML = `
                      <div class="success-message">
                          <div class="success-icon">✓</div>
                          <h2>Account Created Successfully!</h2>
                          <p>We're analyzing your résumé and building your professional profile.</p>
                          <p>Check your email for next steps.</p>
                      </div>
                      <style>
                          .success-message {
                              text-align: center;
                              padding: 2rem;
                          }
                          
                          .success-icon {
                              width: 80px;
                              height: 80px;
                              background-color: #48bb78;
                              color: white;
                              border-radius: 50%;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              font-size: 2.5rem;
                              margin: 0 auto 2rem;
                          }
                          
                          .success-message h2 {
                              margin-bottom: 1rem;
                          }
                          
                          .success-message p {
                              margin-bottom: 0.5rem;
                              color: #718096;
                          }
                      </style>
                  `;
              }, 2000);
          }
      });
  }
  
  function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
  }
  
  // Add style for mobile navigation when active
  const style = document.createElement('style');
  style.textContent = `
      @media (max-width: 768px) {
          .nav-links.active, .cta-buttons.active {
              display: flex;
              flex-direction: column;
              position: absolute;
              top: 70px;
              left: 0;
              right: 0;
              background-color: white;
              padding: 1rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              z-index: 1000;
          }
          
          .menu-toggle.active span:nth-child(1) {
              transform: rotate(45deg) translate(5px, 5px);
          }
          
          .menu-toggle.active span:nth-child(2) {
              opacity: 0;
          }
          
          .menu-toggle.active span:nth-child(3) {
              transform: rotate(-45deg) translate(5px, -5px);
          }
      }
  `;
  document.head.appendChild(style);
});