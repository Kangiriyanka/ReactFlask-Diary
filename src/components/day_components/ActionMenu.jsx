import React, { useEffect } from "react";
import ThemeSwitcher from '../general_components/ThemeSwitcher.jsx';

function ActionMenu({ currentView, setCurrentView }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault(); // prevent default browser select all
        setCurrentView("article");
      } else if (e.ctrlKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault(); // prevent default browser tab focus maybe
        setCurrentView("todo");
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCurrentView]);

  return (
    <div className="action-menu">
      <button className={`button-38 ${currentView === "article" ? 'selected' : ''}`} onClick={() => setCurrentView("article")}>
        Article
      </button>
      <button className={`button-38 ${currentView === "todo" ? 'selected' : ''}`} onClick={() => setCurrentView("todo")}>
        Todos
      </button>
    </div>
  );
}

export default ActionMenu;