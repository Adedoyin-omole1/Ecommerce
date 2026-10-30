// src/app/(admin)/products/categories/page.js
'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faPen, faTrashCan, faImage, faXmark, faSpinner,
    faTag, faTimes, faList
} from '@fortawesome/free-solid-svg-icons';

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        subcategories: [],
    });
    const [subInput, setSubInput] = useState('');

    // Fetch Categories
    const fetchCategories = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            toast.error('Failed to load categories');
        } else {
            // ✅ ROBUST PARSING: Handle arrays, JSON strings, and comma-separated strings safely
            const safeData = data.map(cat => {
                let subs = cat.subcategories;

                if (typeof subs === 'string') {
                    try {
                        // If it's a JSON string like "['Shoes']" or '["Shoes"]'
                        if (subs.startsWith('[') && subs.endsWith(']')) {
                            // Replace single quotes with double quotes to parse valid JSON
                            subs = JSON.parse(subs.replace(/'/g, '"'));
                        } else {
                            // If it's just a comma-separated string
                            subs = subs.split(',').map(s => s.trim()).filter(Boolean);
                        }
                    } catch (e) {
                        // If parsing fails, just empty it
                        subs = [];
                    }
                }

                // If it's still not an array after parsing, default to empty array
                if (!Array.isArray(subs)) {
                    subs = [];
                }

                return { ...cat, subcategories: subs };
            });
            setCategories(safeData || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Open Modal
    const handleOpenModal = (cat = null) => {
        if (cat) {
            setEditingId(cat.id);
            setFormData({
                name: cat.name,
                image: cat.image_url || '',
                subcategories: Array.isArray(cat.subcategories) ? cat.subcategories : [],
            });
        } else {
            setEditingId(null);
            setFormData({ name: '', image: '', subcategories: [] });
        }
        setIsModalOpen(true);
    };

    // Image Upload (Cloudinary)
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: 'POST', body: uploadData }
            );
            const data = await res.json();
            if (data.secure_url) {
                setFormData((prev) => ({ ...prev, image: data.secure_url }));
                toast.success('Image uploaded');
            }
        } catch (error) {
            toast.error('Error uploading image');
        } finally {
            setIsUploading(false);
        }
    };

    // Add Subcategory to local state
    const handleAddSub = () => {
        if (subInput.trim() && !formData.subcategories.includes(subInput.trim())) {
            setFormData(prev => ({
                ...prev,
                subcategories: [...prev.subcategories, subInput.trim()]
            }));
            setSubInput('');
        }
    };

    // Remove Subcategory
    const handleRemoveSub = (subToRemove) => {
        setFormData(prev => ({
            ...prev,
            subcategories: prev.subcategories.filter(sub => sub !== subToRemove)
        }));
    };

    // Submit Category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) return toast.error('Category name is required');

        // Force the subcategories to be a clean array of strings
        const cleanSubcategories = formData.subcategories.map(s => String(s).trim()).filter(Boolean);

        const payload = {
            name: formData.name,
            image_url: formData.image,
            subcategories: cleanSubcategories,
        };

        let error;
        if (editingId) {
            const { error: updateError } = await supabase.from('categories').update(payload).eq('id', editingId);
            error = updateError;
        } else {
            const { error: insertError } = await supabase.from('categories').insert([payload]);
            error = insertError;
        }

        if (error) {
            console.error(error);
            toast.error(error.message);
        } else {
            toast.success(editingId ? 'Category updated!' : 'Category created!');
            setIsModalOpen(false);
            fetchCategories();
        }
    };

    // Delete Category
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will not delete products inside it, but they may lose their category.')) return;
        const { error } = await supabase.from('categories').delete().eq('id', id);
        if (error) toast.error(error.message);
        else {
            toast.success('Category deleted');
            fetchCategories();
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-[24px] font-bold text-gray-900">Categories</h1>
                    <p className="text-[13px] text-gray-500 mt-1">Manage your store's categories and subcategories.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold shadow-md transition-all">
                    <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Add Category
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead className="bg-[#f8fafc] text-[11px] font-bold text-gray-500 uppercase tracking-wider text-left border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Subcategories</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                <tr><td colSpan={3} className="text-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500 mx-auto"></div></td></tr>
                            ) : categories.length === 0 ? (
                                <tr><td colSpan={3} className="text-center py-10 text-gray-500 text-[13px]">No categories found.</td></tr>
                            ) : (
                                categories.map((cat) => (
                                    <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden border border-gray-200">
                                                    {cat.image_url ? (
                                                        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FontAwesomeIcon icon={faImage} className="w-4 h-4 text-gray-400 m-3" />
                                                    )}
                                                </div>
                                                <span className="text-[13px] font-semibold text-gray-900">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {Array.isArray(cat.subcategories) && cat.subcategories.length > 0 ? (
                                                    cat.subcategories.map(sub => (
                                                        <span key={sub} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-medium border border-gray-200">{sub}</span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-400 text-[12px] italic">None</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleOpenModal(cat)} className="w-8 h-8 rounded-lg hover:bg-orange-50 text-gray-500 hover:text-orange-500 flex items-center justify-center transition-colors">
                                                    <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
                                                </button>
                                                <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 flex items-center justify-center transition-colors">
                                                    <FontAwesomeIcon icon={faTrashCan} className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl my-auto flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0 rounded-t-2xl">
                            <h3 className="text-[16px] font-bold text-gray-900">{editingId ? 'Edit Category' : 'Add New Category'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500"><FontAwesomeIcon icon={faXmark} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-[12.5px] font-semibold text-gray-900 mb-2">Category Image</label>
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                                        {formData.image ? (
                                            <>
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs">Remove</button>
                                            </>
                                        ) : isUploading ? (
                                            <FontAwesomeIcon icon={faSpinner} className="w-5 h-5 text-red-500 animate-spin" />
                                        ) : (
                                            <FontAwesomeIcon icon={faImage} className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                                        <button type="button" onClick={() => fileInputRef.current?.click()} className="h-9 px-4 rounded-lg border border-gray-200 text-[12px] font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
                                            Choose File
                                        </button>
                                        <input type="text" placeholder="Or paste URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-[12px] outline-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Category Name */}
                            <div>
                                <label className="block text-[12.5px] font-semibold text-gray-900 mb-1.5">Category Name</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full h-11 px-3 rounded-lg border border-gray-200 focus:border-red-500 text-[13px] outline-none" placeholder="e.g. Fashion, Electronics" />
                            </div>

                            {/* Subcategories Builder */}
                            <div>
                                <label className="block text-[12.5px] font-semibold text-gray-900 mb-1.5">Subcategories</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        value={subInput}
                                        onChange={e => setSubInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSub())}
                                        className="flex-1 h-10 px-3 rounded-lg border border-gray-200 focus:border-red-500 text-[13px] outline-none"
                                        placeholder="e.g. Watches, Shoes"
                                    />
                                    <button type="button" onClick={handleAddSub} className="h-10 px-4 bg-gray-900 text-white rounded-lg text-[12px] font-semibold hover:bg-black transition-colors">Add</button>
                                </div>

                                <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                                    {formData.subcategories.length === 0 ? (
                                        <div className="p-4 text-center">
                                            <FontAwesomeIcon icon={faList} className="w-5 h-5 text-gray-300 mb-2" />
                                            <p className="text-[12px] text-gray-400">No subcategories added yet.</p>
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100">
                                            {formData.subcategories.map(sub => (
                                                <li key={sub} className="flex items-center justify-between px-4 py-2.5 bg-white">
                                                    <div className="flex items-center gap-3">
                                                        <FontAwesomeIcon icon={faTag} className="w-3.5 h-3.5 text-gray-400" />
                                                        <span className="text-[13px] font-medium text-gray-700">{sub}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSub(sub)}
                                                        className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </form>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="h-10 px-5 rounded-lg border border-gray-200 text-[13px] font-medium text-gray-600 hover:bg-gray-100">Cancel</button>
                            <button type="button" onClick={handleSubmit} disabled={isUploading} className="h-10 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold shadow-md disabled:opacity-50">
                                {editingId ? 'Save Changes' : 'Create Category'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}