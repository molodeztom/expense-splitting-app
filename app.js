// SplitWise App - Main JavaScript File

class SplitWiseApp {
    constructor() {
        this.currentUser = null;
        this.currentGroup = null;
        this.groups = [];
        this.expenses = [];
        this.settings = {
            currency: 'USD',
            userName: '',
            userEmail: ''
        };
        
        // Theme management
        this.currentTheme = 'light';
        
        this.init();
    }

    init() {
        this.loadData();
        this.initializeTheme();
        this.setupEventListeners();
        this.setupNavigation();
        this.updateUI();
        
        // Initialize with first group if available
        if (this.groups.length > 0) {
            this.selectGroup(this.groups[0].id);
        }
    }

    // Data Management
    loadData() {
        try {
            this.groups = JSON.parse(localStorage.getItem('splitwise_groups') || '[]');
            this.expenses = JSON.parse(localStorage.getItem('splitwise_expenses') || '[]');
            this.settings = { ...this.settings, ...JSON.parse(localStorage.getItem('splitwise_settings') || '{}') };
            this.currentUser = localStorage.getItem('splitwise_current_user') || this.generateUserId();
            this.currentTheme = localStorage.getItem('splitwise_theme') || 'light';
            
            if (!localStorage.getItem('splitwise_current_user')) {
                localStorage.setItem('splitwise_current_user', this.currentUser);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.resetData();
        }
    }

    saveData() {
        try {
            localStorage.setItem('splitwise_groups', JSON.stringify(this.groups));
            localStorage.setItem('splitwise_expenses', JSON.stringify(this.expenses));
            localStorage.setItem('splitwise_settings', JSON.stringify(this.settings));
            localStorage.setItem('splitwise_current_user', this.currentUser);
            localStorage.setItem('splitwise_theme', this.currentTheme);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    resetData() {
        this.groups = [];
        this.expenses = [];
        this.settings = { currency: 'USD', userName: '', userEmail: '' };
        this.saveData();
    }

    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Group selection
        document.getElementById('groupSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.selectGroup(e.target.value);
            }
        });

        // Create group modal
        document.getElementById('createGroupBtn').addEventListener('click', () => {
            this.showCreateGroupModal();
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        // Create group form
        document.getElementById('createGroupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createGroup();
        });

        // Add member button
        document.getElementById('addMemberBtn').addEventListener('click', () => {
            this.addMemberInput();
        });

        // Expense form
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Split method change
        document.querySelectorAll('input[name="splitMethod"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateSplitDetails();
            });
        });

        // Settings form
        document.getElementById('saveSettings').addEventListener('click', () => {
            this.saveSettings();
        });

        // Edit group form
        document.getElementById('editGroupForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGroupChanges();
        });

        // Add edit member button
        document.getElementById('addEditMemberBtn').addEventListener('click', () => {
            this.addEditMemberInput();
        });

        // Delete member confirmation
        document.getElementById('confirmDeleteMember').addEventListener('click', () => {
            this.confirmMemberDeletion();
        });

        // Filter and sort
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterExpenses();
        });

        document.getElementById('sortBy').addEventListener('change', () => {
            this.filterExpenses();
        });

        // Cancel expense
        document.getElementById('cancelExpense').addEventListener('click', () => {
            this.resetExpenseForm();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setupNavigation() {
        // Set up navigation highlighting
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // UI Management
    showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Update specific sections
        switch (sectionId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'expenses':
                this.updateExpensesList();
                break;
            case 'balances':
                this.updateBalances();
                break;
            case 'groups':
                this.updateGroupsList();
                break;
            case 'add-expense':
                this.updateExpenseForm();
                break;
            case 'settings':
                this.updateSettingsForm();
                break;
        }
    }

    updateUI() {
        this.updateGroupSelector();
        this.updateDashboard();
    }

    // Group Management
    showCreateGroupModal() {
        const modal = document.getElementById('createGroupModal');
        modal.classList.add('active');
        
        // Reset form
        document.getElementById('groupName').value = '';
        const container = document.getElementById('membersContainer');
        container.innerHTML = `
            <div class="member-input">
                <input type="text" placeholder="Member name" class="member-name" required>
                <input type="email" placeholder="Email (optional)" class="member-email">
                <button type="button" class="btn-remove-member" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
    }

    addMemberInput() {
        const container = document.getElementById('membersContainer');
        const memberInput = document.createElement('div');
        memberInput.className = 'member-input';
        memberInput.innerHTML = `
            <input type="text" placeholder="Member name" class="member-name" required>
            <input type="email" placeholder="Email (optional)" class="member-email">
            <button type="button" class="btn-remove-member" onclick="this.parentElement.remove()">×</button>
        `;
        container.appendChild(memberInput);
    }

    createGroup() {
        const groupName = document.getElementById('groupName').value.trim();
        if (!groupName) return;

        const memberInputs = document.querySelectorAll('.member-input');
        const members = [];
        
        // Add current user as first member
        members.push({
            id: this.currentUser,
            name: this.settings.userName || 'You',
            email: this.settings.userEmail || ''
        });

        memberInputs.forEach(input => {
            const name = input.querySelector('.member-name').value.trim();
            const email = input.querySelector('.member-email').value.trim();
            
            if (name) {
                members.push({
                    id: this.generateUserId(),
                    name: name,
                    email: email
                });
            }
        });

        const group = {
            id: this.generateId(),
            name: groupName,
            members: members,
            createdAt: new Date().toISOString(),
            createdBy: this.currentUser
        };

        this.groups.push(group);
        this.saveData();
        this.updateGroupSelector();
        this.updateGroupsList();
        this.selectGroup(group.id);
        
        // Close modal
        document.getElementById('createGroupModal').classList.remove('active');
        
        // Show success message
        this.showNotification('Group created successfully!', 'success');
    }

    selectGroup(groupId) {
        this.currentGroup = this.groups.find(g => g.id === groupId);
        if (this.currentGroup) {
            document.getElementById('groupSelect').value = groupId;
            this.updateUI();
        }
    }

    updateGroupSelector() {
        const select = document.getElementById('groupSelect');
        select.innerHTML = '<option value="">Select Group</option>';
        
        this.groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = group.name;
            select.appendChild(option);
        });
    }

    updateGroupsList() {
        const container = document.getElementById('groupsList');
        
        if (this.groups.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>No groups yet. Create your first group to start splitting expenses!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.groups.map(group => `
            <div class="group-item">
                <div class="group-header">
                    <div class="group-title">${group.name}</div>
                    <div class="group-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.editGroup('${group.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-small btn-primary" onclick="app.selectGroup('${group.id}')">
                            Select
                        </button>
                    </div>
                </div>
                <div class="group-meta">
                    <span><i class="fas fa-users"></i> ${group.members.length} members</span>
                    <span><i class="fas fa-calendar"></i> Created ${this.formatDate(group.createdAt)}</span>
                </div>
            </div>
        `).join('');
    }

    // Edit Group Management
    editGroup(groupId) {
        const group = this.groups.find(g => g.id === groupId);
        if (!group) return;

        this.currentEditGroup = group;
        const modal = document.getElementById('editGroupModal');
        modal.classList.add('active');

        // Populate form
        document.getElementById('editGroupName').value = group.name;
        this.populateEditMembers();
    }

    populateEditMembers() {
        const container = document.getElementById('editMembersContainer');
        container.innerHTML = '';

        this.currentEditGroup.members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'edit-member-input';
            memberDiv.innerHTML = `
                <input type="text" value="${member.name}" class="edit-member-name" data-member-id="${member.id}">
                <input type="email" value="${member.email || ''}" class="edit-member-email" data-member-id="${member.id}">
                <div class="member-actions">
                    <button type="button" class="btn-edit-member" onclick="app.toggleEditMember('${member.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${member.id !== this.currentUser ? `
                        <button type="button" class="btn-delete-member" onclick="app.showDeleteMemberModal('${member.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            `;
            container.appendChild(memberDiv);
        });
    }

    addEditMemberInput() {
        const container = document.getElementById('editMembersContainer');
        const memberDiv = document.createElement('div');
        memberDiv.className = 'edit-member-input';
        const newMemberId = this.generateUserId();
        memberDiv.innerHTML = `
            <input type="text" placeholder="Member name" class="edit-member-name" data-member-id="${newMemberId}">
            <input type="email" placeholder="Email (optional)" class="edit-member-email" data-member-id="${newMemberId}">
            <div class="member-actions">
                <button type="button" class="btn-delete-member" onclick="this.parentElement.parentElement.remove()" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(memberDiv);
    }

    toggleEditMember(memberId) {
        const nameInput = document.querySelector(`input.edit-member-name[data-member-id="${memberId}"]`);
        const emailInput = document.querySelector(`input.edit-member-email[data-member-id="${memberId}"]`);
        
        if (nameInput.readOnly) {
            nameInput.readOnly = false;
            emailInput.readOnly = false;
            nameInput.focus();
        } else {
            nameInput.readOnly = true;
            emailInput.readOnly = true;
        }
    }

    showDeleteMemberModal(memberId) {
        const member = this.currentEditGroup.members.find(m => m.id === memberId);
        if (!member) return;

        this.memberToDelete = member;
        const modal = document.getElementById('deleteMemberModal');
        modal.classList.add('active');

        document.getElementById('deleteMemberName').textContent = member.name;
        this.showMemberBalanceInfo(member);
    }

    showMemberBalanceInfo(member) {
        const balances = this.calculateBalances();
        const memberBalance = balances[member.id];
        const balanceInfoContainer = document.getElementById('memberBalanceInfo');
        const redistributionContainer = document.getElementById('redistributionOptions');

        if (!memberBalance || Math.abs(memberBalance.balance) < 0.01) {
            balanceInfoContainer.innerHTML = `
                <div class="balance-info">
                    <h4>Member Balance</h4>
                    <p>This member has no outstanding balance. Safe to remove.</p>
                </div>
            `;
            redistributionContainer.style.display = 'none';
        } else {
            const isPositive = memberBalance.balance > 0;
            balanceInfoContainer.innerHTML = `
                <div class="balance-info">
                    <h4>Member Balance</h4>
                    <div class="balance-detail">
                        <span>Paid:</span>
                        <span>${this.formatCurrency(memberBalance.paid)}</span>
                    </div>
                    <div class="balance-detail">
                        <span>Owes:</span>
                        <span>${this.formatCurrency(memberBalance.owes)}</span>
                    </div>
                    <div class="balance-detail">
                        <span>Net Balance:</span>
                        <span class="${isPositive ? 'text-green' : 'text-red'}">
                            ${isPositive ? 'Gets back' : 'Owes'} ${this.formatCurrency(Math.abs(memberBalance.balance))}
                        </span>
                    </div>
                </div>
            `;
            redistributionContainer.style.display = 'block';
        }
    }

    confirmMemberDeletion() {
        if (!this.memberToDelete) return;

        const redistributionMethod = document.querySelector('input[name="redistributionMethod"]:checked').value;
        
        if (redistributionMethod === 'settle') {
            const balances = this.calculateBalances();
            const memberBalance = balances[this.memberToDelete.id];
            
            if (memberBalance && Math.abs(memberBalance.balance) > 0.01) {
                this.showNotification('Please settle this member\'s balance before removing them.', 'warning');
                return;
            }
        }

        // Remove member from current edit group
        this.currentEditGroup.members = this.currentEditGroup.members.filter(m => m.id !== this.memberToDelete.id);

        // If redistributing balance, split among remaining members
        if (redistributionMethod === 'split') {
            this.redistributeMemberBalance(this.memberToDelete.id);
        }

        // Update the group in the main groups array
        const groupIndex = this.groups.findIndex(g => g.id === this.currentEditGroup.id);
        if (groupIndex !== -1) {
            this.groups[groupIndex] = this.currentEditGroup;
        }

        this.saveData();
        this.populateEditMembers();
        
        // Close delete modal
        document.getElementById('deleteMemberModal').classList.remove('active');
        
        this.showNotification(`${this.memberToDelete.name} has been removed from the group.`, 'success');
        this.memberToDelete = null;
    }

    redistributeMemberBalance(deletedMemberId) {
        const balances = this.calculateBalances();
        const deletedMemberBalance = balances[deletedMemberId];
        
        if (!deletedMemberBalance || Math.abs(deletedMemberBalance.balance) < 0.01) return;

        const remainingMembers = this.currentEditGroup.members.filter(m => m.id !== deletedMemberId);
        if (remainingMembers.length === 0) return;

        const redistributionAmount = deletedMemberBalance.balance / remainingMembers.length;

        // Create a redistribution expense
        const redistributionExpense = {
            id: this.generateId(),
            groupId: this.currentEditGroup.id,
            description: `Balance redistribution for removed member: ${deletedMemberBalance.name}`,
            amount: Math.abs(deletedMemberBalance.balance),
            category: 'other',
            paidBy: deletedMemberId,
            splitMethod: 'custom',
            splits: remainingMembers.map(member => ({
                userId: member.id,
                amount: -redistributionAmount
            })),
            date: new Date().toISOString(),
            isPaid: true,
            isRedistribution: true
        };

        this.expenses.push(redistributionExpense);
    }

    saveGroupChanges() {
        const groupName = document.getElementById('editGroupName').value.trim();
        if (!groupName) {
            this.showNotification('Group name is required', 'error');
            return;
        }

        // Update group name
        this.currentEditGroup.name = groupName;

        // Update existing members
        const memberInputs = document.querySelectorAll('.edit-member-input');
        const updatedMembers = [];

        memberInputs.forEach(input => {
            const nameInput = input.querySelector('.edit-member-name');
            const emailInput = input.querySelector('.edit-member-email');
            const memberId = nameInput.dataset.memberId;
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();

            if (name) {
                // Check if this is an existing member or new member
                const existingMember = this.currentEditGroup.members.find(m => m.id === memberId);
                if (existingMember) {
                    // Update existing member
                    updatedMembers.push({
                        ...existingMember,
                        name: name,
                        email: email
                    });
                } else {
                    // Add new member
                    updatedMembers.push({
                        id: memberId,
                        name: name,
                        email: email
                    });
                }
            }
        });

        this.currentEditGroup.members = updatedMembers;

        // Update the group in the main groups array
        const groupIndex = this.groups.findIndex(g => g.id === this.currentEditGroup.id);
        if (groupIndex !== -1) {
            this.groups[groupIndex] = this.currentEditGroup;
        }

        this.saveData();
        this.updateGroupSelector();
        this.updateGroupsList();
        
        // Close modal
        document.getElementById('editGroupModal').classList.remove('active');
        
        this.showNotification('Group updated successfully!', 'success');
        this.currentEditGroup = null;
    }

    // Expense Management
    updateExpenseForm() {
        if (!this.currentGroup) {
            document.getElementById('add-expense').innerHTML = `
                <div class="section-header">
                    <h2>Add New Expense</h2>
                    <p>Please select a group first</p>
                </div>
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>You need to select a group before adding expenses.</p>
                </div>
            `;
            return;
        }

        // Update paid by dropdown
        const paidBySelect = document.getElementById('paidBy');
        paidBySelect.innerHTML = '<option value="">Select who paid</option>';
        
        this.currentGroup.members.forEach(member => {
            const option = document.createElement('option');
            option.value = member.id;
            option.textContent = member.name;
            if (member.id === this.currentUser) {
                option.selected = true;
            }
            paidBySelect.appendChild(option);
        });

        this.updateSplitDetails();
    }

    updateSplitDetails() {
        if (!this.currentGroup) return;

        const splitMethod = document.querySelector('input[name="splitMethod"]:checked').value;
        const container = document.getElementById('splitDetails');
        const amount = parseFloat(document.getElementById('expenseAmount').value) || 0;

        let html = '<h4>Split Details</h4>';

        switch (splitMethod) {
            case 'equal':
                const equalAmount = amount / this.currentGroup.members.length;
                html += this.currentGroup.members.map(member => `
                    <div class="split-item">
                        <label>${member.name}</label>
                        <input type="number" value="${equalAmount.toFixed(2)}" readonly>
                    </div>
                `).join('');
                break;

            case 'percentage':
                html += this.currentGroup.members.map(member => `
                    <div class="split-item">
                        <label>${member.name}</label>
                        <input type="number" class="split-percentage" data-member="${member.id}" 
                               placeholder="%" min="0" max="100" step="0.01">
                    </div>
                `).join('');
                break;

            case 'custom':
                html += this.currentGroup.members.map(member => `
                    <div class="split-item">
                        <label>${member.name}</label>
                        <input type="number" class="split-amount" data-member="${member.id}" 
                               placeholder="0.00" min="0" step="0.01">
                    </div>
                `).join('');
                break;
        }

        container.innerHTML = html;

        // Add event listeners for percentage/custom inputs
        if (splitMethod === 'percentage') {
            document.querySelectorAll('.split-percentage').forEach(input => {
                input.addEventListener('input', this.validatePercentages.bind(this));
            });
        } else if (splitMethod === 'custom') {
            document.querySelectorAll('.split-amount').forEach(input => {
                input.addEventListener('input', this.validateCustomAmounts.bind(this));
            });
        }
    }

    validatePercentages() {
        const inputs = document.querySelectorAll('.split-percentage');
        let total = 0;
        inputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        
        // Visual feedback for percentage validation
        inputs.forEach(input => {
            input.style.borderColor = total === 100 ? 'var(--success-color)' : 'var(--warning-color)';
        });
    }

    validateCustomAmounts() {
        const amount = parseFloat(document.getElementById('expenseAmount').value) || 0;
        const inputs = document.querySelectorAll('.split-amount');
        let total = 0;
        inputs.forEach(input => {
            total += parseFloat(input.value) || 0;
        });
        
        // Visual feedback for amount validation
        inputs.forEach(input => {
            input.style.borderColor = Math.abs(total - amount) < 0.01 ? 'var(--success-color)' : 'var(--warning-color)';
        });
    }

    addExpense() {
        if (!this.currentGroup) {
            this.showNotification('Please select a group first', 'error');
            return;
        }

        const description = document.getElementById('expenseDescription').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const paidBy = document.getElementById('paidBy').value;
        const splitMethod = document.querySelector('input[name="splitMethod"]:checked').value;

        if (!description || !amount || !paidBy) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Calculate splits
        const splits = this.calculateSplits(amount, splitMethod);
        if (!splits) {
            this.showNotification('Invalid split configuration', 'error');
            return;
        }

        const expense = {
            id: this.generateId(),
            groupId: this.currentGroup.id,
            description: description,
            amount: amount,
            category: category,
            paidBy: paidBy,
            splitMethod: splitMethod,
            splits: splits,
            date: new Date().toISOString(),
            isPaid: false
        };

        this.expenses.push(expense);
        this.saveData();
        this.resetExpenseForm();
        this.showNotification('Expense added successfully!', 'success');
        this.showSection('expenses');
    }

    calculateSplits(amount, splitMethod) {
        const splits = [];

        switch (splitMethod) {
            case 'equal':
                const equalAmount = amount / this.currentGroup.members.length;
                this.currentGroup.members.forEach(member => {
                    splits.push({
                        userId: member.id,
                        amount: equalAmount
                    });
                });
                break;

            case 'percentage':
                const percentageInputs = document.querySelectorAll('.split-percentage');
                let totalPercentage = 0;
                
                percentageInputs.forEach(input => {
                    const percentage = parseFloat(input.value) || 0;
                    totalPercentage += percentage;
                    splits.push({
                        userId: input.dataset.member,
                        amount: (amount * percentage) / 100
                    });
                });
                
                if (Math.abs(totalPercentage - 100) > 0.01) {
                    return null; // Invalid percentage total
                }
                break;

            case 'custom':
                const amountInputs = document.querySelectorAll('.split-amount');
                let totalAmount = 0;
                
                amountInputs.forEach(input => {
                    const splitAmount = parseFloat(input.value) || 0;
                    totalAmount += splitAmount;
                    splits.push({
                        userId: input.dataset.member,
                        amount: splitAmount
                    });
                });
                
                if (Math.abs(totalAmount - amount) > 0.01) {
                    return null; // Invalid amount total
                }
                break;
        }

        return splits;
    }

    resetExpenseForm() {
        document.getElementById('expenseForm').reset();
        document.querySelector('input[name="splitMethod"][value="equal"]').checked = true;
        this.updateSplitDetails();
    }

    updateExpensesList() {
        if (!this.currentGroup) {
            document.getElementById('expensesList').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>Please select a group to view expenses.</p>
                </div>
            `;
            return;
        }

        this.filterExpenses();
    }

    filterExpenses() {
        if (!this.currentGroup) return;

        const categoryFilter = document.getElementById('categoryFilter').value;
        const sortBy = document.getElementById('sortBy').value;
        
        let filteredExpenses = this.expenses.filter(expense => 
            expense.groupId === this.currentGroup.id
        );

        // Apply category filter
        if (categoryFilter) {
            filteredExpenses = filteredExpenses.filter(expense => 
                expense.category === categoryFilter
            );
        }

        // Apply sorting
        filteredExpenses.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'amount-desc':
                    return b.amount - a.amount;
                case 'amount-asc':
                    return a.amount - b.amount;
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        this.renderExpensesList(filteredExpenses);
    }

    renderExpensesList(expenses) {
        const container = document.getElementById('expensesList');
        
        if (expenses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No expenses found. Add your first expense to get started!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = expenses.map(expense => {
            const paidByMember = this.currentGroup.members.find(m => m.id === expense.paidBy);
            const userSplit = expense.splits.find(s => s.userId === this.currentUser);
            
            return `
                <div class="expense-item">
                    <div class="expense-header">
                        <div class="expense-title">${expense.description}</div>
                        <div class="expense-amount">${this.formatCurrency(expense.amount)}</div>
                    </div>
                    <div class="expense-meta">
                        <span class="category-badge">
                            <i class="fas fa-tag"></i>
                            ${this.getCategoryName(expense.category)}
                        </span>
                        <span><i class="fas fa-user"></i> Paid by ${paidByMember?.name || 'Unknown'}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(expense.date)}</span>
                        <span><i class="fas fa-calculator"></i> Your share: ${this.formatCurrency(userSplit?.amount || 0)}</span>
                    </div>
                    <div class="expense-actions">
                        <button class="btn btn-small btn-secondary" onclick="app.editExpense('${expense.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-small btn-danger" onclick="app.deleteExpense('${expense.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                        ${expense.paidBy !== this.currentUser && userSplit?.amount > 0 ? `
                            <button class="btn btn-small btn-success" onclick="app.markAsPaid('${expense.id}')">
                                <i class="fas fa-check"></i> Mark Paid
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Balance Calculations
    updateBalances() {
        if (!this.currentGroup) {
            document.getElementById('balancesList').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <p>Please select a group to view balances.</p>
                </div>
            `;
            document.getElementById('settlementsList').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-handshake"></i>
                    <p>No settlements needed yet.</p>
                </div>
            `;
            return;
        }

        const balances = this.calculateBalances();
        this.renderBalances(balances);
        this.renderSettlements(balances);
    }

    calculateBalances() {
        const balances = {};
        
        // Initialize balances for all members
        this.currentGroup.members.forEach(member => {
            balances[member.id] = {
                name: member.name,
                paid: 0,
                owes: 0,
                balance: 0
            };
        });

        // Calculate from expenses
        this.expenses
            .filter(expense => expense.groupId === this.currentGroup.id)
            .forEach(expense => {
                // Add to paid amount
                if (balances[expense.paidBy]) {
                    balances[expense.paidBy].paid += expense.amount;
                }

                // Add to owed amounts
                expense.splits.forEach(split => {
                    if (balances[split.userId]) {
                        balances[split.userId].owes += split.amount;
                    }
                });
            });

        // Calculate net balances
        Object.keys(balances).forEach(userId => {
            balances[userId].balance = balances[userId].paid - balances[userId].owes;
        });

        return balances;
    }

    renderBalances(balances) {
        const container = document.getElementById('balancesList');
        const balanceEntries = Object.entries(balances);

        if (balanceEntries.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-balance-scale"></i>
                    <p>No balances to show. Add some expenses first!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = balanceEntries.map(([userId, balance]) => {
            const isPositive = balance.balance > 0;
            const isNegative = balance.balance < 0;
            
            return `
                <div class="balance-item">
                    <div class="expense-header">
                        <div class="expense-title">${balance.name}</div>
                        <div class="expense-amount ${isPositive ? 'text-green' : isNegative ? 'text-red' : ''}">
                            ${this.formatCurrency(Math.abs(balance.balance))}
                        </div>
                    </div>
                    <div class="expense-meta">
                        <span>Paid: ${this.formatCurrency(balance.paid)}</span>
                        <span>Owes: ${this.formatCurrency(balance.owes)}</span>
                        <span class="${isPositive ? 'text-green' : isNegative ? 'text-red' : ''}">
                            ${isPositive ? 'Gets back' : isNegative ? 'Owes' : 'Settled'}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderSettlements(balances) {
        const container = document.getElementById('settlementsList');
        const settlements = this.calculateOptimalSettlements(balances);

        if (settlements.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-handshake"></i>
                    <p>All settled up! No payments needed.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = settlements.map(settlement => `
            <div class="settlement-item">
                <div class="expense-header">
                    <div class="expense-title">
                        ${settlement.from} → ${settlement.to}
                    </div>
                    <div class="expense-amount text-warning">
                        ${this.formatCurrency(settlement.amount)}
                    </div>
                </div>
                <div class="expense-actions">
                    <button class="btn btn-small btn-success" onclick="app.recordPayment('${settlement.fromId}', '${settlement.toId}', ${settlement.amount})">
                        <i class="fas fa-check"></i> Record Payment
                    </button>
                </div>
            </div>
        `).join('');
    }

    calculateOptimalSettlements(balances) {
        const settlements = [];
        const creditors = [];
        const debtors = [];

        // Separate creditors and debtors
        Object.entries(balances).forEach(([userId, balance]) => {
            if (balance.balance > 0.01) {
                creditors.push({ id: userId, name: balance.name, amount: balance.balance });
            } else if (balance.balance < -0.01) {
                debtors.push({ id: userId, name: balance.name, amount: Math.abs(balance.balance) });
            }
        });

        // Calculate optimal settlements
        let i = 0, j = 0;
        while (i < creditors.length && j < debtors.length) {
            const creditor = creditors[i];
            const debtor = debtors[j];
            const amount = Math.min(creditor.amount, debtor.amount);

            settlements.push({
                from: debtor.name,
                fromId: debtor.id,
                to: creditor.name,
                toId: creditor.id,
                amount: amount
            });

            creditor.amount -= amount;
            debtor.amount -= amount;

            if (creditor.amount < 0.01) i++;
            if (debtor.amount < 0.01) j++;
        }

        return settlements;
    }

    // Dashboard
    updateDashboard() {
        if (!this.currentGroup) {
            // Show empty state for dashboard
            document.getElementById('totalExpenses').textContent = '$0.00';
            document.getElementById('youOwe').textContent = '$0.00';
            document.getElementById('owedToYou').textContent = '$0.00';
            document.getElementById('netBalance').textContent = '$0.00';
            
            document.getElementById('recentExpenses').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No recent expenses. Select a group and add your first expense to get started!</p>
                </div>
            `;
            return;
        }

        const groupExpenses = this.expenses.filter(e => e.groupId === this.currentGroup.id);
        const balances = this.calculateBalances();
        const userBalance = balances[this.currentUser] || { paid: 0, owes: 0, balance: 0 };

        // Update dashboard cards
        const totalExpenses = groupExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('totalExpenses').textContent = this.formatCurrency(totalExpenses);
        
        const youOwe = Math.max(0, -userBalance.balance);
        document.getElementById('youOwe').textContent = this.formatCurrency(youOwe);
        
        const owedToYou = Math.max(0, userBalance.balance);
        document.getElementById('owedToYou').textContent = this.formatCurrency(owedToYou);
        
        document.getElementById('netBalance').textContent = this.formatCurrency(userBalance.balance);
        document.getElementById('netBalance').className = `card-value ${userBalance.balance >= 0 ? 'text-green' : 'text-red'}`;

        // Update recent expenses
        const recentExpenses = groupExpenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        if (recentExpenses.length === 0) {
            document.getElementById('recentExpenses').innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No recent expenses. Add your first expense to get started!</p>
                </div>
            `;
        } else {
            document.getElementById('recentExpenses').innerHTML = recentExpenses.map(expense => {
                const paidByMember = this.currentGroup.members.find(m => m.id === expense.paidBy);
                const userSplit = expense.splits.find(s => s.userId === this.currentUser);
                
                return `
                    <div class="activity-item">
                        <div class="expense-header">
                            <div class="expense-title">${expense.description}</div>
                            <div class="expense-amount">${this.formatCurrency(expense.amount)}</div>
                        </div>
                        <div class="expense-meta">
                            <span>Paid by ${paidByMember?.name || 'Unknown'}</span>
                            <span>Your share: ${this.formatCurrency(userSplit?.amount || 0)}</span>
                            <span>${this.formatDate(expense.date)}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // Settings Management
    updateSettingsForm() {
        document.getElementById('userName').value = this.settings.userName || '';
        document.getElementById('userEmail').value = this.settings.userEmail || '';
        document.getElementById('defaultCurrency').value = this.settings.currency || 'USD';
    }

    saveSettings() {
        this.settings.userName = document.getElementById('userName').value.trim();
        this.settings.userEmail = document.getElementById('userEmail').value.trim();
        this.settings.currency = document.getElementById('defaultCurrency').value;
        
        this.saveData();
        this.showNotification('Settings saved successfully!', 'success');
    }

    // Expense Actions
    editExpense(expenseId) {
        const expense = this.expenses.find(e => e.id === expenseId);
        if (!expense) return;

        // Switch to add expense section and populate form
        this.showSection('add-expense');
        
        document.getElementById('expenseDescription').value = expense.description;
        document.getElementById('expenseAmount').value = expense.amount;
        document.getElementById('expenseCategory').value = expense.category;
        document.getElementById('paidBy').value = expense.paidBy;
        
        // Set split method
        document.querySelector(`input[name="splitMethod"][value="${expense.splitMethod}"]`).checked = true;
        this.updateSplitDetails();
        
        // Populate split details based on method
        setTimeout(() => {
            if (expense.splitMethod === 'percentage') {
                expense.splits.forEach(split => {
                    const input = document.querySelector(`[data-member="${split.userId}"]`);
                    if (input) {
                        input.value = ((split.amount / expense.amount) * 100).toFixed(2);
                    }
                });
            } else if (expense.splitMethod === 'custom') {
                expense.splits.forEach(split => {
                    const input = document.querySelector(`[data-member="${split.userId}"]`);
                    if (input) {
                        input.value = split.amount.toFixed(2);
                    }
                });
            }
        }, 100);

        // Change form to edit mode
        const form = document.getElementById('expenseForm');
        form.dataset.editId = expenseId;
        form.querySelector('button[type="submit"]').textContent = 'Update Expense';
    }

    deleteExpense(expenseId) {
        if (confirm('Are you sure you want to delete this expense?')) {
            this.expenses = this.expenses.filter(e => e.id !== expenseId);
            this.saveData();
            this.updateExpensesList();
            this.updateDashboard();
            this.showNotification('Expense deleted successfully!', 'success');
        }
    }

    markAsPaid(expenseId) {
        const expense = this.expenses.find(e => e.id === expenseId);
        if (expense) {
            expense.isPaid = true;
            this.saveData();
            this.updateExpensesList();
            this.updateBalances();
            this.updateDashboard();
            this.showNotification('Expense marked as paid!', 'success');
        }
    }

    recordPayment(fromId, toId, amount) {
        // Create a settlement expense
        const fromMember = this.currentGroup.members.find(m => m.id === fromId);
        const toMember = this.currentGroup.members.find(m => m.id === toId);
        
        if (!fromMember || !toMember) return;

        const settlementExpense = {
            id: this.generateId(),
            groupId: this.currentGroup.id,
            description: `Settlement: ${fromMember.name} → ${toMember.name}`,
            amount: amount,
            category: 'other',
            paidBy: fromId,
            splitMethod: 'custom',
            splits: [
                { userId: fromId, amount: 0 },
                { userId: toId, amount: -amount }
            ],
            date: new Date().toISOString(),
            isPaid: true,
            isSettlement: true
        };

        this.expenses.push(settlementExpense);
        this.saveData();
        this.updateBalances();
        this.updateDashboard();
        this.showNotification('Payment recorded successfully!', 'success');
    }

    // Utility Functions
    formatCurrency(amount) {
        const currency = this.settings.currency || 'USD';
        const symbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥'
        };
        
        return `${symbols[currency] || '$'}${Math.abs(amount).toFixed(2)}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Today';
        } else if (diffDays === 2) {
            return 'Yesterday';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    getCategoryName(category) {
        const categories = {
            'food': 'Food & Dining',
            'transport': 'Transportation',
            'entertainment': 'Entertainment',
            'shopping': 'Shopping',
            'utilities': 'Utilities',
            'travel': 'Travel',
            'other': 'Other'
        };
        return categories[category] || 'Other';
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Theme Management
    initializeTheme() {
        this.applyTheme(this.currentTheme);
        this.updateThemeToggleIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateThemeToggleIcon();
        this.saveData();
        this.showNotification(`Switched to ${this.currentTheme} mode`, 'success');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateThemeToggleIcon() {
        const themeToggle = document.getElementById('themeToggle');
        const icon = themeToggle.querySelector('i');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to light mode';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to dark mode';
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SplitWiseApp();
});

// Add notification styles to CSS if not already present
if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            padding: 1rem;
            transform: translateX(400px);
            transition: transform 0.3s ease-in-out;
            z-index: 1001;
            min-width: 300px;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification-success {
            border-left: 4px solid var(--success-color);
        }

        .notification-error {
            border-left: 4px solid var(--danger-color);
        }

        .notification-info {
            border-left: 4px solid var(--primary-color);
        }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .notification-success .notification-content i {
            color: var(--success-color);
        }

        .notification-error .notification-content i {
            color: var(--danger-color);
        }

        .notification-info .notification-content i {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}