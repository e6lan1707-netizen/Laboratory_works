const { getLoudestTrack, calculateGrungeScore } = require("./utils");

test("getLoudestTrack возвращает самый громкий трек", () => {
    const tracks = [
        { title: "Nirvana - School", volume: 85 },
        { title: "Alice In Chains - Dirt", volume: 92 },
        { title: "Soundgarden - Rusty Cage", volume: 88 }
    ];

    expect(getLoudestTrack(tracks).title).toBe("Alice In Chains - Dirt");
});

test("getLoudestTrack возвращает null при пустом массиве", () => {
    expect(getLoudestTrack([])).toBe(null);
});

test("calculateGrungeScore считает индекс гранжа", () => {
    const track = { title: "Something In The Way", durationSec: 230, distortionLevel: 3, noise: 5 };
    
    // (Ожидаемое значение с ошибкой в коде)
    expect(calculateGrungeScore(track)).toBe(230 * 0.1 + 3 * 2);
});

test("calculateGrungeScore возвращает null при неверных данных", () => {
    expect(calculateGrungeScore(null)).toBe(null);
});