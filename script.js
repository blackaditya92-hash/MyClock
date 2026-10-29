```javascript
// --- 1. Mengambil Elemen HTML yang Dibutuhkan ---
const displayClock = document.getElementById('displayClock');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmButton = document.getElementById('setAlarmButton');
const stopAlarmButton = document.getElementById('stopAlarmButton');
const alarmSound = document.getElementById('alarmSound');
const alarmStatus = document.getElementById('alarmStatus'); // Elemen untuk menampilkan status

let alarmInterval; // Variabel untuk menyimpan ID interval updateClock
let alarmSetTime = null; // Variabel untuk menyimpan waktu alarm yang diatur (format "HH:MM")
let isAlarmRinging = false; // Status apakah alarm sedang berbunyi

// --- 2. Fungsi untuk Menampilkan Jam Real-time dan Mengecek Alarm ---
function updateClock() {
const now = new Date();
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

// Memperbarui tampilan jam
displayClock.textContent = `${hours}:${minutes}:${seconds}`;

// Cek apakah ada alarm yang diatur dan belum berbunyi
if (alarmSetTime && !isAlarmRinging) {
const currentHourMinute = `${hours}:${minutes}`;
if (currentHourMinute === alarmSetTime) {
playAlarm();
// Penting: Setelah alarm berbunyi, kita set isAlarmRinging menjadi true
// agar tidak berbunyi berulang-ulang di detik yang sama.
// Pengguna harus menekan Stop Alarm untuk mereset status ini.
}
}
}

// --- 3. Fungsi untuk Memutar Audio Alarm ---
function playAlarm() {
if (!isAlarmRinging) { // Pastikan alarm hanya berbunyi kalau belum aktif
alarmSound.loop =true; // Agar suara berulang terus
alarmSound.play()
.then(() => {
isAlarmRinging = true; // Set status alarm berbunyi
console.log('Alarm berbunyi!');
alarmStatus.textContent = '🚨 Alarm berbunyi! 🚨';
setAlarmButton.disabled = true; // Nonaktifkan tombol set saat alarm aktif
alarmTimeInput.disabled = true; // Nonaktifkan input waktu
})
.catch(error => {
console.error("Gagal memutar alarm:", error);
alarmStatus.textContent = 'Gagal memutar alarm. Mungkin perlu interaksi pengguna.';
// Di beberapa browser, audio tidak bisa otomatis play tanpa interaksi pengguna.
// Bisa coba tambahkan pesan atau tombol "Play" jika ini sering terjadi.
});
}
}

// --- 4. Fungsi untuk Menghentikan Audio Alarm dan Mereset Status ---
function stopAlarm() {
if (isAlarmRinging || alarmSetTime) { // Hanya proses jika alarm sedang aktif atau teratur
alarmSound.pause(); // Menghentikan suara
alarmSound.currentTime = 0; // Mengatur ulang waktu ke awal
console.log('Alarm dihentikan.');

// Reset semua status alarm
alarmSetTime = null; // Hapus waktu alarm yang diatur
isAlarmRinging = false; // Reset status alarm berbunyi

// Kembalikan tampilan dan fungsionalitas tombol/input
setAlarmButton.textContent = 'Set Alarm';
setAlarmButton.disabled = false;
alarmTimeInput.value = ''; // Kosongkan input waktu
alarmTimeInput.disabled = false;
alarmStatus.textContent = ''; // Kosongkan pesan status
}
}

// --- 5. Event Listener untuk Tombol "Set Alarm" ---
setAlarmButton.addEventListener('click', () => {
const selectedTime = alarmTimeInput.value; // Ambil waktu dari input (format "HH:MM")

if (selectedTime) {
alarmSetTime = selectedTime;
console.log(`Alarm diatur untuk pukul: ${alarmSetTime}`);
alarmStatus.textContent = `Alarm diatur untuk pukul: ${alarmSetTime}`;
setAlarmButton.textContent = 'Alarm Diatur';
// Biarkan updateClock() yang mengecek setiap detik.
// Tidak perlu clearInterval di sini, karena updateClock sudah berjalan terus.
} else {
alert('Mohon atur waktu alarm terlebih dahulu!');
alarmStatus.textContent = 'Pilih waktu alarm dulu ya.';
}
});

// --- 6. Event Listener untuk Tombol "Stop Alarm" ---
stopAlarmButton.addEventListener('click', () => {
stopAlarm();
});

// --- 7. Inisialisasi: Mulai Jam Saat Halaman Dimuat ---
// Panggil updateClock sekali saat halaman pertama kali dimuat
updateClock();
// Kemudian, panggil updateClock setiap 1 detik (1000 milidetik)
alarmInterval = setInterval(updateClock, 1000);
```

---