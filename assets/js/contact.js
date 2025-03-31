// Function to show loading state
function setLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    const spinner = submitBtn.querySelector('.spinner-border');
    const buttonText = submitBtn.querySelector('.button-text');
    
    if (isLoading) {
        spinner.classList.remove('d-none');
        buttonText.textContent = 'Sending...';
        submitBtn.disabled = true;
    } else {
        spinner.classList.add('d-none');
        buttonText.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
}

// Function to show notification
function showNotification(message, isSuccess) {
    const notification = document.createElement('div');
    notification.className = `alert ${isSuccess ? 'alert-success' : 'alert-danger'} notification`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.minWidth = '300px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.animation = 'slideIn 0.5s ease-out';
    notification.innerHTML = message;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Function to handle form submission
async function sendEmail(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show loading state
    setLoading(true);

    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            'service_mhg2kz2',
            'template_lxtwlai',
            {
                name: name,
                time: new Date().toLocaleString(),
                message: message,
                subject: subject,
                from_email: email
            }
        );

        if (response.status === 200) {
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', true);
            // Reset form
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again.', false);
    } finally {
        // Hide loading state
        setLoading(false);
    }

    return false;
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style); 