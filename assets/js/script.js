$(document).ready(function() {
    // Handle active state in navigation
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Mobile navigation
    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    });

    // Back to top button
    const backToTop = $('#backToTop');
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 75
            }, 800);
        }
    });

    // Add animation to service cards
    $('.service-card').hover(
        function() { $(this).addClass('shadow-lg'); },
        function() { $(this).removeClass('shadow-lg'); }
    );

    // Form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Handle responsive images
    function handleResponsiveImages() {
        const windowWidth = $(window).width();
        const images = $('.hero-image, .service-card img, .blog-card img');
        
        if (windowWidth <= 576) {
            images.each(function() {
                const src = $(this).attr('src');
                if (src.indexOf('-mobile') === -1) {
                    $(this).attr('src', src.replace('.jpg', '-mobile.jpg'));
                }
            });
        } else {
            images.each(function() {
                const src = $(this).attr('src');
                if (src.indexOf('-mobile') !== -1) {
                    $(this).attr('src', src.replace('-mobile.jpg', '.jpg'));
                }
            });
        }
    }

    // Run on load and resize
    handleResponsiveImages();
    $(window).resize(handleResponsiveImages);

    // Add loading animation
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

    // Update theme toggle icon based on current theme
    function updateThemeIcon() {
        const themeIcon = $('.theme-toggle i');
        if (localStorage.getItem('theme') === 'dark') {
            themeIcon.removeClass('bi-moon-fill').addClass('bi-sun-fill');
  } else {
            themeIcon.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    }

    // Initial icon update
    updateThemeIcon();

    // Theme toggle click handler
    $('.theme-toggle').click(function() {
        toggleTheme();
        updateThemeIcon();
    });
});

// Theme Toggle Functionality
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.setAttribute('data-theme', themeName);
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Initialize theme
if (localStorage.getItem('theme') === 'dark') {
    setTheme('dark');
  } else {
    setTheme('light');
  }