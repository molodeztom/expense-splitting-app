# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions of SplitWise:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in SplitWise, please report it responsibly by following these guidelines:

### How to Report

1. **Do NOT create a public GitHub issue** for security vulnerabilities
2. **Email us directly** at: [security@splitwise.app](mailto:security@splitwise.app) *(Replace with actual contact)*
3. **Use the GitHub Security Advisory** feature to report privately

### What to Include

Please include the following information in your security report:

- **Description** of the vulnerability
- **Steps to reproduce** the issue
- **Potential impact** and severity assessment
- **Suggested fix** (if you have one)
- **Your contact information** for follow-up questions

### Response Timeline

We are committed to addressing security issues promptly:

- **Initial Response**: Within 48 hours of receiving your report
- **Status Update**: Within 7 days with our assessment and planned timeline
- **Resolution**: Security fixes will be prioritized and released as soon as possible

### Responsible Disclosure

We follow responsible disclosure practices:

1. We will acknowledge receipt of your vulnerability report
2. We will investigate and validate the reported vulnerability
3. We will develop and test a fix
4. We will coordinate the release of the fix
5. We will publicly acknowledge your contribution (if desired)

## Security Considerations

### Data Storage

SplitWise stores all data locally in your browser using localStorage. This means:

- **No server-side data storage** - your financial data never leaves your device
- **No user accounts** - no passwords or personal information stored on servers
- **Local data only** - clearing browser data will remove all expense information

### Privacy

- **No tracking** - we don't collect analytics or user behavior data
- **No external requests** - the app works entirely offline after initial load
- **No third-party services** - no data shared with external services

### Best Practices for Users

To keep your data secure:

1. **Use HTTPS** when accessing the application
2. **Keep your browser updated** to ensure latest security patches
3. **Be cautious on shared computers** - data persists in browser storage
4. **Regular backups** - export your data regularly as there's no cloud backup
5. **Clear data when needed** - remove sensitive data from shared devices

## Security Features

### Current Security Measures

- **Client-side only** - no server-side vulnerabilities
- **No authentication** - no password-related security risks
- **Local storage** - data doesn't travel over networks
- **Input validation** - form inputs are validated and sanitized
- **XSS protection** - content is properly escaped

### Planned Security Enhancements

- [ ] Content Security Policy (CSP) headers
- [ ] Subresource Integrity (SRI) for external resources
- [ ] Data encryption for local storage
- [ ] Export/import data validation
- [ ] Enhanced input sanitization

## Vulnerability Disclosure History

We will maintain a record of disclosed vulnerabilities here:

*No vulnerabilities have been reported to date.*

## Contact Information

For security-related inquiries:

- **Security Email**: [security@splitwise.app](mailto:security@splitwise.app) *(Replace with actual contact)*
- **General Issues**: [GitHub Issues](https://github.com/your-username/splitwise-app/issues)
- **Project Maintainer**: [Your Name](https://github.com/your-username)

## Acknowledgments

We appreciate the security research community and will acknowledge researchers who responsibly disclose vulnerabilities:

*No security researchers to acknowledge yet.*

---

**Note**: This is an open-source project created for educational and personal use. While we take security seriously, please use appropriate judgment when handling sensitive financial information.