import React from 'react';
import { format } from 'date-fns';

const HikeHistory = ({ hikes, setCurrentScreen }) => {
  // Safe date formatting function
  const formatSafeDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return format(date, 'MMM d, yyyy');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Unknown date';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#999';
    }
  };

  const getDifficultyEmoji = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return '🌱';
      case 'medium': return '⚡';
      case 'hard': return '🏔️';
      default: return '🌱';
    }
  };

  return (
    <div className="content" style={{ paddingBottom: '80px' }}>
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">9:41</span>
        <div className="battery">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header with Back Button */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px',
        margin: '20px 0',
        padding: '0 20px'
      }}>
        <button 
          onClick={() => setCurrentScreen('home')} 
          style={{ 
            border: 'none', 
            background: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '24px' }}>Hike History</h2>
      </div>

      {/* Total Stats */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        padding: '20px',
        margin: '0 20px 30px 20px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span>Total Hikes</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{hikes.length}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Total Distance</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {hikes.reduce((sum, hike) => sum + (hike.distance || 0), 0).toFixed(1)} km
          </span>
        </div>
      </div>

      {/* Hike List */}
      {hikes.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '0 20px' }}>
          <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🥾</span>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>No Hikes Yet</h3>
          <p style={{ color: '#999', marginBottom: '30px' }}>
            Start your first adventure by clicking the Start Hike button!
          </p>
          <button 
            onClick={() => setCurrentScreen('home')}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Go to Home
          </button>
        </div>
      ) : (
        <div style={{ padding: '0 20px' }}>
          {hikes.map((hike, index) => (
            <div 
              key={hike.id || index} 
              className={`hike-item ${hike.imageUrl ? 'with-image' : ''}`}
              onClick={() => {
                // Pass the selected hike to detail view
                setCurrentScreen('detail');
              }}
              style={{
                cursor: 'pointer',
                marginBottom: '20px',
                transition: 'transform 0.2s',
                border: '1px solid #f0f0f0'
              }}
            >
              {/* Image Section */}
              {hike.imageUrl && (
                <div style={{ position: 'relative' }}>
                  <img 
                    src={hike.imageUrl} 
                    alt={hike.title || 'Hike'} 
                    className="hike-image"
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px'
                    }}
                  />
                  {/* Difficulty Badge on Image */}
                  <span 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>{getDifficultyEmoji(hike.difficulty)}</span>
                    <span>{hike.difficulty || 'easy'}</span>
                  </span>
                </div>
              )}

              {/* Content Section */}
              <div className="hike-info" style={{ padding: '15px' }}>
                {/* Header with Title and Difficulty (if no image) */}
                {!hike.imageUrl && (
                  <div className="hike-header" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ fontSize: '18px', margin: 0, color: '#333' }}>
                      {hike.title || 'Untitled Hike'}
                    </h3>
                    <span 
                      className="difficulty-badge"
                      style={{ 
                        background: getDifficultyColor(hike.difficulty) + '20',
                        color: getDifficultyColor(hike.difficulty),
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{getDifficultyEmoji(hike.difficulty)}</span>
                      <span>{hike.difficulty || 'easy'}</span>
                    </span>
                  </div>
                )}

                {/* Title (if image exists) */}
                {hike.imageUrl && (
                  <h3 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#333' }}>
                    {hike.title || 'Untitled Hike'}
                  </h3>
                )}

                {/* Description */}
                <p className="hike-description" style={{ 
                  color: '#666', 
                  margin: '0 0 15px 0',
                  lineHeight: '1.5',
                  fontSize: '14px'
                }}>
                  {hike.description || 'No description provided'}
                </p>

                {/* Stats Row */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#667eea', fontSize: '20px' }}>📏</span>
                    <span className="hike-distance" style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#333' 
                    }}>
                      {hike.distance?.toFixed(1) || '0.0'} km
                    </span>
                  </div>
                  
                  {hike.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ color: '#764ba2', fontSize: '20px' }}>⏱️</span>
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        {hike.duration}
                      </span>
                    </div>
                  )}
                </div>

                {/* Date and Time Row */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#999' }}>📅</span>
                    <span className="hike-date" style={{ color: '#999', fontSize: '13px' }}>
                      {formatSafeDate(hike.startTime)}
                    </span>
                  </div>
                  {hike.startTime && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ color: '#999' }}>⏰</span>
                      <span style={{ color: '#999', fontSize: '13px' }}>
                        {new Date(hike.startTime).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        maxWidth: '400px',
        margin: '0 auto',
        background: 'white',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0',
        borderTop: '1px solid #f0f0f0',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)'
      }}>
        <div 
          className="nav-item" 
          onClick={() => setCurrentScreen('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#999',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '24px' }}>🏠</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
        </div>
        <div 
          className="nav-item active" 
          onClick={() => setCurrentScreen('history')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#667eea',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '24px' }}>📋</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>History</span>
        </div>
        <div 
          className="nav-item" 
          onClick={() => setCurrentScreen('active')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#999',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '24px' }}>➕</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>New</span>
        </div>
        <div 
          className="nav-item" 
          onClick={() => {}}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#999',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '24px' }}>👤</span>
          <span style={{ fontSize: '12px', marginTop: '4px' }}>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default HikeHistory;