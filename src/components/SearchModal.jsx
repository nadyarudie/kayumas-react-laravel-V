// src/components/SearchModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === '') return;
        navigate(`/artikel?q=${encodeURIComponent(query)}`);
        onClose();
        setQuery('');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-white/80 z-50 flex items-start justify-center p-4 pt-24 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSearch} className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-5">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        ref={inputRef}
                        id="search-input-modal"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari judul artikel..."
                        className="w-full text-lg p-4 pl-14 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                    />
                </form>
            </div>
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-600 text-5xl font-light hover:text-primary transition-colors"
            >
                &times;
            </button>
        </div>
    );
};

export default SearchModal;