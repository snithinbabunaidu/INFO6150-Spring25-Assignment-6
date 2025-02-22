# INFO6150-Spring25-Assignment-6
# Web Application with Calculator and Stopwatch

## Overview
This project consists of three main components:
1. A secure login system with email validation
2. A dual-mode calculator (basic and advanced)
3. A stopwatch with lap timing functionality

## Features

### Login System
- **Email Validation**: Accepts only Northeastern University email addresses
- **Username Requirements**:
  - Must start with a letter
  - Can contain letters, numbers, and underscores
  - Length: 3-20 characters
- **Password Security**:
  - 8-20 characters
  - Must contain letters and numbers
  - Allowed special characters: @, _, -
- **Real-time Validation**: Instant feedback on input errors
- **Test Credentials**:
  - Email: chawla.v@northeastern.edu
  - Username: vishal_c
  - Password: chawla123

### Calculator
#### Basic Operations Calculator
- Two input fields for numbers
- Four basic operations:
  - Addition
  - Subtraction
  - Multiplication
  - Division
- Input validation
- Error handling for invalid inputs and division by zero

#### Advanced Calculator
- Full-featured calculator interface
- Operations:
  - Basic arithmetic (+, -, ×, ÷)
  - Percentage calculations
  - Clear and backspace functions
- Keyboard support
- Continuous calculation capability
- Error handling

### Stopwatch
- Time display in HH:MM:SS format
- Features:
  - Start/Stop functionality
  - Reset option
  - Lap time recording
- Date picker for time logging
- Clean, modern interface

## Technical Stack
- HTML5
- CSS3
- JavaScript/jQuery
- Modern JavaScript features:
  - Async/Await
  - Promises
  - Arrow Functions
  - Set/Clear Interval

## Project Structure
```
project/
│
├── styles/
│   ├── calculator.css
│   ├── stopwatch.css
│   └── styles.css
│
├── scripts/
│   ├── calculator.js
│   ├── login.js
│   └── stopwatch.js
│
├── index.html
├── login.html
├── calculator.html
└── stopwatch.html
```

## Setup Instructions
1. Clone the repository
2. Ensure you have a modern web browser
3. No additional dependencies needed (jQuery is loaded via CDN)
4. Open `login.html` to start the application

## Usage
1. **Login**:
   - Enter your Northeastern email
   - Provide username and password
   - System validates inputs in real-time

2. **Basic Calculator**:
   - Enter numbers in both fields
   - Click operation buttons for results
   - Results display automatically

3. **Advanced Calculator**:
   - Use mouse or keyboard for input
   - Supports continuous calculations
   - Special functions available (%, clear, backspace)

4. **Stopwatch**:
   - Click Start to begin timing
   - Use Stop to pause
   - Reset returns to 00:00:00
   - Record lap times as needed

## Validation Features
- Email format checking
- Username format validation
- Password strength requirements
- Input field validation for calculators
- Error messages for invalid operations

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Features
- Password masking
- Input sanitization
- Session management
- Secure credential validation

## Known Limitations
- Requires JavaScript enabled
- Session expires on browser close
- Calculator limited to standard arithmetic operations

## Author
S Nithin Naidu
Course: INFO6150 - Web Design and User Experience Engineering

## License
This project is created for educational purposes as part of Northeastern University's curriculum.

## Acknowledgments
- jQuery library
- Modern CSS reset
- Font Awesome icons