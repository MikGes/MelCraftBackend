// app/requests/page.tsx
'use client';

import { useState } from 'react';
import { FaUser, FaCouch, FaCalendar, FaClock, FaEdit, FaTimes, FaCheck, FaTrash, FaClipboard } from 'react-icons/fa';

// Request interface
interface Request {
    id: number;
    customerName: string;
    email: string;
    phone: string;
    requestedItem: string;
    category: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
    date: string;
    time: string;
}

// Mock request data
const mockRequests: Request[] = [
    {
        id: 1,
        customerName: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+44 7700 900123',
        requestedItem: 'Modern Sofa',
        category: 'Living Room',
        status: 'pending',
        date: '2023-10-15',
        time: '14:30'
    },
    {
        id: 2,
        customerName: 'Michael Chen',
        email: 'm.chen@example.com',
        phone: '+44 7700 900456',
        requestedItem: 'Dining Table Set',
        category: 'Dining',
        status: 'in-progress',
        date: '2023-10-14',
        time: '10:15'
    },
    {
        id: 3,
        customerName: 'Emma Williams',
        email: 'emma.w@example.com',
        phone: '+44 7700 900789',
        requestedItem: 'Executive Desk',
        category: 'Office',
        status: 'completed',
        date: '2023-10-12',
        time: '09:45'
    },
    {
        id: 4,
        customerName: 'James Wilson',
        email: 'j.wilson@example.com',
        phone: '+44 7700 901234',
        requestedItem: 'King Bed Frame',
        category: 'Bedroom',
        status: 'pending',
        date: '2023-10-16',
        time: '16:20'
    },
    {
        id: 5,
        customerName: 'Olivia Brown',
        email: 'olivia.b@example.com',
        phone: '+44 7700 902345',
        requestedItem: 'Wall Art Collection',
        category: 'Decor',
        status: 'cancelled',
        date: '2023-10-10',
        time: '11:30'
    },
];

export default function RequestsPage() {
    const [requests] = useState<Request[]>(mockRequests);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const openEditModal = (request: Request) => {
        setSelectedRequest(request);
        setIsEditModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedRequest(null);
        document.body.style.overflow = 'auto';
    };

    const filteredRequests = filterStatus === 'all'
        ? requests
        : requests.filter(req => req.status === filterStatus);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-amber-900">Requests</h1>
                    <p className="text-amber-700 mt-2">Manage customer requests and inquiries</p>
                </div>
                <div className="flex space-x-3">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-amber-300 rounded-lg px-4 py-2 text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100">
                <table className="min-w-full divide-y divide-amber-100">
                    <thead className="bg-amber-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Requested Item
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">
                                Date & Time
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
                        {filteredRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-amber-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="bg-amber-100 p-2 rounded-lg mr-3">
                                            <FaUser className="text-amber-700" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-amber-900">{request.customerName}</div>
                                            <div className="text-amber-700 text-sm">{request.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-amber-900">{request.requestedItem}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-amber-700">
                                    <div>{request.email}</div>
                                    <div className="text-sm">{request.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-amber-700">
                                    <div className="flex items-center">
                                        <FaCalendar className="mr-2 text-amber-600" />
                                        {request.date}
                                    </div>
                                    <div className="flex items-center text-sm mt-1">
                                        <FaClock className="mr-2 text-amber-600" />
                                        {request.time}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => openEditModal(request)}
                                        className="text-amber-700 hover:text-amber-900 mr-3"
                                        aria-label="Edit request"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-900" aria-label="Delete request">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-amber-500 mb-2">
                            <FaClipboard className="text-4xl mx-auto" />
                        </div>
                        <p className="text-amber-700">No requests found</p>
                    </div>
                )}
            </div>

            {/* Edit Request Modal */}
            {isEditModalOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-amber-200 flex justify-between items-center p-6">
                            <h2 className="text-2xl font-bold text-amber-900">Edit Request</h2>
                            <button
                                onClick={closeEditModal}
                                className="text-amber-700 hover:text-amber-900"
                                aria-label="Close modal"
                            >
                                <FaTimes className="text-2xl" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-amber-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-amber-900 mb-3">Customer Information</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-amber-700 font-medium">Name:</span>
                                            <span className="ml-2">{selectedRequest.customerName}</span>
                                        </div>
                                        <div>
                                            <span className="text-amber-700 font-medium">Email:</span>
                                            <span className="ml-2">{selectedRequest.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-amber-700 font-medium">Phone:</span>
                                            <span className="ml-2">{selectedRequest.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-amber-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-amber-900 mb-3">Request Details</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-amber-700 font-medium">Item:</span>
                                            <span className="ml-2">{selectedRequest.requestedItem}</span>
                                        </div>
                                        <div>
                                            <span className="text-amber-700 font-medium">Category:</span>
                                            <span className="ml-2">{selectedRequest.category}</span>
                                        </div>
                                        <div>
                                            <span className="text-amber-700 font-medium">Date:</span>
                                            <span className="ml-2">{selectedRequest.date}</span>
                                        </div>
                                        <div>
                                            <span className="text-amber-700 font-medium">Time:</span>
                                            <span className="ml-2">{selectedRequest.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="editStatus" className="block text-amber-800 font-medium mb-2">
                                    Request Status
                                </label>
                                <select
                                    id="editStatus"
                                    defaultValue={selectedRequest.status}
                                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="editNotes" className="block text-amber-800 font-medium mb-2">
                                    Notes / Comments
                                </label>
                                <textarea
                                    id="editNotes"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Add notes about this request..."
                                ></textarea>
                            </div>

                            {/* Danger Zone */}
                            <div className="border-t border-amber-200 pt-6 mt-6">
                                <h3 className="text-lg font-bold text-amber-900 mb-4">Danger Zone</h3>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-red-800">Delete Request</h4>
                                            <p className="text-red-700 text-sm mt-1">
                                                This action cannot be undone. This will permanently delete the request.
                                            </p>
                                        </div>
                                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                                            <FaTrash className="mr-2" />
                                            Delete Request
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-6 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium flex items-center"
                                >
                                    <FaCheck className="mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}