interface NavbarProps {
  activeTab: 'dashboard' | 'about';
  onTabChange: (tab: 'dashboard' | 'about') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-badge">PAW</span>
          <div>
            <h1 className="brand-title">TaskHub Akademik</h1>
            <p className="brand-sub">Arya Fabio Ismail &bull; 1247050080</p>
          </div>
        </div>

        <nav className="nav-links" aria-label="Navigasi Utama">
          <button
            type="button"
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => onTabChange('about')}
          >
            Profil &amp; Info
          </button>
          <a
            href="https://ark4na.my.id"
            className="nav-link-external"
            rel="noopener noreferrer"
          >
            &larr; Web Utama
          </a>
        </nav>
      </div>
    </header>
  );
}