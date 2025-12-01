# 🎬 Legend Player - Batch Media Suite

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-3facd3?style=for-the-badge)](https://anacondy.github.io/Legend-Player/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-success?style=for-the-badge&logo=github)](https://anacondy.github.io/Legend-Player/)
[![Version](https://img.shields.io/badge/Version-5.0.0-blue?style=for-the-badge)](https://github.com/anacondy/Legend-Player/releases)

**🔗 Live Site:** [https://anacondy.github.io/Legend-Player/](https://anacondy.github.io/Legend-Player/)

---

## 📸 Screenshots

### Home Screen
![Home Screen](https://github.com/user-attachments/assets/594fb291-e2c8-46fc-a3ec-134af55c52e0)

### Batch Rename Interface
![Rename Interface](https://github.com/user-attachments/assets/13857986-abf1-42ea-a602-f31234e2de31)

### Media Player
![Media Player](https://github.com/user-attachments/assets/bfbec515-51da-4447-9d83-83a3be26790b)

---

## ✨ Features

- 🎵 **Advanced Media Player** - Play videos, audio, and view images with custom controls
- 📁 **Batch File Renaming** - Rename multiple files with patterns and numbering
- 🔄 **Format Conversion** - Convert images between PNG, JPG, WebP formats
- 🎨 **Modern UI** - Beautiful, responsive design with particle effects
- ⌨️ **Keyboard Controls** - Full keyboard navigation support
- 📱 **Multi-Device Support** - Optimized for desktop, tablet, and mobile
- 🎯 **60 FPS Performance** - GPU-accelerated animations for smooth experience
- 🔒 **Secure** - No data is sent to servers; all processing happens locally
- 🌐 **Works Offline** - Progressive Web App capabilities

---

## 🎮 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Left` | Previous media file |
| `Arrow Right` | Next media file |
| `Arrow Up` | Increase volume |
| `Arrow Down` | Decrease volume |
| `Space` | Play/Pause media |
| `F` | Toggle fullscreen |
| `M` | Mute/Unmute |

---

## 🌐 Use Online (Web Version)

**No installation needed!** Just visit:

### 👉 [https://anacondy.github.io/Legend-Player/](https://anacondy.github.io/Legend-Player/)

The web version works on all modern browsers and devices:
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iOS, Android)

**Optimized for:**
- 16:9 aspect ratio displays
- 20:9 ultra-wide displays
- High DPI/Retina displays
- 60 FPS smooth animations

---

## 💾 Download Desktop Apps

Desktop applications provide a native experience with better performance and offline capabilities.

### Windows

**📥 Download Options:**
- **Installer (Recommended):** `Legend-Player-Setup-5.0.0.exe` - Easy installation with Start Menu shortcuts
- **Portable:** `Legend-Player-5.0.0.exe` - Run without installation

**System Requirements:**
- Windows 10 or later (64-bit)
- 4 GB RAM minimum
- 100 MB free disk space

**Installation Steps:**
1. Download the installer from [Releases](https://github.com/anacondy/Legend-Player/releases)
2. Run the `.exe` file
3. Follow the installation wizard
4. Launch from Start Menu or Desktop shortcut

### macOS

**📥 Download Options:**
- **DMG Image:** `Legend-Player-5.0.0.dmg` - Drag and drop installation
- **ZIP Archive:** `Legend-Player-5.0.0-mac.zip` - Extract and run

**System Requirements:**
- macOS 10.13 (High Sierra) or later
- 4 GB RAM minimum
- 100 MB free disk space

**Installation Steps:**
1. Download the `.dmg` file from [Releases](https://github.com/anacondy/Legend-Player/releases)
2. Open the DMG file
3. Drag the Legend Player app to your Applications folder
4. Launch from Applications or Launchpad

**Note:** First time launch may require allowing the app in System Preferences > Security & Privacy

### Linux

**📥 Download Options:**
- **AppImage:** `Legend-Player-5.0.0.AppImage` - Universal Linux package
- **DEB Package:** `Legend-Player-5.0.0.deb` - For Debian/Ubuntu-based distros

**System Requirements:**
- Ubuntu 18.04+ / Debian 10+ / Fedora 28+ or equivalent
- 4 GB RAM minimum
- 100 MB free disk space

**Installation Steps (AppImage):**
```bash
# Download the AppImage
wget https://github.com/anacondy/Legend-Player/releases/download/v5.0.0/Legend-Player-5.0.0.AppImage

# Make it executable
chmod +x Legend-Player-5.0.0.AppImage

# Run it
./Legend-Player-5.0.0.AppImage
```

**Installation Steps (DEB):**
```bash
# Download the DEB package
wget https://github.com/anacondy/Legend-Player/releases/download/v5.0.0/Legend-Player-5.0.0.deb

# Install it
sudo dpkg -i Legend-Player-5.0.0.deb

# If dependencies are missing, run:
sudo apt-get install -f
```

---

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/anacondy/Legend-Player.git
cd Legend-Player

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Build Desktop Apps
```bash
# Build for current platform
npm run electron-build

# Build for all platforms
npm run electron-build-all
```

---

## 📋 Supported File Formats

### Media Files
- **Video:** MP4, MOV, AVI, MKV, WebM, FLV, WMV, M4V, MPG, MPEG, 3GP, TS
- **Audio:** MP3, WAV, AAC, FLAC, OGG, M4A, WMA, AIFF, ALAC
- **Images:** JPG, PNG, GIF, BMP, TIFF, WebP, SVG, HEIF, HEIC, PSD

### Documents
- PDF, DOC, DOCX, TXT, RTF, ODT, XLS, XLSX, PPT, PPTX, CSV, EPUB

### Code Files
- HTML, CSS, JavaScript, Python, Java, C++, C, PHP, Ruby, Swift, Go, TypeScript

### Other Formats
- Archives: ZIP, RAR, 7Z, TAR, GZ, BZ2, XZ
- Databases: SQL, DB, MDB, ACCDB, SQLite
- Fonts: TTF, OTF, WOFF, WOFF2
- 3D Models: OBJ, FBX, STL, BLEND, DAE

---

## 🔒 Privacy & Security

- ✅ **100% Client-Side Processing** - All file operations happen in your browser
- ✅ **No Data Upload** - Your files never leave your device
- ✅ **No Tracking** - No analytics or user tracking
- ✅ **Open Source** - Full transparency of the code
- ✅ **Secure Sandbox** - Code execution in isolated environment
- ✅ **User Data Protection** - No file data is stored or deleted without explicit action

---

## 🚀 Performance Optimizations

Legend Player is optimized for maximum performance:

- **60 FPS Rendering** - GPU-accelerated animations and transitions
- **Lazy Loading** - Resources loaded only when needed
- **Code Splitting** - Optimized bundle sizes for faster loading
- **Progressive Enhancement** - Works on all devices, enhanced on capable ones
- **Responsive Design** - Adapts to any screen size and aspect ratio
- **Hardware Acceleration** - Uses GPU for smooth video playback
- **Efficient Memory Management** - Handles large files without crashes

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Support

If you find this project useful, please give it a ⭐️ on GitHub!

**Issues & Questions:** [GitHub Issues](https://github.com/anacondy/Legend-Player/issues)

---

**Made with ❤️ by anacondy**