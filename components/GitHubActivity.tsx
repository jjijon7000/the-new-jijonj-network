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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    fetchActivity();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchActivity = async () => {
    try {
      console.log('GitHubActivity: Starting fetch...');
      const response = await fetch('/api/github-activity');
      console.log('GitHubActivity: Response status:', response.status);
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      console.log('GitHubActivity: Response data:', data);
      console.log('GitHubActivity: Activities count:', data.activities?.length);
      
      setActivities(data.activities);
      setLoading(false);
    } catch (err) {
      console.error('GitHubActivity: Error fetching GitHub activity:', err);
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
    <>
      {/* Desktop GitHub Widget */}
      <div className="window glass active" style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '20px', 
        width: '240px', 
        height: 'auto',
        maxHeight: '200px',
        zIndex: 50, 
        pointerEvents: 'auto',
        display: isMobile ? 'none' : 'block'
      }}>
        <div className="title-bar">
          <div className="title-bar-text">⚡ github activity</div>
        </div>
        <div className="window-body" style={{ 
          padding: '8px', 
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
          fontSize: '12px',
          overflowY: 'auto',
          maxHeight: '150px'
        }}>
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
                <div key={index} style={{ 
                  color: '#000',
                  lineHeight: '1.4'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{activity.icon}</span>
                    <span style={{ fontSize: '11px', opacity: 0.7 }}>
                      {formatTime(activity.time)}
                    </span>
                  </div>
                  <div style={{ marginTop: '2px' }}>
                    {activity.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile GitHub Widget */}
      <div className="window glass active" style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        width: '85%', 
        maxWidth: '220px', 
        height: 'auto',
        maxHeight: '180px',
        zIndex: 50, 
        pointerEvents: 'auto',
        display: isMobile ? 'block' : 'none'
      }}>
        <div className="title-bar">
          <div className="title-bar-text">⚡ github activity</div>
        </div>
        <div className="window-body" style={{ 
          padding: '6px', 
          fontFamily: 'Segoe UI, Tahoma, sans-serif',
          fontSize: '10px',
          overflowY: 'auto',
          maxHeight: '130px'
        }}>
          {loading && (
            <div style={{ color: '#000', textAlign: 'center', padding: '8px' }}>
              <strong>Loading...</strong>
            </div>
          )}
          
          {error && (
            <div style={{ color: '#cc0000', textAlign: 'center', padding: '8px' }}>
              Failed to load activity
            </div>
          )}
          
          {!loading && !error && activities.length === 0 && (
            <div style={{ color: '#666', textAlign: 'center', padding: '8px' }}>
              No recent activity
            </div>
          )}
          
          {!loading && !error && activities.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {activities.map((activity, index) => (
                <div key={index} style={{ 
                  color: '#000',
                  lineHeight: '1.3'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ fontSize: '9px' }}>{activity.icon}</span>
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>
                      {formatTime(activity.time)}
                    </span>
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '10px' }}>
                    {activity.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
