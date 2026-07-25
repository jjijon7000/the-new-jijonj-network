'use client';

import { useState, useEffect } from 'react';

interface Activity {
  type: string;
  message: string;
  repo: string;
  time: string;
  icon: string;
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchActivity();
  }, []);

  const fetchActivity = async () => {
    try {
      const response = await fetch('/api/github-activity');
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      setActivities(data.activities ?? []);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  const formatTime = (timeString: string) => {
    const now = new Date();
    const time = new Date(timeString);
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="window glass active github-activity-window" style={{ height: 'auto', maxHeight: '200px' }}>
      <div className="title-bar">
        <div className="title-bar-text">⚡ github activity</div>
      </div>
      <div
        className="window-body github-activity-body"
        style={{
          padding: '8px',
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
          fontSize: '12px',
          overflowY: 'auto',
          maxHeight: '150px',
        }}
      >
        {loading && (
          <div style={{ color: '#000', textAlign: 'center', padding: '10px' }}>
            <strong>Loading...</strong>
          </div>
        )}

        {error && (
          <div style={{ color: '#cc0000', textAlign: 'center', padding: '10px' }}>
            Failed to load activity
          </div>
        )}

        {!loading && !error && activities.length === 0 && (
          <div style={{ color: '#666', textAlign: 'center', padding: '10px' }}>
            No recent activity
          </div>
        )}

        {!loading && !error && activities.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activities.map((activity, index) => (
              <div
                key={index}
                style={{
                  color: '#000',
                  lineHeight: '1.4',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{activity.icon}</span>
                  <span style={{ fontSize: '11px', opacity: 0.7 }}>
                    {formatTime(activity.time)}
                  </span>
                </div>
                <div style={{ marginTop: '2px' }}>{activity.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
