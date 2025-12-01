import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Upload, FileText, ArrowRight, X, Check, RefreshCw,
  Film, Image as ImageIcon, Music, Play, Pause, 
  Code, Volume2, VolumeX, Maximize2, Minimize2, 
  Box, Cpu, FileDigit, FileCode, Database, Type
} from 'lucide-react';
import './performance.css';

// V5.0: Complete Custom Player, Adaptive Aspect Ratios, Full Keyboard Suite

const LegendBatchSuite = () => {
  const [view, setView] = useState('home'); 
  const [mode, setMode] = useState('rename'); // 'rename', 'convert', 'player'
  
  // Files & Processing
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Player State
  const [activeFileId, setActiveFileId] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [sandboxEnabled, setSandboxEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Settings
  const [prefix, setPrefix] = useState('Physics_Paper_2025_');
  const [startNum, setStartNum] = useState(1);
  const [renameExt, setRenameExt] = useState('');
  const [targetFormat, setTargetFormat] = useState('png'); 
  const [quality, setQuality] = useState(90);

  const [jsZipLoaded, setJsZipLoaded] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);

  // Refs for keyboard handling
  const playerContainerRef = useRef(null);

  // Load Dependencies
  useEffect(() => {
    if (!window.JSZip) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => setJsZipLoaded(true);
      document.head.appendChild(script);
    } else {
      setJsZipLoaded(true);
    }
    setTimeout(() => setBootSequence(false), 1000);
  }, []);

  // --- DUST PARTICLE SYSTEM ---
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const particleCount = 40;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5, 
      durationX: Math.random() * 20 + 10,
      durationY: Math.random() * 10 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.4 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  // --- GLOBAL KEYBOARD NAVIGATION ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only active in Player Mode
      if (mode !== 'player' || files.length === 0) return;

      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const currentIndex = files.findIndex(f => f.id === activeFileId);

      switch(e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (currentIndex < files.length - 1) setActiveFileId(files[currentIndex + 1].id);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentIndex > 0) setActiveFileId(files[currentIndex - 1].id);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(prev + 0.1, 1));
          setIsMuted(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(prev - 0.1, 0));
          break;
        case ' ': // Spacebar
          e.preventDefault();
          // Dispatch custom event for players to catch
          window.dispatchEvent(new CustomEvent('togglePlay'));
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          setIsMuted(prev => !prev);
          break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, files, activeFileId]);

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // --- FILE HANDLING ---
  const handleFileUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        let type = 'unknown';

        // MASSIVE FORMAT SUPPORT
        if (['jpg','jpeg','png','gif','bmp','tiff','tif','webp','svg','heif','heic','psd'].includes(ext)) type = 'image';
        else if (['mp4','mov','avi','mkv','flv','wmv','webm','m4v','mpg','mpeg','3gp','ts'].includes(ext)) type = 'video';
        else if (['mp3','wav','aac','flac','ogg','m4a','wma','aiff','alac'].includes(ext)) type = 'audio';
        else if (['html','css','js','py','java','cpp','c','php','rb','swift','go','ts'].includes(ext)) type = 'code';
        else if (['pdf','doc','docx','txt','rtf','odt','xls','xlsx','ppt','pptx','csv','epub'].includes(ext)) type = 'doc';
        else if (['zip','rar','7z','tar','gz','bz2','xz'].includes(ext)) type = 'archive';
        else if (['exe','msi','app','bat','sh','dmg','apk'].includes(ext)) type = 'exe';
        else if (['ttf','otf','woff','woff2','eot','fon'].includes(ext)) type = 'font';
        else if (['sql','db','mdb','accdb','sqlite','dbf'].includes(ext)) type = 'db';
        else if (['obj','fbx','stl','blend','dae','3ds','max'].includes(ext)) type = '3d';

        return {
          originalFile: file,
          originalName: file.name,
          ext,
          type,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          id: Math.random().toString(36).substr(2, 9),
          status: 'pending',
          previewUrl: URL.createObjectURL(file),
        };
      });
      
      setFiles(prev => [...prev, ...newFiles]);
      setCompleted(false);
      
      if (mode === 'player' && !activeFileId && newFiles.length > 0) {
        setActiveFileId(newFiles[0].id);
      }
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
    if (activeFileId === id) setActiveFileId(null);
  };

  const getNewName = (index, originalName) => {
    const originalExt = originalName.split('.').pop();
    if (mode === 'rename') {
      const num = (parseInt(startNum) + index).toString().padStart(3, '0');
      const finalExt = renameExt.trim() ? renameExt.replace(/^\./, '') : originalExt;
      return `${prefix}${num}.${finalExt}`;
    } else {
      const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
      return `${nameWithoutExt}.${targetFormat}`;
    }
  };

  const processBatch = async () => {
    if (!jsZipLoaded || files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setCompleted(false);

    const zip = new window.JSZip();
    const total = files.length;

    try {
      for (let i = 0; i < total; i++) {
        const file = files[i];
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'processing' } : f));
        
        let fileData = file.originalFile;
        let fileName = getNewName(i, file.originalName);

        if (mode === 'convert' && file.type === 'image' && ['png', 'jpg', 'jpeg', 'webp'].includes(targetFormat)) {
             fileData = await convertImage(file.originalFile, targetFormat, quality);
        } else {
            await new Promise(r => setTimeout(r, 20)); 
        }

        zip.file(fileName, fileData);
        setProgress(((i + 1) / total) * 100);
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'done' } : f));
      }

      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Legend_Batch_${mode}_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setCompleted(true);
    } catch (err) {
      alert("Processing failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const convertImage = (file, format, qualityLvl) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`;
                canvas.toBlob((blob) => resolve(blob), mimeType, qualityLvl / 100);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
  };

  // --- CUSTOM PLAYER COMPONENTS ---

  const CustomMediaControls = ({ mediaRef, isPlaying, setIsPlaying, duration, currentTime, onSeek }) => {
     const formatTime = (time) => {
        if (!time) return "0:00";
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
     };

     return (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
           {/* Timeline */}
           <div className="relative w-full h-1 bg-white/20 cursor-pointer group/timeline" onClick={onSeek}>
              <div 
                className="absolute top-0 left-0 h-full bg-cyan-accent pointer-events-none" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              <div className="absolute -top-1 h-3 w-3 bg-cyan-accent rounded-full transform -translate-x-1/2 opacity-0 group-hover/timeline:opacity-100" style={{ left: `${(currentTime / duration) * 100}%` }}></div>
           </div>

           {/* Controls */}
           <div className="flex justify-between items-center text-white font-mono text-xs">
              <div className="flex items-center gap-4">
                 <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-cyan-accent transition-colors">
                    {isPlaying ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
                 </button>
                 <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                 {/* Volume Visual Only (Global Control) */}
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className={`w-1 h-3 ${i/5 <= volume && !isMuted ? 'bg-cyan-accent' : 'bg-white/20'}`}></div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
     );
  };

  const CustomVideoPlayer = ({ file, volume, isMuted }) => {
      const videoRef = useRef(null);
      const [isPlaying, setIsPlaying] = useState(true); // Auto-play
      const [duration, setDuration] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);
      const [aspectClass, setAspectClass] = useState("w-full h-full");

      useEffect(() => {
          const v = videoRef.current;
          if (!v) return;
          v.volume = isMuted ? 0 : volume;
          if (isPlaying) v.play().catch(() => setIsPlaying(false));
          else v.pause();
      }, [isPlaying, volume, isMuted, file]); // Re-run when file changes

      useEffect(() => {
          const handleToggle = () => setIsPlaying(p => !p);
          window.addEventListener('togglePlay', handleToggle);
          return () => window.removeEventListener('togglePlay', handleToggle);
      }, []);

      const handleTimeUpdate = () => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
      };

      const handleLoadedMetadata = () => {
          if (videoRef.current) {
              setDuration(videoRef.current.duration);
              const { videoWidth, videoHeight } = videoRef.current;
              // Adaptive Aspect Ratio Logic
              if (videoHeight > videoWidth) {
                   setAspectClass("h-full w-auto max-w-full object-contain mx-auto"); // Portrait
              } else {
                   setAspectClass("w-full h-auto max-h-full object-contain mx-auto"); // Landscape
              }
          }
      };

      const handleSeek = (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          if (videoRef.current) {
              videoRef.current.currentTime = percent * videoRef.current.duration;
              setCurrentTime(videoRef.current.currentTime);
          }
      };

      return (
          <div className="relative w-full h-full bg-black group flex items-center justify-center overflow-hidden">
             <video 
                ref={videoRef}
                src={file.previewUrl}
                className={aspectClass}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={() => setIsPlaying(!isPlaying)}
             />
             <CustomMediaControls 
                mediaRef={videoRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                duration={duration}
                currentTime={currentTime}
                onSeek={handleSeek}
             />
          </div>
      );
  };

  const CustomAudioPlayer = ({ file, volume, isMuted }) => {
      const audioRef = useRef(null);
      const [isPlaying, setIsPlaying] = useState(true);
      const [duration, setDuration] = useState(0);
      const [currentTime, setCurrentTime] = useState(0);

      useEffect(() => {
        const a = audioRef.current;
        if (!a) return;
        a.volume = isMuted ? 0 : volume;
        if (isPlaying) a.play().catch(() => setIsPlaying(false));
        else a.pause();
      }, [isPlaying, volume, isMuted, file]);

      useEffect(() => {
        const handleToggle = () => setIsPlaying(p => !p);
        window.addEventListener('togglePlay', handleToggle);
        return () => window.removeEventListener('togglePlay', handleToggle);
    }, []);

      const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        if (audioRef.current) {
            audioRef.current.currentTime = percent * audioRef.current.duration;
        }
      };

      return (
         <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] p-8 relative">
            <audio 
               ref={audioRef} 
               src={file.previewUrl} 
               onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime)}
               onLoadedMetadata={() => setDuration(audioRef.current?.duration)}
               onEnded={() => setIsPlaying(false)}
            />
            
            {/* Visualizer Circle */}
            <div className={`w-64 h-64 rounded-full border-4 border-[#333] flex items-center justify-center mb-8 relative ${isPlaying ? 'animate-pulse' : ''}`}>
               <Music size={80} className={`text-cyan-accent transition-transform duration-500 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
               {/* Spinning Ring */}
               <div className={`absolute inset-0 border-t-4 border-cyan-accent rounded-full ${isPlaying ? 'animate-spin' : 'opacity-0'}`} style={{animationDuration: '3s'}}></div>
            </div>

            {/* Big Controls */}
            <div className="w-full max-w-2xl bg-[#222] p-6 rounded-lg shadow-xl border border-[#333]">
                <div className="flex justify-between text-cyan-accent font-mono text-xs mb-2">
                    <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                    <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
                </div>
                
                {/* Timeline */}
                <div className="relative w-full h-2 bg-[#111] rounded-full cursor-pointer mb-6" onClick={handleSeek}>
                    <div 
                        className="absolute top-0 left-0 h-full bg-cyan-accent rounded-full" 
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                </div>

                <div className="flex justify-center items-center gap-8">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-cyan-accent rounded-full flex items-center justify-center text-[#1a1a1a] hover:scale-105 transition-transform">
                        {isPlaying ? <Pause size={32} fill="currentColor"/> : <Play size={32} fill="currentColor" className="ml-1"/>}
                    </button>
                </div>
            </div>
         </div>
      );
  };

  // --- MAIN RENDERER ---
  const renderPlayerStage = () => {
    const activeFile = files.find(f => f.id === activeFileId);
    if (!activeFile) return (
      <div className="flex flex-col items-center justify-center h-full opacity-30 select-none text-[#1a1a1a]">
        <Box size={64} strokeWidth={1} />
        <p className="font-legend mt-4 tracking-widest uppercase">Select Asset</p>
      </div>
    );

    // VIDEO
    if (activeFile.type === 'video') {
      return <CustomVideoPlayer file={activeFile} volume={volume} isMuted={isMuted} />;
    }

    // AUDIO
    if (activeFile.type === 'audio') {
        return <CustomAudioPlayer file={activeFile} volume={volume} isMuted={isMuted} />;
    }

    // IMAGE
    if (activeFile.type === 'image') {
      return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-[#f0f0f0]">
          <img src={activeFile.previewUrl} className="max-w-full max-h-full shadow-lg object-contain" alt="preview" />
        </div>
      );
    }

    // DOCS (PDF)
    if (activeFile.ext === 'pdf') {
      return <iframe src={activeFile.previewUrl} className="w-full h-full border-none bg-white" title="pdf-viewer" />;
    }

    // CODE / TEXT / DATA
    if (['code', 'doc', 'db', 'archive', 'font', 'exe', '3d'].includes(activeFile.type)) {
      return (
        <div className="w-full h-full flex flex-col bg-[#1e1e1e] relative">
             <CodeLoader file={activeFile} sandboxEnabled={sandboxEnabled} />
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-[#666]">
            <FileDigit size={48} className="mb-4 opacity-50"/>
            <p className="font-mono text-sm">Preview not available for .{activeFile.ext}</p>
        </div>
    );
  };

  const CodeLoader = ({ file, sandboxEnabled }) => {
    const [content, setContent] = useState('');
    
    useEffect(() => {
        const reader = new FileReader();
        reader.onload = (e) => setContent(e.target.result);
        if (file.type === 'code' || file.type === 'doc' || file.type === 'db') {
            reader.readAsText(file.originalFile);
        } else {
            setContent("Binary content: Preview unavailable in text mode.");
        }
    }, [file]);

    const generateSandboxSrc = (code) => `
        <!DOCTYPE html><html><head>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <style>body { font-family: sans-serif; color: #333; padding: 20px; }</style>
        </head><body><div id="root"></div><script type="text/babel">${code}</script></body></html>
    `;

    if (sandboxEnabled && (file.type === 'code')) {
         const src = generateSandboxSrc(content);
         return <iframe srcDoc={src} className="w-full h-full border-none bg-white" title="sandbox" />;
    }

    return (
        <textarea readOnly value={content} className="w-full h-full bg-[#1e1e1e] text-[#a9b7c6] font-mono text-xs p-4 resize-none focus:outline-none custom-scrollbar" />
    );
  };

  return (
    <div className="min-h-screen w-full font-sans relative overflow-hidden transition-colors duration-700 select-none">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&family=Share+Tech+Mono&display=swap');
        
        .font-legend { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        
        .bg-texture {
          background-color: #fcfbf9; 
          background-image: 
            radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }

        .text-cyan-accent { color: #2a9bbd; }
        .bg-cyan-accent { background-color: #3facd3; }
        
        .dust-particle {
          position: absolute;
          background: #3facd3; 
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: multiply;
          animation: floatDust linear infinite, driftSide ease-in-out infinite alternate;
        }

        @keyframes floatDust {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: var(--d-opacity); }
          90% { opacity: var(--d-opacity); }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        @keyframes driftSide {
          from { margin-left: -20px; }
          to { margin-left: 20px; }
        }

        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #3facd3; border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: #fff; }

        .boot-screen {
           position: fixed; inset: 0; background: #1a1a1a; z-index: 100;
           display: flex; align-items: center; justify-content: center;
           transition: opacity 0.5s ease-out;
        }
        .boot-hidden { opacity: 0; pointer-events: none; }
      `}</style>

      {/* Boot Screen */}
      <div className={`boot-screen ${!bootSequence ? 'boot-hidden' : ''}`}>
         <div className="text-center font-mono text-cyan-accent">
            <div className="text-4xl font-bold tracking-widest mb-4">LEGEND_SYS_V5</div>
            <div className="flex gap-1 justify-center">
                <span className="w-2 h-2 bg-cyan-accent animate-bounce" style={{animationDelay:'0s'}}></span>
                <span className="w-2 h-2 bg-cyan-accent animate-bounce" style={{animationDelay:'0.1s'}}></span>
                <span className="w-2 h-2 bg-cyan-accent animate-bounce" style={{animationDelay:'0.2s'}}></span>
            </div>
         </div>
      </div>

      <div className="bg-texture min-h-screen text-[#1a1a1a] flex flex-col relative overflow-hidden">
        
        {/* Dust Particles */}
        {particles.map(p => (
          <div 
            key={p.id} 
            className="dust-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top + 20}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.durationY}s, ${p.durationX}s`,
              animationDelay: `${p.delay}s`,
              '--d-opacity': p.opacity
            }}
          />
        ))}

        {/* HOME VIEW */}
        {view === 'home' && !bootSequence && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 animate-[fadeIn_1s_ease-out]">
            <div className="absolute top-10 left-10 md:left-20 text-left">
              <h3 className="font-legend text-3xl md:text-5xl font-bold uppercase tracking-tight text-cyan-accent leading-none">
                Format<br/>Execute<br/>Control
              </h3>
            </div>

            <div className="text-center mb-12 relative z-10">
              <h1 className="font-legend text-[5rem] md:text-[9rem] leading-[0.85] font-bold uppercase tracking-tighter text-[#0a0a0a] drop-shadow-2xl">
                Batch<br/>Legend
              </h1>
              <div className="h-1 w-32 bg-[#1a1a1a] mx-auto mt-8 mb-8"></div>
              <p className="font-mono text-sm tracking-[0.2em] uppercase opacity-70">
                V5.0 // Adaptive Player // Omni-Format
              </p>
            </div>

            <button 
              onClick={() => setView('work')}
              className="group relative px-16 py-6 bg-[#1a1a1a] text-[#fcfbf9] font-legend text-2xl uppercase tracking-widest overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3 group-hover:text-cyan-accent transition-colors">
                Initialize <ArrowRight className="w-5 h-5"/>
              </span>
            </button>
          </div>
        )}

        {/* WORK VIEW */}
        {view === 'work' && (
          <div className="flex-1 flex flex-col md:flex-row h-screen animate-[fadeIn_0.5s_ease-out]">
            
            {/* SIDEBAR CONTROL */}
            <div className="w-full md:w-[380px] bg-[#1a1a1a] text-[#e0e0e0] flex flex-col h-full shadow-2xl z-20 relative border-r border-[#333]">
              
              <div className="p-6 pb-4">
                  <div onClick={() => setView('home')} className="cursor-pointer mb-6 group flex items-center gap-2 w-fit">
                    <ArrowRight className="rotate-180 w-4 h-4 text-cyan-accent group-hover:-translate-x-1 transition-transform"/>
                    <span className="font-mono text-xs text-cyan-accent tracking-widest">EXIT SYSTEM</span>
                  </div>

                  <h2 className="font-legend text-4xl font-bold uppercase tracking-tighter mb-4">
                    Control<span className="text-cyan-accent">.</span>
                  </h2>

                  <div className="flex bg-[#0a0a0a] p-1 mb-4 border border-[#333]">
                    {['rename', 'convert', 'player'].map(m => (
                        <button 
                          key={m}
                          onClick={() => setMode(m)}
                          className={`flex-1 py-3 text-center font-legend uppercase tracking-wider text-xs transition-all ${mode === m ? 'bg-[#fcfbf9] text-[#1a1a1a]' : 'text-[#666] hover:text-[#aaa]'}`}
                        >
                          {m}
                        </button>
                    ))}
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-4 custom-scrollbar">
                
                {mode === 'rename' && (
                  <div className="space-y-6 animate-[fadeIn_0.3s]">
                    <div className="space-y-2">
                      <label className="font-mono text-cyan-accent text-[10px] uppercase tracking-widest">Prefix Pattern</label>
                      <input 
                        type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] p-3 font-mono text-sm focus:border-cyan-accent focus:outline-none transition-colors"
                        placeholder="File_"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-cyan-accent text-[10px] uppercase tracking-widest">Start Index</label>
                      <input 
                        type="number" value={startNum} onChange={(e) => setStartNum(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] p-3 font-mono text-sm focus:border-cyan-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-cyan-accent text-[10px] uppercase tracking-widest">Target Ext.</label>
                      <input 
                        type="text" value={renameExt} onChange={(e) => setRenameExt(e.target.value)}
                        className="w-full bg-[#111] border border-[#333] p-3 font-mono text-sm focus:border-cyan-accent focus:outline-none transition-colors"
                        placeholder="(Original)"
                      />
                    </div>
                  </div>
                )}

                {mode === 'convert' && (
                   <div className="space-y-6 animate-[fadeIn_0.3s]">
                      <div className="space-y-2">
                        <label className="font-mono text-cyan-accent text-[10px] uppercase tracking-widest">Output Format</label>
                        <div className="grid grid-cols-3 gap-2">
                            {['png', 'jpg', 'webp', 'mp4', 'mp3', 'pdf'].map(fmt => (
                                <button key={fmt} onClick={() => setTargetFormat(fmt)}
                                    className={`py-2 text-[10px] font-mono uppercase border ${targetFormat === fmt ? 'border-cyan-accent text-cyan-accent bg-cyan-accent/10' : 'border-[#333] text-[#666] hover:border-[#888]'}`}>
                                    {fmt}
                                </button>
                            ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                         <div className="flex justify-between">
                            <label className="font-mono text-cyan-accent text-[10px] uppercase tracking-widest">Quality</label>
                            <span className="font-mono text-xs text-cyan-accent">{quality}%</span>
                         </div>
                         <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(e.target.value)}
                            className="w-full h-1 bg-[#333] rounded-lg cursor-pointer accent-cyan-400" />
                      </div>
                   </div>
                )}

                {mode === 'player' && (
                    <div className="animate-[fadeIn_0.3s]">
                        {files.length === 0 ? (
                            <div className="text-[#444] font-mono text-xs text-center py-8 border border-dashed border-[#333]">NO MEDIA</div>
                        ) : (
                            <div className="border border-[#333] bg-[#111]">
                                {files.map((f, i) => (
                                    <div 
                                      key={f.id}
                                      onClick={() => setActiveFileId(f.id)}
                                      className={`p-3 border-b border-[#222] cursor-pointer hover:bg-[#222] transition-colors flex items-center justify-between group ${activeFileId === f.id ? 'bg-[#222] border-l-2 border-l-cyan-accent' : ''}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className={`font-mono text-xs truncate transition-colors ${activeFileId === f.id ? 'text-white' : 'text-[#888] group-hover:text-white'}`}>{f.originalName}</p>
                                            <p className="text-[9px] uppercase tracking-wider text-[#555]">{f.type}</p>
                                        </div>
                                        {activeFileId === f.id && <Play size={10} className="text-cyan-accent fill-current"/>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
              </div>

              <div className="p-6 border-t border-[#333] bg-[#151515]">
                 <label className="flex items-center justify-center w-full py-4 border border-dashed border-[#444] hover:border-cyan-accent hover:bg-[#222] transition-all cursor-pointer group mb-4">
                    <div className="flex flex-col items-center">
                        <Upload className="w-4 h-4 mb-2 text-[#666] group-hover:text-cyan-accent"/>
                        <span className="font-mono uppercase tracking-wider text-[10px] text-[#666] group-hover:text-[#ccc]">Import Assets</span>
                    </div>
                    <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                 </label>

                 {mode !== 'player' && (
                     <button 
                        onClick={processBatch}
                        disabled={files.length === 0 || isProcessing}
                        className={`w-full py-4 font-legend text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300
                          ${files.length === 0 ? 'bg-[#222] text-[#444] cursor-not-allowed' : isProcessing ? 'bg-[#fcfbf9] text-[#1a1a1a]' : completed ? 'bg-green-600 text-white' : 'bg-cyan-accent text-[#1a1a1a] hover:bg-white'}`}
                      >
                        {isProcessing ? "Processing..." : completed ? "Completed" : "Execute"}
                      </button>
                 )}
              </div>
            </div>

            {/* MAIN DISPLAY AREA */}
            <div className="flex-1 bg-texture overflow-y-auto relative p-8 md:p-12 custom-scrollbar flex flex-col">
               
               {mode === 'player' ? (
                   <div className="h-full flex flex-col" ref={playerContainerRef}>
                       <div className="flex justify-between items-start mb-4 border-b-2 border-[#1a1a1a] pb-4 shrink-0">
                           <div>
                               <h3 className="font-legend text-4xl md:text-5xl font-bold uppercase tracking-tighter text-[#1a1a1a] leading-none">
                                   Media <br/><span className="text-red-500">Player</span>
                               </h3>
                           </div>
                           
                           <div className="flex flex-col items-end gap-2">
                               <div className="flex gap-4 font-mono text-xs text-[#888] uppercase tracking-widest">
                                   <div className="flex items-center gap-1">
                                      {isMuted ? <VolumeX size={14} className="text-red-500"/> : <Volume2 size={14}/>}
                                      <span>VOL {Math.round(volume * 100)}%</span>
                                   </div>
                                   <div onClick={toggleFullscreen} className="cursor-pointer hover:text-cyan-accent">
                                      {isFullscreen ? "EXIT FULL" : "FULLSCREEN [F]"}
                                   </div>
                               </div>
                               
                               <div 
                                 onClick={() => setSandboxEnabled(!sandboxEnabled)}
                                 className="cursor-pointer group flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
                               >
                                  Mode: 
                                  <span className={`font-bold transition-all duration-300 ${sandboxEnabled ? 'text-red-500' : 'text-[#1a1a1a]'}`}>
                                      {sandboxEnabled ? "SANDBOX_ON" : "SANDBOX_OFF"}
                                  </span>
                               </div>
                           </div>
                       </div>
                       
                       {/* ADAPTIVE STAGE */}
                       <div className="flex-1 flex items-center justify-center bg-[#f4f4f4] border border-[#ddd] shadow-inner relative overflow-hidden p-2">
                           {renderPlayerStage()}
                       </div>
                   </div>
               ) : (
                   /* MANIFEST LIST */
                   <div className="max-w-5xl mx-auto w-full">
                     <div className="flex justify-between items-end mb-12 pb-4 border-b-2 border-[#1a1a1a]">
                        <div>
                          <h3 className="font-legend text-4xl text-[#1a1a1a] uppercase font-bold tracking-tight">Manifest</h3>
                          <p className="font-mono text-xs text-[#888] mt-2 uppercase tracking-wide">Queue: <span className="text-red-500 font-bold">{files.length}</span></p>
                        </div>
                        {files.length > 0 && (
                          <button onClick={() => {setFiles([]); setCompleted(false);}} className="text-xs font-mono uppercase tracking-widest text-red-500 hover:text-red-700 border-b border-red-500/30">Clear</button>
                        )}
                     </div>

                     {files.length === 0 ? (
                       <div className="h-[50vh] flex flex-col items-center justify-center border-2 border-dashed border-[#000]/10 rounded-lg">
                          <Cpu className="w-12 h-12 text-[#1a1a1a]/40 mb-4" />
                          <p className="font-legend text-xl text-[#1a1a1a]/40 uppercase tracking-widest">System Idle</p>
                       </div>
                     ) : (
                       <div className="space-y-2">
                         <div className="grid grid-cols-12 gap-4 px-4 font-mono text-[10px] text-[#999] uppercase tracking-widest">
                            <div className="col-span-1">Type</div>
                            <div className="col-span-5">Source</div>
                            <div className="col-span-5">Target</div>
                            <div className="col-span-1">Action</div>
                         </div>

                         {files.map((file, idx) => (
                           <div key={file.id} className="grid grid-cols-12 gap-4 items-center bg-white p-4 shadow-sm border-l-4 border-transparent hover:border-cyan-accent hover:shadow-lg transition-all duration-300">
                              <div className="col-span-1">
                                {file.type === 'image' ? <ImageIcon size={14} className="text-[#888]"/> : 
                                 file.type === 'video' ? <Film size={14} className="text-red-400"/> : 
                                 file.type === 'audio' ? <Music size={14} className="text-purple-400"/> :
                                 file.type === 'code' ? <FileCode size={14} className="text-blue-400"/> :
                                 file.type === 'db' ? <Database size={14} className="text-orange-400"/> :
                                 file.type === 'font' ? <Type size={14} className="text-green-400"/> :
                                 <FileText size={14} className="text-[#888]"/>}
                              </div>
                              <div className="col-span-5 overflow-hidden">
                                <p className="font-mono text-xs truncate text-[#444]">{file.originalName}</p>
                              </div>
                              <div className="col-span-5 overflow-hidden flex items-center gap-2">
                                <ArrowRight size={10} className="text-[#ccc]"/>
                                <p className={`font-mono text-xs font-bold truncate ${mode === 'convert' ? 'text-red-500' : 'text-[#1a1a1a]'}`}>
                                    {getNewName(idx, file.originalName)}
                                </p>
                              </div>
                              <div className="col-span-1 flex justify-end">
                                 <button onClick={() => removeFile(file.id)} className="text-red-300 hover:text-red-600"><X size={14} /></button>
                              </div>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegendBatchSuite;
