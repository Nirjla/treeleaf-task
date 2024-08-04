import React, { useState, useMemo } from 'react';
import { FaSort } from "react-icons/fa";
import { provinces } from '../constants/data';
import { useLocalStorage } from '../../lib/utils';

const ROWS_PER_PAGE = 5;

export default function UserTable({ countries }) {
    const [data, setData] = useLocalStorage('formData', []);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // For handling current page

    // Sorting function
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setData(sortedData);
        setSortConfig({ key, direction });
    };

    // Search function
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter function
    const handleFilter = () => {
        return data.filter((item) => {
            return (
                (selectedProvince ? item.province === selectedProvince : true) &&
                (selectedCountry ? item.country === selectedCountry : true) &&
                Object.values(item).some((value) =>
                    typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        });
    };

    // Memoized filtered data to optimize performance
    const filteredData = useMemo(handleFilter, [searchTerm, selectedProvince, selectedCountry, data]);

    // Paginate data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
        const endIndex = startIndex + ROWS_PER_PAGE;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage]);

    // Handle Edit Action
    const handleEdit = (item) => {
        setEditItem(item);
    };

    // Handle Save Changes
    const handleSaveEdit = () => {
        setData(data.map(d => d.id === editItem.id ? editItem : d));
        setEditItem(null);
    };

    // Handle Cancel Edit
    const handleCancelEdit = () => {
        setEditItem(null);
    };

    // Handle Page Change
    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            if (direction === 'next') {
                return Math.min(prevPage + 1, Math.ceil(filteredData.length / ROWS_PER_PAGE));
            } else if (direction === 'prev') {
                return Math.max(prevPage - 1, 1);
            }
        });
    };

    return (
        <>
            <div className="mt-4">
                <div className="mb-4 flex gap-4 text-sm">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border rounded"
                    />
                    <select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All Provinces</option>
                        {provinces.map((province) => (
                            <option key={province} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">All Countries</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Edit Form */}
                {editItem && (
                    <div className="p-4 border rounded mb-4 bg-gray-100">
                        <h3 className="text-lg font-semibold mb-2">Edit User</h3>
                        <input
                            type="text"
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            placeholder="Name"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.email}
                            onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                            placeholder="Email"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.phnumber}
                            onChange={(e) => setEditItem({ ...editItem, phnumber: e.target.value })}
                            placeholder="Phone Number"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.dob}
                            onChange={(e) => setEditItem({ ...editItem, dob: e.target.value })}
                            placeholder="DOB"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.city}
                            onChange={(e) => setEditItem({ ...editItem, city: e.target.value })}
                            placeholder="City"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.district}
                            onChange={(e) => setEditItem({ ...editItem, district: e.target.value })}
                            placeholder="District"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.province}
                            onChange={(e) => setEditItem({ ...editItem, province: e.target.value })}
                            placeholder="Province"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            value={editItem.country}
                            onChange={(e) => setEditItem({ ...editItem, country: e.target.value })}
                            placeholder="Country"
                            className="p-2 border rounded mb-2 w-full"
                        />
                        <button
                            onClick={handleSaveEdit}
                            className="p-2 bg-blue-500 text-white rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="p-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                <div className="relative overflow-x-auto sm:rounded-md">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 text-gray-400">
                        <thead className="text-xs text-black uppercase bg-gray-200">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className='flex items-center'>
                                        Name
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('email')}
                                >
                                    <div className='flex items-center'>
                                        Email
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('phnumber')}
                                >
                                    <div className='flex items-center'>
                                        Phone Number
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('dob')}
                                >
                                    <div className='flex items-center'>
                                        DOB
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('city')}
                                >
                                    <div className='flex items-center'>
                                        City
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('district')}
                                >
                                    <div className='flex items-center'>
                                        District
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('province')}
                                >
                                    <div className='flex items-center'>
                                        Province
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('country')}
                                >
                                    <div className='flex items-center'>
                                        Country
                                        <FaSort />
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => handleSort('profilePicture')}
                                >
                                    Profile Picture
                                </th>
                                <th scope="col" colSpan={2} className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr key={index} className="bg-white border-b bg-gray-100 border-gray-300 text-slate-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-slate-600 whitespace-nowrap">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.phnumber}</td>
                                    <td className="px-6 py-4">{item.dob}</td>
                                    <td className="px-6 py-4">{item.city}</td>
                                    <td className="px-6 py-4">{item.district}</td>
                                    <td className="px-6 py-4">{item.province}</td>
                                    <td className="px-6 py-4">{item.country}</td>
                                    <td className="px-6 py-4">
                                        {/* Render profile picture if it has a valid URL or placeholder */}
                                        {item.profilePicture && typeof item.profilePicture === 'string'
                                            ? <img src={item.profilePicture} alt="Profile" width="100" />
                                            : 'No Image'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href="#"
                                            onClick={() => handleEdit(item)}
                                            className="font-medium text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href="#"
                                            onClick={() => handleDelete(item)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Page {currentPage} of {Math.ceil(filteredData.length / ROWS_PER_PAGE)}
                    </span>
                    <button
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === Math.ceil(filteredData.length / ROWS_PER_PAGE)}
                        className="p-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}
