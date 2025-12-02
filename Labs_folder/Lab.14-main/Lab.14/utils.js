// Функция: найти самый громкий трек
function getLoudestTrack(tracks) {
    if (!Array.isArray(tracks) || tracks.length === 0) return null;

    return tracks.reduce((max, t) => t.volume > max.volume ? t : max);
}

// Функция "гранж-индекса"
function calculateGrungeScore(track) {
    if (!track || typeof track.durationSec !== "number") return null;

    // Преднамеренная ошибка: забыли добавить noise в формулу
    // (Правильно должно быть: durationSec * 0.1 + distortionLevel * 2 + noise * 1.5)
    return track.durationSec * 0.1 + track.distortionLevel * 2;
}

module.exports = { getLoudestTrack, calculateGrungeScore };