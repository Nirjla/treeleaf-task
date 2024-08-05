import { useState } from "react"

export default function Pagination({ rowsPerPage, filteredData ,currentPage,setCurrentPage}) {
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);

      // Change Page
      const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
      };
      return (<>
            <div className="flex justify-between items-center mt-4">
                  <button
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 bg-gray-300 rounded text-sm font-medium"
                  >
                        Previous
                  </button>
                  <span className='text-sm'>
                        Page {currentPage} of {totalPages}
                  </span>
                  <button
                   onClick={() => handlePageChange(Math.max(currentPage + 1, 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-gray-300 rounded text-sm"
                  >
                        Next
                  </button>
            </div>
      </>)
}