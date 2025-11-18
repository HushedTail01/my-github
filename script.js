function getRandomLat() {
    // 緯度 -85〜85
    return (Math.random() * 170 - 85).toFixed(4);
}

function getRandomLon() {
    // 経度 -180〜180
    return (Math.random() * 360 - 180).toFixed(4);
}

function getRegionName(lat, lon) {
    lat = Number(lat);
    lon = Number(lon);

    if (lat > 0 && lon > -30 && lon < 60) return "ヨーロッパ近辺";
    if (lat > -35 && lat < 35 && lon > -20 && lon < 50) return "アフリカ周辺";
    if (lat > 5 && lon >= 60 && lon <= 150) return "アジア地域";
    if (lat < 0 && lon > 110 && lon < 180) return "オーストラリア近辺";
    if (lat > 0 && lon < -30 && lon > -130) return "北米地域";
    if (lat < 15 && lon < -30 && lon > -90) return "南米地域";
    return "どこかの海か未確認エリア";
}

function updateRandomLocation() {
    const lat = getRandomLat();
    const lon = getRandomLon();

    const textEl = document.getElementById("text");
    const mapFrame = document.getElementById("mapFrame");
    const linkEl = document.getElementById("openLink");

    const region = getRegionName(lat, lon);

    textEl.innerText = `あなたは【${region}】 (緯度: ${lat}, 経度: ${lon}) にランダム降落しました！`;

    const latNum = Number(lat);
    const lonNum = Number(lon);
    const delta = 1.5;

    const minLon = lonNum - delta;
    const minLat = latNum - delta;
    const maxLon = lonNum + delta;
    const maxLat = latNum + delta;

    const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
    const marker = `${lat},${lon}`;

    const embedUrl =
        `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;

    const pageUrl =
        `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=6/${lat}/${lon}`;

    mapFrame.src = embedUrl;
    linkEl.href = pageUrl;
    linkEl.style.display = "inline-block";
}

document.getElementById("restartBtn").addEventListener("click", updateRandomLocation);

updateRandomLocation();
