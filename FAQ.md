# Frequently Asked Questions (FAQ)

## General Questions

### What is Legend Player?

Legend Player is an advanced media player and batch file processing tool that runs entirely in your browser. It allows you to:
- Play videos, audio, and view images
- Batch rename multiple files
- Convert images between formats
- Preview various file types

### Is it free?

Yes! Legend Player is completely free and open-source under the MIT License.

### Do I need to install anything?

No installation needed for the web version! Just visit [https://anacondy.github.io/Legend-Player/](https://anacondy.github.io/Legend-Player/)

For a native desktop experience, you can download the desktop apps for Windows, macOS, or Linux.

## Privacy & Security

### Is my data safe?

Absolutely! Legend Player processes everything locally in your browser. Your files never leave your device, and no data is sent to any servers.

### Do you collect any data?

No. We don't collect any user data, use analytics, or track your usage in any way.

### Can I use it offline?

Yes! Once the web app loads, it can work offline. The desktop apps work completely offline.

## Features

### What file formats are supported?

**Media:**
- Videos: MP4, MOV, AVI, MKV, WebM, and many more
- Audio: MP3, WAV, FLAC, AAC, OGG, and others
- Images: JPG, PNG, GIF, WebP, SVG, and more

**Documents:**
- PDF, Word, Excel, PowerPoint, and text files

**Code:**
- HTML, CSS, JavaScript, Python, Java, C++, and more

See the README for a complete list.

### Can I convert between video formats?

Currently, video conversion is not supported. The app supports image format conversion (PNG, JPG, WebP).

### How many files can I process at once?

There's no hard limit, but processing hundreds of files may slow down based on your device's capabilities.

### Does it work on mobile devices?

Yes! The web version is fully responsive and works on tablets and smartphones. However, the desktop apps are only for computers.

## Technical Questions

### What browsers are supported?

Modern browsers with ES6 support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### What are the system requirements?

**Web Version:**
- Modern browser
- 2 GB RAM minimum
- Internet connection for initial load

**Desktop Apps:**
- Windows 10+, macOS 10.13+, or Linux
- 4 GB RAM
- 100 MB disk space

### Why does the app need 60fps?

Smooth 60fps animations provide a better user experience, especially when:
- Scrubbing through videos
- Navigating through large file lists
- Using the particle animation effects

### Can I run it on a Raspberry Pi?

The web version may work on Raspberry Pi 4 or newer with a modern browser, but performance may vary.

## Usage Questions

### How do I batch rename files?

1. Click "Initialize" on the home screen
2. Select "rename" mode
3. Set your prefix pattern and starting number
4. Upload files
5. Click "Execute"
6. Download the ZIP file with renamed files

### How do I convert images?

1. Select "convert" mode
2. Choose output format (PNG, JPG, or WebP)
3. Adjust quality slider
4. Upload images
5. Click "Execute"

### Can I undo a conversion?

The original files are never modified. You download a new ZIP file with converted files, so your originals remain safe.

### What keyboard shortcuts are available?

- `Arrow Keys`: Navigate files and control volume
- `Space`: Play/Pause
- `F`: Fullscreen
- `M`: Mute/Unmute

See README for the complete list.

## Troubleshooting

### The app won't load

- Clear your browser cache
- Try a different browser
- Check your internet connection
- Disable browser extensions that might interfere

### Files won't upload

- Check file size (very large files may cause issues)
- Ensure the file format is supported
- Try uploading fewer files at once

### Video/Audio won't play

- The browser may not support the codec
- Try converting to a more common format (MP4, MP3)
- Check browser console for errors

### Desktop app won't open

**Windows:**
- Allow the app in Windows Defender
- Right-click > Properties > Unblock

**macOS:**
- System Preferences > Security & Privacy > Open Anyway
- Or: `xattr -cr /Applications/Legend\ Player.app`

**Linux:**
- Ensure the AppImage is executable: `chmod +x Legend-Player.AppImage`

### Performance is slow

- Close other browser tabs/applications
- Try processing fewer files at once
- Use the desktop app for better performance
- Check if hardware acceleration is enabled in browser

## Contributing

### How can I contribute?

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:
- Reporting bugs
- Suggesting features
- Submitting code

### I found a bug. What should I do?

Please report it on [GitHub Issues](https://github.com/anacondy/Legend-Player/issues) with:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

### Can I request a feature?

Yes! Open an issue with the "enhancement" label and describe your feature idea.

## Licensing

### Can I use this in my project?

Yes! Legend Player is MIT licensed. You can use, modify, and distribute it freely. See the [LICENSE](LICENSE) file for details.

### Can I sell it?

The MIT license allows commercial use, but we encourage keeping it free and open-source.

## Support

### Where can I get help?

- Check this FAQ first
- Search [GitHub Issues](https://github.com/anacondy/Legend-Player/issues)
- Open a new issue if you can't find an answer
- Check the [README](README.md) for documentation

### Is there a Discord/Slack?

Not currently. Please use GitHub Issues for all questions and discussions.

---

**Didn't find your answer?** [Open an issue](https://github.com/anacondy/Legend-Player/issues) and we'll help you out!
