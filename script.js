// Handle email provider selection
function handleEmailProvider(provider) {
    // Add loading state
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    // Simulate authentication process
    setTimeout(() => {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
        
        // Show success message or redirect
        showMessage(`Redirecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication...`);
        
        // In a real application, you would redirect to the OAuth provider
        // window.location.href = getAuthUrl(provider);
    }, 1500);
}

// Get authentication URL for each provider (placeholder)
function getAuthUrl(provider) {
    const authUrls = {
        outlook: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        aol: 'https://api.login.aol.com/oauth2/authorize',
        office365: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        yahoo: 'https://api.login.yahoo.com/oauth2/request_auth',
        other: '#'
    };
    
    return authUrls[provider] || '#';
}

// Show temporary message
function showMessage(message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #48bb78;
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.email-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add fade-in animation
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});