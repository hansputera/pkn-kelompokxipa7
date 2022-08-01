import fs from 'node:fs';

// Pembagian kelompok PKN X IPA 7
let kelas = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const rateKelas = kelas.length / 4; // 4 = kelompok yang ditentukan.
const kelompok = [];

function randomSiswa() {
	return kelas[Math.floor(Math.random() * kelas.length)];
}

/// Penentuan ketua kelompok
for (let i = 0; i < 4; i++) {
	const siswa = randomSiswa();
	kelas = kelas.filter((k) => k !== siswa);
	kelompok.push([siswa, []]);
}

/// Pengisian anggota ke kelompok yang tersedia
kelompok.forEach((kel, keli) => {
	while (kelas.length && kelompok[keli][1].length < Math.floor(rateKelas)) {
		const siswa = randomSiswa();
		kelompok[keli][1].push(siswa);
		kelas = kelas.filter((k) => k !== siswa);
	}
});

console.log('Tersisa siswa:', kelas.length);

/// Menulis data yang terkumpul ke file .txt
fs.writeFileSync(
	'./data.txt',
	kelompok
		.map(
			(kel, index) =>
				`- Kelompok ${index + 1} (Ketua: ${kel[0]})\n${kel[1]
					.map((s) => `  * ${s}`)
					.join('\n')}`,
		)
		.join('\n'),
);
