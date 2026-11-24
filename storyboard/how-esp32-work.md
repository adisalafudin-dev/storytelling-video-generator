---
title: Dari Sensor ke Dashboard
fps: 30
width: 1080
height: 1920
voice: id-ID-ArdiNeural
---

## Sensor ke Dashboard

- duration: auto
- shape: model
- model: models/sensor.glb
- rotationSpeed: 0.4
- camera: 0.8, 0.4, 5.8
- cameraTo: -0.6, 0.2, 5.1
- cameraEase: ease-in-out
- background: gradient(#07111f, #142b45, 180deg)
- narration: "Sensor kecil bisa tampil sebagai grafik di dashboard web. Tapi bagaimana datanya sampai ke sana?"
  @ 0.2 title eyebrow="IOT DASAR" text="Dari _sensor_ ke dashboard" for=3

## Kenalan dengan ESP32

- duration: auto
- transition: fade
- transitionDuration: 0.35
- shape: model
- model: models/esp32.glb
- rotationSpeed: 0.4
- camera: 0.6, 5, 2.6
- cameraTo: 1.4, 4.4, 1.6
- cameraEase: ease-in-out
- background: gradient(#07111f, #1b1040, 180deg)
- narration: "Di tengah semuanya ada ESP32, mikrokontroler murah dengan WiFi bawaan yang membaca sensor dan mengirim hasilnya."
  @ 0.2 title eyebrow="OTAK PERANGKAT" text="Kenalan dengan _ESP32_" for=3
  @ 3.6 callout text="Ada _WiFi_ bawaan" x=70 y=30 for=2.5

## Sensor Membaca

- chapter: iot-flow
- duration: auto
- transition: fade
- transitionDuration: 0.35
- kit: flow
- camera: 0, 0, 12
- cameraTo: 0, 0, 11
- cameraEase: ease-in-out
- background: gradient(#07111f, #142b45, 180deg)
- narration: "Pertama, sensor membaca suhu atau kelembapan, lalu ESP32 mengubahnya menjadi data digital."
  + node id="sensor" label="Sensor" model="models/sensor.glb" pos="-1.7, 1.4, 0" color=#63e6be
  + node id="esp32" label="ESP32" model="models/esp32.glb" rotation="1.5708, 0, 0" pos="1.7, 1.4, 0" color=#4dabf7
  + node id="api" label="Backend" model="models/server.glb" pos="0, 0.2, 0" color=#69db7c
  + node id="db" label="Database" model="models/database.glb" pos="-1.7, -0.9, 0" color=#ffd43b
  + node id="dash" label="Dashboard" model="models/monitor.glb" pos="1.7, -0.9, 0" color=#f783ac
  + link from="sensor" to="esp32"
  + link from="esp32" to="api"
  + link from="api" to="db"
  + link from="api" to="dash"
    @ 0.2 title eyebrow="LANGKAH 1" text="Sensor membaca _data_" for=2.6
    @ 0.2 focus node="sensor" for=1
    @ 1.3 send from="sensor" to="esp32" for=1.2
    @ 2.6 focus node="esp32" for=1

## Kirim Lewat WiFi

- chapter: iot-flow
- duration: auto
- narration: "ESP32 terhubung ke WiFi dan mengirim data berformat JSON lewat HTTP POST ke backend."
  @ 0.2 title eyebrow="LANGKAH 2" text="Kirim lewat _WiFi_" for=2.6
  @ 0.8 send from="esp32" to="api" for=1.4
  @ 2.5 focus node="api" for=1

## Simpan ke Database

- chapter: iot-flow
- duration: auto
- narration: "Backend memvalidasi data itu, lalu menyimpannya ke database agar riwayatnya bisa dilihat kembali."
  @ 0.2 title eyebrow="LANGKAH 3" text="Validasi lalu _simpan_" for=2.6
  @ 0.2 focus node="api" for=1
  @ 1.4 send from="api" to="db" for=1.3
  @ 2.9 focus node="db" for=1

## Tampil di Dashboard

- chapter: iot-flow
- duration: auto
- narration: "Terakhir, dashboard mengambil data dari backend dan menampilkannya sebagai grafik yang terus diperbarui."
  @ 0.2 title eyebrow="LANGKAH 4" text="Tampil sebagai _grafik_" for=2.6
  @ 0.6 send from="api" to="dash" for=1.5
  @ 2.3 focus node="dash" for=1.2

## Ringkasan

- duration: auto
- transition: fade
- transitionDuration: 0.35
- shape: model
- model: models/monitor.glb
- rotationSpeed: 0.4
- camera: 0.7, 1.5, 6.2
- cameraTo: -0.5, 0.3, 5.3
- cameraEase: ease-in-out
- background: gradient(#07111f, #1b1040, 180deg)
- narration: "Sensor, ESP32, WiFi, backend, database, dashboard. Subscribe AdSalL untuk eksperimen IoT lainnya."
  @ 0.2 title eyebrow="RINGKASNYA" text="Dari sensor ke _dashboard_" for=2.3
  @ 2.5 checklist items="Sensor | ESP32 | Backend | Database | Dashboard" for=2
