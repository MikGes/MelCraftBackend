'use client';

import { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

// Product interface
interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    status: 'active' | 'inactive';
}

// Mock product data
const mockProducts: Product[] = [
    { id: 1, name: 'Modern Sofa', category: 'Living Room', price: '$1,299', status: 'active' },
    { id: 2, name: 'Dining Table Set', category: 'Dining', price: '$899', status: 'active' },
    { id: 3, name: 'Executive Desk', category: 'Office', price: '$749', status: 'inactive' },
    { id: 4, name: 'King Bed Frame', category: 'Bedroom', price: '$1,199', status: 'active' },
    { id: 5, name: 'Accent Chair', category: 'Living Room', price: '$499', status: 'active' },
    { id: 6, name: 'Bookshelf', category: 'Storage', price: '$399', status: 'active' },
    { id: 7, name: 'Wall Art Collection', category: 'Decor', price: '$199', status: 'inactive' },
    { id: 8, name: 'Designer Lighting', category: 'Lighting', price: '$299', status: 'active' },
];

export default function ProductsPage() {
    const [products] = useState<Product[]>(mockProducts);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openAddModal = () => {
        setIsAddModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const openEditModal = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-amber-900">Products</h1>
                    <p className="text-amber-700 mt-2">Manage your product catalog</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium flex items-center transition duration-300"
                >
                    <FaPlus className="mr-2" />
                    Add Product
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                <table className="min-w-full divide-y divide-amber-100">
                    <thead className="bg-amber-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-amber-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-amber-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-amber-900">{product.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-amber-700">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-amber-900">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => openEditModal(product)}
                                        className="text-amber-700 hover:text-amber-900 mr-3"
                                        aria-label="Edit product"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900" aria-label="Delete product">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
                            <h2 className="text-2xl font-bold text-amber-900">Add New Product</h2>
                            <button
                                onClick={closeModals}
                                className="text-amber-700 hover:text-amber-900"
                                aria-label="Close modal"
                            >
                                <FaTimes className="text-2xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="addName" className="block text-amber-800 font-medium mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="addName"
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="Enter product name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="addCategory" className="block text-amber-800 font-medium mb-2">
                                            Category *
                                        </label>
                                        <select
                                            id="addCategory"
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option>Living Room</option>
                                            <option>Dining</option>
                                            <option>Bedroom</option>
                                            <option>Office</option>
                                            <option>Storage</option>
                                            <option>Decor</option>
                                            <option>Lighting</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="addPrice" className="block text-amber-800 font-medium mb-2">
                                            Price *
                                        </label>
                                        <input
                                            type="text"
                                            id="addPrice"
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="$0.00"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="addStatus" className="block text-amber-800 font-medium mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="addStatus"
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="addDescription" className="block text-amber-800 font-medium mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="addDescription"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-amber-800 font-medium mb-2">
                                        Product Images
                                    </label>
                                    <div className="border-2 border-dashed border-amber-300 rounded-lg p-6 text-center">
                                        <p className="text-amber-600">Drag and drop images here or click to browse</p>
                                        <button className="mt-2 text-amber-700 hover:text-amber-900 font-medium">
                                            Select Files
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModals}
                                        className="px-6 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
                            <h2 className="text-2xl font-bold text-amber-900">Edit Product</h2>
                            <button
                                onClick={closeModals}
                                className="text-amber-700 hover:text-amber-900"
                                aria-label="Close modal"
                            >
                                <FaTimes className="text-2xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="editName" className="block text-amber-800 font-medium mb-2">
                                            Product Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="editName"
                                            defaultValue={selectedProduct.name}
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="editCategory" className="block text-amber-800 font-medium mb-2">
                                            Category *
                                        </label>
                                        <select
                                            id="editCategory"
                                            defaultValue={selectedProduct.category}
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option>Living Room</option>
                                            <option>Dining</option>
                                            <option>Bedroom</option>
                                            <option>Office</option>
                                            <option>Storage</option>
                                            <option>Decor</option>
                                            <option>Lighting</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="editPrice" className="block text-amber-800 font-medium mb-2">
                                            Price *
                                        </label>
                                        <input
                                            type="text"
                                            id="editPrice"
                                            defaultValue={selectedProduct.price}
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="editStatus" className="block text-amber-800 font-medium mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="editStatus"
                                            defaultValue={selectedProduct.status}
                                            className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="editDescription" className="block text-amber-800 font-medium mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="editDescription"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-amber-800 font-medium mb-2">
                                        Product Images
                                    </label>
                                    <div className="flex space-x-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="bg-amber-200 border-2 border-amber-300 rounded-lg w-24 h-24 flex items-center justify-center">
                                                <span className="text-amber-800 font-bold text-sm">Img {i}</span>
                                            </div>
                                        ))}
                                        <div className="bg-amber-100 border-2 border-dashed border-amber-300 rounded-lg w-24 h-24 flex items-center justify-center">
                                            <FaPlus className="text-amber-700" />
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="border-t border-amber-200 pt-6 mt-6">
                                    <h3 className="text-lg font-bold text-amber-900 mb-4">Danger Zone</h3>
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-red-800">Delete Product</h4>
                                                <p className="text-red-700 text-sm mt-1">
                                                    This action cannot be undone. This will permanently delete the product.
                                                </p>
                                            </div>
                                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                                                <FaTrash className="mr-2" />
                                                Delete Product
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeModals}
                                        className="px-6 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}