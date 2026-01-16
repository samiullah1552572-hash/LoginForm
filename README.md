# Google Login Page Clone

A pixel-perfect clone of the Google Login page, created for educational purposes. This project demonstrates frontend development with HTML, CSS, and JavaScript, along with a simple PHP backend for form handling.

## Features

- Responsive design that matches Google's Material Design
- Multi-step login flow (email → password)
- Form validation with error messages
- Smooth animations and transitions
- Secure server-side logging of login attempts
- Mobile-friendly layout

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling to match Google's design system
- `script.js` - Client-side form handling and validation
- `server.php` - Backend for handling form submissions
- `log.txt` - Will be created automatically to store login attempts

## Setup

1. **Local Development Server**:
   - Place all files in your web server's root directory (e.g., `htdocs` or `www`)
   - Ensure PHP is installed and running on your server
   - Make sure the web server has write permissions to create and update `log.txt`

2. **Using PHP's Built-in Server**:
   ```bash
   php -S localhost:8000
   ```
   Then open `http://localhost:8000` in your browser.

## Security Note

This project is for educational purposes only. The server.php file logs login attempts to demonstrate form handling and should never be used in a production environment without proper security measures.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
