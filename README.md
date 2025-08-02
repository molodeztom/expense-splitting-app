# SplitWise - AI-Powered Expense Splitting App

[![Built with AI](https://img.shields.io/badge/Built%20with-AI-blue.svg)](https://github.com)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **🤖 This entire project was created by AI** - A complete, fully-functional expense splitting application showcasing modern web development practices and advanced features, built entirely through artificial intelligence.

## 📖 Overview

SplitWise is a sophisticated web-based expense splitting application that makes it easy to track shared expenses and settle balances among groups of people. Whether you're sharing costs with roommates, splitting bills on a trip, or managing group expenses for any occasion, SplitWise provides an intuitive and powerful solution.

## ✨ Features

### 🏠 **Dashboard & Overview**
- ✅ Real-time expense tracking and balance calculations
- ✅ Visual summary cards showing total expenses, amounts owed, and net balances
- ✅ Recent activity feed with expense history
- ✅ Color-coded balance indicators (green for credit, red for debt)

### 👥 **Group Management**
- ✅ Create and manage multiple expense groups
- ✅ Add/remove group members with email support
- ✅ Edit group details and member information
- ✅ Advanced member removal with balance redistribution options
- ✅ Group selection and switching

### 💰 **Expense Tracking**
- ✅ Add expenses with detailed descriptions and categories
- ✅ Multiple splitting methods:
  - **Equal Split**: Divide expenses equally among all members
  - **Percentage Split**: Custom percentage allocation
  - **Custom Amounts**: Specify exact amounts for each person
- ✅ Category-based expense organization (Food, Transport, Entertainment, etc.)
- ✅ Edit and delete existing expenses
- ✅ Mark expenses as paid

### 📊 **Balance Management**
- ✅ Real-time balance calculations for all group members
- ✅ Detailed breakdown of amounts paid vs. owed
- ✅ Optimal settlement suggestions to minimize transactions
- ✅ Payment recording and settlement tracking
- ✅ Smart balance redistribution when removing members

### 🔧 **Advanced Features**
- ✅ Expense filtering by category and date
- ✅ Multiple sorting options (date, amount)
- ✅ Multi-currency support (USD, EUR, GBP, JPY)
- ✅ Local storage for data persistence
- ✅ Responsive design for mobile and desktop
- ✅ User settings and preferences
- ✅ Toast notifications for user feedback

### 🎨 **User Experience**
- ✅ Modern, clean interface with intuitive navigation
- ✅ Modal dialogs for complex operations
- ✅ Form validation and error handling
- ✅ Empty states with helpful guidance
- ✅ Smooth animations and transitions

## 🚀 Live Demo

**Demo Setup Required**: To set up a live demo, follow these steps:

1. **Fork this repository** to your GitHub account
2. **Enable GitHub Pages**: Go to Settings → Pages → Select source branch (main)
3. **Access your demo** at: `https://your-username.github.io/repository-name`

Alternatively, you can run the app locally by opening [`index.html`](index.html) in your web browser or serving it with a local development server.

## 📱 Screenshots

### Dashboard View
The main dashboard provides a comprehensive overview of your expenses and balances:
- Total expenses across all groups
- Personal balance summary (what you owe vs. what's owed to you)
- Recent activity feed
- Quick access to all major features

### Group Management
Create and manage expense groups with ease:
- Add multiple members with optional email addresses
- Edit group details and member information
- Handle member removal with intelligent balance redistribution
- Switch between different groups seamlessly

### Expense Addition
Add expenses with flexible splitting options:
- Choose from predefined categories or create custom ones
- Select who paid for the expense
- Split costs equally, by percentage, or with custom amounts
- Real-time validation ensures splits add up correctly

### Balance Overview
Track who owes what with detailed balance breakdowns:
- Individual member balances with paid/owed amounts
- Optimal settlement suggestions to minimize transactions
- One-click payment recording
- Visual indicators for positive/negative balances

## 🛠️ Technical Implementation

### Architecture
SplitWise is built as a single-page application (SPA) using vanilla JavaScript with a class-based architecture:

```javascript
class SplitWiseApp {
    constructor() {
        this.currentUser = null;
        this.currentGroup = null;
        this.groups = [];
        this.expenses = [];
        this.settings = {};
    }
}
```

### Key Components
- **Data Management**: Local storage with JSON serialization
- **UI Management**: Dynamic DOM manipulation with event delegation
- **Balance Calculations**: Advanced algorithms for optimal debt settlement
- **Form Handling**: Comprehensive validation and user feedback
- **Responsive Design**: CSS Grid and Flexbox for adaptive layouts

### Data Structure
```javascript
// Group Structure
{
    id: "unique_id",
    name: "Group Name",
    members: [
        { id: "user_id", name: "User Name", email: "email@example.com" }
    ],
    createdAt: "ISO_date_string",
    createdBy: "creator_user_id"
}

// Expense Structure
{
    id: "unique_id",
    groupId: "group_id",
    description: "Expense Description",
    amount: 100.00,
    category: "food",
    paidBy: "user_id",
    splitMethod: "equal|percentage|custom",
    splits: [
        { userId: "user_id", amount: 50.00 }
    ],
    date: "ISO_date_string",
    isPaid: false
}
```

## 🔒 Security & Configuration

This project follows security best practices for configuration management:

- **Sensitive files are excluded** from version control via [`.gitignore`](.gitignore)
- **Template files provided** for safe sharing of configuration examples
- **Security documentation** available in [`SECURITY-CONFIGURATION.md`](SECURITY-CONFIGURATION.md)

### Configuration Files
- [`github-config.example.json`](github-config.example.json) - Template for GitHub CLI configuration
- [`GitHub-CLI-Setup-Guide.md`](GitHub-CLI-Setup-Guide.md) - Generic setup guide for GitHub CLI
- [`SECURITY-CONFIGURATION.md`](SECURITY-CONFIGURATION.md) - Comprehensive security guidelines

**Note**: Personal configuration files containing usernames, repository lists, or authentication details are kept private and not committed to the repository.

## 🏗️ Project Structure

```
splitwise-app/
├── index.html                    # Main HTML structure
├── styles.css                    # Complete CSS styling with design system
├── app.js                        # Core JavaScript application logic
├── .gitignore                    # Git ignore rules (includes security patterns)
├── README.md                     # This documentation
├── SECURITY.md                   # Security policy
├── SECURITY-CONFIGURATION.md     # Configuration security guidelines
├── github-config.example.json    # GitHub CLI configuration template
└── GitHub-CLI-Setup-Guide.md     # Generic GitHub CLI setup guide
```

### File Breakdown

#### [`index.html`](index.html)
- Semantic HTML5 structure
- Responsive viewport configuration
- Font Awesome icons integration
- Modal dialogs for complex interactions
- Accessibility-friendly markup

#### [`styles.css`](styles.css)
- CSS custom properties for consistent theming
- Responsive design with mobile-first approach
- Modern CSS features (Grid, Flexbox, transitions)
- Component-based styling architecture
- Dark/light theme support variables

#### [`app.js`](app.js)
- ES6+ JavaScript with class-based architecture
- Comprehensive event handling and DOM manipulation
- Advanced balance calculation algorithms
- Local storage data persistence
- Form validation and user feedback systems

## 🌐 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Icons**: Font Awesome 6.0
- **Storage**: Browser Local Storage
- **Design**: CSS Grid, Flexbox, Custom Properties
- **Architecture**: Single Page Application (SPA)
- **Responsive**: Mobile-first design approach

## 📦 Installation & Setup

### Option 1: Direct Download
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start creating groups and adding expenses!

### Option 2: Local Development Server
```bash
# Clone the repository
git clone https://github.com/your-username/splitwise-app.git
cd splitwise-app

# Serve with Python (if installed)
python -m http.server 8000

# Or with Node.js http-server
npx http-server

# Open http://localhost:8000 in your browser
```

### Option 3: GitHub Pages Deployment
1. Fork this repository
2. Go to repository Settings → Pages
3. Select source branch (main/master)
4. Your app will be available at `https://your-username.github.io/splitwise-app`

## 🎯 How to Use

### Getting Started
1. **Create Your First Group**
   - Click "Create Group" in the Groups section
   - Add a group name and member details
   - Include yourself and other participants

2. **Add Expenses**
   - Navigate to "Add Expense"
   - Enter expense details (description, amount, category)
   - Choose who paid and how to split the cost
   - Submit to add to your group

3. **Track Balances**
   - View the "Balances" section for detailed breakdowns
   - See who owes what and optimal settlement suggestions
   - Record payments when debts are settled

4. **Manage Your Data**
   - Edit or delete expenses as needed
   - Update group membership
   - Customize settings and preferences

### Advanced Features
- **Smart Settlement**: The app calculates the minimum number of transactions needed to settle all debts
- **Balance Redistribution**: When removing members, choose to redistribute their balance or require settlement first
- **Multi-Currency**: Set your preferred currency in settings
- **Expense Categories**: Organize expenses by type for better tracking

## 🔧 Customization

### Adding New Categories
Modify the category options in both HTML and JavaScript:

```javascript
// In app.js - getCategoryName method
const categories = {
    'food': 'Food & Dining',
    'transport': 'Transportation',
    'your_category': 'Your Category Name'
};
```

### Changing Currency Options
Update the currency settings in the HTML:

```html
<select id="defaultCurrency">
    <option value="USD">USD ($)</option>
    <option value="YOUR_CURRENCY">YOUR_CURRENCY (Symbol)</option>
</select>
```

### Styling Customization
Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --success-color: #your-success-color;
    /* Add your custom colors */
}
```

## 🤖 AI Development Showcase

This project demonstrates the capabilities of AI in modern web development:

### **Complete Full-Stack Development**
- ✅ **Frontend Architecture**: Designed and implemented a complete SPA architecture
- ✅ **User Interface**: Created an intuitive, modern UI with responsive design
- ✅ **Business Logic**: Developed complex algorithms for expense splitting and balance calculations
- ✅ **Data Management**: Implemented persistent storage and data synchronization

### **Advanced Programming Concepts**
- ✅ **Object-Oriented Design**: Class-based architecture with proper encapsulation
- ✅ **Event-Driven Programming**: Comprehensive event handling and user interactions
- ✅ **Algorithm Implementation**: Optimal debt settlement calculations
- ✅ **Form Validation**: Real-time validation with user feedback

### **Modern Web Standards**
- ✅ **ES6+ JavaScript**: Modern syntax and features throughout
- ✅ **CSS Grid & Flexbox**: Advanced layout techniques
- ✅ **Responsive Design**: Mobile-first approach with breakpoints
- ✅ **Accessibility**: Semantic HTML and ARIA attributes

### **User Experience Design**
- ✅ **Intuitive Navigation**: Logical flow and clear information architecture
- ✅ **Visual Feedback**: Loading states, notifications, and error handling
- ✅ **Progressive Enhancement**: Works without JavaScript for basic functionality
- ✅ **Performance Optimization**: Efficient DOM manipulation and event handling

## 🚀 Future Enhancements

Potential features that could be added:
- [ ] Cloud synchronization and backup
- [ ] Receipt photo uploads and OCR
- [ ] Email notifications and reminders
- [ ] Export functionality (PDF, CSV)
- [ ] Multi-language support
- [ ] Dark theme toggle
- [ ] Expense templates and recurring expenses
- [ ] Integration with payment platforms
- [ ] Advanced reporting and analytics
- [ ] Offline functionality with service workers

## 🤝 Contributing

While this project was created by AI, contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and architecture
- Add comments for complex logic
- Test thoroughly across different browsers
- Ensure responsive design compatibility
- Update documentation as needed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font Awesome** for the comprehensive icon library
- **Modern CSS** techniques and best practices from the web development community
- **JavaScript ES6+** features that make modern web development possible
- **AI Technology** that made this entire project possible, showcasing the future of software development

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing issues in the GitHub repository
2. Create a new issue with detailed information
3. Include browser information and steps to reproduce

---

**🤖 Built entirely by AI** - This project showcases the power of artificial intelligence in creating complete, functional web applications with modern development practices and user-centered design.

**⭐ Star this repository** if you find it useful or interesting!