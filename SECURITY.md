# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 5.0.x   | :white_check_mark: |
| < 5.0   | :x:                |

## Security Features

Legend Player is designed with security in mind:

- **Client-Side Only**: All file processing happens locally in your browser
- **No Data Upload**: Your files never leave your device
- **No External Servers**: No communication with external servers for file processing
- **Sandboxed Code Execution**: Code files run in an isolated iframe sandbox
- **Content Security**: Prevents XSS and code injection attacks
- **Secure Dependencies**: Regular dependency updates and security audits

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** open a public issue
2. Email the maintainer or use GitHub's private vulnerability reporting
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work to address the issue promptly.

## Security Best Practices

When using Legend Player:

- Keep your browser updated to the latest version
- Only load files from trusted sources
- Be cautious when using the sandbox mode with code files
- Regularly update the application if using the desktop version

## Data Privacy

- **No Analytics**: We don't track your usage
- **No Cookies**: No cookies are used for tracking
- **No User Data Storage**: Files are processed in-memory and not stored
- **Local Processing**: All operations happen on your device

## Third-Party Dependencies

We use minimal third-party dependencies:
- React and React-DOM (UI framework)
- Lucide React (icon library)
- JSZip (file compression)
- Vite (build tool)

All dependencies are regularly audited for security vulnerabilities.

## Contact

For security concerns: Create a private security advisory on GitHub

---

**Thank you for helping keep Legend Player secure!**
