// src/data/products.js

// ==========================================
// ALL PRODUCTS
// Each product has: id, name, category, subtitle, description,
// price, oldPrice, rating, reviews, images (array), colors, sizes, badge
// ==========================================
export const ALL_PRODUCTS = [
    {
        id: 1,
        name: 'Carl F. Bucherer',
        subtitle: "Men's Luxury Watch",
        description:
            'A timeless piece for the modern man. Swiss-engineered with precision movement and premium materials.',
        category: 'Watches',
        brand: 'Carl F. Bucherer',
        gender: 'women',
        color: 'Black',
        colors: ['Black', 'Silver', 'Brown'],
        sizes: ['38mm', '40mm', '42mm'],
        price: 1250,
        oldPrice: 1490,
        rating: 4.5,
        reviews: 128,
        images: [
            '/assets/images/products/watch1.jpg',
            '/assets/images/products/watch2.jpg',
            '/assets/images/products/watch3.jpg',
            '/assets/images/products/watch4.jpg',
        ],
        badge: 'New',
        inStock: true,
        sku: 'CFB-001',
        tags: ['Watch', 'Luxury', 'Classic'],
        info: {
            fabric: 'Stainless Steel',
            fit: 'Regular',
            features: ['Water Resistant', 'Sapphire Glass', 'Automatic Movement'],
        },
    },
    {
        id: 2,
        name: 'Swatch SYX0101',
        subtitle: 'Casual Timepiece',
        description:
            'Playful, bold, and reliable. A perfect everyday watch with a comfortable fit.',
        category: 'Watches',
        brand: 'Swatch',
        gender: 'women',
        color: 'White',
        colors: ['White', 'Black', 'Blue'],
        sizes: ['One Size'],
        price: 170,
        oldPrice: 220,
        rating: 4.3,
        reviews: 88,
        images: [
            '/assets/images/products/watch2.jpg',
            '/assets/images/products/watch3.jpg',
            '/assets/images/products/watch4.jpg',
        ],
        badge: '20%',
        inStock: true,
        sku: 'SWT-002',
        tags: ['Watch', 'Casual'],
        info: {
            fabric: 'Silicone Band',
            fit: 'Regular',
            features: ['Water Resistant', 'Quartz Movement'],
        },
    },
    {
        id: 3,
        name: 'Skagen SKW6500',
        subtitle: 'Minimalist Danish Design',
        description:
            'Clean lines, refined details. Scandinavian craftsmanship meets modern minimalism.',
        category: 'Watches',
        brand: 'Skagen',
        gender: 'women',
        color: 'Purple',
        colors: ['Purple', 'Silver', 'Rose Gold'],
        sizes: ['36mm', '40mm'],
        price: 170,
        oldPrice: null,
        rating: 4.6,
        reviews: 92,
        images: [
            '/assets/images/products/watch3.jpg',
            '/assets/images/products/watch4.jpg',
            '/assets/images/products/watch1.jpg',
        ],
        badge: null,
        inStock: true,
        sku: 'SKG-003',
        tags: ['Watch', 'Minimalist'],
        info: {
            fabric: 'Mesh Steel',
            fit: 'Slim',
            features: ['Water Resistant', 'Quartz'],
        },
    },
    {
        id: 4,
        name: 'Hugo 1530081',
        subtitle: "Men's Sport",
        description:
            'Built for action. Rugged design with a sporty edge and dependable precision.',
        category: 'Watches',
        brand: 'Hugo',
        gender: 'women',
        color: 'Grey',
        colors: ['Grey', 'Black', 'Blue'],
        sizes: ['42mm', '44mm'],
        price: 1250,
        oldPrice: null,
        rating: 4.4,
        reviews: 76,
        images: [
            '/assets/images/products/watch4.jpg',
            '/assets/images/products/watch5.jpg',
            '/assets/images/products/watch6.jpg',
        ],
        badge: null,
        inStock: true,
        sku: 'HGO-004',
        tags: ['Watch', 'Sport'],
        info: {
            fabric: 'Rubber Band',
            fit: 'Sport',
            features: ['Water Resistant 100m', 'Chronograph'],
        },
    },
    {
        id: 5,
        name: 'Hugo 15300621 Dave',
        subtitle: 'Bold & Modern',
        description:
            'A statement piece with an industrial edge. For the man who leads, not follows.',
        category: 'Watches',
        brand: 'Hugo',
        gender: 'men',
        color: 'Grey',
        colors: ['Grey', 'Black'],
        sizes: ['42mm', '44mm'],
        price: 1250,
        oldPrice: null,
        rating: 4.8,
        reviews: 102,
        images: [
            '/assets/images/products/watch5.jpg',
            '/assets/images/products/watch6.jpg',
        ],
        badge: 'Best Seller',
        inStock: true,
        sku: 'HGO-005',
        tags: ['Watch', 'Modern', 'Best Seller'],
        info: {
            fabric: 'Leather Band',
            fit: 'Regular',
            features: ['Automatic Movement', 'Sapphire Glass'],
        },
    },
    {
        id: 6,
        name: 'Casio AQ-230GA-9DMQY',
        subtitle: 'Classic Digital',
        description:
            'Iconic retro styling with modern reliability. The watch that never goes out of style.',
        category: 'Watches',
        brand: 'Casio',
        gender: 'men',
        color: 'White',
        colors: ['White', 'Silver'],
        sizes: ['One Size'],
        price: 1250,
        oldPrice: null,
        rating: 4.5,
        reviews: 156,
        images: [
            '/assets/images/products/watch6.jpg',
            '/assets/images/products/watch7.jpg',
        ],
        badge: null,
        inStock: true,
        sku: 'CSO-006',
        tags: ['Watch', 'Retro', 'Digital'],
        info: {
            fabric: 'Stainless Steel',
            fit: 'Regular',
            features: ['Digital Display', 'Alarm'],
        },
    },
    {
        id: 7,
        name: 'Fossil FS4735 Brown',
        subtitle: 'Leather Classic',
        description:
            'Warm brown leather meets timeless design. A companion for every occasion.',
        category: 'Watches',
        brand: 'Fossil',
        gender: 'women',
        color: 'Pink',
        colors: ['Brown', 'Tan', 'Black'],
        sizes: ['40mm', '42mm'],
        price: 1250,
        oldPrice: null,
        rating: 4.4,
        reviews: 89,
        images: [
            '/assets/images/products/watch7.jpg',
            '/assets/images/products/watch8.jpg',
        ],
        badge: null,
        inStock: true,
        sku: 'FSL-007',
        tags: ['Watch', 'Leather'],
        info: {
            fabric: 'Genuine Leather',
            fit: 'Regular',
            features: ['Chronograph', 'Water Resistant'],
        },
    },
    {
        id: 8,
        name: 'Lacoste 12.12 Bilbao',
        subtitle: 'Sporty Elegance',
        description:
            'French sport heritage meets everyday wear. The perfect balance of casual and refined.',
        category: 'Watches',
        brand: 'Lacoste',
        gender: 'men',
        color: 'Grey',
        colors: ['Grey', 'Navy', 'White'],
        sizes: ['42mm'],
        price: 1250,
        oldPrice: null,
        rating: 4.6,
        reviews: 68,
        images: [
            '/assets/images/products/watch8.jpg',
            '/assets/images/products/watch9.jpg',
        ],
        badge: null,
        inStock: true,
        sku: 'LCS-008',
        tags: ['Watch', 'Sport'],
        info: {
            fabric: 'Silicone',
            fit: 'Regular',
            features: ['Water Resistant', 'Quartz'],
        },
    },
];

// ==========================================
// HELPER: find product by ID
// ==========================================
export function getProductById(id) {
    const numericId = Number(id);
    return ALL_PRODUCTS.find((p) => p.id === numericId) || null;
}

// ==========================================
// HELPER: get related products (same category, excluding current)
// ==========================================
export function getRelatedProducts(id, limit = 4) {
    const numericId = Number(id);
    const current = getProductById(numericId);
    if (!current) return ALL_PRODUCTS.slice(0, limit);

    return ALL_PRODUCTS
        .filter((p) => p.id !== numericId && p.category === current.category)
        .slice(0, limit);
}