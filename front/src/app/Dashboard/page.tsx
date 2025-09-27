// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { FaUsers, FaBox, FaClipboardList, FaChartLine, FaPlus, FaSyncAlt } from 'react-icons/fa';

export default function DashboardPage() {
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    const stats = [
        { title: 'Total Products', value: '142', change: '+12', icon: <FaBox className="text-2xl text-amber-700" /> },
        { title: 'New Requests', value: '24', change: '+3', icon: <FaClipboardList className="text-2xl text-amber-700" /> },
        { title: 'Subscribers', value: '1,842', change: '+42', icon: <FaUsers className="text-2xl text-amber-700" /> },
        { title: 'Revenue', value: '$24,560', change: '+$1,240', icon: <FaChartLine className="text-2xl text-amber-700" /> },
    ];

    const recentActivity = [
        { id: 1, action: 'New product added', item: 'Modern Sofa', time: '2 hours ago' },
        { id: 2, action: 'Request received', item: 'Kitchen Renovation', time: '4 hours ago' },
        { id: 3, action: 'Subscriber joined', item: 'john@example.com', time: '1 day ago' },
        { id: 4, action: 'Product updated', item: 'Executive Desk', time: '2 days ago' },
    ];

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-amber-900">Dashboard</h1>
                <p className="text-amber-700 mt-2">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-amber-600 text-sm font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-amber-900 mt-1">{stat.value}</p>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center">
                            <span className="text-green-600 text-sm font-medium">↑ {stat.change}</span>
                            <span className="text-amber-500 text-xs ml-2">since last week</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-amber-900">Recent Activity</h2>
                    <button
                        onClick={() => setLastUpdated(new Date())}
                        className="flex items-center text-amber-700 hover:text-amber-900"
                    >
                        <FaSyncAlt className="mr-2" />
                        Refresh
                    </button>
                </div>

                <div className="space-y-4">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start pb-4 border-b border-amber-100 last:border-0 last:pb-0">
                            <div className="bg-amber-100 p-2 rounded-lg mr-4">
                                <FaPlus className="text-amber-700" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-amber-900">{activity.action}</p>
                                <p className="text-amber-700 mt-1">{activity.item}</p>
                            </div>
                            <span className="text-amber-500 text-sm">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Last Updated */}
            <div className="mt-6 text-center text-amber-600 text-sm">
                Last updated: {lastUpdated.toLocaleString()}
            </div>
        </div>
    );
}