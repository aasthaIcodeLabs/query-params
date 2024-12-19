const Pagination = ({ currentPage, totalUsers, handlePagination, userPerPage }) => {
    const totalPages = Math.ceil(totalUsers / userPerPage);

    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const paginationNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(i);
    }

    return (
        <div>
            <button
                onClick={() => handlePagination(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 m-1 bg-green-700 rounded disabled:opacity-50"
            >
                Previous
            </button>

            {paginationNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePagination(pageNumber)}
                    className={`p-2 m-1 ${currentPage === pageNumber ? 'bg-yellow-500' : 'bg-green-700'} rounded`}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => handlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 m-1 bg-green-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
