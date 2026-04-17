# Profile Picture Instructions

## How to Add Your Profile Picture

1. **Prepare Your Image:**
   - Use a professional headshot or portrait photo
   - Recommended size: 400x480 pixels (portrait orientation)
   - Supported formats: JPG, PNG, WebP
   - File size: Keep under 500KB for optimal performance

2. **Save Your Image:**
   - Rename your image to: `profile.jpg` (or `profile.png`)
   - Save it to: `src/assets/images/` folder

3. **Accepted File Names:**
   - `profile.jpg` (recommended)
   - `profile.png`
   - If using PNG, update the image path in `src/App.tsx` line 47 from `.jpg` to `.png`

4. **Current Image Path in Code:**
   - The portfolio expects the image at: `./src/assets/images/profile.jpg`
   - The image displays in a 256px × 288px frame with rounded corners

5. **After Adding the Image:**
   - The page will automatically refresh and display your profile picture
   - The image will appear on the right side of the hero section (desktop view)
   - On mobile, it will stack below the text

## Image Display Features:
- ✨ Elegant rounded frame with border
- 🌙 Dark mode support
- 📱 Responsive layout (stacks on mobile, side-by-side on desktop)
- 💫 Subtle gradient overlay for professional look

## Troubleshooting:
- If the image doesn't show, check the file name matches exactly: `profile.jpg` or `profile.png`
- Ensure the file is in the correct folder: `src/assets/images/`
- Make sure the image file is less than 500KB
