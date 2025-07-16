// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Booking Form Steps
    const bookingForm = document.getElementById('serviceBookingForm');
    if (bookingForm) {
        const steps = document.querySelectorAll('.form-step');
        const nextButtons = document.querySelectorAll('.next-step');
        const prevButtons = document.querySelectorAll('.prev-step');
        
        let currentStep = 0;
        showStep(currentStep);
        
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (validateStep(currentStep)) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentStep--;
                showStep(currentStep);
            });
        });
        
        function showStep(step) {
            steps.forEach((stepElement, index) => {
                stepElement.classList.toggle('active', index === step);
            });
            
            // Hide/show navigation buttons as needed
            if (step === 0) {
                document.querySelector('.prev-step').style.display = 'none';
            } else {
                document.querySelector('.prev-step').style.display = 'inline-block';
            }
            
            if (step === steps.length - 1) {
                document.querySelector('.next-step').style.display = 'none';
            } else {
                document.querySelector('.next-step').style.display = 'inline-block';
            }
        }
        
        function validateStep(step) {
            let valid = true;
            const currentStepElements = steps[step].querySelectorAll('[required]');
            
            currentStepElements.forEach(element => {
                if (!element.value.trim()) {
                    element.style.borderColor = 'red';
                    valid = false;
                } else {
                    element.style.borderColor = '#ddd';
                }
            });
            
            return valid;
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would send the form data to the server here
            // For demo purposes, we'll just show the confirmation modal
            
            const modal = document.getElementById('bookingConfirmation');
            const emailSpan = document.getElementById('confirmEmail');
            const email = document.getElementById('email').value;
            
            emailSpan.textContent = email;
            modal.style.display = 'flex';
            
            // Reset form
            bookingForm.reset();
            currentStep = 0;
            showStep(currentStep);
        });
    }
    
    // Modal Close Buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
    
    // Testimonial Filter
    const testimonialFilterBtns = document.querySelectorAll('.filter-btn');
    testimonialFilterBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            testimonialFilterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const testimonials = document.querySelectorAll('.testimonial-card');
            
            testimonials.forEach(testimonial => {
                if (filter === 'all' || testimonial.dataset.category === filter) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
        });
    });
    
    // FAQ Category Filter
    const faqCategoryBtns = document.querySelectorAll('.category-btn');
    if (faqCategoryBtns.length > 0) {
        faqCategoryBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                faqCategoryBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.dataset.category;
                const faqItems = document.querySelectorAll('.faq-item');
                const categoryTitles = document.querySelectorAll('.faq-category-title');
                
                // Hide all items and titles first
                faqItems.forEach(item => item.style.display = 'none');
                categoryTitles.forEach(title => title.style.display = 'none');
                
                if (category === 'all') {
                    // Show all items and titles
                    faqItems.forEach(item => item.style.display = 'block');
                    categoryTitles.forEach(title => title.style.display = 'block');
                } else {
                    // Show only items and titles for selected category
                    document.querySelectorAll(`.faq-item[data-category="${category}"]`).forEach(item => {
                        item.style.display = 'block';
                    });
                    
                    document.querySelector(`.faq-category-title[data-category="${category}"]`).style.display = 'block';
                    
                    // Also show the items before the first category title
                    let showItems = true;
                    faqItems.forEach(item => {
                        if (item.querySelector('h3.faq-category-title')) {
                            showItems = item.dataset.category === category;
                        } else if (showItems) {
                            item.style.display = 'block';
                        }
                    });
                }
            });
        });
    }
    
    // Gallery Filter
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    galleryFilterBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            galleryFilterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-overlay h3').textContent;
            
            modalImg.src = imgSrc;
            modalCaption.textContent = caption;
            galleryModal.style.display = 'flex';
        });
    });
    
    // Login/Signup Tabs
    const authTabs = document.querySelectorAll('.auth-tabs .tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === tabId) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Forgot Password Modal
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login').classList.remove('active');
            document.getElementById('forgot-password').style.display = 'flex';
        });
    }
    
    // Form Submissions (demo only - would be AJAX in real app)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'red';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Show success message (in a real app, this would be an AJAX call)
                alert('Form submitted successfully! In a real application, this would be sent to the server.');
                this.reset();
                
                // If it's the booking form, show the confirmation modal
                if (this.id === 'serviceBookingForm') {
                    const modal = document.getElementById('bookingConfirmation');
                    const emailSpan = document.getElementById('confirmEmail');
                    const email = document.getElementById('email').value;
                    
                    emailSpan.textContent = email;
                    modal.style.display = 'flex';
                }
            }
        });
    });
    
    // Star Rating
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach(rating => {
        const stars = rating.querySelectorAll('label');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.previousElementSibling.value;
                // You would typically store this value or use it in form submission
                console.log(`Selected rating: ${value} stars`);
            });
        });
    });
});