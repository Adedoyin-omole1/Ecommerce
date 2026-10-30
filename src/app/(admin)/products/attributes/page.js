// src/app/(admin)/products/attributes/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ATTRIBUTE_TYPES = [
    { id: 'brand', label: 'Brands' },
    { id: 'color', label: 'Colors' },
    { id: 'size', label: 'Sizes' },
];

export default function AdminAttributesPage() {
    const [activeTab, setActiveTab] = useState('brand');
    const [attributes, setAttributes] = useState([]);
    const [newValue, setNewValue] = useState('');
    const [hexCode, setHexCode] = useState('#000000');
    const [isLoading, setIsLoading] = useState(true);

    const fetchAttributes = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('attributes').select('*');
        if (error) toast.error('Failed to load attributes');
        else setAttributes(data || []);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newValue.trim()) return;

        const payload = {
            type: activeTab,
            value: newValue.trim(),
            hex_code: activeTab === 'color' ? hexCode : null
        };

        const { data, error } = await supabase.from('attributes').insert([payload]).select().single();
        if (error) {
            toast.error(error.message);
        } else {
            setAttributes([...attributes, data]);
            setNewValue('');
            toast.success(`${activeTab} added!`);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this attribute?')) return;
        const { error } = await supabase.from('attributes').delete().eq('id', id);
        if (!error) {
            setAttributes(attributes.filter(a => a.id !== id));
            toast.success('Deleted');
        }
    };

    const currentAttributes = attributes.filter(a => a.type === activeTab);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[24px] font-bold text-gray-900">System Attributes</h1>
                <p className="text-[13px] text-gray-500 mt-1">Manage Brands, Colors, and Sizes for your store.</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl">
                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-100 mb-6">
                    {ATTRIBUTE_TYPES.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setActiveTab(type.id)}
                            className={`pb-3 text-[13.5px] font-semibold transition-colors border-b-2 ${activeTab === type.id ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={`Enter new ${activeTab}...`}
                        className="flex-1 h-11 px-4 rounded-lg border border-gray-200 focus:border-red-500 outline-none text-[13px]"
                    />
                    {activeTab === 'color' && (
                        <input
                            type="color"
                            value={hexCode}
                            onChange={(e) => setHexCode(e.target.value)}
                            className="h-11 w-14 p-1 rounded-lg border border-gray-200 cursor-pointer"
                        />
                    )}
                    <button type="submit" className="h-11 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-[13px] shadow-md transition-all">
                        <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5 mr-2" /> Add
                    </button>
                </form>

                {/* List */}
                {isLoading ? (
                    <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div></div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {currentAttributes.map((attr) => (
                            <div key={attr.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                                {activeTab === 'color' && (
                                    <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: attr.hex_code }} />
                                )}
                                <span className="text-[13px] font-medium text-gray-800">{attr.value}</span>
                                <button onClick={() => handleDelete(attr.id)} className="text-gray-400 hover:text-red-500 ml-1">
                                    <FontAwesomeIcon icon={faTrashCan} className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        {currentAttributes.length === 0 && <p className="text-gray-500 text-sm">No {activeTab}s added yet.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}