# GitHub CLI Setup Guide

## 🚀 Quick Start

This guide helps you set up and use GitHub CLI effectively. After installation, you can use the short command `gh` instead of the full path since it's installed system-wide.

**Note**: If `gh` command is not recognized in new terminal sessions, restart your terminal or use the full path: `"C:\Program Files\GitHub CLI\gh.exe"`

## 🔐 Authentication Setup

To authenticate with GitHub CLI:

```bash
# Login to GitHub
gh auth login

# Check authentication status
gh auth status
```

Your authentication will include:
- ✅ **Storage**: Windows Keyring (secure & persistent)
- ✅ **Protocol**: HTTPS (recommended)
- ✅ **Scopes**: gist, read:org, repo (standard permissions)

## 📁 Repository Operations

### View Repository Information
```bash
# View your repository
gh repo view your-username/your-repository

# View any public repository
gh repo view owner/repository-name
```

### List Your Repositories
```bash
# List all your repositories
gh repo list

# List with specific limit
gh repo list --limit 10

# List only public repositories
gh repo list --visibility public
```

### Clone Repositories
```bash
# Clone your repository
gh repo clone your-username/your-repository

# Clone to specific directory
gh repo clone your-username/your-repository ./my-project
```

### Create New Repository
```bash
# Create a new repository (interactive)
gh repo create

# Create with specific name
gh repo create my-new-project

# Create with description and make it public
gh repo create my-new-project --description "My awesome project" --public
```

## 🐛 Issue Management

### List Issues
```bash
# List issues in current repository
gh issue list

# List issues in specific repository
gh issue list --repo your-username/your-repository

# Filter by state
gh issue list --state open
gh issue list --state closed
```

### Create Issues
```bash
# Create issue interactively
gh issue create

# Create with title and body
gh issue create --title "Bug: Login not working" --body "Description of the issue"

# Assign to yourself
gh issue create --title "Feature request" --assignee @me
```

### View and Manage Issues
```bash
# View specific issue
gh issue view 123

# Close an issue
gh issue close 123

# Reopen an issue
gh issue reopen 123
```

## 🔄 Pull Request Operations

### List Pull Requests
```bash
# List PRs in current repository
gh pr list

# List PRs in specific repository
gh pr list --repo your-username/your-repository

# Filter by state
gh pr list --state open
```

### Create Pull Requests
```bash
# Create PR interactively
gh pr create

# Create with title and body
gh pr create --title "Add new feature" --body "Description of changes"

# Create draft PR
gh pr create --draft --title "Work in progress"
```

### Review Pull Requests
```bash
# View PR details
gh pr view 123

# Check out PR locally
gh pr checkout 123

# Merge PR
gh pr merge 123

# Close PR without merging
gh pr close 123
```

## 🌟 Advanced Features

### GitHub Actions
```bash
# List workflow runs
gh run list

# View specific run
gh run view 123456

# Re-run failed jobs
gh run rerun 123456
```

### Releases
```bash
# List releases
gh release list

# Create a release
gh release create v1.0.0 --title "Version 1.0.0" --notes "Release notes"

# Download release assets
gh release download v1.0.0
```

### Gists
```bash
# Create a gist
gh gist create myfile.js

# List your gists
gh gist list

# View a gist
gh gist view gist-id
```

## 🛠️ Configuration & Settings

### Configure Git Integration
```bash
# Set GitHub CLI as git credential helper
gh auth setup-git

# Configure default editor
gh config set editor "code --wait"

# Set default repository for commands
gh repo set-default your-username/your-repository
```

### Aliases
Create shortcuts for frequently used commands:
```bash
# Create alias for viewing issues
gh alias set issues 'issue list --state open'

# Create alias for creating PR
gh alias set pr-create 'pr create --draft'

# List all aliases
gh alias list
```

## 🔧 Troubleshooting

### Common Issues

**Command not found**: 
- Restart your terminal
- Use full path: `"C:\Program Files\GitHub CLI\gh.exe"`

**Authentication expired**:
```bash
gh auth refresh
```

**Permission denied**:
```bash
gh auth login --scopes repo,gist,read:org
```

### Getting Help
```bash
# General help
gh help

# Help for specific command
gh repo help
gh issue help
gh pr help

# List all available commands
gh help --all
```

## 📊 Workflow Examples

### Daily Development Workflow
```bash
# 1. Check authentication
gh auth status

# 2. List your repositories
gh repo list

# 3. Clone a repository
gh repo clone your-username/your-repository

# 4. Create a new branch and make changes
# (make your code changes)

# 5. Create a pull request
gh pr create --title "Fix: Update styling" --body "Updated CSS for better responsiveness"

# 6. List and manage issues
gh issue list
gh issue create --title "Enhancement: Add dark mode"
```

### Repository Management
```bash
# Create new repository
gh repo create my-awesome-project --public --description "My new project"

# Clone it locally
gh repo clone your-username/my-awesome-project

# Set as default for CLI commands
gh repo set-default your-username/my-awesome-project
```

## 🔒 Security Best Practices

1. **Token Security**: Authentication tokens are stored securely in Windows Keyring
2. **Scope Limitation**: Only grant necessary scopes (gist, read:org, repo)
3. **Regular Updates**: Keep GitHub CLI updated with `winget upgrade GitHub.cli`
4. **Token Refresh**: Tokens are automatically refreshed as needed
5. **Configuration Files**: Keep personal configuration files private and out of version control

## 📚 Additional Resources

- **Official Documentation**: https://cli.github.com/manual/
- **GitHub CLI Repository**: https://github.com/cli/cli
- **Community Discussions**: https://github.com/cli/cli/discussions

## 🎯 Next Steps

After setting up GitHub CLI, you can:

1. **Start using short commands**: Try `gh repo list` in any terminal
2. **Set up aliases**: Create shortcuts for your most-used commands
3. **Integrate with Git**: Run `gh auth setup-git` for seamless Git integration
4. **Explore advanced features**: Try GitHub Actions, Releases, and Gists management

**Happy coding with GitHub CLI! 🚀**