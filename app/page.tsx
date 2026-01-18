'use client';

import React, { useState, useEffect, useRef } from 'react';
import PixelSnow from '@/components/PixelSnow';
import ShinyText from '@/components/ShinyText';
import DecryptedText from '@/components/DecryptedText';
import GitHubActivity from '@/components/GitHubActivity';
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiVercel, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiCplusplus, SiMysql, SiJavascript, SiHtml5, SiCss3, SiGnubash, SiGit, SiLinux, SiDocker, SiFlask } from 'react-icons/si';

// Extend Window interface for SoundCloud Widget
declare global {
  interface Window {
    SC: any;
  }
}

const MinimalistWallpaper = () => {
  const titles = [
    'full-stack developer',
    'computer science teaching assistant',
    'music producer',
    'computer science student',
    'photographer'
  ];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      fontSize: '78%',
      lineHeight: '130%'
    }}>
      {/* Pixel Snow Effect */}
      <PixelSnow
        flakeSize={0.006}
        depthFade={6}
        farPlane={18}
        density={0.8}
        variant="round"
        direction={90}
      />
      
      {/* Text Content - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '140px',
        right: '20px',
        left: '20px',
        fontFamily: "'CenturyGothic', 'Century Gothic', 'Apple Gothic', sans-serif, Arial, 'Trebuchet MS', verdana",
        color: 'white',
        zIndex: 1,
        textAlign: 'right',
        animation: 'fadeIn 2s ease-in forwards',
        opacity: 0
      }}>
        <div style={{
          fontSize: '4rem',
          fontWeight: 300,
          margin: '0 0 20px 0',
          letterSpacing: '2px',
          lineHeight: '130%'
        }}>
          <ShinyText
            text="Julio Jijon"
            speed={2}
            delay={0}
            color="#646464"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
          />
        </div>
        <div style={{
          fontSize: '1.4rem',
          fontWeight: 300,
          margin: 0,
          marginLeft: 'auto',
          maxWidth: '500px',
          lineHeight: '130%',
          minHeight: '2rem'
        }}>
          <DecryptedText
            key={currentTitleIndex}
            text={titles[currentTitleIndex]}
            speed={30}
            maxIterations={8}
            animateOn="view"
            sequential={true}
            revealDirection="start"
          />
        </div>
      </div>
    </div>
  );
};

const GalleryContent = ({ onClose, onMinimize }: { onClose: () => void, onMinimize: () => void }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  // Add your images here
  const images = [
    {
      id: 1,
      src: '/images/gallery/2024-10-20-222850.jpg',
      title: 'outside',
      description: 'took this outside campus'
    },
    {
      id: 2,
      src: '/images/gallery/2024-10-20-223306.jpg',
      title: 'outside pt 2',
      description: 'also took this outside on campus'
    },
    {
      id: 3,
      src: '/images/gallery/kencarsonlouisville1.gif',
      title: 'ken carson show',
      description: 'ken carson concert in louisville'
    },
    {
      id: 4,
      src: '/images/gallery/kencarsonlouisville2.gif',
      title: 'ken carson show pt2',
      description: "ken performing 'overtime'"
    },
    {
      id: 5,
      src: '/images/gallery/kencarsonlouisville3.gif',
      title: 'ken carson show pt3',
      description: 'ken performing something. i dont remember'
    },
    {
      id: 6,
      src: '/images/gallery/outside1.gif',
      title: 'outside again but as gif',
      description: 'went on a walk outside on campus'
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slideshow') return;
      
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') previousImage();
      if (e.key === 'Escape') setViewMode('grid');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, selectedImage]);

  return (
    <>
      <div className="title-bar">
        <div className="title-bar-text">🖼️ Photo Gallery</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize}></button>
          <button aria-label="Maximize" disabled style={{ opacity: 0.5 }}></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>

      {/* Menu Bar */}
      <ul role="menubar" className="can-hover">
        <li role="menuitem" tabIndex={0} aria-haspopup="true">
          View
          <ul role="menu">
            <li role="menuitem" onClick={() => setViewMode('grid')}>
              <input type="radio" name="view-mode" id="grid-view" checked={viewMode === 'grid'} readOnly />
              <label htmlFor="grid-view">Grid View</label>
            </li>
            <li role="menuitem" onClick={() => setViewMode('slideshow')}>
              <input type="radio" name="view-mode" id="slideshow-view" checked={viewMode === 'slideshow'} readOnly />
              <label htmlFor="slideshow-view">Slideshow</label>
            </li>
          </ul>
        </li>
      </ul>

      <div className="window-body" style={{ color: '#000', height: 'calc(100% - 60px)', overflow: 'auto', padding: 0 }}>
        {viewMode === 'grid' ? (
          // Grid View
          <div style={{ 
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
            height: '100%',
            overflowY: 'auto'
          }}>
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => {
                  setSelectedImage(index);
                  setViewMode('slideshow');
                }}
                style={{
                  cursor: 'pointer',
                  border: '2px solid #999',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s',
                  height: 'fit-content'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="150"%3E%3Crect fill="%23ddd" width="200" height="150"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%23666"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div style={{ padding: '8px', background: '#f0f0f0' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>
                    {image.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>
                    {image.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Slideshow View
          <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#000'
          }}>
            {/* Image Display */}
            <div style={{ 
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Previous Button */}
              <button
                onClick={previousImage}
                style={{
                  position: 'absolute',
                  left: '20px',
                  zIndex: 10,
                  padding: '10px 15px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.9)',
                  border: '2px solid #999',
                  borderRadius: '4px'
                }}
              >
                ◀
              </button>

              {/* Image */}
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="%23999"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Next Button */}
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '20px',
                  zIndex: 10,
                  padding: '10px 15px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  background: 'rgba(255,255,255,0.9)',
                  border: '2px solid #999',
                  borderRadius: '4px'
                }}
              >
                ▶
              </button>
            </div>

            {/* Image Info Bar */}
            <div style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.95)',
              borderTop: '2px solid #999',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#000', marginBottom: '4px' }}>
                  {images[selectedImage].title}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {images[selectedImage].description}
                </div>
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: '#000',
                padding: '6px 12px',
                background: '#e0e0e0',
                border: '1px solid #999',
                borderRadius: '3px'
              }}>
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div style={{
              padding: '8px',
              background: '#2a2a2a',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              borderTop: '1px solid #444'
            }}>
              {images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.src}
                  alt={image.title}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '60px',
                    height: '45px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #4ec4f7' : '2px solid transparent',
                    borderRadius: '3px',
                    opacity: selectedImage === index ? 1 : 0.6,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = selectedImage === index ? '1' : '0.6'}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="45"%3E%3Crect fill="%23444" width="60" height="45"/%3E%3C/svg%3E';
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const Windows7Desktop = () => {
  const [time, setTime] = useState(new Date());
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExperienceClosing, setIsExperienceClosing] = useState(false);
  const [isProjectsClosing, setIsProjectsClosing] = useState(false);
  const [isEmailClosing, setIsEmailClosing] = useState(false);
  const [isGalleryClosing, setIsGalleryClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [desktopOpacity, setDesktopOpacity] = useState(0);
  const [blackOverlay, setBlackOverlay] = useState(1);
  const [activeExpTab, setActiveExpTab] = useState('exp-1');
  const [activeProjectTab, setActiveProjectTab] = useState('proj-1');
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAboutMeMinimized, setIsAboutMeMinimized] = useState(false);
  const [isEmailMinimized, setIsEmailMinimized] = useState(false);
  const [isExperienceMinimized, setIsExperienceMinimized] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);
  const [isGalleryMinimized, setIsGalleryMinimized] = useState(false);
  const [showWelcomeBalloon, setShowWelcomeBalloon] = useState(false);
  const [balloonAnimatingOut, setBalloonAnimatingOut] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [startMenuSearch, setStartMenuSearch] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutProgress, setLogoutProgress] = useState(0);

  // ============================================
  // STATE AND REFS
  // ============================================
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const widgetRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const isSkippingRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ============================================
  // PRELOADER
  // ============================================
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setDesktopOpacity(1);
          setBlackOverlay(0);
          if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
          }
          // Show welcome balloon after loading
          setTimeout(() => {
            setShowWelcomeBalloon(true);
          }, 2000);
        }, 50);
      }, 500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // ============================================
  // MOBILE DETECTION
  // ============================================
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ============================================
  // SOUNDCLOUD WIDGET INITIALIZATION
  // ============================================
  useEffect(() => {
    // Load SoundCloud Widget API script
    const loadSoundCloudAPI = () => {
      if (window.SC) {
        initializeSoundCloudWidget();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => {
        // Wait a bit for SC to be fully available
        const checkSC = setInterval(() => {
          if (window.SC) {
            clearInterval(checkSC);
            initializeSoundCloudWidget();
          }
        }, 100);
        
        // Timeout after 5 seconds
        setTimeout(() => clearInterval(checkSC), 5000);
      };
      script.onerror = () => {
        console.error('Failed to load SoundCloud Widget API');
      };
      document.head.appendChild(script);
    };

    loadSoundCloudAPI();
  }, []);

  const initializeSoundCloudWidget = () => {
    const playlistUrl = "https%3A//soundcloud.com/1017underwrld/sets/web";
    let hidden = document.getElementById('hidden-sc-player') as HTMLIFrameElement;
    
    if (!hidden) {
      hidden = document.createElement('iframe');
      hidden.id = 'hidden-sc-player';
      hidden.style.display = 'none';
      hidden.setAttribute('allow', 'autoplay');
      hidden.src = `https://w.soundcloud.com/player/?url=${playlistUrl}&auto_play=false&hide_related=true&show_comments=false&show_reposts=false&visual=false`;
      document.body.appendChild(hidden);
    }

    const widget = window.SC.Widget(hidden);
    widgetRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      widget.setVolume(50); // Set volume to 50%
      updateTrackInfo(widget);
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      if (isSkippingRef.current) {
        setTimeout(() => {
          widget.seekTo(0);
          isSkippingRef.current = false;
        }, 100);
      }
      refreshPlayButton();
      updateTrackInfo(widget);
      startProgress();
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      refreshPlayButton();
      stopProgress(false);
    });

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      stopProgress(true);
      widget.getSounds((sounds: any[]) => {
        widget.getCurrentSoundIndex((index: number) => {
          if (index === sounds.length - 1) {
            widget.skip(0);
            widget.play();
          } else {
            widget.next();
          }
        });
      });
    });

    setTimeout(() => {
      widget.getSounds(() => {});
    }, 1500);
  };

  // ============================================
  // TRACK INFO DISPLAY
  // ============================================
  const updateTrackInfo = (widget: any) => {
    widget.getCurrentSound((sound: any) => {
      if (sound && sound !== currentTrack) {
        setCurrentTrack(sound);
        displayCurrentTrack(sound);
      }
    });
  };

  const displayCurrentTrack = (sound: any) => {
    const widgets = ['desktop-mw-track', 'mobile-mw-track'];
    const containerWidths = [170, 150];
    
    widgets.forEach((trackId, index) => {
      updateTrackDisplay(trackId, sound, containerWidths[index]);
    });
    
    const openButtons = ['desktop-mw-open', 'mobile-mw-open'];
    openButtons.forEach(buttonId => {
      const openBtn = document.getElementById(buttonId);
      if (openBtn) {
        openBtn.onclick = () => window.open(sound.permalink_url, '_blank');
      }
    });
  };

  const updateTrackDisplay = (trackId: string, sound: any, containerWidth: number) => {
    const trackDiv = document.getElementById(trackId);
    if (!trackDiv) return;
    
    const content = `<strong>${sound.title}</strong><br><span style="opacity:0.7;">${sound.user.username}</span>`;
    trackDiv.innerHTML = content;
    
    trackDiv.classList.remove('scrolling');
    
    setTimeout(() => {
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.fontSize = '11px';
      tempElement.style.fontWeight = 'bold';
      tempElement.innerHTML = sound.title;
      document.body.appendChild(tempElement);
      
      const titleWidth = tempElement.offsetWidth;
      document.body.removeChild(tempElement);
      
      if (titleWidth > containerWidth) {
        const overflowAmount = titleWidth - containerWidth;
        const baseDuration = 8;
        const speedMultiplier = Math.max(0.5, Math.min(2, overflowAmount / 100));
        const animationDuration = baseDuration * speedMultiplier;
        
        const scrollContent = `<strong>${sound.title}</strong>`;
        trackDiv.innerHTML = `
          <div class="title-container" style="height: 14px; overflow: hidden; width: 100%; margin-bottom: 2px;">
            <div class="scroll-content" style="white-space: nowrap; display: inline-block; animation: marquee-${containerWidth} ${animationDuration}s linear infinite;">${scrollContent}</div>
          </div>
          <div style="opacity:0.7;">${sound.user.username}</div>
        `;
        trackDiv.classList.add('scrolling');
        
        addMarqueeKeyframes(containerWidth);
      }
    }, 100);
  };

  const addMarqueeKeyframes = (containerWidth: number) => {
    const keyframeName = `marquee-${containerWidth}`;
    if (!document.getElementById(`keyframes-${containerWidth}`)) {
      const style = document.createElement('style');
      style.id = `keyframes-${containerWidth}`;
      style.textContent = `
        @keyframes ${keyframeName} {
          0% { transform: translateX(0%); }
          25% { transform: translateX(0%); }
          75% { transform: translateX(calc(-100% + ${containerWidth}px)); }
          100% { transform: translateX(calc(-100% + ${containerWidth}px)); }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // ============================================
  // PLAYBACK CONTROLS
  // ============================================
  const togglePlayback = () => {
    if (widgetRef.current) {
      widgetRef.current.isPaused((paused: boolean) => {
        if (paused) {
          widgetRef.current.seekTo(0);
        }
        widgetRef.current.toggle();
      });
    }
  };

  const nextTrack = () => {
    if (widgetRef.current) {
      widgetRef.current.getSounds((sounds: any[]) => {
        widgetRef.current.getCurrentSoundIndex((index: number) => {
          if (index === sounds.length - 1) {
            isSkippingRef.current = true;
            widgetRef.current.skip(0);
            widgetRef.current.play();
          } else {
            isSkippingRef.current = true;
            widgetRef.current.next();
          }
        });
      });
    }
  };

  const previousTrack = () => {
    if (widgetRef.current) {
      widgetRef.current.getPosition((position: number) => {
        if (position > 3000) {
          // If past 3 seconds, restart current track
          widgetRef.current.seekTo(0);
        } else {
          // If before 3 seconds, go to previous track
          isSkippingRef.current = true;
          widgetRef.current.prev();
        }
      });
    }
  };

  const refreshPlayButton = () => {
    if (!widgetRef.current) return;
    widgetRef.current.isPaused((paused: boolean) => {
      setIsPaused(paused);
      ['desktop-mw-play', 'mobile-mw-play'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.textContent = paused ? '▶️' : '⏸️';
      });
    });
  };

  // ============================================
  // PROGRESS BAR
  // ============================================
  const startProgress = () => {
    if (progressIntervalRef.current) return;
    progressIntervalRef.current = setInterval(() => {
      if (!widgetRef.current) return;
      widgetRef.current.getPosition((pos: number) => {
        widgetRef.current.getDuration((dur: number) => {
          setProgress(pos / dur);
          setCurrentTime(pos);
          setDuration(dur);
        });
      });
    }, 1000);
  };

  const stopProgress = (reset: boolean) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (reset) {
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const setProgress = (ratio: number) => {
    ['desktop-mw-progress-bar', 'mobile-mw-progress-bar'].forEach(id => {
      const bar = document.getElementById(id);
      if (bar) bar.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
    });
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!widgetRef.current) return;
    
    const progressContainer = e.currentTarget;
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const ratio = clickX / width;
    
    widgetRef.current.getDuration((duration: number) => {
      const seekPosition = duration * ratio;
      widgetRef.current.seekTo(seekPosition);
    });
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // ============================================
  // KEYBOARD SHORTCUT
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !(e.target as HTMLElement).closest('input,textarea')) {
        e.preventDefault();
        togglePlayback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ============================================
  // RESPONSIVE WIDGET DISPLAY
  // ============================================
  useEffect(() => {
    const handleResize = () => {
      showCorrectWidget();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showCorrectWidget = () => {
    const desktopWidget = document.getElementById('desktop-music-widget');
    const mobileWidget = document.getElementById('mobile-music-widget');
    
    if (window.innerWidth >= 769) {
      if (desktopWidget) desktopWidget.style.display = 'block';
      if (mobileWidget) mobileWidget.style.display = 'none';
    } else {
      if (desktopWidget) desktopWidget.style.display = 'none';
      if (mobileWidget) mobileWidget.style.display = 'block';
    }
  };

  React.useEffect(() => {
    // Grid configuration
    const GRID_SIZE = 100; // Size of each grid cell vertically
    const GRID_SIZE_HORIZONTAL = 86; // Horizontal grid spacing (columns closer)
    const MARGIN = 16; // Margin from edges
    const TASKBAR_HEIGHT = 40; // Height of the taskbar at the bottom
    const ICON_WIDTH = 80; // Width of desktop icon

    const snapToGrid = (value: number, isHorizontal: boolean = false) => {
      const gridSize = isHorizontal ? GRID_SIZE_HORIZONTAL : GRID_SIZE;
      return Math.round((value - MARGIN) / gridSize) * gridSize + MARGIN;
    };

    const getCellKey = (x: number, y: number) => {
      return `${x},${y}`;
    };

    const getAllIcons = () => {
      return Array.from(document.querySelectorAll('[id^="icon-"]')) as HTMLElement[];
    };

    const isWithinBounds = (x: number, y: number) => {
      const maxX = window.innerWidth - ICON_WIDTH - MARGIN;
      const maxY = window.innerHeight - TASKBAR_HEIGHT - ICON_WIDTH - MARGIN;
      return x >= MARGIN && x <= maxX && y >= MARGIN && y <= maxY;
    };

    const findNextAvailableCell = (desiredX: number, desiredY: number, currentIcon: HTMLElement) => {
      const icons = getAllIcons().filter(icon => icon !== currentIcon);
      const occupied = new Set<string>();

      icons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const gridX = snapToGrid(rect.left, true);
        const gridY = snapToGrid(rect.top, false);
        occupied.add(getCellKey(gridX, gridY));
      });

      // Try the desired position first if within bounds
      if (isWithinBounds(desiredX, desiredY) && !occupied.has(getCellKey(desiredX, desiredY))) {
        return { x: desiredX, y: desiredY };
      }

      // Search for next available position (going down first, then right)
      const maxRows = Math.floor((window.innerHeight - TASKBAR_HEIGHT - MARGIN) / GRID_SIZE);
      const maxCols = Math.floor((window.innerWidth - MARGIN) / GRID_SIZE_HORIZONTAL);

      for (let col = 0; col <= maxCols; col++) {
        for (let row = 0; row <= maxRows; row++) {
          const x = col * GRID_SIZE_HORIZONTAL + MARGIN;
          const y = row * GRID_SIZE + MARGIN;
          if (isWithinBounds(x, y) && !occupied.has(getCellKey(x, y))) {
            return { x, y };
          }
        }
      }

      return { x: desiredX, y: desiredY };
    };

    // Make icons draggable with grid snapping
    const dragElement = (elmnt: HTMLElement) => {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      let hasMoved = false;
      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        hasMoved = false;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: MouseEvent) {
        e.preventDefault();
        hasMoved = true;
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // Only snap to grid if the icon was actually moved
        if (hasMoved) {
          const currentLeft = elmnt.offsetLeft;
          const currentTop = elmnt.offsetTop;
          const snappedX = snapToGrid(currentLeft, true);
          const snappedY = snapToGrid(currentTop, false);
          
          const finalPos = findNextAvailableCell(snappedX, snappedY, elmnt);
          elmnt.style.left = finalPos.x + "px";
          elmnt.style.top = finalPos.y + "px";
          elmnt.style.transition = "all 0.2s ease-out";
          
          setTimeout(() => {
            elmnt.style.transition = "";
          }, 200);
        }

        document.onmouseup = null;
        document.onmousemove = null;
      }
    };

    const recycleBin = document.getElementById('icon-recyclebin');
    const github = document.getElementById('icon-github');
    const linkedin = document.getElementById('icon-linkedin');
    const aboutMe = document.getElementById('icon-aboutme');
    const myExperience = document.getElementById('icon-myexperience');
    const myProjects = document.getElementById('icon-myprojects');
    const email = document.getElementById('icon-email');
    const gallery = document.getElementById('icon-gallery');
    if (recycleBin) dragElement(recycleBin);
    if (github) dragElement(github);
    if (linkedin) dragElement(linkedin);
    if (aboutMe) dragElement(aboutMe);
    if (myExperience) dragElement(myExperience);
    if (myProjects) dragElement(myProjects);
    if (email) dragElement(email);
    if (gallery) dragElement(gallery);
  }, []);

  const handleCloseWindow = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsAboutMeOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleCloseExperience = () => {
    setIsExperienceClosing(true);
    setTimeout(() => {
      setIsExperienceOpen(false);
      setIsExperienceClosing(false);
    }, 300);
  };

  const handleCloseProjects = () => {
    setIsProjectsClosing(true);
    setTimeout(() => {
      setIsProjectsOpen(false);
      setIsProjectsClosing(false);
    }, 300);
  };

  const handleCloseEmail = () => {
    setIsEmailClosing(true);
    setTimeout(() => {
      setIsEmailOpen(false);
      setIsEmailClosing(false);
    }, 300);
  };

  const handleCloseGallery = () => {
    setIsGalleryClosing(true);
    setTimeout(() => {
      setIsGalleryOpen(false);
      setIsGalleryClosing(false);
    }, 300);
  };

  const handleMinimizeAboutMe = () => {
    setIsAboutMeMinimized(true);
  };

  const handleMinimizeEmail = () => {
    setIsEmailMinimized(true);
  };

  const handleMinimizeExperience = () => {
    setIsExperienceMinimized(true);
  };

  const handleMinimizeProjects = () => {
    setIsProjectsMinimized(true);
  };

  const handleMinimizeGallery = () => {
    setIsGalleryMinimized(true);
  };

  const projects = [
    {
      id: 'proj-1',
      name:'this website',
      technologies: 'react, typescript, next.js, tailwindcss, vercel',
      date: 'jan. 2026',
      link: 'https://github.com/jjijon7000/the-new-jijonj-network',
      description: [
        '- built a personal portfolio website using react, typescript, and next.js with a focus on clean design and performance',
        '- integrated the github api to dynamically fetch and display project and repository data',
        '- used the soundcloud embed api to showcase music and audio content directly within the site',
        '- styled the application with tailwindcss to create a responsive, mobile-friendly layout',
        '- deployed the site on vercel with continuous deployment tied to github'
      ],
      techStack: ['React', 'Typescript', 'TailwindCSS', 'Next.js', 'Vercel']

    },
    {
      id: 'proj-2',
      name: 'Undertow Synthesizer',
      technologies: 'JUCE, C++',
      date: 'Jan. 2025',
      link: 'https://github.com/jjijon7000/undertow-synth',
      description: [
        '- Designed and implemented a polyphonic software synthesizer using the JUCE framework and C++.',
        '- Built core audio components including oscillators, ADSR envelope, LFO, and filters for sound shaping.',
        '- Focused on real-time performance, memory management, and low-latency audio processing.',
        '- Created an interactive GUI for real-time parameter control and plugin testing.',
        '- Owned the project end-to-end, from system design to implementation and testing.'
      ],
      techStack: ['JUCE', 'C++', 'Audio Processing', 'DSP', 'Real-time Systems']
    },
    {
      id: 'proj-3',
      name: 'Python Learn Piano',
      technologies: 'Python',
      date: 'Dec. 2024',
      link: 'https://github.com/Berea-College-CSC-226/p01-final-project-jijonj',
      description: [
        '- Designed a Python application with a focus on clean architecture, modular design, and maintainable code.',
        '- Applied object-oriented programming principles to structure system components and manage application state.',
        '- Implemented reusable classes and input-handling logic, improving extensibility and long-term maintainability'
      ],
      techStack: ['Python', 'OOP', 'Software Architecture', 'Modular Design']
    }
  ];

  const experiences = [
    {
      id: 'exp-1',
      role: 'Computer Science Teaching Assistant',
      company: 'Berea College',
      period: 'Jan. 2025 – Present',
      location: 'Berea, KY',
      description: 'Teaching Assistant for CSC 226: Software Design and Implement, supporting 30+ students each semester.',
      responsibilities: [
        'Reinforced core computer science fundamentals including object-oriented design, data structures, and algorithmic problem solving',
        'Diagnosed and resolved 100+ logic, runtime, and design-related issues, strengthening debugging',
        'Created 10+ supplementary guides and walkthroughs that reduced recurring coding errors by 25%',
        'Collaborated with faculty to refine curriculum, increasing clarity and efficiency of programming instruction',
        'Conducted 20+ mock technical interviews to assess students\' programming knowledge and problem-solving skills'
      ],
      technologies: ['Python', 'Object-Oriented Design', 'Data Structures', 'Algorithms', 'Debugging'],
      achievements: [
        'Reduced recurring coding errors by 25% through supplementary guides',
        'Resolved 100+ technical issues across multiple semesters',
        'Conducted 20+ mock technical interviews'
      ]
    },
    {
      id: 'exp-2',
      role: 'Full-Stack Software Engineer Intern',
      company: 'Berea College',
      period: 'Jun. 2025 – Aug. 2025',
      location: 'Berea, KY',
      description: 'Contributed to business-critical applications by resolving 20+ tracked issues using Git for version control within an agile development workflow.',
      responsibilities: [
        'Collaborated with designers and engineers to ship features end-to-end, from feature planning to deployment',
        'Developed and maintained user-facing features supporting internal workflows using JavaScript, HTML, and CSS',
        'Designed and integrated RESTful APIs to support secure and reliable data exchange between client and server systems',
        'Utilized Git for version control and Docker for containerization, ensuring reproducible and consistent development environments',
        'Designed and implemented unit and integration tests, reducing deployment and runtime errors by 30%'
      ],
      technologies: ['JavaScript', 'HTML', 'CSS', 'RESTful APIs', 'Git', 'Docker', 'Agile'],
      achievements: [
        'Resolved 20+ tracked issues in production applications',
        'Reduced deployment and runtime errors by 30%',
        'Successfully shipped multiple features end-to-end'
      ]
    },
    {
      id: 'exp-3',
      role: 'Student IT Support Specialist',
      company: 'Walters State Community College',
      period: 'Aug. 2022 – May 2024',
      location: 'Morristown, TN',
      description: 'interned at Berea Colleges\' Software Development Team',
      responsibilities: [
        'Maintained and supported 150+ hardware and software systems, ensuring operational reliability and timely issue resolution.',
        'Assisted IT staff in managing 200+ inventory items and logging assets for accurate resource tracking',
        'Resolved 50+ faculty and staff tech issues per semester, improving access to essential educational tools',
        'Managed and updated inventory systems, increasing accuracy of hardware/software tracking by 20%',
        'Provided technical support for various hardware and software platforms'
      ],
      technologies: ['Windows', 'Hardware Troubleshooting', 'Software Support', 'Inventory Management', 'Help Desk'],
      achievements: [
        'Maintained 150+ hardware and software systems',
        'Increased inventory tracking accuracy by 20%',
        'Resolved 50+ tech issues per semester'
      ]
    }
  ];

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/7.css" />
      
      {/* Audio element - update src with your audio file */}
      <audio ref={audioRef} src="/images/logonwin7.wav" preload="auto" />
      
      {/* Preloader */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ 
            textAlign: 'center',
            color: '#fff',
            fontFamily: "'Segoe UI', Tahoma, sans-serif"
          }}>
            <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 300 }}>logging you in...</h2>
            <div role="progressbar" className="marquee" style={{ width: '300px' }}></div>
          </div>
        </div>
      )}

      {/* Logout Screen */}
      {isLoggingOut && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.5s ease-in'
        }}>
          <div style={{ 
            textAlign: 'center',
            color: '#fff',
            fontFamily: "'Segoe UI', Tahoma, sans-serif"
          }}>
            <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 300 }}>logging out...</h2>
            <div role="progressbar" className="marquee" style={{ width: '300px' }}></div>
          </div>
        </div>
      )}

      {/* Black overlay for fade-in effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: blackOverlay,
        transition: 'opacity 1s ease-in-out',
        pointerEvents: blackOverlay > 0 ? 'auto' : 'none',
        zIndex: 9998
      }} />

      <div className="desktop" style={{
        opacity: desktopOpacity,
        transition: 'opacity 1s ease-in-out',
        backgroundColor: '#000'
      }}
      onClick={(e) => {
        // Close balloon when clicking anywhere on desktop except the balloon itself
        if (showWelcomeBalloon && !balloonAnimatingOut && !(e.target as HTMLElement).closest('.welcome-balloon')) {
          setBalloonAnimatingOut(true);
          setTimeout(() => {
            setShowWelcomeBalloon(false);
            setBalloonAnimatingOut(false);
          }, 500);
        }
        // Close start menu when clicking outside
        if (isStartMenuOpen && !(e.target as HTMLElement).closest('.window.glass.active') && !(e.target as HTMLElement).closest('.start-button')) {
          setIsStartMenuOpen(false);
        }
      }}>
        {/* Minimalist Space Wallpaper */}
        <MinimalistWallpaper />
        
        {/* Desktop Icons */}
        <div id="icon-recyclebin" className="desktop-icon" style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }}>
          <div className="desktop-icon-image">
            <img src="/images/recyclebinw7.png" alt="Recycle Bin" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">recycle bin</div>
        </div>
        <div id="icon-github" className="desktop-icon" style={{ position: 'absolute', top: 16, left: 102, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => window.open('https://github.com/jjijon7000', '_blank')}>
          <div className="desktop-icon-image">
            <img src="/images/githublogo7.png" alt="GitHub" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">my github</div>
        </div>
        <div id="icon-linkedin" className="desktop-icon" style={{ position: 'absolute', top: 120, left: 102, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => window.open('https://www.linkedin.com/in/julio-jijon-jarquin/', '_blank')}>
          <div className="desktop-icon-image">
            <img src="/images/linkedin7logo.png" alt="LinkedIn" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">my linkedin</div>
        </div>
        <div id="icon-aboutme" className="desktop-icon" style={{ position: 'absolute', top: 120, left: 16, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => { setIsAboutMeOpen(true); setIsAboutMeMinimized(false); setFocusedWindow('aboutme'); }}>
          <div className="desktop-icon-image">
            <img src="/images/txtwin7.png" alt="AboutMe" style={{ width: '90%', height: '90%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">aboutme.txt</div>
        </div>
        <div id="icon-myexperience" className="desktop-icon" style={{ position: 'absolute', top: 224, left: 16, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => { setIsExperienceOpen(true); setIsExperienceMinimized(false); setFocusedWindow('experience'); }}>
          <div className="desktop-icon-image" style={{ overflow: 'visible' }}>
            <img src="/images/folderw7.png" alt="MyExperience" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', marginLeft: '8px', transform: 'scale(1.3)' }} />
          </div>
          <div className="desktop-icon-label">myexperience</div>
        </div>
        <div id="icon-myprojects" className="desktop-icon" style={{ position: 'absolute', top: 328, left: 16, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => { setIsProjectsOpen(true); setIsProjectsMinimized(false); setFocusedWindow('projects'); }}>
          <div className="desktop-icon-image" style={{ overflow: 'visible' }}>
            <img src="/images/folderw7.png" alt="MyProjects" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', marginLeft: '8px', transform: 'scale(1.3)' }} />
          </div>
          <div className="desktop-icon-label">myprojects</div>
        </div>
        <div id="icon-email" className="desktop-icon" style={{ position: 'absolute', top: 224, left: 102, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => { setIsEmailOpen(true); setIsEmailMinimized(false); setFocusedWindow('email'); }}>
          <div className="desktop-icon-image">
            <img src="/images/wlivemail7.png" alt="Email" style={{ width: '90%', height: '90%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">send me an email</div>
        </div>
        <div id="icon-gallery" className="desktop-icon" style={{ position: 'absolute', top: 328, left: 102, zIndex: 10, pointerEvents: 'auto', cursor: 'default' }} onDoubleClick={() => { setIsGalleryOpen(true); setIsGalleryMinimized(false); setFocusedWindow('gallery'); }}>
          <div className="desktop-icon-image">
            <img src="/images/gallerywin7.png" alt="Gallery" style={{ width: '90%', height: '90%', objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div className="desktop-icon-label">my gallery</div>
        </div>
        
        {/* GitHub Activity Widget */}
        <GitHubActivity />

        {/* Desktop Music Widget */}
        <div id="desktop-music-widget" className="window glass active" style={{ position: 'absolute', top: '125px', right: '20px', width: '240px', height: 'auto', zIndex: 50, pointerEvents: 'auto' }}>
          <div className="title-bar">
            <div className="title-bar-text">soundcloud</div>
          </div>
          <div className="window-body" style={{ padding: '8px', fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
            {/* Track Info */}
            <div id="desktop-mw-track" style={{ fontSize: '11px', lineHeight: '1.3', marginBottom: '8px', minHeight: '24px', color: '#000' }}>
              <strong>Loading...</strong>
            </div>
            
            {/* Progress Bar */}
            <div onClick={handleProgressBarClick} style={{ width: '100%', height: '5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '3px', marginBottom: '3px', overflow: 'visible', cursor: 'pointer', position: 'relative' }}>
              <div id="desktop-mw-progress-bar" style={{ height: '100%', width: '0%', backgroundColor: '#ff5500', borderRadius: '3px', pointerEvents: 'none', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', backgroundColor: '#ff5500', borderRadius: '50%', border: '2px solid #000', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}></div>
              </div>
            </div>
            
            {/* Time Display */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#000', marginBottom: '8px', opacity: 0.7 }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '6px' }}>
              <button onClick={previousTrack} style={{ flex: 1, padding: '4px 8px', fontSize: '12px', cursor: 'pointer', border: '1px solid #999999ff', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#000', minWidth: 0, maxWidth: '70px' }}>⏮️</button>
              <button id="desktop-mw-play" onClick={togglePlayback} style={{ flex: 1, padding: '4px 10px', fontSize: '12px', cursor: 'pointer', border: '1px solid #999999ff', borderRadius: '3px', backgroundColor: '#ff5500', color: '#000', minWidth: 0, maxWidth: '80px' }}>▶️</button>
              <button onClick={nextTrack} style={{ flex: 1, padding: '4px 8px', fontSize: '12px', cursor: 'pointer', border: '1px solid #999999ff', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#000', minWidth: 0, maxWidth: '70px' }}>⏭️</button>
            </div>
            
            {/* Open in SoundCloud */}
            <button id="desktop-mw-open" style={{ width: '100%', padding: '5px', fontSize: '11px', cursor: 'pointer', border: '1px solid #999999ff', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#000' }}>🔗 open in soundcloud</button>
          </div>
        </div>

        {/* Tech Stack Widget - Desktop */}
{/* Tech Stack Widget */}
<div 
  className="window glass active" 
  style={{ 
    // Conditional positioning logic
    position: isMobile ? 'fixed' : 'absolute', 
    top: isMobile ? '280px' : '315px', 
    right: isMobile ? '10px' : '20px', 
    width: isMobile ? '85%' : '240px',
    maxWidth: isMobile ? '220px' : 'none',
    
    // Constant styles
    height: 'auto', 
    zIndex: 50, 
    pointerEvents: 'auto' 
  }}
>
  <div className="title-bar">
    <div className="title-bar-text">stuff i know</div>
  </div>
  <div 
    className="window-body" 
    style={{ 
      padding: '10px', 
      height: '80px', 
      overflow: 'hidden', 
      backgroundColor: 'rgba(255,255,255,0.95)', 
      color: '#000' 
    }}
  >
    <LogoLoop
      logos={[
        { node: <SiPython style={{ color: '#000' }} />, title: "Python", href: "https://www.python.org" },
        { node: <SiCplusplus style={{ color: '#000' }} />, title: "C++", href: "https://isocpp.org" },
        { node: <SiMysql style={{ color: '#000' }} />, title: "SQL", href: "https://www.mysql.com" },
        { node: <SiVercel style={{ color: '#000' }} />, title: 'Vercel', href: "https://vercel.com/" },
        { node: <SiJavascript style={{ color: '#000' }} />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { node: <SiTypescript style={{ color: '#000' }} />, title: "TypeScript", href: "https://www.typescriptlang.org" },
        { node: <SiHtml5 style={{ color: '#000' }} />, title: "HTML", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { node: <SiCss3 style={{ color: '#000' }} />, title: "CSS", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { node: <SiGnubash style={{ color: '#000' }} />, title: "Bash", href: "https://www.gnu.org/software/bash/" },
        { node: <SiGit style={{ color: '#000' }} />, title: "Git", href: "https://git-scm.com" },
        { node: <SiLinux style={{ color: '#000' }} />, title: "Linux", href: "https://www.linux.org" },
        { node: <SiDocker style={{ color: '#000' }} />, title: "Docker", href: "https://www.docker.com" },
        { node: <SiFlask style={{ color: '#000' }} />, title: "Flask", href: "https://flask.palletsprojects.com" },
        { node: <SiReact style={{ color: '#000' }} />, title: "React", href: "https://react.dev" },
        { node: <SiNodedotjs style={{ color: '#000' }} />, title: "Node.js", href: "https://nodejs.org" },
        { node: <SiNextdotjs style={{ color: '#000' }} />, title: "Next.js", href: "https://nextjs.org" },
        { node: <SiTailwindcss style={{ color: '#000' }} />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
      ]}
      speed={40}
      direction="left"
      logoHeight={40}
      gap={30}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="rgba(255,255,255,0.95)"
      ariaLabel="Technology stack"
    />
  </div>
</div>

        {/* Mobile Music Widget */}
        <div id="mobile-music-widget" className="window glass active" style={{ position: 'fixed', top: '100px', right: '10px', width: '85%', maxWidth: '220px', height: 'auto', zIndex: 50, pointerEvents: 'auto', display: 'none' }}>
          <div className="title-bar">
            <div className="title-bar-text">soundcloud</div>
          </div>
          <div className="window-body" style={{ padding: '6px', fontFamily: 'Segoe UI, Tahoma, sans-serif' }}>
            {/* Track Info */}
            <div id="mobile-mw-track" style={{ fontSize: '10px', lineHeight: '1.3', marginBottom: '8px', minHeight: '26px', color: '#000' }}>
              <strong>Loading...</strong>
            </div>
            
            {/* Progress Bar */}
            <div onClick={handleProgressBarClick} style={{ width: '100%', height: '5px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '3px', marginBottom: '4px', overflow: 'visible', cursor: 'pointer', position: 'relative' }}>
              <div id="mobile-mw-progress-bar" style={{ height: '100%', width: '0%', backgroundColor: '#ff5500', borderRadius: '3px', pointerEvents: 'none', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', width: '10px', height: '10px', backgroundColor: '#ff5500', borderRadius: '50%', border: '2px solid #000', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}></div>
              </div>
            </div>
            
            {/* Time Display */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#000', marginBottom: '10px', opacity: 0.7 }}>
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '6px' }}>
              <button onClick={previousTrack} style={{ flex: 1, padding: '2px 4px', fontSize: '10px', cursor: 'pointer', border: '1px solid #444', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#000', minWidth: 0, maxWidth: '60px' }}>⏮️</button>
              <button id="mobile-mw-play" onClick={togglePlayback} style={{ flex: 1, padding: '2px 4px', fontSize: '10px', cursor: 'pointer', border: '1px solid #444', borderRadius: '3px', backgroundColor: '#ff5500', color: '#000', minWidth: 0, maxWidth: '70px' }}>▶️</button>
              <button onClick={nextTrack} style={{ flex: 1, padding: '2px 4px', fontSize: '10px', cursor: 'pointer', border: '1px solid #444', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#000', minWidth: 0, maxWidth: '60px' }}>⏭️</button>
            </div>
            
            {/* Open in SoundCloud */}
            <button id="mobile-mw-open" style={{ width: '100%', padding: '4px', fontSize: '9px', cursor: 'pointer', border: '1px solid #444', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.15)', color: '#000' }}>🔗 open in soundcloud</button>
          </div>
        </div>

        

        {/* Welcome Balloon */}
        {showWelcomeBalloon && (
          <div 
            className="welcome-balloon"
            style={{
              position: 'fixed',
              bottom: '70px',
              right: '20px',
              zIndex: 10000,
              pointerEvents: 'auto',
              animation: balloonAnimatingOut ? 'balloonSlideOut 0.5s ease-out forwards' : 'balloonSlideIn 0.5s ease-out forwards',
              opacity: 0,
              transform: 'translateY(20px)'
            }}
          >
            <div role="tooltip" className="is-top is-left" style={{ fontSize: '15px' }}>
              welcome to my website!
            </div>
            <style jsx>{`
              @keyframes balloonSlideIn {
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes balloonSlideOut {
                from {
                  opacity: 1;
                  transform: translateY(0);
                }
                to {
                  opacity: 0;
                  transform: translateY(20px);
                }
              }
            `}</style>
          </div>
        )}

        {/* Email Window */}
        {isEmailOpen && !isEmailMinimized && (
          <div 
            className="window glass active" 
            onClick={() => setFocusedWindow('email')}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '90%', 
              maxWidth: '400px', 
              zIndex: focusedWindow === 'email' ? 100 : 50, 
              pointerEvents: 'auto', 
              animation: isEmailClosing ? 'windowSlideOut 0.3s ease-out forwards' : 'windowSlideIn 0.3s ease-out forwards',
              opacity: focusedWindow === 'email' || focusedWindow === null ? 1 : 0.7,
              transition: 'opacity 0.2s ease, z-index 0s'
            }}
          >
            <div className="title-bar">
              <div className="title-bar-text">send me an email</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handleMinimizeEmail}></button>
                <button aria-label="Maximize" disabled style={{ opacity: 0.5 }}></button>
                <button aria-label="Close" onClick={handleCloseEmail}></button>
              </div>
            </div>
            <div className="window-body has-space">
              <form action="https://formspree.io/f/xkgqyejw" method="POST" id="emailForm">
                <div className="field-row-stacked" style={{ width: '100%', marginBottom: '15px' }}>
                  <label htmlFor="email">your email:</label>
                  <input type="email" name="email" id="email" required style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }} />
                </div>
                <div className="field-row-stacked" style={{ width: '100%', marginBottom: '15px' }}>
                  <label htmlFor="message">your message:</label>
                  <textarea name="message" id="message" rows={6} required style={{ width: '100%', padding: '5px', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button type="submit">send</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Window */}
        {isGalleryOpen && !isGalleryMinimized && (
          <div 
            className="window glass active" 
            onClick={() => setFocusedWindow('gallery')}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '90%', 
              maxWidth: '900px', 
              height: '80vh',
              maxHeight: '600px',
              zIndex: focusedWindow === 'gallery' ? 100 : 50, 
              pointerEvents: 'auto', 
              animation: isGalleryClosing ? 'windowSlideOut 0.3s ease-out forwards' : 'windowSlideIn 0.3s ease-out forwards',
              opacity: focusedWindow === 'gallery' || focusedWindow === null ? 1 : 0.7,
              transition: 'opacity 0.2s ease, z-index 0s'
            }}
          >
            <GalleryContent onClose={handleCloseGallery} onMinimize={handleMinimizeGallery} />
          </div>
        )}

        {/* AboutMe Window */}
        {isAboutMeOpen && !isAboutMeMinimized && (
          <div 
            className="window glass active" 
            onClick={() => setFocusedWindow('aboutme')}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '90%', 
              maxWidth: '600px', 
              height: '400px', 
              maxHeight: '80vh', 
              zIndex: focusedWindow === 'aboutme' ? 100 : 50, 
              pointerEvents: 'auto', 
              animation: isClosing ? 'windowSlideOut 0.3s ease-out forwards' : 'windowSlideIn 0.3s ease-out forwards',
              opacity: focusedWindow === 'aboutme' || focusedWindow === null ? 1 : 0.7,
              transition: 'opacity 0.2s ease, z-index 0s'
            }}
          >
            <div className="title-bar">
              <div className="title-bar-text">aboutme.txt - notepad</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handleMinimizeAboutMe}></button>
                <button aria-label="Maximize" disabled style={{ opacity: 0.5 }}></button>
                <button aria-label="Close" onClick={handleCloseWindow}></button>
              </div>
            </div>
            <ul role="menubar" className="can-hover">
              <li role="menuitem" tabIndex={0} aria-haspopup="true">
                file
              </li>
            </ul>
            <div className="window-body has-space" style={{ height: 'calc(100% - 60px)', overflow: 'auto', fontFamily: 'Consolas, "Courier New", monospace' }}>
              <p>who is Julio?</p>
              <br />
              <p>yea im julio, and im currently pursuing a bachelors in computer science at berea college. ive been keeping a 3.73 gpa and have made the deans list while here. before coming to berea, i completed my associates in computer science at walters state community college, where i graduated summa cum laude, was honored on both the presidents and deans lists, and became a member of phi theta kappa honor society.</p>
              <br />
              <p>i lwk do some other stuff too. like im currently the treasurer of colorstack here at berea and also work as a teaching assistant .</p>
              <br />
              <p>i also worked as a full-stack swe intern on the berea college software development team. i got to build and tweak web apps using html, css, javascript, and python, fix bugs, make things run smoother, and work with the team to manage code with git and docker.</p>
              <br />
              <p>i use a bunch of different languages, frameworks, and tools. i basically just like learning abt a bunch of different stuff. i also was originally gonna study music production! but ig thats it, so yea. send me an email if ya want.</p>
            </div>
          </div>
        )}

        {/* Projects Window */}
{isProjectsOpen && !isProjectsMinimized && (
  <div 
    className="window glass active" 
    onClick={() => setFocusedWindow('projects')}
    style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: '90%', 
      maxWidth: '900px', 
      height: 'auto', 
      maxHeight: '85vh', 
      zIndex: focusedWindow === 'projects' ? 100 : 50, 
      pointerEvents: 'auto', 
      animation: isProjectsClosing ? 'windowSlideOut 0.3s ease-out forwards' : 'windowSlideIn 0.3s ease-out forwards',
      opacity: focusedWindow === 'projects' || focusedWindow === null ? 1 : 0.7,
      transition: 'opacity 0.2s ease, z-index 0s'
    }}
  >
    <div className="title-bar">
      <div className="title-bar-text">💻 my projects</div>
      <div className="title-bar-controls">
        <button aria-label="Minimize" onClick={handleMinimizeProjects}></button>
        <button aria-label="Maximize" disabled style={{ opacity: 0.5 }}></button>
        <button aria-label="Close" onClick={handleCloseProjects}></button>
      </div>
    </div>
    <div className="window-body" style={{ color: '#000', height: 'calc(100% - 33px)', overflow: 'auto', padding: 0 }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .tabs::after {
          content: none !important;
          display: none !important;
        }
      ` }} />
      <section className="tabs" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <menu role="tablist" aria-label="Projects Timeline">
          {projects.map((proj, index) => (
            <button
              key={proj.id}
              role="tab"
              aria-controls={proj.id}
              aria-selected={activeProjectTab === proj.id}
              onClick={() => setActiveProjectTab(proj.id)}
            >
              {proj.date}
            </button>
          ))}
        </menu>

        {projects.map((proj) => (
          <article
            key={proj.id}
            role="tabpanel"
            id={proj.id}
            hidden={activeProjectTab !== proj.id}
            style={{ overflow: 'auto', display: activeProjectTab === proj.id ? 'block' : 'none' }}
          >
            <div style={{ padding: '0.75rem', color: '#000' }}>
              <fieldset style={{ margin: 0 }}>
                <legend style={{ color: '#000' }}>{proj.technologies}</legend>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#000' }}>
                    {proj.name}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#000' }}>
                    📅 {proj.date}
                  </p>
                  <br />
                  <a 
                    href={proj.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ fontSize: '0.9rem', color: '#000', textDecoration: 'underline' }}
                  >
                    View Project
                  </a>
                </div>

                <details open>
                  <summary style={{ color: '#000' }}>project details</summary>
                  <ul className="tree-view" style={{ marginTop: '0.5rem' }}>
                    {proj.description.map((item, index) => (
                      <li key={index} style={{ color: '#000' }}>{item}</li>
                    ))}
                  </ul>
                </details>

                <details open style={{ marginTop: '1rem' }}>
                  <summary style={{ color: '#000' }}>technologies used</summary>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '0.5rem', 
                    marginTop: '0.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {proj.techStack.map((tech, index) => (
                      <button
                        key={index}
                        style={{
                          cursor: 'default',
                          pointerEvents: 'none'
                        }}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </details>
              </fieldset>
            </div>
          </article>
        ))}
      </section>
    </div>
  </div>
)}

        {/* Experience Window */}
        {isExperienceOpen && !isExperienceMinimized && (
          <div 
            className="window glass active" 
            onClick={() => setFocusedWindow('experience')}
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '90%', 
              maxWidth: '900px', 
              height: '80vh', 
              maxHeight: '600px', 
              zIndex: focusedWindow === 'experience' ? 100 : 50, 
              pointerEvents: 'auto', 
              animation: isExperienceClosing ? 'windowSlideOut 0.3s ease-out forwards' : 'windowSlideIn 0.3s ease-out forwards',
              opacity: focusedWindow === 'experience' || focusedWindow === null ? 1 : 0.7,
              transition: 'opacity 0.2s ease, z-index 0s'
            }}
          >
            <div className="title-bar">
              <div className="title-bar-text">💼 professional experience</div>
              <div className="title-bar-controls">
                <button aria-label="Minimize" onClick={handleMinimizeExperience}></button>
                <button aria-label="Maximize" disabled style={{ opacity: 0.5 }}></button>
                <button aria-label="Close" onClick={handleCloseExperience}></button>
              </div>
            </div>
            <div className="window-body" style={{ color: '#000', height: 'calc(100% - 33px)', overflow: 'auto', padding: 0 }}>
              <section className="tabs" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <menu role="tablist" aria-label="Experience Timeline">
                  {experiences.map((exp, index) => (
                    <button
                      key={exp.id}
                      role="tab"
                      aria-controls={exp.id}
                      aria-selected={activeExpTab === exp.id}
                      onClick={() => setActiveExpTab(exp.id)}
                    >
                      {index === 0 ? 'Current' : exp.period.split(' – ')[0]}
                    </button>
                  ))}
                </menu>

                {experiences.map((exp) => (
                  <article
                    key={exp.id}
                    role="tabpanel"
                    id={exp.id}
                    hidden={activeExpTab !== exp.id}
                    style={{ flex: 1, overflow: 'auto', display: activeExpTab === exp.id ? 'flex' : 'none', flexDirection: 'column' }}
                  >
                    <div style={{ padding: '0.75rem', color: '#000', flex: 1 }}>
                      <fieldset style={{ height: '100%', margin: 0 }}>
                        <legend style={{ color: '#000' }}>{exp.company}</legend>
                        
                        <div style={{ marginBottom: '1rem' }}>
                          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#000' }}>
                            {exp.role}
                          </p>
                          <p style={{ fontSize: '0.9rem', color: '#000' }}>
                            📅 {exp.period} • 📍 {exp.location}
                          </p>
                        </div>

                        <p style={{ marginBottom: '1rem', lineHeight: '1.6', color: '#000' }}>
                          {exp.description}
                        </p>

                        <details open>
                          <summary style={{ color: '#000' }}>key responsibilities</summary>
                          <ul className="tree-view" style={{ marginTop: '0.5rem' }}>
                            {exp.responsibilities.map((item, index) => (
                              <li key={index} style={{ color: '#000' }}>{item}</li>
                            ))}
                          </ul>
                        </details>

                        <details open style={{ marginTop: '1rem' }}>
                          <summary style={{ color: '#000' }}>technologies & skills</summary>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '0.5rem', 
                            marginTop: '0.5rem' 
                          }}>
                            {exp.technologies.map((tech, index) => (
                              <button
                                key={index}
                                style={{
                                  cursor: 'default',
                                  pointerEvents: 'none'
                                }}
                              >
                                {tech}
                              </button>
                            ))}
                          </div>
                        </details>

                        <details open style={{ marginTop: '1rem' }}>
                          <summary style={{ color: '#000' }}>key achievements</summary>
                          <div className="group" style={{ marginTop: '0.5rem', maxWidth: '100%', overflow: 'hidden' }}>
                            {exp.achievements.map((achievement, index) => (
                              <div key={index} style={{ maxWidth: '100%' }}>
                                <input
                                  type="checkbox"
                                  id={`achievement-${exp.id}-${index}`}
                                  checked
                                  readOnly
                                />
                                <label htmlFor={`achievement-${exp.id}-${index}`} style={{ color: '#000', wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: 'calc(100% - 30px)', display: 'inline-block' }}>
                                  {achievement}
                                </label>
                              </div>
                            ))}
                          </div>
                        </details>
                      </fieldset>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        )}
        
        {/* Start Menu */}
{isStartMenuOpen && (
  <div 
    className="window glass active"
    style={{
      position: 'fixed',
      bottom: '40px',
      left: '0px',
      width: '420px',
      height: '500px',
      zIndex: 10001,
      animation: 'startMenuSlideUp 0.2s ease-out',
      borderRadius: '0 8px 0 0'
    }}
  >
    <div className="title-bar">
      <div className="title-bar-text">Start Menu</div>
    </div>
    <div className="window-body" style={{ 
      padding: '0',
      height: 'calc(100% - 33px)',
      display: 'flex',
      flexDirection: 'row',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(220,230,240,0.95) 100%)'
    }}>
      {/* Left Column - User Profile */}
      <div style={{
        width: '60px',
        background: 'linear-gradient(to bottom, rgba(100,120,200,0.3) 0%, rgba(80,100,180,0.4) 100%)',
        borderRight: '1px solid rgba(255,255,255,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
        gap: '15px'
      }}>
        <img 
                src="/images/win7pfp.jpg" 
                alt="User" 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
      }
          }}
        />
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
        }}>
          JJ
        </div>
      </div>

      {/* Right Column - Menu Items */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* User Name Section */}
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          background: 'rgba(255,255,255,0.4)'
        }}>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>Julio Jijon</div>
        </div>

        {/* Programs List */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto',
          padding: '8px 0'
        }}>
          {/* Programs Section */}
          {['aboutme.txt', 'my experience', 'my projects', 'send me an email', 'recycle bin', 'my gallery'].some(item => item.toLowerCase().includes(startMenuSearch.toLowerCase())) && (
            <fieldset style={{ margin: '8px', padding: '8px' }}>
              <legend style={{ color: '#000', fontSize: '12px', fontWeight: 'bold' }}>Programs</legend>
              
              <ul role="menu" style={{ width: '100%' }}>
                {'aboutme.txt'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsAboutMeOpen(true); setFocusedWindow('aboutme'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/txtwin7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>AboutMe.txt</span>
                  </li>
                )}
                {'my experience'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsExperienceOpen(true); setFocusedWindow('experience'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/folderw7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>My Experience</span>
                  </li>
                )}
                {'my projects'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsProjectsOpen(true); setFocusedWindow('projects'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/folderw7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>My Projects</span>
                  </li>
                )}
                {'send me an email'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsEmailOpen(true); setFocusedWindow('email'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/wlivemail7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>Send me an email</span>
                  </li>
                )}
                {'recycle bin'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/recyclebinw7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>Recycle Bin</span>
                  </li>
                )}
                {'my gallery'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { setIsGalleryOpen(true); setFocusedWindow('gallery'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/gallerywin7.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>My Gallery</span>
                  </li>
                )}
              </ul>
            </fieldset>
          )}

          {/* Links Section */}
          {['my github', 'my linkedin'].some(item => item.toLowerCase().includes(startMenuSearch.toLowerCase())) && (
            <fieldset style={{ margin: '8px', padding: '8px' }}>
              <legend style={{ color: '#000', fontSize: '12px', fontWeight: 'bold' }}>Links</legend>
              
              <ul role="menu" style={{ width: '100%' }}>
                {'my github'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { window.open('https://github.com/jjijon7000', '_blank'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/githublogoblack.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>My GitHub</span>
                  </li>
                )}
                {'my linkedin'.toLowerCase().includes(startMenuSearch.toLowerCase()) && (
                  <li 
                    role="menuitem" 
                    tabIndex={0}
                    onClick={() => { window.open('https://www.linkedin.com/in/julio-jijon-jarquin/', '_blank'); setIsStartMenuOpen(false); setStartMenuSearch(''); }}
                    style={{ cursor: 'pointer', paddingLeft: '28px' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,150,255,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <img src="/images/linkedinlogoblack.png" alt="" style={{ width: '16px', height: '16px', marginRight: '12px', verticalAlign: 'middle' }} />
                    <span style={{ verticalAlign: 'middle' }}>My LinkedIn</span>
                  </li>
                )}
              </ul>
            </fieldset>
          )}

          {/* No Results Message */}
          {startMenuSearch && !['aboutme.txt', 'my experience', 'my projects', 'send me an email', 'recycle bin', 'my gallery', 'my github', 'my linkedin'].some(item => item.toLowerCase().includes(startMenuSearch.toLowerCase())) && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '13px' }}>
              No results found for &quot;{startMenuSearch}&quot;
            </div>
          )}
        </div>

        {/* Bottom Section - Search and Power */}
        <div style={{
          borderTop: '1px solid rgba(0,0,0,0.1)',
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}>
          <input 
            type="search" 
            placeholder="Search programs and files..." 
            value={startMenuSearch}
            onChange={(e) => setStartMenuSearch(e.target.value)}
            style={{ 
              flex: 1, 
              fontSize: '12px',
              padding: '6px 8px'
            }}
          />
          <button 
            onClick={() => {
              setIsStartMenuOpen(false);
              setIsLoggingOut(true);
              setLogoutProgress(0);
              
              // Simulate logout progress
              let progress = 0;
              const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                  progress = 100;
                  clearInterval(interval);
                  
                  // Close the tab after a brief delay
                  setTimeout(() => {
                    window.close();
                  }, 300);
                }
                setLogoutProgress(progress);
              }, 200);
            }}
            style={{
              padding: '6px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px'
            }}
          >
            <img src="/images/logoffw7.png" alt="Log Off" style={{ width: '16px', height: '16px' }} />
            Shut Down
          </button>
        </div>
      </div>
    </div>
    <style jsx>{`
      @keyframes startMenuSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </div>
)}
        
        {/* Taskbar */}
        <div className="taskbar">
          <div className="window glass active" style={{ maxWidth: '100%', margin: 0, '--w7-w-bg': '#6f7b86ff' } as React.CSSProperties}>
            <div className="title-bar" style={{ backgroundAttachment: 'local' }}>
              {/* Start Button */}
              <div 
                className="start-button"
                onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                style={{
                  padding: '0',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease',
                  background: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  width: 'auto',
                  height: 'auto'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(100, 200, 255, 0.8))'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
              >
                <img 
                  src="/images/wstartorb.png" 
                  alt="Start" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    display: 'block',
                    pointerEvents: 'none',
                    filter: 'brightness(0.8)',
                  }} 
                />
              </div>
              
              {/* Taskbar Apps */}
              <div className="taskbar-apps">
                {isAboutMeOpen && (
                  <div 
                    key="aboutme-taskbar" 
                    className={focusedWindow === 'aboutme' || focusedWindow === null ? "taskbar-app active" : "taskbar-app"}
                    onClick={() => { setIsAboutMeMinimized(false); setFocusedWindow('aboutme'); }}
                    style={{
                      animation: isClosing ? 'taskbarAppSlideOut 0.3s ease-out forwards' : 'taskbarAppSlideIn 0.3s ease-out forwards',
                      cursor: 'pointer',
                      opacity: focusedWindow === 'aboutme' || focusedWindow === null ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                      borderBottom: focusedWindow !== 'aboutme' && focusedWindow !== null ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                      minWidth: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '32px' : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <img src="/images/txtwin7.png" alt="AboutMe" style={{ width: '20px', height: '20px', marginRight: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '0' : '4px' }} />
                    {!isMobile && [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length < 4 && <span>aboutme.txt</span>}
                  </div>
                )}
                {isEmailOpen && (
                  <div 
                    key="email-taskbar" 
                    className={focusedWindow === 'email' || focusedWindow === null ? "taskbar-app active" : "taskbar-app"}
                    onClick={() => { setIsEmailMinimized(false); setFocusedWindow('email'); }}
                    style={{
                      animation: isEmailClosing ? 'taskbarAppSlideOut 0.3s ease-out forwards' : 'taskbarAppSlideIn 0.3s ease-out forwards',
                      cursor: 'pointer',
                      opacity: focusedWindow === 'email' || focusedWindow === null ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                      borderBottom: focusedWindow !== 'email' && focusedWindow !== null ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                      minWidth: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '32px' : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <img src="/images/wlivemail7.png" alt="Email" style={{ width: '20px', height: '20px', marginRight: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '0' : '4px' }} />
                    {!isMobile && [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length < 4 && <span>send me an email</span>}
                  </div>
                )}
                {isExperienceOpen && (
                  <div 
                    key="experience-taskbar" 
                    className={focusedWindow === 'experience' || focusedWindow === null ? "taskbar-app active" : "taskbar-app"}
                    onClick={() => { setIsExperienceMinimized(false); setFocusedWindow('experience'); }}
                    style={{
                      animation: isExperienceClosing ? 'taskbarAppSlideOut 0.3s ease-out forwards' : 'taskbarAppSlideIn 0.3s ease-out forwards',
                      cursor: 'pointer',
                      opacity: focusedWindow === 'experience' || focusedWindow === null ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                      borderBottom: focusedWindow !== 'experience' && focusedWindow !== null ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                      minWidth: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '32px' : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <img src="/images/folderw7.png" alt="MyExperience" style={{ width: '20px', height: '20px', marginRight: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '0' : '4px' }} />
                    {!isMobile && [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length < 4 && <span>myexperience</span>}
                  </div>
                )}
                {isProjectsOpen && (
                  <div 
                    key="projects-taskbar" 
                    className={focusedWindow === 'projects' || focusedWindow === null ? "taskbar-app active" : "taskbar-app"}
                    onClick={() => { setIsProjectsMinimized(false); setFocusedWindow('projects'); }}
                    style={{
                      animation: isProjectsClosing ? 'taskbarAppSlideOut 0.3s ease-out forwards' : 'taskbarAppSlideIn 0.3s ease-out forwards',
                      cursor: 'pointer',
                      opacity: focusedWindow === 'projects' || focusedWindow === null ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                      borderBottom: focusedWindow !== 'projects' && focusedWindow !== null ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                      minWidth: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '32px' : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <img src="/images/folderw7.png" alt="MyProjects" style={{ width: '20px', height: '20px', marginRight: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '0' : '4px' }} />
                    {!isMobile && [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length < 4 && <span>myprojects</span>}
                  </div>
                )}
                {isGalleryOpen && (
                  <div 
                    key="gallery-taskbar" 
                    className={focusedWindow === 'gallery' || focusedWindow === null ? "taskbar-app active" : "taskbar-app"}
                    onClick={() => { setIsGalleryMinimized(false); setFocusedWindow('gallery'); }}
                    style={{
                      animation: isGalleryClosing ? 'taskbarAppSlideOut 0.3s ease-out forwards' : 'taskbarAppSlideIn 0.3s ease-out forwards',
                      cursor: 'pointer',
                      opacity: focusedWindow === 'gallery' || focusedWindow === null ? 1 : 0.6,
                      transition: 'opacity 0.2s ease',
                      borderBottom: focusedWindow !== 'gallery' && focusedWindow !== null ? '2px solid rgba(255, 255, 255, 0.5)' : 'none',
                      minWidth: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '32px' : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <img src="/images/gallerywin7.png" alt="Gallery" style={{ width: '20px', height: '20px', marginRight: (isMobile || [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length >= 4) ? '0' : '4px' }} />
                    {!isMobile && [isAboutMeOpen, isEmailOpen, isExperienceOpen, isProjectsOpen, isGalleryOpen].filter(Boolean).length < 4 && <span>my gallery</span>}
                  </div>
                )}
              </div>
              {/* Clock */}
              <div className="clock">
                <div className="clock-time">
                  {time.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="clock-date">
                  {time.toLocaleDateString('en-US', { 
                    month: 'numeric', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Windows7Desktop;
