import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    //Limite de paginas
    const maxPages = totalPages > 500 ? 500 : totalPages;

    const getPageNumbers = () => {
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(maxPages, start + 4);
        if (end - start < 4) start = Math.max(1, end - 4);

        const pages = [];
        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    if (maxPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-10">

            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-white/5 disabled:opacity-30 hover:bg-zinc-800 transition-colors"
            >
                Anterior
            </button>

            <div className="flex gap-2">
                {getPageNumbers().map(number => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all ${
                            currentPage === number
                                ? 'bg-red-600 text-white border-none shadow-lg shadow-red-900/20'
                                : 'bg-zinc-900 text-zinc-400 border border-white/5 hover:border-red-600'
                        }`}
                    >
                        {number}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage === maxPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white border border-white/5 disabled:opacity-30 hover:bg-zinc-800 transition-colors"
            >
                Siguiente
            </button>
        </div>
    );
}