// src/app/(admin)/products/page.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faPen, faTrashCan, faMagnifyingGlass, faImage, faXmark, faSpinner, faTimes, faBoxOpen, faTag, faPalette
} from '@fortawesome/free-solid-svg-icons';
import { useAdminProducts } from '@/contexts/AdminProductContext';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

const TAGS = [
    { id: 'new_arrivals', label: 'New Arrivals' },
    { id: 'trending', label: 'Trending Now' },
    { id: 'latest', label: 'Latest' },
    { id: 'flash_sale', label: 'Flash Sale' }
];

export default function AdminProductsPage() {
    const { products, addProduct, updateProduct, deleteProduct, loading } = useAdminProducts();
    const [search, setSearch] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('basic');

    const [dbCategories, setDbCategories] = useState([]);
    const [dbBrands, setDbBrands] = useState([]);
    const [dbColors, setDbColors] = useState([]);
    const [dbSizes, setDbSizes] = useState([]);

    const [newColorName, setNewColorName] = useState('');
    const [newSize, setNewSize] = useState('');

    const [formData, setFormData] = useState({
        name: '', category: '', subcategory: '', brand: '',
        price: '', old_price: '', description: '',
        currency: '₦', stock: '100',
        colors: [], sizes: [], tags: [], image: '', subtitle: '',
    });

    const fetchData = async () => {
        const [cats, attrs] = await Promise.all([
            supabase.from('categories').select('*'),
            supabase.from('attributes').select('*')
        ]);

        if (cats.data) {
            const safeCategories = cats.data.map(c => {
                let subs = c.subcategories;
                if (typeof subs === 'string') {
                    try {
                        if (subs.startsWith('[') && subs.endsWith(']')) {
                            subs = JSON.parse(subs.replace(/'/g, '"'));
                        } else {
                            subs = subs.split(',').map(s => s.trim()).filter(Boolean);
                        }
                    } catch (e) { subs = []; }
                }
                if (!Array.isArray(subs)) subs = [];
                return { ...c, subcategories: subs };
            });
            setDbCategories(safeCategories);
        }

        if (attrs.data) {
            setDbBrands(attrs.data.filter(a => a.type === 'brand'));
            setDbColors(attrs.data.filter(a => a.type === 'color'));
            setDbSizes(attrs.data.filter(a => a.type === 'size'));
        }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <div className="flex h-[60vh] items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div></div>;

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenModal = (product = null) => {
        setActiveTab('basic');
        if (product) {
            setEditingId(product.id);
            setFormData({
                name: product.name,
                category: product.category || '',
                subcategory: product.subcategory || '',
                brand: product.brand || '',
                price: product.price,
                old_price: product.old_price || '',
                description: product.description || '',
                currency: '₦',
                stock: product.stock || 100,
                // Safely extract strings from old data, or keep as is
                colors: product.colors?.map(c => typeof c === 'string' ? c : (c.name || '')) || [],
                sizes: product.sizes || [],
                tags: product.tags || [],
                image: product.images?.[0] || product.image || '',
                subtitle: product.subtitle || '',
            });
        } else {
            setEditingId(null);
            setFormData({
                name: '', category: dbCategories[0]?.name || '', subcategory: '', brand: '',
                price: '', old_price: '', description: '',
                currency: '₦', stock: '100',
                colors: [], sizes: [], tags: [], image: '', subtitle: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const success = await deleteProduct(id);
            if (success) toast.success('Product deleted successfully');
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: uploadData });
            const data = await res.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, image: data.secure_url }));
                toast.success('Image uploaded successfully');
            }
        } catch (error) { toast.error('Error uploading image'); } finally { setIsUploading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return toast.error('Name and Price are required');
        if (!formData.category) return toast.error('Please select a category');

        const productPayload = {
            name: formData.name,
            category: formData.category,
            subcategory: formData.subcategory,
            brand: formData.brand,
            price: parseFloat(formData.price),
            old_price: formData.old_price ? parseFloat(formData.old_price) : null,
            description: formData.description,
            stock: parseInt(formData.stock) || 0,
            colors: formData.colors, // Save as simple array of strings e.g. ["Blue", "Red"]
            sizes: formData.sizes,
            tags: formData.tags,
            subtitle: formData.subtitle || `${formData.category} Item`,
            image: formData.image || '',
        };

        let success = false;
        if (editingId) success = await updateProduct(editingId, productPayload);
        else success = await addProduct(productPayload);

        if (success) {
            setIsModalOpen(false);
            toast.success(editingId ? 'Product updated!' : 'Product published!');
        }
    };

    const toggleArrayItem = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value) ? prev[field].filter(item => item !== value) : [...prev[field], value]
        }));
    };

    const handleAddNewColor = async () => {
        const finalColorName = newColorName.trim();
        if (!finalColorName) return;
        if (dbColors.some(c => c.value.toLowerCase() === finalColorName.toLowerCase())) return toast.error('Color already exists');

        const { data, error } = await supabase.from('attributes').insert([{ type: 'color', value: finalColorName }]).select().single();
        if (error) toast.error(error.message);
        else {
            setDbColors([...dbColors, data]);
            setFormData(prev => ({ ...prev, colors: [...prev.colors, finalColorName] }));
            setNewColorName('');
            toast.success('Color added!');
        }
    };

    const handleAddNewSize = async () => {
        if (!newSize.trim()) return;
        const sizeValue = newSize.trim();
        if (dbSizes.some(s => s.value.toLowerCase() === sizeValue.toLowerCase())) return toast.error('Size already exists');

        const { data, error } = await supabase.from('attributes').insert([{ type: 'size', value: sizeValue }]).select().single();
        if (error) toast.error(error.message);
        else {
            setDbSizes([...dbSizes, data]);
            setFormData(prev => ({ ...prev, sizes: [...prev.sizes, sizeValue] }));
            setNewSize('');
            toast.success('Size added!');
        }
    };

    const availableSubcategories = dbCategories.find(c => c.name === formData.category)?.subcategories || [];

    return (
        <div className="space-y-6 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[24px] font-bold text-gray-900">Products</h1>
                    <p className="text-[13px] text-gray-500 mt-1">Manage your store inventory.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold shadow-md shadow-red-500/25 transition-all">
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white text-[13px] outline-none transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-[#f8fafc] text-[11px] font-bold text-gray-500 uppercase tracking-wider text-left border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                                                <img src={product.images?.[0] || '/assets/images/products/image6.jpg'} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-[13px] font-semibold text-gray-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[13px] text-gray-600">
                                        {product.category}
                                        {product.subcategory && <span className="text-gray-400 text-[11px] block">{product.subcategory}</span>}
                                    </td>
                                    <td className="px-6 py-4 text-[13px] font-bold text-gray-900">₦{Number(product.price).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-[13px] text-gray-600">{product.stock || 0}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => handleOpenModal(product)} className="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-500 hover:text-orange-500 flex items-center justify-center transition-colors"><FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" /></button>
                                            <button onClick={() => handleDelete(product.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors"><FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PROFESSIONAL MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-200 shadow-2xl my-auto flex flex-col max-h-[90vh]">

                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white shrink-0 rounded-t-2xl">
                            <div>
                                <h3 className="text-[18px] font-bold text-gray-900">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                                <p className="text-[12px] text-gray-500 mt-0.5">Fill in the details below.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex border-b border-gray-100 px-6 shrink-0 bg-gray-50/50">
                            <button onClick={() => setActiveTab('basic')} className={`flex items-center gap-2 py-3 px-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'basic' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                                <FontAwesomeIcon icon={faBoxOpen} className="w-3.5 h-3.5" /> Basic Info
                            </button>
                            <button onClick={() => setActiveTab('pricing')} className={`flex items-center gap-2 py-3 px-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'pricing' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                                <FontAwesomeIcon icon={faTag} className="w-3.5 h-3.5" /> Pricing & Inventory
                            </button>
                            <button onClick={() => setActiveTab('variants')} className={`flex items-center gap-2 py-3 px-4 text-[13px] font-bold border-b-2 transition-colors ${activeTab === 'variants' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
                                <FontAwesomeIcon icon={faPalette} className="w-3.5 h-3.5" /> Variants
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
                            {activeTab === 'basic' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="flex flex-col sm:flex-row gap-6">
                                        <div onClick={() => fileInputRef.current?.click()} className="w-full sm:w-48 h-48 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-400 transition-colors flex flex-col items-center justify-center shrink-0 cursor-pointer overflow-hidden relative group">
                                            {formData.image ? (
                                                <>
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <FontAwesomeIcon icon={faPen} className="w-5 h-5 mb-2" />
                                                        <span className="text-[11px] font-bold uppercase tracking-wider">Change Image</span>
                                                    </div>
                                                </>
                                            ) : isUploading ? (
                                                <FontAwesomeIcon icon={faSpinner} className="w-8 h-8 text-red-500 animate-spin" />
                                            ) : (
                                                <>
                                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                                                        <FontAwesomeIcon icon={faImage} className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                    <span className="text-[12px] font-semibold text-gray-700">Upload Image</span>
                                                </>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Product Name</label>
                                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 text-[14px] outline-none transition-all" placeholder="e.g. Air Max 270" />
                                            </div>
                                            <div>
                                                <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Short Subtitle</label>
                                                <input type="text" value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 text-[14px] outline-none transition-all" placeholder="e.g. Men's Running Shoe" />
                                            </div>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Or paste URL:</span>
                                        <input type="text" placeholder="https://..." value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-[12px] outline-none focus:border-red-500" />
                                    </div>

                                    <hr className="border-gray-100" />

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Category</label>
                                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value, subcategory: '' })} className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-[14px] outline-none focus:border-red-500 focus:bg-white cursor-pointer transition-all">
                                                <option value="" disabled>Select Category</option>
                                                {dbCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Subcategory</label>
                                            <select value={formData.subcategory} onChange={e => setFormData({ ...formData, subcategory: e.target.value })} disabled={availableSubcategories.length === 0} className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-[14px] outline-none focus:border-red-500 focus:bg-white disabled:opacity-50 cursor-pointer transition-all">
                                                <option value="">None</option>
                                                {availableSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Brand</label>
                                            <select value={formData.brand} onChange={e => setFormData({ ...formData, brand: e.target.value })} className="w-full h-11 px-4 rounded-lg bg-gray-50 border border-gray-200 text-[14px] outline-none focus:border-red-500 focus:bg-white cursor-pointer transition-all">
                                                <option value="">None</option>
                                                {dbBrands.map(b => <option key={b.id} value={b.value}>{b.value}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-1.5">Product Description</label>
                                        <textarea rows="5" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-4 rounded-lg bg-gray-50 border border-gray-200 text-[14px] outline-none focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 transition-all" placeholder="Write a detailed description..." />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'pricing' && (
                                <div className="space-y-6 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">Selling Price (₦)</label>
                                            <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full h-12 px-4 rounded-lg bg-white border border-gray-200 focus:border-red-500 text-[16px] font-bold outline-none transition-all" placeholder="0.00" />
                                        </div>
                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                            <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">Old Price / Compare At</label>
                                            <input type="number" step="0.01" value={formData.old_price} onChange={e => setFormData({ ...formData, old_price: e.target.value })} className="w-full h-12 px-4 rounded-lg bg-white border border-gray-200 focus:border-red-500 text-[16px] text-gray-500 outline-none transition-all" placeholder="0.00" />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                        <label className="block text-[12px] font-bold text-gray-700 uppercase tracking-wide mb-2">Stock Quantity</label>
                                        <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full sm:w-1/2 h-12 px-4 rounded-lg bg-white border border-gray-200 focus:border-red-500 text-[16px] font-bold outline-none transition-all" placeholder="100" />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'variants' && (
                                <div className="space-y-8 animate-in fade-in duration-200">

                                    {/* COLORS */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[13px] font-bold text-gray-900 uppercase tracking-wide">Available Colors</label>
                                            <span className="text-[11px] text-gray-400">Click to apply/remove from this product</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5 mb-5 min-h-10">
                                            {dbColors.length === 0 && <span className="text-[13px] text-gray-400 italic">No colors created yet.</span>}
                                            {dbColors.map(color => {
                                                const isSelected = formData.colors.includes(color.value);
                                                return (
                                                    <button type="button" key={color.id} onClick={() => toggleArrayItem('colors', color.value)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${isSelected ? 'border-red-500 bg-red-50 text-red-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                                                        <span className="capitalize">{color.value}</span>
                                                        {isSelected && <FontAwesomeIcon icon={faTimes} className="w-3 h-3 ml-1 text-red-400 hover:text-red-600" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center gap-3">
                                            <input type="text" placeholder="New Color Name (e.g. Blue)" value={newColorName} onChange={e => setNewColorName(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-[13px] outline-none focus:border-red-500 focus:bg-white transition-all" />
                                            <button type="button" onClick={handleAddNewColor} className="h-10 px-5 bg-[#0f172a] hover:bg-black text-white rounded-lg text-[12px] font-bold uppercase tracking-wider transition-colors">Add</button>
                                        </div>
                                    </div>

                                    {/* SIZES */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <label className="text-[13px] font-bold text-gray-900 uppercase tracking-wide">Available Sizes</label>
                                            <span className="text-[11px] text-gray-400">Click to apply/remove from this product</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2.5 mb-5 min-h-10">
                                            {dbSizes.length === 0 && <span className="text-[13px] text-gray-400 italic">No sizes created yet.</span>}
                                            {dbSizes.map(size => {
                                                const isSelected = formData.sizes.includes(size.value);
                                                return (
                                                    <button type="button" key={size.id} onClick={() => toggleArrayItem('sizes', size.value)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${isSelected ? 'border-red-500 bg-red-50 text-red-700 shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                                                        {size.value}
                                                        {isSelected && <FontAwesomeIcon icon={faTimes} className="w-3 h-3 ml-1 text-red-400 hover:text-red-600" />}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center gap-3">
                                            <input type="text" placeholder="New Size (e.g. XL)" value={newSize} onChange={e => setNewSize(e.target.value)} className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-[13px] outline-none focus:border-red-500 focus:bg-white transition-all" />
                                            <button type="button" onClick={handleAddNewSize} className="h-10 px-5 bg-[#0f172a] hover:bg-black text-white rounded-lg text-[12px] font-bold uppercase tracking-wider transition-colors">Add</button>
                                        </div>
                                    </div>

                                    {/* TAGS */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <label className="block text-[13px] font-bold text-gray-900 uppercase tracking-wide mb-4">Product Placement (Tags)</label>
                                        <div className="flex flex-wrap gap-2.5">
                                            {TAGS.map(tag => (
                                                <button type="button" key={tag.id} onClick={() => toggleArrayItem('tags', tag.id)} className={`px-5 py-2.5 rounded-xl text-[13px] font-semibold border transition-all ${formData.tags.includes(tag.id) ? 'bg-gray-900 border-gray-900 text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>{tag.label}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex justify-end gap-3 shrink-0 rounded-b-2xl">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="h-10 px-5 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-100 bg-white transition-colors">Cancel</button>
                            <button type="button" onClick={handleSubmit} disabled={isUploading} className="h-10 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[13px] font-bold shadow-md shadow-red-500/25 disabled:opacity-50 transition-all">{editingId ? 'Save Changes' : 'Publish Product'}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}