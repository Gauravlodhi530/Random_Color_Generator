function generateColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    let rgb = `rgb(${r}, ${g}, ${b})`;
    let hsl = rgbToHsl(r, g, b);

    document.getElementById("colorBox").style.backgroundColor = rgb;
    document.getElementById("hexCode").innerText = hex;
    document.getElementById("rgbCode").innerText = rgb;
    document.getElementById("hslCode").innerText = hsl;
    document.getElementById("colorBox").innerHTML = hex;
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
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

function copyText(id) {
    navigator.clipboard.writeText(document.getElementById(id).innerText);
    alert("Copied: " + document.getElementById(id).innerText);
}
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}