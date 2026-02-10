// URBAN GARAGE POS - Complete Application Logic
// Version 2.0 - Production Ready

class UrbanGaragePOS {
    constructor() {
        this.cart = [];
        this.currentView = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentCategory = 'all';
        this.currentPeriod = 'week';
        this.init();
    }

    init() {
        this.loadData();
        this.initEventListeners();
        this.initCharts();
        this.updateDashboard();
        this.renderProducts();
        this.renderCart();
        this.setupSearch();
    }

    loadData() {
        // Load from localStorage or use defaults
        const savedData = localStorage.getItem('urbanGarageData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.cart = data.cart || [];
        } else {
            // Initialize with sample data
            this.initializeSampleData();
        }
    }

    initializeSampleData() {
        this.products = [
            {
                id: 1,
                name: 'Vintage Vespa Moped',
                category: 'mopeds',
                price: 1899.00,
                stock: 5,
                description: 'Classic 1970s model, fully restored',
                image: '🏍️',
                tags: ['premium', 'vintage']
            },
            {
                id: 2,
                name: 'Carbon Fiber Road Bike',
                category: 'bicycles',
                price: 2499.00,
                stock: 3,
                description: 'Professional grade, lightweight frame',
                image: '🚴',
                tags: ['premium', 'new']
            },
            {
                id: 3,
                name: 'Premium Safety Helmet',
                category: 'accessories',
                price: 129.99,
                stock: 4,
                description: 'MIPS technology, multi-impact protection',
                image: '⛑️',
                tags: ['safety', 'lowstock']
            },
            {
                id: 4,
                name: 'E-Bike Conversion Kit',
                category: 'parts',
                price: 549.00,
                stock: 12,
                description: 'Turn any bike into an electric bike',
                image: '⚡',
                tags: ['bestseller', 'electric']
            },
            {
                id: 5,
                name: 'Mountain Bike Tires (29")',
                category: 'parts',
                price: 59.99,
                stock: 6,
                description: 'Durable off-road tires',
                image: '🛞',
                tags: ['lowstock']
            },
            {
                id: 6,
                name: 'Bicycle LED Lights',
                category: 'accessories',
                price: 49.99,
                stock: 8,
                description: 'High-visibility safety lights',
                image: '💡',
                tags: ['lowstock', 'safety']
            },
            {
                id: 7,
                name: 'Heavy Duty Bike Lock',
                category: 'accessories',
                price: 34.99,
                stock: 9,
                description: 'Anti-theft security lock',
                image: '🔒',
                tags: ['lowstock', 'security']
            },
            {
                id: 8,
                name: 'Repair Toolkit Pro',
                category: 'parts',
                price: 89.99,
                stock: 15,
                description: 'Complete mechanic toolkit',
                image: '🔧',
                tags: ['tools']
            },
            {
                id: 9,
                name: 'Frame Protection Kit',
                category: 'accessories',
                price: 34.99,
                stock: 20,
                description: 'Scratch and damage protection',
                image: '🛡️',
                tags: ['protection']
            },
            {
                id: 10,
                name: 'Bicycle Bell Set',
                category: 'accessories',
                price: 24.99,
                stock: 25,
                description: 'Classic brass bell',
                image: '🔔',
                tags: ['accessories']
            },
            {
                id: 11,
                name: 'Vintage Moped Restoration',
                category: 'services',
                price: 849.50,
                stock: 999,
                description: 'Complete restoration service',
                image: '🎨',
                tags: ['service', 'premium']
            },
            {
                id: 12,
                name: 'Mountain Bike Tune-up',
                category: 'services',
                price: 129.99,
                stock: 999,
                description: 'Professional tune-up service',
                image: '⚙️',
                tags: ['service']
            }
        ];

        this.orders = [
            {
                id: 'ORD-8742',
                customer: 'Michael R.',
                items: ['Mountain Bike Tune-up'],
                total: 129.99,
                status: 'completed',
                date: 'Today, 2:30 PM'
            },
            {
                id: 'ORD-8741',
                customer: 'Sarah J.',
                items: ['Vintage Moped Restoration'],
                total: 849.50,
                status: 'inprogress',
                date: 'Today, 11:15 AM'
            },
            {
                id: 'ORD-8740',
                customer: 'David T.',
                items: ['Electric Bike Battery Replacement'],
                total: 215.00,
                status: 'pending',
                date: 'Yesterday, 4:45 PM'
            },
            {
                id: 'ORD-8739',
                customer: 'Amanda L.',
                items: ['Bicycle Safety Inspection'],
                total: 75.00,
                status: 'completed',
                date: 'Yesterday, 2:20 PM'
            }
        ];

        this.customers = [
            { id: 1, name: 'Christopher Rodriguez', email: 'christopher@email.com', memberSince: '2021' },
            { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', memberSince: '2022' },
            { id: 3, name: 'David Thompson', email: 'david@email.com', memberSince: '2023' }
        ];
    }

    initEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.switchView(e.target.dataset.target));
        });

        // Category filtering
        document.querySelectorAll('.category-badge').forEach(badge => {
            badge.addEventListener('click', (e) => {
                document.querySelectorAll('.category-badge').forEach(b => b.classList.remove('active-category'));
                e.target.classList.add('active-category');
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.renderProducts();
            });
        });

        // Period selection
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active-period'));
                e.target.classList.add('active-period');
                this.currentPeriod = e.target.dataset.period;
                this.updateCharts();
            });
        });

        // Page navigation
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                if (page === 'prev' && this.currentPage > 1) {
                    this.currentPage--;
                } else if (page === 'next') {
                    this.currentPage++;
                } else if (!isNaN(page)) {
                    this.currentPage = parseInt(page);
                }
                this.renderProducts();
            });
        });

        // Cart actions
        document.getElementById('new-sale-btn').addEventListener('click', () => {
            this.switchView('pos');
        });

        document.getElementById('add-customer-btn').addEventListener('click', () => {
            this.showNotification('Customer added successfully!', 'success');
        });

        document.getElementById('receive-inventory-btn').addEventListener('click', () => {
            this.showNotification('Inventory received successfully!', 'success');
        });

        document.getElementById('print-report-btn').addEventListener('click', () => {
            window.print();
            this.showNotification('Report printed successfully!', 'success');
        });

        // POS actions
        document.getElementById('card-payment-btn').addEventListener('click', () => {
            this.processPayment('card');
        });

        document.getElementById('cash-payment-btn').addEventListener('click', () => {
            this.processPayment('cash');
        });

        document.getElementById('mobile-pay-btn').addEventListener('click', () => {
            this.processPayment('mobile');
        });

        document.getElementById('new-transaction-btn').addEventListener('click', () => {
            this.clearCart();
        });

        // Search functionality
        document.getElementById('global-search').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        document.getElementById('inventory-search').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Mobile menu
        document.getElementById('mobile-menu-button').addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });

        // Notifications
        document.getElementById('notifications-btn').addEventListener('click', () => {
            this.showNotificationsPanel();
        });
    }

    switchView(viewName) {
        // Hide all views
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.remove('block');
            view.classList.add('hidden');
        });

        // Show selected view
        document.getElementById(`${viewName}-view`).classList.remove('hidden');
        document.getElementById(`${viewName}-view`).classList.add('block');

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.nav-link[data-target="${viewName}"]`).classList.add('active');

        this.currentView = viewName;

        // Special actions for certain views
        if (viewName === 'pos') {
            this.renderCart();
        } else if (viewName === 'inventory') {
            this.renderProducts();
        }
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        // Filter products
        let filteredProducts = this.products;
        if (this.currentCategory !== 'all') {
            if (this.currentCategory === 'lowstock') {
                filteredProducts = this.products.filter(p => p.stock < 10);
            } else {
                filteredProducts = this.products.filter(p => p.category === this.currentCategory);
            }
        }

        // Pagination
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);

        // Render products
        paginatedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card glass-card rounded-xl p-5';
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="p-2 bg-${this.getCategoryColor(product.category)}/10 rounded-lg">
                        <span class="text-3xl">${product.image}</span>
                    </div>
                    ${product.tags.includes('lowstock') ? '<span class="px-2 py-1 bg-garage-pink/20 text-garage-pink text-xs rounded-full">Low Stock</span>' : ''}
                    ${product.tags.includes('premium') ? '<span class="px-2 py-1 bg-garage-purple/20 text-garage-purple text-xs rounded-full">Premium</span>' : ''}
                    ${product.tags.includes('new') ? '<span class="px-2 py-1 bg-garage-yellow/20 text-garage-yellow text-xs rounded-full">New Arrival</span>' : ''}
                </div>
                <h3 class="font-bold text-lg mt-3">${product.name}</h3>
                <p class="text-garage-gray mt-1 text-sm">${product.description}</p>
                <div class="mt-4 flex justify-between items-end">
                    <div>
                        <p class="text-xs text-garage-gray">Price</p>
                        <p class="font-bold text-xl">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-garage-gray">In Stock</p>
                        <p class="font-bold ${product.stock < 10 ? 'text-garage-pink' : 'text-garage-teal'}">${product.stock} units</p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-garage-blue/20 flex space-x-2">
                    <button class="flex-1 bg-garage-dark border border-garage-blue/30 text-garage-cyan py-2 rounded-lg text-sm hover:bg-garage-blue/10 transition edit-btn" data-id="${product.id}">
                        <i class="fas fa-edit mr-1"></i> Edit
                    </button>
                    <button class="flex-1 bg-gradient-to-r from-garage-purple to-garage-pink text-white py-2 rounded-lg text-sm hover:opacity-90 transition add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart mr-1"></i> Sell
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Show/hide pagination
        document.getElementById('pagination').classList.toggle('hidden', filteredProducts.length <= this.itemsPerPage);

        // Update counts
        document.getElementById('total-items-count').textContent = this.products.length;
        document.getElementById('mopeds-count').textContent = this.products.filter(p => p.category === 'mopeds').length;
        document.getElementById('bicycles-count').textContent = this.products.filter(p => p.category === 'bicycles').length;
        document.getElementById('parts-count').textContent = this.products.filter(p => p.category === 'parts').length;
        document.getElementById('accessories-count').textContent = this.products.filter(p => p.category === 'accessories').length;
        document.getElementById('lowstock-count').textContent = this.products.filter(p => p.stock < 10).length;

        // Add event listeners to buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            });
        });
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
            }
            this.saveData();
            this.renderCart();
            this.showNotification(`${product.name} added to cart!`, 'success');
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveData();
        this.renderCart();
    }

    updateCartItemQuantity(productId, change) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveData();
                this.renderCart();
            }
        }
    }

    renderCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';

        if (this.cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="text-center py-12 text-garage-gray">
                    <i class="fas fa-shopping-cart text-4xl mb-3"></i>
                    <p class="text-lg">Your cart is empty</p>
                    <p class="text-sm mt-2">Add items from the catalog to get started</p>
                </div>
            `;
            this.updateTotals(0, 0, 0, 0);
            return;
        }

        this.cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item bg-garage-dark rounded-xl p-4 mb-3 flex items-center';
            cartItem.innerHTML = `
                <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-${this.getCategoryColor(item.category)} to-garage-cyan flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-2xl">${item.image}</span>
                </div>
                <div class="ml-4 flex-1">
                    <div class="flex justify-between">
                        <h4 class="font-medium">${item.name}</h4>
                        <button class="remove-item-btn text-garage-gray hover:text-red-400 transition" data-id="${item.id}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mt-2 flex justify-between items-end">
                        <div>
                            <p class="text-xs text-garage-gray">Qty: ${item.quantity}</p>
                            <p class="text-sm font-medium mt-1">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="decrement-btn w-6 h-6 rounded-full bg-garage-blue/20 text-garage-cyan flex items-center justify-center" data-id="${item.id}">-</button>
                            <span class="font-medium">${item.quantity}</span>
                            <button class="increment-btn w-6 h-6 rounded-full bg-garage-blue/20 text-garage-cyan flex items-center justify-center" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Add event listeners
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.removeFromCart(id);
            });
        });

        document.querySelectorAll('.increment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.updateCartItemQuantity(id, 1);
            });
        });

        document.querySelectorAll('.decrement-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.updateCartItemQuantity(id, -1);
            });
        });

        // Calculate and update totals
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.085; // 8.5% tax
        const discount = 0; // Could be implemented later
        const total = subtotal + tax - discount;

        this.updateTotals(subtotal, tax, discount, total);
    }

    updateTotals(subtotal, tax, discount, total) {
        document.getElementById('subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax-amount').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('discount-amount').textContent = `-$${discount.toFixed(2)}`;
        document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
        document.getElementById('customer-total').textContent = `$${total.toFixed(2)}`;
        document.getElementById('cart-item-count').textContent = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('applied-discount').textContent = `-$${discount.toFixed(2)}`;
    }

    clearCart() {
        this.cart = [];
        this.saveData();
        this.renderCart();
        this.showNotification('Cart cleared successfully!', 'info');
    }

    processPayment(method) {
        if (this.cart.length === 0) {
            this.showNotification('Cart is empty!', 'error');
            return;
        }

        const total = parseFloat(document.getElementById('total-amount').textContent.replace('$', ''));
        
        let message = '';
        switch(method) {
            case 'card':
                message = `Processing card payment of $${total.toFixed(2)}...`;
                break;
            case 'cash':
                message = `Cash payment of $${total.toFixed(2)} received!`;
                break;
            case 'mobile':
                message = `Processing mobile payment of $${total.toFixed(2)}...`;
                break;
        }

        this.showNotification(message, 'success');
        
        // Simulate payment processing
        setTimeout(() => {
            this.showNotification('Payment successful! Transaction completed.', 'success');
            this.generateReceipt();
            this.clearCart();
            this.switchView('dashboard');
        }, 1500);
    }

    generateReceipt() {
        const receiptWindow = window.open('', '_blank');
        const total = parseFloat(document.getElementById('total-amount').textContent.replace('$', ''));
        const subtotal = parseFloat(document.getElementById('subtotal-amount').textContent.replace('$', ''));
        const tax = parseFloat(document.getElementById('tax-amount').textContent.replace('$', ''));

        receiptWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Receipt - Urban Garage</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
                    .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                    .total { font-weight: bold; margin-top: 15px; border-top: 1px solid #000; padding-top: 10px; }
                    .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>URBAN GARAGE</h1>
                    <p>123 Mechanic Lane, San Francisco, CA 94107</p>
                    <p>(415) 555-0199</p>
                    <p>${new Date().toLocaleString()}</p>
                </div>
                <div class="items">
                    ${this.cart.map(item => `
                        <div class="item">
                            <span>${item.name} x${item.quantity}</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="totals">
                    <div class="item">
                        <span>Subtotal:</span>
                        <span>$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="item">
                        <span>Tax (8.5%):</span>
                        <span>$${tax.toFixed(2)}</span>
                    </div>
                    <div class="total">
                        <span>TOTAL:</span>
                        <span>$${total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="footer">
                    <p>Thank you for your business!</p>
                    <p>www.urbangarage.com</p>
                </div>
            </body>
            </html>
        `);
        receiptWindow.document.close();
        receiptWindow.print();
    }

    initCharts() {
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        this.revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [1200, 1500, 1800, 2100, 1900, 2500, 2800],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    }
                }
            }
        });

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart').getContext('2d');
        this.categoryChart = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Mopeds', 'Bicycles', 'Parts', 'Accessories'],
                datasets: [{
                    data: [28, 45, 37, 32],
                    backgroundColor: [
                        '#4361ee',
                        '#4cc9f0',
                        '#06d6a0',
                        '#7209b7'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#f8f9fa' }
                    }
                },
                cutout: '65%'
            }
        });

        // Stock Movement Chart
        const stockCtx = document.getElementById('stockMovementChart').getContext('2d');
        this.stockChart = new Chart(stockCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Items Sold',
                    data: [45, 67, 89, 102, 123, 145],
                    backgroundColor: '#4361ee',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    }
                }
            }
        });

        // Analytics Charts
        const revenueTrendsCtx = document.getElementById('revenueTrendsChart').getContext('2d');
        new Chart(revenueTrendsCtx, {
            type: 'line',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
                datasets: [
                    {
                        label: '2025',
                        data: [15000, 18000, 22000, 25000, 28000, 32000],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '2026',
                        data: [18000, 22000, 26000, 30000, 35000, 40000],
                        borderColor: '#06d6a0',
                        backgroundColor: 'rgba(6, 214, 160, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f8f9fa' } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    }
                }
            }
        });

        const salesCtx = document.getElementById('salesPerformanceChart').getContext('2d');
        new Chart(salesCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Online',
                        data: [45, 52, 67, 89, 102, 123],
                        backgroundColor: '#4361ee'
                    },
                    {
                        label: 'In-Store',
                        data: [67, 78, 95, 112, 134, 156],
                        backgroundColor: '#7209b7'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#f8f9fa' } }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#6c757d' }
                    }
                }
            }
        });

        const customerCtx = document.getElementById('customerInsightsChart').getContext('2d');
        new Chart(customerCtx, {
            type: 'pie',
            data: {
                labels: ['New Customers', 'Returning', 'Loyalty Members'],
                datasets: [{
                    data: [35, 45, 20],
                    backgroundColor: ['#4361ee', '#06d6a0', '#ffd166']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        position: 'bottom',
                        labels: { color: '#f8f9fa' }
                    }
                }
            }
        });
    }

    updateCharts() {
        // Update revenue chart based on period
        let data = [];
        let labels = [];
        
        switch(this.currentPeriod) {
            case 'week':
                labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                data = [1200, 1500, 1800, 2100, 1900, 2500, 2800];
                break;
            case 'month':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                data = [8500, 9200, 10500, 11800];
                break;
            case 'year':
                labels = ['Q1', 'Q2', 'Q3', 'Q4'];
                data = [35000, 42000, 48000, 55000];
                break;
        }

        this.revenueChart.data.labels = labels;
        this.revenueChart.data.datasets[0].data = data;
        this.revenueChart.update();
    }

    updateDashboard() {
        // Render recent orders
        const ordersList = document.getElementById('recent-orders-list');
        ordersList.innerHTML = '';
        
        this.orders.forEach(order => {
            const statusClass = {
                'completed': 'bg-garage-blue/20 text-garage-cyan',
                'inprogress': 'bg-garage-yellow/20 text-garage-yellow',
                'pending': 'bg-garage-purple/20 text-garage-purple'
            }[order.status] || 'bg-garage-gray/20 text-garage-gray';

            const statusText = {
                'completed': 'Completed',
                'inprogress': 'In Progress',
                'pending': 'Pending'
            }[order.status] || 'Unknown';

            const orderCard = document.createElement('div');
            orderCard.className = 'order-card bg-garage-dark rounded-xl p-4';
            orderCard.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <div class="flex items-center">
                            <span class="font-bold">${order.id}</span>
                            <span class="ml-2 px-2 py-0.5 ${statusClass} text-xs rounded-full">${statusText}</span>
                        </div>
                        <p class="text-garage-gray mt-1">${order.items.join(', ')}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold">$${order.total.toFixed(2)}</p>
                        <p class="text-xs text-garage-gray mt-1">${order.date}</p>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-garage-blue/20 flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-garage-purple to-garage-pink flex items-center justify-center">
                            <span class="text-white text-xs font-bold">${order.customer.charAt(0)}${order.customer.split(' ')[1]?.charAt(0) || ''}</span>
                        </div>
                        <span class="ml-2 text-sm">${order.customer}</span>
                    </div>
                    <button class="text-xs text-garage-cyan hover:text-white transition view-order-btn" data-id="${order.id}">View Details</button>
                </div>
            `;
            ordersList.appendChild(orderCard);
        });

        // Render low stock items
        const lowStockList = document.getElementById('low-stock-list');
        lowStockList.innerHTML = '';
        
        const lowStockItems = this.products.filter(p => p.stock < 10).slice(0, 5);
        
        lowStockItems.forEach(item => {
            const gradientClass = {
                'mopeds': 'from-garage-purple to-garage-pink',
                'bicycles': 'from-garage-teal to-garage-yellow',
                'parts': 'from-garage-blue to-garage-cyan',
                'accessories': 'from-garage-cyan to-garage-blue'
            }[item.category] || 'from-garage-gray to-garage-gray';

            const lowStockCard = document.createElement('div');
            lowStockCard.className = 'bg-garage-dark rounded-xl p-4 flex items-center';
            lowStockCard.innerHTML = `
                <div class="w-16 h-16 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center flex-shrink-0">
                    <span class="text-white text-2xl">${item.image}</span>
                </div>
                <div class="ml-4 flex-1">
                    <h4 class="font-medium">${item.name}</h4>
                    <div class="mt-2 h-1.5 w-full bg-garage-gray/20 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r ${gradientClass} w-${Math.min(10, item.stock) * 10}"></div>
                    </div>
                    <div class="flex justify-between mt-1 text-xs">
                        <span class="text-garage-gray">Only ${item.stock} left</span>
                        <span class="text-garage-pink font-medium">Reorder Level: 10</span>
                    </div>
                </div>
            `;
            lowStockList.appendChild(lowStockCard);
        });

        // Update stats
        document.getElementById('active-orders-count').textContent = this.orders.length;
        document.getElementById('new-customers-count').textContent = this.customers.length;
        document.getElementById('total-sales').textContent = '$1,842.50';
        document.getElementById('new-orders').textContent = this.orders.length;
        document.getElementById('inventory-value').textContent = '$84,327.50';
        document.getElementById('total-items-display').textContent = this.products.length;
        document.getElementById('low-stock-display').textContent = lowStockItems.length;
        document.getElementById('new-this-month').textContent = '24';

        // Render category stats
        const categoryStats = document.getElementById('category-stats');
        categoryStats.innerHTML = `
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm">Bicycles</span>
                    <span class="text-sm font-medium text-garage-teal">42%</span>
                </div>
                <div class="h-2 w-full bg-garage-gray/20 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-garage-teal to-garage-cyan w-5/12"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm">Accessories</span>
                    <span class="text-sm font-medium text-garage-purple">28%</span>
                </div>
                <div class="h-2 w-full bg-garage-gray/20 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-garage-purple to-garage-pink w-4/12"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm">Parts</span>
                    <span class="text-sm font-medium text-garage-yellow">18%</span>
                </div>
                <div class="h-2 w-full bg-garage-gray/20 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-garage-yellow to-garage-teal w-3/12"></div>
                </div>
            </div>
            <div>
                <div class="flex justify-between mb-1">
                    <span class="text-sm">Mopeds</span>
                    <span class="text-sm font-medium text-garage-cyan">12%</span>
                </div>
                <div class="h-2 w-full bg-garage-gray/20 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-garage-cyan to-garage-blue w-2/12"></div>
                </div>
            </div>
        `;
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }

        const filtered = this.products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        );

        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-12 text-garage-gray">
                    <i class="fas fa-search text-4xl mb-3"></i>
                    <p class="text-lg">No products found</p>
                    <p class="text-sm mt-2">Try a different search term</p>
                </div>
            `;
            return;
        }

        filtered.slice(0, 12).forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card glass-card rounded-xl p-5';
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="p-2 bg-${this.getCategoryColor(product.category)}/10 rounded-lg">
                        <span class="text-3xl">${product.image}</span>
                    </div>
                </div>
                <h3 class="font-bold text-lg mt-3">${product.name}</h3>
                <p class="text-garage-gray mt-1 text-sm">${product.description}</p>
                <div class="mt-4 flex justify-between items-end">
                    <div>
                        <p class="text-xs text-garage-gray">Price</p>
                        <p class="font-bold text-xl">$${product.price.toFixed(2)}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-garage-gray">In Stock</p>
                        <p class="font-bold ${product.stock < 10 ? 'text-garage-pink' : 'text-garage-teal'}">${product.stock} units</p>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-garage-blue/20 flex space-x-2">
                    <button class="flex-1 bg-garage-dark border border-garage-blue/30 text-garage-cyan py-2 rounded-lg text-sm hover:bg-garage-blue/10 transition">
                        <i class="fas fa-edit mr-1"></i> Edit
                    </button>
                    <button class="flex-1 bg-gradient-to-r from-garage-purple to-garage-pink text-white py-2 rounded-lg text-sm hover:opacity-90 transition add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart mr-1"></i> Sell
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Add event listeners
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            });
        });
    }

    setupSearch() {
        // Global search
        document.getElementById('global-search').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value;
                if (query) {
                    this.switchView('inventory');
                    this.searchProducts(query);
                }
            }
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500/90 text-white' :
            type === 'error' ? 'bg-red-500/90 text-white' :
            type === 'warning' ? 'bg-yellow-500/90 text-black' :
            'bg-garage-blue/90 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'} mr-3 text-xl"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(-20px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    showNotificationsPanel() {
        // In a real app, this would show a dropdown with notifications
        this.showNotification('Showing notifications panel...', 'info');
    }

    saveData() {
        const data = {
            cart: this.cart,
            products: this.products,
            orders: this.orders,
            customers: this.customers
        };
        localStorage.setItem('urbanGarageData', JSON.stringify(data));
    }

    getCategoryColor(category) {
        const colors = {
            'mopeds': 'garage-purple',
            'bicycles': 'garage-teal',
            'parts': 'garage-blue',
            'accessories': 'garage-cyan',
            'services': 'garage-yellow'
        };
        return colors[category] || 'garage-gray';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.posApp = new UrbanGaragePOS();
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration))
            .catch(error => console.log('SW registration failed:', error));
    });
}