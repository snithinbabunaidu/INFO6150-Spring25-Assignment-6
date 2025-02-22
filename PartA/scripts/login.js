$(document).ready(() => {
    // Hardcoded credentials for successful login
    const VALID_CREDENTIALS = {
        email: "chawla.v@northeastern.edu",
        username: "vishal_c",
        password: "chawla123"
    };

    // Regular expressions for validation
    const patterns = {
        northeastern: /@northeastern\.edu$/i,
        username: /^[a-zA-Z][a-zA-Z0-9_]*$/,  // Must start with letter
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@_\-]{8,20}$/  // No dots allowed
    };

    function validateEmail(email) {
        const emailField = $('#email');
        const errorElement = $('#emailError');
        const formGroup = emailField.parent('.form-group');
        
        errorElement.text('');
        formGroup.removeClass('valid invalid');
        
        if (!email) {
            formGroup.addClass('invalid');
            errorElement.text('Email is required');
            return false;
        }

        if (!patterns.northeastern.test(email)) {
            formGroup.addClass('invalid');
            errorElement.text('Must be a valid Northeastern email address');
            return false;
        }

        formGroup.addClass('valid');
        return true;
    }

    function validateUsername(username) {
        const usernameField = $('#username');
        const errorElement = $('#usernameError');
        const formGroup = usernameField.parent('.form-group');
        
        errorElement.text('');
        formGroup.removeClass('valid invalid');

        if (!username) {
            formGroup.addClass('invalid');
            errorElement.text('Username is required');
            return false;
        }

        if (username.length < 3) {
            formGroup.addClass('invalid');
            errorElement.text('Username must be at least 3 characters long');
            return false;
        }

        if (username.length > 20) {
            formGroup.addClass('invalid');
            errorElement.text('Username cannot exceed 20 characters');
            return false;
        }

        if (!patterns.username.test(username)) {
            formGroup.addClass('invalid');
            errorElement.text('Username must start with a letter and can only contain letters, numbers, and underscores');
            return false;
        }

        formGroup.addClass('valid');
        return true;
    }

    function validatePassword(password, isConfirmation = false) {
        const field = isConfirmation ? $('#confirmPassword') : $('#password');
        const errorElement = isConfirmation ? $('#confirmPasswordError') : $('#passwordError');
        const formGroup = field.parent('.form-group');
        
        errorElement.text('');
        formGroup.removeClass('valid invalid');

        if (!password) {
            formGroup.addClass('invalid');
            errorElement.text(isConfirmation ? 'Please confirm your password' : 'Password is required');
            return false;
        }

        if (!isConfirmation) {
            if (password.length < 8) {
                formGroup.addClass('invalid');
                errorElement.text('Password must be at least 8 characters long');
                return false;
            }

            if (password.length > 20) {
                formGroup.addClass('invalid');
                errorElement.text('Password cannot exceed 20 characters');
                return false;
            }

            if (!patterns.password.test(password)) {
                formGroup.addClass('invalid');
                errorElement.text('Password must contain letters, numbers, and only @, _, - as special characters');
                return false;
            }
        } else {
            const originalPassword = $('#password').val();
            if (password !== originalPassword) {
                formGroup.addClass('invalid');
                errorElement.text('Passwords do not match');
                return false;
            }
        }

        formGroup.addClass('valid');
        return true;
    }

    function validateForm() {
        const email = $('#email').val().trim();
        const username = $('#username').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();

        // First check format validations
        const isEmailValid = validateEmail(email);
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validatePassword(confirmPassword, true);

        const isFormatValid = isEmailValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid;
        
        // Enable/disable login button based on format validation
        $('#loginBtn').prop('disabled', !isFormatValid);
        
        return isFormatValid;
    }

    // Add input event listeners for real-time validation
    $('input').on('input', validateForm);
    
    // Handle form submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const email = $('#email').val().trim();
        const username = $('#username').val().trim();
        const password = $('#password').val();
        
        // Check if credentials match the valid ones
        if (email === VALID_CREDENTIALS.email && 
            username === VALID_CREDENTIALS.username && 
            password === VALID_CREDENTIALS.password) {
            
            const btn = $('#loginBtn');
            btn.addClass('loading').prop('disabled', true);
            
            // Store username in localStorage for calculator page
            localStorage.setItem('username', username);
            
            // Redirect to calculator page
            setTimeout(() => {
                window.location.href = 'calculator.html';
            }, 500);
        } else {
            // Show generic error for invalid credentials
            $('#passwordError').text('Invalid username or password');
            $('#password').parent('.form-group').addClass('invalid');
        }
    });
});