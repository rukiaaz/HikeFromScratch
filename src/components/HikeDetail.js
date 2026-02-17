import React from 'react';
import { format } from 'date-fns';

const HikeDetail = ({ hike, setCurrentScreen }) => {
  if (!hike) {
    return (
      <div className="content" style={{ padding: '20px', textAlign: 'center' }}>
        <div className="status-bar">
          <span className="time">9:41</span>
          <button onClick={() => setCurrentScreen('history')} style={{ border: 'none', background: 'none' }}>
            ← Back
          </button>
        </div>
        <div style={{ marginTop: '100px' }}>
          <span style={{ fontSize: '64px' }}>😕</span>
          <h3>No Hike Selected</h3>
          <p style={{ color: '#999', margin: '20px 0' }}>Please select a hike from the history</p>
          <button 
            onClick={() => setCurrentScreen('history')}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Go to History
          </button>
        </div>
      </div>
    );
  }

  const formatSafeDate = (dateString, formatStr) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return format(date, formatStr);
    } catch (error) {
      return 'Unknown date';
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
    <div className="content" style={{ paddingBottom: '30px', minHeight: '100vh', background: 'white' }}>
      <div className="status-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 20px' }}>
        <span className="time">9:41</span>
        <div className="battery">
          <span>📶</span>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px',
        margin: '10px 20px 20px 20px'
      }}>
        <button 
          onClick={() => setCurrentScreen('history')} 
          style={{ 
            border: 'none', 
            background: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            padding: '5px 10px',
            color: '#667eea'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, fontSize: '24px', color: '#333' }}>Hike Details</h2>
      </div>

      {hike.imageUrl ? (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <img 
            src={hike.imageUrl} 
            alt={hike.title || 'Hike'} 
            style={{ 
              width: '100%',
              height: '300px',
              objectFit: 'cover'
            }} 
          />
          <span 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{getDifficultyEmoji(hike.difficulty)}</span>
            <span style={{ textTransform: 'capitalize' }}>{hike.difficulty || 'easy'}</span>
          </span>
        </div>
      ) : (
        <div style={{ 
          height: '200px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <span style={{ fontSize: '64px' }}>🥾</span>
          <span 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{getDifficultyEmoji(hike.difficulty)}</span>
            <span style={{ textTransform: 'capitalize' }}>{hike.difficulty || 'easy'}</span>
          </span>
        </div>
      )}

      <div style={{ padding: '0 20px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          margin: '0 0 15px 0',
          color: '#333',
          fontWeight: '700'
        }}>
          {hike.title || 'Untitled Hike'}
        </h1>

        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#666',
          marginBottom: '30px',
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '15px'
        }}>
          {hike.description || 'No description provided for this hike.'}
        </p>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>📏</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
              {hike.distance?.toFixed(1) || '0.0'}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>km</div>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>⏱️</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
              {hike.duration || '00:00'}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>duration</div>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '5px' }}>⚡</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
              {hike.distance && hike.duration ? 
                (hike.distance / (parseInt(hike.duration) || 1)).toFixed(1) : '0.0'}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>km/h</div>
          </div>
        </div>

        <div style={{ 
          background: '#f8f9fa',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '18px' }}>Journey Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>📅</span>
              <div>
                <div style={{ fontSize: '14px', color: '#999' }}>Date</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {formatSafeDate(hike.startTime, 'EEEE, MMMM d, yyyy')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>⏰</span>
              <div>
                <div style={{ fontSize: '14px', color: '#999' }}>Start Time</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                  {formatSafeDate(hike.startTime, 'h:mm a')}
                </div>
              </div>
            </div>

            {hike.endTime && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🏁</span>
                <div>
                  <div style={{ fontSize: '14px', color: '#999' }}>End Time</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                    {formatSafeDate(hike.endTime, 'h:mm a')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button 
            style={{
              flex: 1,
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '15px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={() => setCurrentScreen('home')}
          >
            <span>🏠</span>
            <span>Home</span>
          </button>
          
          <button 
            style={{
              flex: 1,
              background: '#f8f9fa',
              color: '#333',
              border: '1px solid #e0e0e0',
              padding: '15px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: hike.title || 'My Hike',
                  text: `I just hiked ${hike.distance || 0}km! ${hike.description || ''}`,
                }).catch(() => {
                  alert('Share cancelled');
                });
              } else {
                navigator.clipboard.writeText(
                  `${hike.title || 'My Hike'}\n` +
                  `Distance: ${hike.distance || 0}km\n` +
                  `Description: ${hike.description || ''}`
                );
                alert('Copied to clipboard!');
              }
            }}
          >
            <span>📤</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HikeDetail;