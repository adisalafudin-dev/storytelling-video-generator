---
title: Siklus Air
fps: 30
width: 1080
height: 1920
---

## Penguapan

- chapter: water-cycle
- duration: 4
- kit: flow
- camera: 0, 0, 9
- background: gradient(#07111f, #123b55, 180deg)
  @ 0.2 title eyebrow="SIKLUS AIR" text="Air terus *bergerak*" for=2.2
  @ 0.2 focus node="ocean" for=0.8
  @ 1 send from="ocean" to="vapor" for=1.4
  + node id="ocean" label="Laut" pos="-1.4, -0.3, 0" color=#339af0 shape=sphere
  + node id="vapor" label="Uap" pos="-0.9, 1.5, 0" color=#74c0fc shape=sphere
  + node id="cloud" label="Awan" pos="1, 1.4, 0" color=#e9ecef shape=sphere
  + node id="rain" label="Hujan" pos="1.5, -0.2, 0" color=#4dabf7 shape=sphere
  + link from="ocean" to="vapor"
  + link from="vapor" to="cloud"
  + link from="cloud" to="rain"
  + link from="rain" to="ocean"
  > Panas matahari menguapkan air dari laut.

## Kondensasi

- chapter: water-cycle
- duration: 3.5
  @ 0.2 focus node="vapor" for=0.8
  @ 1 send from="vapor" to="cloud" for=1.3
  > Uap naik, mendingin, lalu membentuk awan.

## Hujan

- chapter: water-cycle
- duration: 3.5
  @ 0.2 focus node="cloud" for=0.8
  @ 1 send from="cloud" to="rain" for=1.3
  > Tetes air berkumpul dan turun sebagai hujan.

## Pengumpulan

- chapter: water-cycle
- duration: 3.5
  @ 0.2 focus node="rain" for=0.8
  @ 1 send from="rain" to="ocean" for=1.4
  > Air mengalir kembali ke laut. Siklus berulang.
