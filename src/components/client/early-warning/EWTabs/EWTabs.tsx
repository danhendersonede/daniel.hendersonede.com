import { useState } from 'react';
import styles from './EWTabs.module.css';

interface Tab {
  label: string;
  image: string;
  alt: string;
}

interface EWTabsProps {
  tabs: Tab[];
}

const EWTabs = ({ tabs }: EWTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
            className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={styles.tabPanel}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        id={`tabpanel-${activeTab}`}
      >
        <img
          src={tabs[activeTab].image}
          alt={tabs[activeTab].alt}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default EWTabs;
