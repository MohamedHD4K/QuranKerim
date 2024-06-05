let surah = document.getElementById("surah");
let aya = document.getElementById("aya");

let randomSurahNum = Math.floor(Math.random() * 114);
let randomAyaNum;

const storedSurahNum = localStorage.getItem("randomSurahNum");
const storedAyaNum = localStorage.getItem("randomAyaNum");

let timeOut = 60000

if (storedSurahNum !== null && storedAyaNum !== null) {
  randomSurahNum = parseInt(storedSurahNum, 10);
  randomAyaNum = parseInt(storedAyaNum, 10);

  axios
    .get(`https://quranapi.pages.dev/api/${randomSurahNum}.json`)
    .then(function (response) {
      axios
        .get(
          `https://quranapi.pages.dev/api/${randomSurahNum}/${randomAyaNum}.json`
        )
        .then(function (response) {
          console.log(response);

          // تحديث محتوى الصفحة
          surah.innerHTML = response.data.surahNameArabic;
          aya.innerHTML =`${response.data.ayahNo}- ` + response.data.arabic1;

          axios
            .get(
              `http://api.quran-tafseer.com/tafseer/1/${response.data.surahNo}/${response.data.ayahNo}`
            )
            .then(function (response) {
              console.log(response.data.text);

              tafsir.innerHTML = `
            <div class="container">
            <div id="box" class="tafsir-box">
            <h1>تفسير الآية</h1>
            <p>${response.data.ayah_number}- ${response.data.text}</p>
            </div>
            </div>`;
            });
        });
    });
} else {
  axios
    .get(`https://quranapi.pages.dev/api/${randomSurahNum}.json`)
    .then(function (response) {
      randomAyaNum = Math.floor(Math.random() * response.data.totalAyah);

      if (randomSurahNum === 0) {
        randomAyaNum = 1;
      }

      if (randomAyaNum === 0) {
        randomAyaNum = 1;
      }

      axios
        .get(
          `https://quranapi.pages.dev/api/${randomSurahNum}/${randomAyaNum}.json`
        )
        .then(function (response) {
          console.log(response);

          surah.innerHTML = response.data.surahNameArabic;
          aya.innerHTML =`${response.data.ayahNo}- ` + response.data.arabic1;

          localStorage.setItem("randomSurahNum", randomSurahNum);
          localStorage.setItem("randomAyaNum", randomAyaNum);

          axios
            .get(
              `http://api.quran-tafseer.com/tafseer/1/${response.data.surahNo}/${response.data.ayahNo}`
            )
            .then(function (response) {
              console.log(response.data.text);

              tafsir.innerHTML = `
            <div class="container">
            <div id="box" class="tafsir-box">
            <h1>تفسير الآية</h1>
            <p>${response.data.ayah_number}- ${response.data.text}</p>
            </div>
            </div>`;
            });
        });
    });
}

setInterval(function () {
  randomSurahNum = Math.floor(Math.random() * 114);

  axios
    .get(`https://quranapi.pages.dev/api/${randomSurahNum}.json`)
    .then(function (response) {
      randomAyaNum = Math.floor(Math.random() * response.data.totalAyah);

      if (randomSurahNum === 0) {
        randomAyaNum = 1;
      }

      if (randomAyaNum === 0) {
        randomAyaNum = 1;
      }

      axios
        .get(
          `https://quranapi.pages.dev/api/${randomSurahNum}/${randomAyaNum}.json`
        )
        .then(function (response) {
          console.log(response);

          // تحديث محتوى الصفحة
          surah.innerHTML = response.data.surahNameArabic;
          aya.innerHTML = `${response.data.ayahNo}- ` + response.data.arabic1;

          // تخزين الأرقام العشوائية في localStorage
          localStorage.setItem("randomSurahNum", randomSurahNum);
          localStorage.setItem("randomAyaNum", randomAyaNum);

          axios
            .get(
              `http://api.quran-tafseer.com/tafseer/1/${response.data.surahNo}/${response.data.ayahNo}`
            )
            .then(function (response) {
              console.log(response.data.text);

              tafsir.innerHTML = `
            <div class="container">
            <div id="box" class="tafsir-box">
            <h1>تفسير الآية</h1>
            <p>${response.data.ayah_number}- ${response.data.text}</p>
            </div>
            </div>`;
            });
        });
    });
}, timeOut);

document.getElementById("box").addEventListener("click", () => {
  let tafsir = document.getElementById("tafsir");

  if (tafsir.style.visibility === "hidden") {
    tafsir.style.visibility = "visible";
  } else {
    tafsir.style.visibility = "hidden";
  }
});
