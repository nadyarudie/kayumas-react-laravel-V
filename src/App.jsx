// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Mark from 'mark.js';
import ScrollToTop from './components/ScrollToTop';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const contentRef = useRef(null);

  // state untuk navigasi hasil
  const [matchNodes, setMatchNodes] = useState([]);     // hanya untuk counter di UI
  const matchNodesRef = useRef([]);                     // sumber kebenaran hasil
  const [currentIdx, setCurrentIdx] = useState(0);

  // Fokus ke hasil index ke-i
  const focusAt = (i) => {
    const list = matchNodesRef.current;
    list.forEach(n => n.classList.remove('highlight-focus'));
    const node = list[i];
    if (node) {
      node.classList.add('highlight-focus');
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Highlight + kumpulkan hasil (NO LOOP)
  useEffect(() => {
    if (!contentRef.current) return;

    const instance = new Mark(contentRef.current);
    instance.unmark({
      done: () => {
        if (searchQuery && searchQuery.length > 1) {
          instance.mark(searchQuery, { className: 'highlight' });
        }
        const nodes = Array.from(contentRef.current.querySelectorAll('.highlight'));
        matchNodesRef.current = nodes;
        setMatchNodes(nodes);
        setCurrentIdx(0);
        if (nodes.length) requestAnimationFrame(() => focusAt(0));
      }
    });
  }, [searchQuery, location]); // <- penting: tidak depend pada fungsi yang berubah-ubah

  // Next/Prev stabil (tak tergantung state di dependency)
  const gotoNext = () => {
    const total = matchNodesRef.current.length;
    if (!total) return;
    const next = (currentIdx + 1) % total;
    setCurrentIdx(next);
    focusAt(next);
  };

  const gotoPrev = () => {
    const total = matchNodesRef.current.length;
    if (!total) return;
    const prev = (currentIdx - 1 + total) % total;
    setCurrentIdx(prev);
    focusAt(prev);
  };

  // IntersectionObserver untuk animasi will-animate
  useEffect(() => {
    if (!contentRef.current) return;
    const nodes = contentRef.current.querySelectorAll('.will-animate');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, [location]);

  return (
    <>
      <Header
        query={searchQuery}
        onQueryChange={setSearchQuery}
        matchIndex={matchNodes.length ? currentIdx + 1 : 0}
        matchTotal={matchNodes.length}
        onSearchNext={gotoNext}
        onSearchPrev={gotoPrev}
      />
      <ScrollToTop />
      <div ref={contentRef}>
        <Outlet/>
      </div>
      <Footer />
    </>
  );
}

export default App;
