const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6155921183:AAGN-hiuJtKpszhEEEsCGlK6eIu_Cz2qQOU', { polling: true });
const path = require('path');

const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const token = '6155921183:AAGN-hiuJtKpszhEEEsCGlK6eIu_Cz2qQOU';
const bots = new TelegramBot(token, {polling: true});

bots.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  bots.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
  
    if (messageText === '/start') {
      const startMessage = 'Selamat Datang di Bot Awan\n\n' +
        '/kirimfile kunci jawaban\n' +
        '/surpres alvin banget loch abl abl\n' +
        'masih kosong\n\n' +
        'Ketik apa saja untuk menampilkan di buku !';
  
      bots.sendMessage(chatId, startMessage);
    } else {
      // Penanganan pesan lainnya...
    }
  });
  

  if (messageText === '/kirimfile') {
    const folderPath = path.join(__dirname, 'jawaban'); // Ganti dengan path folder yang berisi file-file yang ingin Anda kirim

    // Kunci Jawaban
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      // Kirim setiap file secara terpisah
      files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        bot.sendDocument(chatId, filePath);
      });
    });
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Tambahkan logika atau respons sesuai kebutuhan Anda
  // Contoh: Mengirim semua gambar dalam folder jika pesan adalah '/kirimgambar'
  if (messageText === '/surpres') {
    const folderPath = path.join(__dirname, 'sureprize'); // Ganti dengan path folder yang berisi gambar-gambar yang ingin Anda kirim

    // Membaca semua file gambar dalam folder
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      // Hanya mengirim file dengan ekstensi gambar tertentu (misalnya .jpg, .png)
      const imageExtensions = ['.jpg', '.png'];
      const imageFiles = files.filter(file => imageExtensions.includes(path.extname(file)));

      // Kirim setiap file gambar secara terpisah
      imageFiles.forEach((file) => {
        const imagePath = path.join(folderPath, file);
        bot.sendPhoto(chatId, imagePath);
      });
    });
  } else {
    // Penanganan pesan lainnya...
  }
});

  
registerFont('RationalRegular.ttf', { family: 'FontFamilyName' });

// Tanggapi pesan yang diterima
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const receivedText = msg.text;

  // hanya huruf
  if (receivedText.startsWith('/')) {
    return; 
  }
 
  // Buat kanvas
  const canvas = createCanvas(350, 500);
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = true;

  // Muat gambar latar belakang
  const backgroundImage = await loadImage('bukus.jpg');
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  // Atur properti teks
  ctx.font = '7px FontFamilyName';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // membuat variabel untuk posisi text
  const textX = 35;
  const textY = 66;

  // Tulis teks pada kanvas
  ctx.fillText(receivedText, textX, textY);

  // Dapatkan data gambar dalam format base64
  const imageBase64 = canvas.toDataURL('image/jpg', 0.8).split(';base64,').pop();

  // Kirim gambar ke pengguna
  bot.sendPhoto(chatId, Buffer.from(imageBase64, 'base64'), { caption: 'Terima Kasih made by @rdhookr(instagram)' });
});

// foto profil

