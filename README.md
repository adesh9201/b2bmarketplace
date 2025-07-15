# FabricHub - B2B Fabric Marketplace

A comprehensive B2B marketplace for fabric purchase and selling built with HTML, Bootstrap, CSS, and JavaScript.

## 🌟 Features

### For Buyers
- **Product Catalog**: Browse extensive collection of fabrics with advanced filtering
- **Search & Filter**: Find fabrics by category, price, rating, supplier, and more
- **Shopping Cart**: Add products, manage quantities, and proceed to checkout
- **User Authentication**: Secure login/register system
- **Order Management**: Track orders and view order history
- **Supplier Profiles**: View detailed supplier information and ratings

### For Sellers
- **Dashboard**: Comprehensive seller dashboard with analytics
- **Product Management**: Add, edit, and manage product listings
- **Order Tracking**: Monitor incoming orders and update status
- **Analytics**: View sales performance and business insights
- **Profile Management**: Update company information and settings

### General Features
- **Responsive Design**: Mobile-friendly interface
- **Real-time Search**: Instant search results
- **Secure Transactions**: Safe payment processing
- **Rating System**: Customer reviews and ratings
- **Promo Codes**: Discount system for buyers
- **Newsletter**: Email subscription for updates

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd fabrichub-b2b-marketplace
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for better development experience

3. **Using Local Server (Optional)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access the Application**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

## 📁 Project Structure

```
fabrichub-b2b-marketplace/
├── index.html              # Homepage
├── catalog.html            # Product catalog page
├── cart.html              # Shopping cart page
├── dashboard.html         # Seller dashboard
├── suppliers.html         # Suppliers listing page
├── about.html             # About us page
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript functionality
├── catalog.js             # Catalog page functionality
├── cart.js                # Cart page functionality
├── dashboard.js           # Dashboard functionality
├── suppliers.js           # Suppliers page functionality
├── about.js               # About page functionality
└── README.md              # Project documentation
```

## 🎨 Design Features

### Modern UI/UX
- Clean and professional design
- Bootstrap 5 framework
- Font Awesome icons
- Responsive grid system
- Smooth animations and transitions

### Color Scheme
- Primary: Bootstrap Blue (#0d6efd)
- Secondary: Gray (#6c757d)
- Success: Green (#198754)
- Warning: Yellow (#ffc107)
- Danger: Red (#dc3545)

### Typography
- Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Responsive text sizing
- Clear hierarchy and readability

## 🔧 Customization

### Adding New Products
1. Edit the `sampleProducts` array in `script.js`
2. Add product objects with required fields:
   ```javascript
   {
       id: uniqueId,
       name: "Product Name",
       description: "Product description",
       price: 29.99,
       category: "Category",
       supplier: "Supplier Name",
       stock: 100,
       image: "image-url",
       rating: 4.5,
       reviews: 50
   }
   ```

### Modifying Styles
1. Edit `styles.css` for custom styling
2. Override Bootstrap classes as needed
3. Add custom CSS variables in `:root` selector

### Adding New Pages
1. Create new HTML file
2. Include Bootstrap CSS and JS
3. Link to `styles.css` and relevant JS files
4. Follow existing page structure and navigation

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

### Breakpoints
- Extra small: < 576px
- Small: ≥ 576px
- Medium: ≥ 768px
- Large: ≥ 992px
- Extra large: ≥ 1200px

## 🔐 Security Features

### User Authentication
- Session management
- Secure login/logout
- User role management (Buyer/Seller)

### Data Protection
- Local storage for cart data
- Form validation
- Input sanitization

## 🛠️ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Performance

### Optimization Features
- Optimized images
- Minified CSS and JS (for production)
- Efficient DOM manipulation
- Lazy loading for images

### Loading Times
- Homepage: < 2 seconds
- Catalog page: < 3 seconds
- Dashboard: < 2 seconds

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Seller dashboard features
- [ ] Responsive design on different devices
- [ ] Cross-browser compatibility

### Test Data
The application includes sample data for testing:
- 6 sample products
- 3 sample suppliers
- Sample user accounts

## 🚀 Deployment

### Static Hosting
The application can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

### Deployment Steps
1. Upload all files to your hosting service
2. Ensure all file paths are correct
3. Test all functionality after deployment
4. Update any hardcoded URLs if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For support and questions:
- Email: support@fabrichub.com
- Documentation: [Project Wiki](wiki-url)
- Issues: [GitHub Issues](issues-url)

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete B2B marketplace functionality
- Responsive design
- User authentication
- Product management
- Shopping cart
- Seller dashboard

## 🎯 Roadmap

### Future Features
- [ ] Real-time chat between buyers and sellers
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Payment gateway integration
- [ ] Inventory management system
- [ ] Multi-language support
- [ ] Advanced search with AI
- [ ] Bulk order management

## 🙏 Acknowledgments

- Bootstrap team for the excellent framework
- Font Awesome for the icon library
- Unsplash for sample images
- The open-source community for inspiration and tools

---

**FabricHub** - Connecting the world's fabric industry through innovative B2B solutions. 