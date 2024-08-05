import React, { useState, useMemo } from 'react';
import { FaSort } from "react-icons/fa";
import { provinces } from '../constants/data';
import { useLocalStorage } from '../../lib/utils';
import SearchField from '../common/SearchField';
import CommonSort from '../common/CommonSort';
import TableHead from '../common/TableHead';
import TableData from '../common/TableData';
import Pagination from '../common/Pagination';

export default function UserTable({ countries }) {
    const [data, setData] = useLocalStorage('formData', []);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [editItem, setEditItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 2; // Number of rows per page

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

    // Pagination
    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    // const indexOfLastItem = currentPage * rowsPerPage;
    // const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    // const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    // const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Handle Edit Action
    const handleEdit = (item) => {
        setEditItem(item);
    };

    // Handle Delete Action
    const handleDelete = (item) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setData(data.filter(d => d !== item));
        }
    };

    // Save changes to edited item
    const handleSaveEdit = () => {
        setData(data.map(d => d.id === editItem.id ? editItem : d));
        setEditItem(null);
    };

    // Cancel edit
    const handleCancelEdit = () => {
        setEditItem(null);
    };

    // // Change Page
    // const handlePageChange = (newPage) => {
    //     setCurrentPage(newPage);
    // };

    return (
        <>
            <div className="mt-4">
                <div className="mb-4 flex gap-4 text-sm">
                    <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <CommonSort selectedItem={selectedProvince} setSelectedItem={setSelectedProvince} data={provinces} />
                    <CommonSort selectedItem={selectedCountry} setSelectedItem={setSelectedCountry} data={countries} />
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
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.email}
                            onChange={(e) => setEditItem({ ...editItem, email: e.target.value })}
                            placeholder="Email"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.phnumber}
                            onChange={(e) => setEditItem({ ...editItem, phnumber: e.target.value })}
                            placeholder="Phone Number"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.dob}
                            onChange={(e) => setEditItem({ ...editItem, dob: e.target.value })}
                            placeholder="DOB"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.city}
                            onChange={(e) => setEditItem({ ...editItem, city: e.target.value })}
                            placeholder="City"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.district}
                            onChange={(e) => setEditItem({ ...editItem, district: e.target.value })}
                            placeholder="District"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.province}
                            onChange={(e) => setEditItem({ ...editItem, province: e.target.value })}
                            placeholder="Province"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <input
                            type="text"
                            value={editItem.country}
                            onChange={(e) => setEditItem({ ...editItem, country: e.target.value })}
                            placeholder="Country"
                            className="p-2 border rounded mb-2 w-full text-sm"
                        />
                        <button
                            onClick={handleSaveEdit}
                            className="p-2 bg-primary text-white rounded mr-2"
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
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-black uppercase bg-gray-200">
                            <tr>
                                <TableHead name={'profile picture'} onClick={() => handleSort('profilePicture')}>Profile Picture</TableHead>
                                <TableHead name={'name'} onClick={() => handleSort('name')} />
                                <TableHead name={'email'} onClick={() => handleSort('email')} />
                                <TableHead name={'phone number'} onClick={() => handleSort('phnumber')} />
                                <TableHead name={'dob'} onClick={() => handleSort('dob')} />
                                <TableHead name={'city'} onClick={() => handleSort('city')} />
                                <TableHead name={'district'} onClick={() => handleSort('district')} />
                                <TableHead name={'province'} onClick={() => handleSort('province')} />
                                <TableHead name={'country '} onClick={() => handleSort('country')} />
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item, index) => (
                                    <tr key={index} className="border-b bg-white hover:bg-gray-50">
                                        <TableData>
                                            {/* Render profile picture if it has a valid URL or placeholder */}
                                            {item.profilePicture && typeof item.profilePicture === 'string'
                                                ? <img src={item.profilePicture} alt="Profile" width="100" />
                                                : 'No Image'}
                                        </TableData>                                       <TableData>{item.name}</TableData>
                                        <TableData>{item.email}</TableData>
                                        <TableData>{item.phnumber}</TableData>
                                        <TableData>{item.dob}</TableData>
                                        <TableData>{item.city}</TableData>
                                        <TableData>{item.district}</TableData>
                                        <TableData>{item.province}</TableData>
                                        <TableData>{item.country}</TableData>
                                        <TableData>
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-primary  text-md hover:underline font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="p-2 text-red-500  text-md hover:underline font-medium"
                                            >
                                                Delete
                                            </button>
                                        </TableData>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <Pagination rowsPerPage={rowsPerPage} filteredData={filteredData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </>
    );
}
