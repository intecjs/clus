import React, { useEffect } from 'react';
import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useRegisterActions,
  useMatches,
} from 'kbar';
import styles from './KBarProvider.module.scss';
import { Event } from 'src/db/event';
import { Emoji } from 'emoji-mart';

const staticActions: Action[] = [
  {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    section: {
      name: 'home',
      priority: 100,
    },
    shortcut: ['h'],
    keywords: 'home',
    perform: () => (window.location.pathname = '/'),
  },
  {
    id: 'blog',
    name: 'Blog',
    icon: '📃',
    section: {
      name: 'blog',
      priority: 99,
    },
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'blog'),
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: '😗',
    section: {
      name: 'settings',
      priority: 98,
    },
    shortcut: ['c'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'contact'),
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: '👕',
    section: {
      name: 'settings',
      priority: 98,
    },
    shortcut: ['p'],
    keywords: 'user',
    perform: () => (window.location.pathname = 'profile'),
  },
  {
    id: 'theme',
    name: 'Theme',
    icon: '🖍',
    section: {
      name: 'settings',
      priority: 98,
    },
    shortcut: ['t'],
    keywords: 'theme color',
    perform: () => (window.location.pathname = 'theme'),
  },
];
function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      maxHeight={1000}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className={styles.section}>{item}</div>
        ) : (
          <div className={active ? styles.kbarResultsActive : styles.kbarResults}>
            <div className={styles.left}>
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.name}</span>
            </div>
            {item.shortcut?.length ? <div className={styles.right}>{item.shortcut}</div> : null}
          </div>
        )
      }
    />
  );
}

const Search = () => {
  const [loading, setLoading] = React.useState(false);
  const [actions, setActions] = React.useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/events')
      .then((res) => res.json())
      .then((res) => {
        const actions = res.map((e: Event) => {
          return {
            id: e.id,
            name: e.title,
            icon: <Emoji emoji={e.emoji} size={30} />,
            section: {
              name: 'events',
              priority: 1,
            },
            shortcut: [],
            keywords: e.title,
            perform: () => (window.location.pathname = `/events/${e.id}`),
          };
        });
        setActions(actions);
        setLoading(false);
      });
  }, []);

  useRegisterActions(loading ? [] : actions, [actions, loading]);

  return <KBarSearch className={styles.kbarSearch} />;
};

const KBarProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <KBarProvider actions={staticActions}>
      <KBarPortal>
        <KBarPositioner className={styles.positioner}>
          <KBarAnimator className={styles.kbarAnimator}>
            <Search />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
};

export default KBarProviderWrapper;
