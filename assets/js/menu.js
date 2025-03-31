// Menu Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    // Function to filter menu items
    function filterMenuItems(category) {
        menuCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Filter menu items
            filterMenuItems(button.dataset.category);
        });
    });

    // Initialize AOS
    AOS.init();
});

// Add to cart functionality (for display purposes only)
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Show a toast notification
        const toast = document.createElement('div');
        toast.classList.add('toast-notification');
        toast.textContent = 'Item details viewed!';
        document.body.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
}); 