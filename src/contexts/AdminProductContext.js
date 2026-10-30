// src/contexts/AdminProductContext.js (or wherever yours is located)
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

const AdminProductContext = createContext(null);

export function AdminProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error.message, error.details);
            toast.error('Failed to load products');
        } else {
            const formattedData = data.map(p => ({
                ...p,
                images: [p.image_url || '/assets/images/products/placeholder.jpg'],
                tags: p.tags || [], // Ensure tags is always an array
            }));
            setProducts(formattedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (productData) => {
        const newProduct = {
            name: productData.name,
            subtitle: productData.subtitle || '',
            description: productData.description || '',
            category: productData.category,
            price: productData.price,
            stock: productData.stock,
            image_url: productData.image,
            colors: productData.colors || [],
            tags: productData.tags || [], // Save the selected tags
        };

        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select()
            .single();

        if (error) {
            // Better error logging to catch database schema issues
            console.error('Supabase Insert Error:', error.message, error.details);
            toast.error(`Failed to add product: ${error.message}`);
            return false;
        }

        setProducts(prev => [{ ...data, images: [data.image_url], tags: data.tags || [] }, ...prev]);
        return true;
    };

    const updateProduct = async (id, updatedData) => {
        const { data, error } = await supabase
            .from('products')
            .update({
                name: updatedData.name,
                subtitle: updatedData.subtitle,
                category: updatedData.category,
                price: updatedData.price,
                stock: updatedData.stock,
                image_url: updatedData.image,
                colors: updatedData.colors,
                tags: updatedData.tags || [],
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Supabase Update Error:', error.message, error.details);
            toast.error(`Failed to update product: ${error.message}`);
            return false;
        }

        setProducts(prev => prev.map(p => p.id === id ? { ...data, images: [data.image_url], tags: data.tags || [] } : p));
        return true;
    };

    const deleteProduct = async (id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error(error);
            toast.error('Failed to delete product');
            return false;
        }

        setProducts(prev => prev.filter(p => p.id !== id));
        return true;
    };

    return (
        <AdminProductContext.Provider value={{
            products,
            loading,
            addProduct,
            updateProduct,
            deleteProduct,
            refreshProducts: fetchProducts
        }}>
            {children}
        </AdminProductContext.Provider>
    );
}

export function useAdminProducts() {
    const ctx = useContext(AdminProductContext);
    if (!ctx) throw new Error('useAdminProducts must be used within AdminProductProvider');
    return ctx;
}