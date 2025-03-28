// Color Conversion Utility Functions

/**
 * Converts RGB color values to Hex color code
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} Hex color code
 */
function rgbToHex(r, g, b) {
    // Ensure values are within 0-255 range
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));
    
    // Convert to hex, padding with zero if needed
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
}

/**
 * Converts RGB color values to HSL
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {string} HSL color string
 */
function rgbToHsl(r, g, b) {
    // Normalize RGB values
    r /= 255, g /= 255, b /= 255;
    
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/**
 * Converts Hex color code to RGB
 * @param {string} hex - Hex color code
 * @returns {object} Object with r, g, b properties
 */
function hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Handle 3-digit and 6-digit hex codes
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    
    // Parse hex values
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

/**
 * Converts HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100%)
 * @param {number} l - Lightness (0-100%)
 * @returns {object} Object with r, g, b properties
 */
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}





// Main Application Logic for Color Generator

function generateColor() {
    // Generate random RGB values
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    
    // Convert to different color formats
    let hex = rgbToHex(r, g, b);
    let rgb = `rgb(${r}, ${g}, ${b})`;
    let hsl = rgbToHsl(r, g, b);
    
    // Update color box and display
    document.getElementById("colorBox").style.backgroundColor = rgb;
    document.getElementById("hexCode").innerText = hex;
    document.getElementById("rgbCode").innerText = rgb;
    document.getElementById("hslCode").innerText = hsl;
}

function copyText(id) {
    const textToCopy = document.getElementById(id).innerText;
    
    // Use Clipboard API to copy text
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Optional: Add a temporary visual feedback
            const originalText = document.getElementById(id).innerText;
            document.getElementById(id).innerText = "Copied!";
            setTimeout(() => {
                document.getElementById(id).innerText = originalText;
            }, 1000);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy. Please try again.");
        });
}

// Generate an initial color when page loads
document.addEventListener('DOMContentLoaded', generateColor);