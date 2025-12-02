function getLoudestTrack(tracks){
    if(tracks.length===0) return null;
    return tracks.reduce((max,t)=>t.volume>max.volume? t:max);
}

function calculateGrungeScore(track){
    if(!track || typeof track.durationSec!=="number") return null;
    return track.durationSec*0.1 + track.distortionLevel*2 + track.noise*1.5;
}


let playlist = JSON.parse(localStorage.getItem('playlist')) || [
    { title:"Blew", volume:80, durationSec:162, distortionLevel:6, noise:4 },
    { title:"Rain When I Die", volume:91, durationSec:350, distortionLevel:5, noise:7 },
    { title:"Negative Creep", volume:96, durationSec:184, distortionLevel:9, noise:10 }
];

function savePlaylist(){ localStorage.setItem('playlist',JSON.stringify(playlist)); }


const trackSelect = document.getElementById("trackSelect");
function refreshSelect(){
    trackSelect.innerHTML="";
    playlist.forEach((t,i)=>{
        let opt=document.createElement("option");
        opt.value=i;
        opt.textContent=`${t.title} (${t.volume} dB)`;
        trackSelect.appendChild(opt);
    });
}
refreshSelect();

document.getElementById("calcBtn").onclick = ()=>{
    const track = playlist[trackSelect.value];
    const score = calculateGrungeScore(track);
    document.getElementById("trackResult").innerHTML=`<b>${track.title}</b><br>Гранж-индекс: <b>${score.toFixed(2)}</b>`;
    document.getElementById("volumeBar").style.width = Math.min(track.volume,100)+"%";
};

document.getElementById("loudestBtn").onclick = ()=>{
    const track = getLoudestTrack(playlist);
    const score = calculateGrungeScore(track);
    document.getElementById("trackResult").innerHTML=`🔥 Самый громкий: <b>${track.title}</b> (${track.volume} dB)<br>Гранж-индекс: <b>${score.toFixed(2)}</b>`;
    document.getElementById("volumeBar").style.width = Math.min(track.volume,100)+"%";
};

document.getElementById("addBtn").onclick = ()=>{
    const t = {
        title: document.getElementById("title").value || "Без названия",
        volume: Number(document.getElementById("volume").value)||80,
        durationSec: Number(document.getElementById("duration").value)||180,
        distortionLevel: Number(document.getElementById("distortion").value)||5,
        noise: Number(document.getElementById("noise").value)||3
    };
    playlist.push(t);
    savePlaylist();
    refreshSelect();
    document.getElementById("addResult").textContent=`Добавлен трек: ${t.title} (${t.volume} dB)`;
};

document.getElementById("randomBtn").onclick = ()=>{
    const tr = playlist[Math.floor(Math.random()*playlist.length)];
    document.getElementById("randomResult").innerHTML=`<b>${tr.title}</b><br>Громкость: ${tr.volume} dB<br>Гранж-индекс: ${calculateGrungeScore(tr).toFixed(2)}`;
    document.getElementById("volumeBar").style.width = Math.min(tr.volume,100)+"%";
};


function expect(label,received,expected){
    const ok = received === expected;
    return `${ok?"✔":"❌"} ${label}\n  Получено: ${received}\n  Ожидалось: ${expected}\n`;
}

let results="";
results+=expect("getLoudestTrack проверка",
    getLoudestTrack(playlist).title,
    "Negative Creep"
);
results+=expect("calculateGrungeScore проверка",
    calculateGrungeScore(playlist[2]),
    184*0.1+9*2+10*1.5
);
document.getElementById("tests").textContent=results;
