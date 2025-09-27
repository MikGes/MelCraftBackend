// app/subscribers/page.tsx
'use client';

import { useState } from 'react';
import { FaEnvelope, FaCalendar, FaUser, FaTimes, FaTrash } from 'react-icons/fa';

// Subscriber interface
interface Subscriber {
    id: number;
    name: string;
    email: string;
    subscriptionDate: string;
    status: 'active' | 'unsubscribed';
}

// Mock subscriber data
const mockSubscribers: Subscriber[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', subscriptionDate: '2023-09-15', status: 'active' },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@example.com', subscriptionDate: '2023-09-20', status: 'active' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', subscriptionDate: '2023-08-05', status: 'unsubscribed' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa.a@example.com', subscriptionDate: '2023-10-01', status: 'active' },
    { id: 5, name: 'David Wilson', email: 'david.w@example.com', subscriptionDate: '2023-07-12', status: 'active' },
    { id: 6, name: 'Sarah Brown', email: 'sarah.b@example.com', subscriptionDate: '2023-09-28', status: 'active' },
    { id: 7, name: 'Michael Taylor', email: 'michael.t@example.com', subscriptionDate: '2023-08-30', status: 'unsubscribed' },
    { id: 8, name: 'Jennifer Lee', email: 'jennifer.l@example.com', subscriptionDate: '2023-10-10', status: 'active' },
];

export default function SubscribersPage() {
    const [subscribers] = useState<Subscriber[]>(mockSubscribers);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const openDeleteModal = (subscriber: Subscriber) => {
        setSelectedSubscriber(subscriber);
        setIsDeleteModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedSubscriber(null);
        document.body.style.overflow = 'auto';
    };

    const filteredSubscribers = filterStatus === 'all'
        ? subscribers
        : subscribers.filter(sub => sub.status === filterStatus);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-amber-900">Subscribers</h1>
                    <p className="text-amber-700 mt-2">Manage your email subscribers list</p>
                </div>
                <div className="flex space-x-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-amber-300 rounded-lg px-4 py-2 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                    </select>
                    <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                        <FaEnvelope className="mr-2" />
                        Send Email
                    </button>
                </div>
            </div>

            {/* Subscribers Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-amber-600 text-sm font-medium">Total Subscribers</p>
                            <p className="text-2xl font-bold text-amber-900 mt-1">{subscribers.length}</p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-lg">
                            <FaUser className="text-2xl text-amber-700" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-amber-600 text-sm font-medium">Active Subscribers</p>
                            <p className="text-2xl font-bold text-amber-900 mt-1">
                                {subscribers.filter(s => s.status === 'active').length}
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FaEnvelope className="text-2xl text-green-700" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-amber-600 text-sm font-medium">Unsubscribed</p>
                            <p className="text-2xl font-bold text-amber-900 mt-1">
                                {subscribers.filter(s => s.status === 'unsubscribed').length}
                            </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <FaTimes className="text-2xl text-red-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                <table className="min-w-full divide-y divide-amber-100">
                    <thead className="bg-amber-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Subscriber
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Subscription Date
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
                        {filteredSubscribers.map((subscriber) => (
                            <tr key={subscriber.id} className="hover:bg-amber-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100 p-2 rounded-lg mr-3">
                                            <FaUser className="text-amber-700" />
                                        </div>
                                        <div className="font-medium text-amber-900">{subscriber.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-amber-700">
                                    {subscriber.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-amber-700">
                                    <div className="flex items-center">
                                        <FaCalendar className="mr-2 text-amber-600" />
                                        {subscriber.subscriptionDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${subscriber.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                        {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => openDeleteModal(subscriber)}
                                        className="text-red-600 hover:text-red-900"
                                        aria-label="Delete subscriber"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredSubscribers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-amber-500 mb-2">
                            <FaUser className="text-4xl mx-auto" />
                        </div>
                        <p className="text-amber-700">No subscribers found</p>
                    </div>
                )}
            </div>

            {/* Delete Subscriber Modal */}
            {isDeleteModalOpen && selectedSubscriber && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
                            <h2 className="text-xl font-bold text-amber-900">Delete Subscriber</h2>
                            <button
                                onClick={closeDeleteModal}
                                className="text-amber-700 hover:text-amber-900"
                                aria-label="Close modal"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="text-center py-4">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaTrash className="text-red-600 text-2xl" />
                                </div>
                                <h3 className="text-lg font-bold text-amber-900 mb-2">Are you sure?</h3>
                                <p className="text-amber-700 mb-6">
                                    This will permanently delete <span className="font-bold">{selectedSubscriber.name}</span>
                                    ({selectedSubscriber.email}) from your subscribers list.
                                </p>

                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={closeDeleteModal}
                                        className="px-6 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center"
                                    >
                                        <FaTrash className="mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}