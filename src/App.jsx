import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Play, Pause, X, Music, Calendar, User, AlertCircle } from 'lucide-react';

/**
 * TNMCity - Tuesday Night Music Club Archive
 * * DATA SOURCE: Embedded directly below (no external file needed).
 * VISUALS: Figures are black geometric shapes.
 */

// --- CONFIGURATION ---
const SHAPES = ['circle', 'square', 'triangle', 'pentagon', 'star', 'diamond'];

// --- RAW DATA (Cleaned & Embedded) ---
const RAW_RECORDINGS = [
  { "rawTitle": "9 16 25 Darren Ambien", "url": "https://soundcloud.com/11thaverecords/9-16-25-darren-ambien-16", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 23 25 Jill Circles", "url": "https://soundcloud.com/11thaverecords/9-23-25-jill-circles-18", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 12 25 Kristin Unlashing", "url": "https://soundcloud.com/11thaverecords/8-12-25-kristin-unlashing-21", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "10 14 25 Josh Limbo", "url": "https://soundcloud.com/11thaverecords/10-14-25-josh-limbo-8", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 19 25 tryina get to u.logicx", "url": "https://soundcloud.com/11thaverecords/8-19-25-tryina-get-to-ulogicx-26", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 23 25 Laci 29", "url": "https://soundcloud.com/11thaverecords/9-23-25-laci-29-19", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 23 25 Layla Chaos inside of me", "url": "https://soundcloud.com/11thaverecords/9-23-25-layla-chaos-inside-of-me-20", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 12 25 Theo Guiollotine", "url": "https://soundcloud.com/11thaverecords/8-12-25-theo-guiollotine-22", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 17 25 Monte Misunderstanding", "url": "https://soundcloud.com/11thaverecords/9-17-25-monte-misunderstanding-17", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 19 25 i wont do want u tell me", "url": "https://soundcloud.com/11thaverecords/8-19-25-i-wont-do-want-u-tell-me-25", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "10 14 25 Monte Oregon", "url": "https://soundcloud.com/11thaverecords/10-14-25-monte-orgeon-9", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 2 25 Michael naturally leaving", "url": "https://soundcloud.com/11thaverecords/9-2-25-matthew-naturally-leaving-12", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 9 25 oscar stop light", "url": "https://soundcloud.com/11thaverecords/9-9-25-oscar-stop-light-15", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "10 28 25 Take a look around", "url": "https://soundcloud.com/11thaverecords/10-28-25-take-a-look-around-27", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 12 25 Trevor landslide", "url": "https://soundcloud.com/11thaverecords/8-12-25-trevor-landslide-23", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 11 25 Jimmy Pavement Princess", "url": "https://soundcloud.com/11thaverecords/11-11-25-jimmy-pavement-princess-2", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 4 25 Sam Hirst How she comes to me", "url": "https://soundcloud.com/11thaverecords/11-4-25-sam-hirst-how-she-comes-to-me-6", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 9 25 Trevor why is everyone high all the time", "url": "https://soundcloud.com/11thaverecords/9-9-25-trevor-why-is-everyone-high-all-the-time-14", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 2 25 Sam Hirst Money", "url": "https://soundcloud.com/11thaverecords/9-2-25-sam-hirst-money-13", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "10 21 25 two ships", "url": "https://soundcloud.com/11thaverecords/10-21-25-two-ships-10", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "10 7 25 gooning at the hostile + cheek squeek", "url": "https://soundcloud.com/11thaverecords/10-7-25-gooning-at-the-hostile-cheek-squeek-7", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "9 2 25 Brett Java + Funk 1", "url": "https://soundcloud.com/11thaverecords/9-2-25-brett-java-funk-1-11", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "8 19 25 Darren - the judgement of solomon", "url": "https://soundcloud.com/11thaverecords/8-19-25-darren-the-judgement-of-solomon-24", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 4 25 Crystal frozen pizza night", "url": "https://soundcloud.com/11thaverecords/11-4-25-krystal-11-pm-5", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 11 25 Alie between the tides", "url": "https://soundcloud.com/11thaverecords/11-11-25-alie-between-the-tides-1", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 4 25 Hannah Casey bleeding hearts", "url": "https://soundcloud.com/11thaverecords/11-4-25-hannah-casey-bleeding-hearts-4", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "11 11 25 tryina get to u", "url": "https://soundcloud.com/11thaverecords/11-11-25-tryina-get-to-u-3", "uploadDate": "2025-11-12T23:33:27.000Z" },
  { "rawTitle": "5 20 25 Lillian ten tons of steel", "url": "https://soundcloud.com/11thaverecords/5-20-25-lillian-ten-tons-of-steel-15", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "8 5 25 TNMC BAND - somebodys boyfriend", "url": "https://soundcloud.com/11thaverecords/8-5-25-tnmc-band-somebodys-boyfriend-31", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 22 4 lydia the other side", "url": "https://soundcloud.com/11thaverecords/4-22-4-lydia-the-other-side-3", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 17 25 John Hollywood Come Back and Hold Me", "url": "https://soundcloud.com/11thaverecords/6-17-25-john-hollywood-come-back-and-hold-me-23", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "7 15 25 Amelyia - Make U Feel Like", "url": "https://soundcloud.com/11thaverecords/7-15-25-amelyia-make-u-feel-like-29", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "7 15 25 Monty Day Dreaming", "url": "https://soundcloud.com/11thaverecords/7-15-25-monty-day-dreaming-30", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "7 1 25 Jill The Giving Tree", "url": "https://soundcloud.com/11thaverecords/7-1-25-jill-the-giving-tree-26", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 22 24 MEG bloomfield blues", "url": "https://soundcloud.com/11thaverecords/4-22-24-meg-bloomfield-blues-4", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 13 25 Sage Easy to love", "url": "https://soundcloud.com/11thaverecords/5-13-25-sage-easy-to-love-13", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 6 25 trevor horrible violent blood everywhere", "url": "https://soundcloud.com/11thaverecords/5-6-25-trevor-horrible-violent-blood-everywhere-11", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 15 25 Monty Lately - Eggs and Tacos", "url": "https://soundcloud.com/11thaverecords/4-15-25-monty-lately-eggs-and-tacos-2", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 27 25 Zach Kyser Thoughts of u", "url": "https://soundcloud.com/11thaverecords/5-27-25-zach-kyser-thoughts-of-u-18", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 24 25 Monte Lately - My Reason", "url": "https://soundcloud.com/11thaverecords/6-24-25-monte-lately-my-reason-24", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 10 25 Mary Caffeniating worms", "url": "https://soundcloud.com/11thaverecords/6-10-25-mary-caffeniating-worms-20", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 29 25 Matty - Fresh", "url": "https://soundcloud.com/11thaverecords/4-29-25-matty-fresh-7", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 17 25 Jimmy Levi Over", "url": "https://soundcloud.com/11thaverecords/6-17-25-jimmy-levi-over-22", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 22 25 Sam Hirst Far Away From Me", "url": "https://soundcloud.com/11thaverecords/4-22-25-sam-hirst-far-away-from-me-5", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 6 25 Jemima Offensive Fantasy", "url": "https://soundcloud.com/11thaverecords/5-6-25-jemima-offensive-fantasy-8", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "7 1 25 matti the sidewalks", "url": "https://soundcloud.com/11thaverecords/7-1-25-matti-the-sidewalks-27", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 6 25 Monty Like YOUUUU", "url": "https://soundcloud.com/11thaverecords/5-6-25-monty-like-youuuu-9", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 10 25 Tucker let us cake (its not cake)", "url": "https://soundcloud.com/11thaverecords/6-10-25-tucker-let-us-cake-its-not-cake-21", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "7 8 25 killing in the name of", "url": "https://soundcloud.com/11thaverecords/7-8-25-killing-in-the-name-of-28", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 27 25 Audie The Parade", "url": "https://soundcloud.com/11thaverecords/5-27-25-audie-the-parade-17", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 20 25 Mitch Rocket hometown", "url": "https://soundcloud.com/11thaverecords/5-20-25-mitch-rocket-hometown-16", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 20 25 Darren WITHOUT SIN", "url": "https://soundcloud.com/11thaverecords/5-20-25-darren-without-sin-14", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 13 25 Emma and Alex - So Good", "url": "https://soundcloud.com/11thaverecords/5-13-25-emma-and-alex-so-good-12", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 10 25 Krystal Shaking in the rain", "url": "https://soundcloud.com/11thaverecords/6-10-25-krystal-shaking-in-the-rain-19", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 29 25 Jimmy Dry Week", "url": "https://soundcloud.com/11thaverecords/4-29-25-jimmy-dry-week-6", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "6 24 25 Sam Regan - Reagan Nancy Boy", "url": "https://soundcloud.com/11thaverecords/6-24-25-sam-regan-reagan-nancy-boy-25", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 15 25 Dan colors on the map", "url": "https://soundcloud.com/11thaverecords/4-15-25-dan-colors-on-the-map-1", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "5 6 25 Sam Hirst Cinammon Freckle", "url": "https://soundcloud.com/11thaverecords/5-6-25-sam-hirst-cinammon-freckle-10", "uploadDate": "2025-08-06T22:02:01.000Z" },
  { "rawTitle": "4 8 25 Adam Friedman The Last Lover", "url": "https://soundcloud.com/11thaverecords/4-8-25-adam-friedman-the-last", "uploadDate": "2025-04-14T19:56:49.000Z" },
  { "rawTitle": "4 8 25 Alia Morning Lullaby", "url": "https://soundcloud.com/11thaverecords/4-8-25-alia-morning-lullaby", "uploadDate": "2025-04-14T19:56:26.000Z" },
  { "rawTitle": "3 4 25 Darren I Like", "url": "https://soundcloud.com/11thaverecords/3-4-25-darren-i-like-11", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 25 25 darren green shoots", "url": "https://soundcloud.com/11thaverecords/3-25-25-darren-green-shoots-17", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 11 25 brian barr i wanna be in love", "url": "https://soundcloud.com/11thaverecords/3-11-25-brian-barr-i-wanna-be-in-love-12", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 18 25 matty morning train", "url": "https://soundcloud.com/11thaverecords/3-18-25-matty-morning-train-15", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "4 1 25 Monty Cost of Living", "url": "https://soundcloud.com/11thaverecords/4-1-25-monty-cost-of-living-19", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "4 1 25 matty fall away", "url": "https://soundcloud.com/11thaverecords/4-1-25-matty-fall-away-20", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 18 25 flora", "url": "https://soundcloud.com/11thaverecords/3-18-25-flora-14", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "4 1 25 Dan Together", "url": "https://soundcloud.com/11thaverecords/4-1-25-dan-together-18", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "1 28 25 Sage The Devil I know", "url": "https://soundcloud.com/11thaverecords/1-28-25-sage-the-devil-i-know-8", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 18 25 Chris Mendoza love me better", "url": "https://soundcloud.com/11thaverecords/3-18-25-doze-love-me-better-13", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "2 18 25 Social Dingo bah bah", "url": "https://soundcloud.com/11thaverecords/2-18-25-social-dingo-bah-bah-5", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 18 25 matty morning train", "url": "https://soundcloud.com/11thaverecords/3-18-25-matty-morning-train-2", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 4 25 Alex For WHILE", "url": "https://soundcloud.com/11thaverecords/3-4-25-alex-for-while-1", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "2 25 25 Amaya", "url": "https://soundcloud.com/11thaverecords/2-25-25-maya-3", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "2 25 25 Darren Like That", "url": "https://soundcloud.com/11thaverecords/2-25-25-darren-like-that-4", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "2 4 25 Zach Kysar Pictures", "url": "https://soundcloud.com/11thaverecords/2-4-25-zach-kysar-pictures-6", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "2 4 25 Trevor Silver Lines", "url": "https://soundcloud.com/11thaverecords/2-4-25-trevor-silver-lines-7", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "1 28 25 No Parking Everyone Will Die", "url": "https://soundcloud.com/11thaverecords/1-28-25-no-parking-everyone-will-die-9", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "3 25 25 Alie call me diana", "url": "https://soundcloud.com/11thaverecords/3-25-25-alie-call-me-diana-16", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "1 28 25 Chloe MR KNOW IT ALLLLLL", "url": "https://soundcloud.com/11thaverecords/1-28-25-chloe-mr-know-it-allllll-10", "uploadDate": "2025-04-09T00:04:24.000Z" },
  { "rawTitle": "10 22 24 Gavi Silverman - the first time", "url": "https://soundcloud.com/11thaverecords/10-22-24-gavi-silverman-the", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "10 15 24 Trevor heavy things", "url": "https://soundcloud.com/11thaverecords/10-15-24-trevor-heavy-things", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "12 10 24 zach road trips", "url": "https://soundcloud.com/11thaverecords/12-10-24-zach-road-trips", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "12 17 24 Sweet Lew - She wants to cry", "url": "https://soundcloud.com/11thaverecords/12-17-24-sweet-lew-she-wants", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "10 22 24 lonely dingo da da da", "url": "https://soundcloud.com/11thaverecords/10-22-24-lonely-dingo-da-da-da", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "12 17 24 Caroline Afterglow", "url": "https://soundcloud.com/11thaverecords/12-17-24-caroline-afterglow", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 14 25 darren king of kings", "url": "https://soundcloud.com/11thaverecords/1-14-25-darren-king-of-kings", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 7 25 Flora never ask", "url": "https://soundcloud.com/11thaverecords/1-7-25-flora-never-ask", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "11 6 24 Mars", "url": "https://soundcloud.com/11thaverecords/11-6-24-mars", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "12 10 24 trevor winter", "url": "https://soundcloud.com/11thaverecords/12-10-24-trevor-winter", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "10 15 24 Jimmy what does it mean to be well", "url": "https://soundcloud.com/11thaverecords/10-15-24-jimmy-what-does-it", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "10 15 24 Chloe", "url": "https://soundcloud.com/11thaverecords/10-15-24-chloe", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "12 17 24 Chloe Lost Bawdy", "url": "https://soundcloud.com/11thaverecords/12-17-24-chloe-lost-bawdy", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 14 25 Sage To The Moon", "url": "https://soundcloud.com/11thaverecords/1-14-25-sage-to-the-moon", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 7 25 Tsiamo Light Will Guide Us Home", "url": "https://soundcloud.com/11thaverecords/1-7-25-tsiamo-light-will-guide", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 14 25 Aleta So Long", "url": "https://soundcloud.com/11thaverecords/1-14-25-aleta-so-long", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "1 7 25 Alex two bars", "url": "https://soundcloud.com/11thaverecords/1-7-25-alex-two-bars", "uploadDate": "2025-01-17T21:02:44.000Z" },
  { "rawTitle": "10 8 24 Meg", "url": "https://soundcloud.com/11thaverecords/10-8-24-meg", "uploadDate": "2024-10-15T19:54:27.000Z" },
  { "rawTitle": "10 8 24 Alex - Waiting All This Time", "url": "https://soundcloud.com/11thaverecords/10-8-24-alex-waiting-all-this-time", "uploadDate": "2024-10-15T19:28:57.000Z" },
  { "rawTitle": "10 8 24 Chloe", "url": "https://soundcloud.com/11thaverecords/10-8-24-chloe", "uploadDate": "2024-10-15T19:28:39.000Z" },
  { "rawTitle": "9 24 24 Emily - Cigarette Campaign Song Of 2006", "url": "https://soundcloud.com/11thaverecords/9-24-24-emily-cigarette-campaign-song-of-2006", "uploadDate": "2024-10-15T19:25:29.000Z" },
  { "rawTitle": "10 8 24 Kenny", "url": "https://soundcloud.com/11thaverecords/10-8-24-kenny", "uploadDate": "2024-10-15T19:25:26.000Z" },
  { "rawTitle": "8 6 24 Death By Fireworks - You", "url": "https://soundcloud.com/11thaverecords/8-6-24-death-by-fireworks-you", "uploadDate": "2024-10-15T19:25:24.000Z" },
  { "rawTitle": "8 6 24 Jeremiah - sound bath", "url": "https://soundcloud.com/11thaverecords/8-6-24-jeremiah-following-me-around", "uploadDate": "2024-10-15T19:25:23.000Z" },
  { "rawTitle": "8 13 24 Marissa Birds", "url": "https://soundcloud.com/11thaverecords/8-13-24-marissa-birds", "uploadDate": "2024-10-15T19:25:21.000Z" },
  { "rawTitle": "9 24 24 Casey", "url": "https://soundcloud.com/11thaverecords/9-24-24-casey", "uploadDate": "2024-10-15T19:25:19.000Z" },
  { "rawTitle": "10 1 24 Flora", "url": "https://soundcloud.com/11thaverecords/10-1-24-flora", "uploadDate": "2024-10-15T19:25:17.000Z" },
  { "rawTitle": "10 1 24 Jenny Haniver", "url": "https://soundcloud.com/11thaverecords/10-1-24-jenny-hanver", "uploadDate": "2024-10-15T19:24:55.000Z" },
  { "rawTitle": "9 17 24 Used Fiction Birthday Song", "url": "https://soundcloud.com/11thaverecords/9-17-24-used-fiction-birthday-song", "uploadDate": "2024-09-19T00:59:23.000Z" },
  { "rawTitle": "7 23 24 Pope Suburban Morning With", "url": "https://soundcloud.com/11thaverecords/7-23-24-pope-suburban-morning-with", "uploadDate": "2024-07-24T16:03:48.000Z" },
  { "rawTitle": "7 16 24 Zachy Summer", "url": "https://soundcloud.com/11thaverecords/7-16-24-zachy-summer", "uploadDate": "2024-07-24T16:03:38.000Z" },
  { "rawTitle": "7 23 24 Caroline The Internet", "url": "https://soundcloud.com/11thaverecords/7-23-24-caroline-the-internet", "uploadDate": "2024-07-24T15:50:31.000Z" },
  { "rawTitle": "7 2 24 Emily - Pony Planetarium", "url": "https://soundcloud.com/11thaverecords/7-2-24-emily", "uploadDate": "2024-07-03T20:45:12.000Z" },
  { "rawTitle": "6 18 24 Pizza Dumpster - Ill Be Rooting For You", "url": "https://soundcloud.com/11thaverecords/6-18-24-pizza-dumpster-ill-be-rooting-for-you", "uploadDate": "2024-06-26T21:58:25.000Z" },
  { "rawTitle": "6 25 24 Flora - Animal", "url": "https://soundcloud.com/11thaverecords/6-25-24-flora-animal", "uploadDate": "2024-06-26T21:58:13.000Z" },
  { "rawTitle": "6 4 24 Zach Lets Ride Bikes", "url": "https://soundcloud.com/11thaverecords/6-4-24-zach-lets-ride-bikes", "uploadDate": "2024-06-13T00:23:16.000Z" },
  { "rawTitle": "6 11 24 LIZZIE WATERS DOCTOR DOCTOR", "url": "https://soundcloud.com/11thaverecords/6-11-24-lizzie-waters-doctor-doctor", "uploadDate": "2024-06-13T00:14:39.000Z" },
  { "rawTitle": "5 21 24 Vincent Sun 1 Pill", "url": "https://soundcloud.com/11thaverecords/5-21-24-vincent-sun-1-pill", "uploadDate": "2024-06-13T00:14:38.000Z" },
  { "rawTitle": "6 4 24 Lydia Mississippi", "url": "https://soundcloud.com/11thaverecords/6-4-24-lydia-mississippi", "uploadDate": "2024-06-13T00:14:36.000Z" },
  { "rawTitle": "4 23 24 Meagan Â€” Fair Oaks Blvd", "url": "https://soundcloud.com/11thaverecords/4-23-24-meagan-a-fair-oaks-blvd", "uploadDate": "2024-05-08T22:51:23.000Z" },
  { "rawTitle": "4 2 24 Caroline SD Diss Song", "url": "https://soundcloud.com/11thaverecords/4-2-24-caroline-sd-diss-song", "uploadDate": "2024-05-08T22:22:18.000Z" },
  { "rawTitle": "2 20 24 Michael Greif", "url": "https://soundcloud.com/11thaverecords/2-20-24-michael-greif", "uploadDate": "2024-05-08T22:22:17.000Z" },
  { "rawTitle": "3 12 24 Lydia Crying In Public", "url": "https://soundcloud.com/11thaverecords/3-12-24-lydia-crying-in-public", "uploadDate": "2024-05-08T22:22:16.000Z" },
  { "rawTitle": "3 19 24 Matt Living The Silence", "url": "https://soundcloud.com/11thaverecords/3-19-24-matt-living-the-silence", "uploadDate": "2024-05-08T22:22:14.000Z" },
  { "rawTitle": "3 19 24 Meagan", "url": "https://soundcloud.com/11thaverecords/3-19-24-meagan", "uploadDate": "2024-05-08T22:22:14.000Z" },
  { "rawTitle": "3 19 24 Michelle", "url": "https://soundcloud.com/11thaverecords/3-19-24-michelle", "uploadDate": "2024-05-08T22:22:11.000Z" },
  { "rawTitle": "3 19 24 Theo Caffene And Good Intentions", "url": "https://soundcloud.com/11thaverecords/3-19-24-theo-caffene-and-good-intentions", "uploadDate": "2024-05-08T22:22:09.000Z" },
  { "rawTitle": "4 23 24 Paige", "url": "https://soundcloud.com/11thaverecords/4-23-24-paige", "uploadDate": "2024-05-08T22:22:07.000Z" },
  { "rawTitle": "5 7 24 Jemima", "url": "https://soundcloud.com/11thaverecords/5-7-24-jemima", "uploadDate": "2024-05-08T22:22:05.000Z" },
  { "rawTitle": "5 7 24 Seth", "url": "https://soundcloud.com/11thaverecords/5-7-24-seth", "uploadDate": "2024-05-08T22:22:04.000Z" },
  { "rawTitle": "4 9 24 Mitch Poison For Blood", "url": "https://soundcloud.com/11thaverecords/4-9-24-mitch-poison-for-blood", "uploadDate": "2024-05-08T22:22:03.000Z" },
  { "rawTitle": "4 30 24 Sophie Million Things", "url": "https://soundcloud.com/11thaverecords/4-30-24-sophie-million-things", "uploadDate": "2024-05-08T22:22:01.000Z" },
  { "rawTitle": "4 30 24 Zach Lost Dog", "url": "https://soundcloud.com/11thaverecords/4-30-24-zach-lost-dog", "uploadDate": "2024-05-08T22:21:59.000Z" },
  { "rawTitle": "6 7 24 Flora", "url": "https://soundcloud.com/11thaverecords/6-7-24-flora", "uploadDate": "2024-05-08T22:21:59.000Z" },
  { "rawTitle": "4 2 24 Flora TWENTY FOUR", "url": "https://soundcloud.com/11thaverecords/4-2-24-flora-twenty-four", "uploadDate": "2024-05-08T22:21:50.000Z" },
  { "rawTitle": "3 19 24 Delano Milano", "url": "https://soundcloud.com/11thaverecords/3-19-24-delano-milano", "uploadDate": "2024-03-20T21:15:18.000Z" },
  { "rawTitle": "3 12 24 Natasha Sunset", "url": "https://soundcloud.com/11thaverecords/3-12-24-natasha-sunset", "uploadDate": "2024-03-20T21:15:16.000Z" },
  { "rawTitle": "2 13 24 Westmoreland", "url": "https://soundcloud.com/11thaverecords/2-13-24-westmoreland", "uploadDate": "2024-03-20T21:15:14.000Z" },
  { "rawTitle": "2 13 24 Lily Miller It Will Come Back", "url": "https://soundcloud.com/11thaverecords/2-13-24-lily-miller-it-will", "uploadDate": "2024-03-20T21:15:12.000Z" },
  { "rawTitle": "2 13 24 DOOOZE Alone", "url": "https://soundcloud.com/11thaverecords/2-13-24-doooze-alone", "uploadDate": "2024-03-20T21:15:10.000Z" },
  { "rawTitle": "3 5 24 Izzie Birds", "url": "https://soundcloud.com/11thaverecords/3-5-24-izzie-birds", "uploadDate": "2024-03-20T21:15:08.000Z" },
  { "rawTitle": "3 5 24 Marissa Take Me", "url": "https://soundcloud.com/11thaverecords/3-5-24-marissa-take-me", "uploadDate": "2024-03-20T21:15:06.000Z" },
  { "rawTitle": "1 30 24 Lydia", "url": "https://soundcloud.com/11thaverecords/1-30-24-lydia", "uploadDate": "2024-03-20T21:15:03.000Z" },
  { "rawTitle": "1 30 23 Jemima", "url": "https://soundcloud.com/11thaverecords/1-30-23-jemima", "uploadDate": "2024-03-20T21:15:00.000Z" },
  { "rawTitle": "1 23 24 Alissa - Not The Villain", "url": "https://soundcloud.com/11thaverecords/1-23-24-alissa-not-the-villain", "uploadDate": "2024-03-20T21:14:59.000Z" },
  { "rawTitle": "1 23 24 Flora", "url": "https://soundcloud.com/11thaverecords/1-23-24-flora", "uploadDate": "2024-03-20T21:14:56.000Z" },
  { "rawTitle": "1 23 24 Scott", "url": "https://soundcloud.com/11thaverecords/1-23-24-scott", "uploadDate": "2024-03-20T21:14:52.000Z" },
  { "rawTitle": "1 2 23 Alissa", "url": "https://soundcloud.com/11thaverecords/1-2-23-alissa", "uploadDate": "2024-03-20T21:14:51.000Z" },
  { "rawTitle": "1 2 23 Kate Sumiko", "url": "https://soundcloud.com/11thaverecords/1-2-23-kate-sumiko", "uploadDate": "2024-03-20T21:14:49.000Z" },
  { "rawTitle": "1 9 24 Seth", "url": "https://soundcloud.com/11thaverecords/1-9-24-seth", "uploadDate": "2024-03-20T21:14:47.000Z" },
  { "rawTitle": "Crying In Tuscon - Lee Tallis", "url": "https://soundcloud.com/11thaverecords/crying-in-tuscon-lee-tallis", "uploadDate": "2024-01-26T23:36:40.000Z" },
  { "rawTitle": "12 5 23 Michael Nuzzo - Thomas Cole", "url": "https://soundcloud.com/11thaverecords/12-5-23-michael-nuzzo-thomas-cole", "uploadDate": "2023-12-13T22:43:38.000Z" },
  { "rawTitle": "11 21 23 Mitch Rocket Everything Is Stolen From Us", "url": "https://soundcloud.com/11thaverecords/11-21-23-mitch-rocket", "uploadDate": "2023-12-13T21:45:41.000Z" },
  { "rawTitle": "12 5 23 Emily Koobla Khan", "url": "https://soundcloud.com/11thaverecords/12-5-23-emily-koobla-khan", "uploadDate": "2023-12-13T21:45:39.000Z" },
  { "rawTitle": "12 12 23 Kevin Where Do All The Landlords Live", "url": "https://soundcloud.com/11thaverecords/12-12-23-kevin-where-do-all", "uploadDate": "2023-12-13T21:45:35.000Z" },
  { "rawTitle": "12 12 23 Carly Moutains In The Rearview", "url": "https://soundcloud.com/11thaverecords/12-12-23-carly-moutains-in-the", "uploadDate": "2023-12-13T21:45:32.000Z" },
  { "rawTitle": "12 12 23 Zach Mothers", "url": "https://soundcloud.com/11thaverecords/12-12-23-zacky-mothers", "uploadDate": "2023-12-13T21:45:30.000Z" },
  { "rawTitle": "12 12 23 Marissa Hunger", "url": "https://soundcloud.com/11thaverecords/12-12-23-marissa-hunger", "uploadDate": "2023-12-13T21:45:27.000Z" },
  { "rawTitle": "9 5 23 AC Jones", "url": "https://soundcloud.com/11thaverecords/9-5-23-ac-jones", "uploadDate": "2023-11-30T01:14:24.000Z" },
  { "rawTitle": "11 28 23 Inside Caroline", "url": "https://soundcloud.com/11thaverecords/11-28-23-inside-caroline", "uploadDate": "2023-11-30T01:13:12.000Z" },
  { "rawTitle": "11 28 23 Lizzie Waters Tough", "url": "https://soundcloud.com/11thaverecords/11-28-23-lizzie-waters-tough", "uploadDate": "2023-11-30T01:13:11.000Z" },
  { "rawTitle": "11 21 23 Matt Herrero To The Limit", "url": "https://soundcloud.com/11thaverecords/11-21-23-matt-herrero-to-the-limit", "uploadDate": "2023-11-23T19:59:41.000Z" },
  { "rawTitle": "11 7 23 Alex - Never Lie To Me", "url": "https://soundcloud.com/11thaverecords/11-7-23-alex-never-lie-to-me", "uploadDate": "2023-11-08T22:54:58.000Z" },
  { "rawTitle": "11 7 23 Seth - False Alarm", "url": "https://soundcloud.com/11thaverecords/11-7-23-seth-see-you-there", "uploadDate": "2023-11-08T22:54:58.000Z" },
  { "rawTitle": "11 7 23 Marissa - Turn You Down", "url": "https://soundcloud.com/11thaverecords/11-7-23-marissa-turn-you-down", "uploadDate": "2023-11-08T22:54:58.000Z" },
  { "rawTitle": "9 5 23 Willie Im Glad", "url": "https://soundcloud.com/11thaverecords/9-5-23-willie-im-glad", "uploadDate": "2023-10-25T00:12:43.000Z" },
  { "rawTitle": "9 5 23 Oscar - Discobaby", "url": "https://soundcloud.com/11thaverecords/9-5-23-oscar-discobaby", "uploadDate": "2023-10-25T00:12:36.000Z" },
  { "rawTitle": "9 5 23 Leanne Matty Groves", "url": "https://soundcloud.com/11thaverecords/9-5-23-leanne-matty-groves", "uploadDate": "2023-10-25T00:12:34.000Z" },
  { "rawTitle": "9 5 23 Cory Harlin - Memory", "url": "https://soundcloud.com/11thaverecords/9-5-23-cory-harlin-memory", "uploadDate": "2023-10-25T00:12:27.000Z" },
  { "rawTitle": "101723 Emily - Dopamine", "url": "https://soundcloud.com/11thaverecords/101723-emily-dopamine", "uploadDate": "2023-10-25T00:12:25.000Z" },
  { "rawTitle": "Seth - Do You Believe", "url": "https://soundcloud.com/11thaverecords/seth-do-you-believe", "uploadDate": "2023-08-30T20:30:37.000Z" },
  { "rawTitle": "Isabella - Sunflower", "url": "https://soundcloud.com/11thaverecords/8-29-23-isabella-sunflower", "uploadDate": "2023-08-30T20:19:59.000Z" },
  { "rawTitle": "Oscar - Chopping Room Floor", "url": "https://soundcloud.com/11thaverecords/8-29-23-oscar-friends-with", "uploadDate": "2023-08-30T20:19:57.000Z" },
  { "rawTitle": "Josh Beemish - Kettle Drum", "url": "https://soundcloud.com/11thaverecords/82223-kettle-drum", "uploadDate": "2023-08-30T20:19:55.000Z" },
  { "rawTitle": "Cornelia - Summer Song", "url": "https://soundcloud.com/11thaverecords/82223-summer-song", "uploadDate": "2023-08-30T20:19:53.000Z" },
  { "rawTitle": "Flora - Thick Enough", "url": "https://soundcloud.com/11thaverecords/flora-thicc-enough", "uploadDate": "2023-08-30T20:19:52.000Z" },
  { "rawTitle": "Willie - Eyeballs In A Drawer", "url": "https://soundcloud.com/11thaverecords/willie-eyeballs-in-a-drawer", "uploadDate": "2023-08-30T20:19:50.000Z" }
];

// --- PARSING LOGIC (Updated for "9 16 25" format) ---
// Supported Date Formats: 9 16 25, 10.24.23, 2023-10-24, Oct 24 2023, 10/24/23
const parseRecordingData = (item, index) => {
  const raw = item.rawTitle || "";
  let date = new Date(item.uploadDate); // Default to upload date
  let artist = "Unknown Artist";
  let title = "Live Recording";
  let tags = ["Live"];

  // 1. Regex for "MM DD YY" or "MM DD YYYY" with spaces, dots, or slashes
  // Matches: "9 16 25" or "09.16.2025" or "9/16/25"
  const dateRegex = /^(\d{1,2}[./\s]\d{1,2}[./\s]\d{2,4})\s+(.*)/;
  
  const match = raw.match(dateRegex);
  
  if (match) {
    // Normalize date string: Replace spaces/dots with slashes for Date.parse
    // "9 16 25" -> "9/16/25"
    let dateStr = match[1].replace(/[.\s]/g, '/');
    
    // Handle 2-digit years by assuming 2000s if needed, though Date() usually handles it.
    // However, JS sometimes parses "9/16/25" as 1925. Let's ensure full year if possible,
    // or rely on browser behavior (usually 2025 for future/recent dates).
    const parsedDate = new Date(dateStr);
    
    if (!isNaN(parsedDate)) {
      date = parsedDate;
    }

    // Process the rest: Artist - Song
    const rest = match[2];
    if (rest.includes('-')) {
      const parts = rest.split('-');
      artist = parts[0].trim();
      title = parts.slice(1).join('-').trim();
    } else {
      artist = rest.trim();
      title = "Untitled"; // or leave as "Live Recording"
    }
  } else {
    // Fallback: Check if start is just Artist (no date in title)
    if (raw.includes('-')) {
      const parts = raw.split('-');
      artist = parts[0].trim();
      title = parts.slice(1).join('-').trim();
    } else {
      artist = raw;
    }
  }

  // --- TAG GENERATION ---
  const lowerStr = (artist + title).toLowerCase();
  if (lowerStr.includes('jazz')) tags.push('Jazz');
  if (lowerStr.includes('rock')) tags.push('Rock');
  if (lowerStr.includes('jam')) tags.push('Jam');
  if (lowerStr.includes('acoustic')) tags.push('Acoustic');
  if (lowerStr.includes('folk')) tags.push('Folk');
  if (lowerStr.includes('ambient')) tags.push('Ambient');

  // Assign random shape/color
  const shape = SHAPES[index % SHAPES.length]; // Deterministic based on index so it doesn't flicker on reload
  const color = '#1a1a1a';

  return {
    id: index,
    artist,
    title,
    date,
    dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tags,
    audioUrl: item.url, 
    color,
    shape
  };
};

// --- COMPONENT ---

export default function TNMCity() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // State
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecording, setActiveRecording] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  // Entities Ref
  const entities = useRef([]);

  // --- DATA LOADING (Sync) ---
  useEffect(() => {
    // Parse the embedded data
    const processedData = RAW_RECORDINGS.map((item, index) => parseRecordingData(item, index));
    setData(processedData);
    
    // Initialize entities
    entities.current = processedData.map(d => ({
      data: d,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      targetX: null,
      targetY: null,
      state: 'wandering',
      opacity: 1,
      scale: 1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.6
    }));
  }, []);

  const handleClosePlayer = () => {
    setActiveRecording(null);
  };

  // --- CANVAS & ANIMATION LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || entities.current.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const CENTER_X = width / 2;
    const CENTER_Y = height / 2;
    const GATHER_RADIUS = Math.min(width, height) * 0.25;

    // Helper: Draw Polygons
    const drawPolygon = (ctx, sides, radius) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const drawStar = (ctx, radius, points = 5, innerRadius = radius * 0.5) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const r = i % 2 === 0 ? radius : innerRadius;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      const queryLower = searchQuery.toLowerCase();

      entities.current.forEach(entity => {
        // --- PHYSICS & LOGIC ---
        const matchesSearch = !searchQuery || 
          entity.data.artist.toLowerCase().includes(queryLower) ||
          entity.data.title.toLowerCase().includes(queryLower) ||
          entity.data.dateString.toLowerCase().includes(queryLower) ||
          entity.data.tags.some(t => t.toLowerCase().includes(queryLower));

        if (searchQuery && matchesSearch) {
          // Gathering
          if (entity.state !== 'gathering') {
            entity.state = 'gathering';
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * GATHER_RADIUS;
            entity.targetX = CENTER_X + Math.cos(angle) * dist;
            entity.targetY = CENTER_Y + Math.sin(angle) * dist;
          }
          const dx = entity.targetX - entity.x;
          const dy = entity.targetY - entity.y;
          entity.x += dx * 0.05;
          entity.y += dy * 0.05;
          entity.opacity = 1;
          entity.scale = 1.3;
        } else if (searchQuery && !matchesSearch) {
          // Drifting Away
          entity.state = 'drifting';
          entity.opacity = Math.max(0.05, entity.opacity - 0.05);
          const dx = entity.x - CENTER_X;
          const dy = entity.y - CENTER_Y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          // Push away gently
          if (dist < 300) {
             entity.x += (dx/dist) * 2;
             entity.y += (dy/dist) * 2;
          }
        } else {
          // Wandering
          entity.state = 'wandering';
          entity.opacity = Math.min(1, entity.opacity + 0.05);
          entity.scale = 1;
          if (Math.random() < 0.02) {
            entity.vx = (Math.random() - 0.5) * entity.speed;
            entity.vy = (Math.random() - 0.5) * entity.speed;
          }
          entity.x += entity.vx;
          entity.y += entity.vy;
          if (entity.x < 0 || entity.x > width) entity.vx *= -1;
          if (entity.y < 0 || entity.y > height) entity.vy *= -1;
        }

        // --- DRAWING ---
        if (entity.opacity > 0.01) {
          ctx.save();
          ctx.translate(entity.x, entity.y);
          ctx.globalAlpha = entity.opacity;

          // Walking legs
          const walkCycle = Math.sin(time * 0.005 + entity.phase) * 5;
          
          // Shadow
          ctx.beginPath();
          ctx.ellipse(0, 15, 8, 3, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0,0,0,0.15)';
          ctx.fill();

          // Legs
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-3, 5);
          ctx.lineTo(-3 + walkCycle, 15);
          ctx.moveTo(3, 5);
          ctx.lineTo(3 - walkCycle, 15);
          ctx.stroke();

          // Shape
          ctx.fillStyle = entity.data.color;
          const s = 9 * entity.scale;

          switch (entity.data.shape) {
            case 'square':
              ctx.beginPath();
              ctx.roundRect(-s, -s, s * 2, s * 2, 2);
              ctx.fill();
              break;
            case 'triangle':
              drawPolygon(ctx, 3, s + 2);
              ctx.fill();
              break;
            case 'pentagon':
              drawPolygon(ctx, 5, s + 1);
              ctx.fill();
              break;
            case 'star':
              drawStar(ctx, s + 3);
              ctx.fill();
              break;
            case 'diamond':
              drawPolygon(ctx, 4, s + 1);
              ctx.fill();
              break;
            case 'circle':
            default:
              ctx.beginPath();
              ctx.arc(0, 0, s, 0, Math.PI * 2);
              ctx.fill();
              break;
          }

          // Arms
          const armWiggle = Math.cos(time * 0.005 + entity.phase) * 3;
          ctx.beginPath();
          ctx.moveTo(-7, 0);
          ctx.lineTo(-11, armWiggle);
          ctx.moveTo(7, 0);
          ctx.lineTo(11, -armWiggle);
          ctx.stroke();

          // Eyes
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.arc(-2, -2, 2, 0, Math.PI * 2);
          ctx.arc(2, -2, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'black';
          ctx.beginPath();
          ctx.arc(-2 + armWiggle/4, -2, 1, 0, Math.PI * 2);
          ctx.arc(2 + armWiggle/4, -2, 1, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [searchQuery, data]); // Re-init if data loads

  // --- INTERACTION ---
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let closest = null;
    let minDist = 30;

    entities.current.forEach(entity => {
      if (entity.opacity < 0.5) return;
      const dx = entity.x - clickX;
      const dy = entity.y - clickY;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < minDist) {
        minDist = dist;
        closest = entity.data;
      }
    });

    if (closest) setActiveRecording(closest);
  };

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden font-sans bg-gray-100 text-gray-800">
      
      {/* BACKGROUND */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-80 z-0"
        style={{ backgroundImage: `url('TNMCITY.jpg')` }}
      />
      <div className="absolute inset-0 w-full h-full bg-orange-50/20 pointer-events-none z-0 mix-blend-overlay"></div>

      {/* CANVAS */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-10 cursor-pointer touch-none"
      />

      {/* SEARCH UI */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-full shadow-lg 
                       text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all"
            placeholder="Search archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* PLAYER OVERLAY */}
      {activeRecording && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-lg">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
            
            {/* Header Info */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-start">
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold text-gray-900 leading-tight truncate pr-4">{activeRecording.artist}</h2>
                <h3 className="text-sm text-gray-600 truncate">{activeRecording.title}</h3>
                <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center"><Calendar size={12} className="mr-1"/> {activeRecording.dateString}</span>
                </div>
              </div>
              <button 
                onClick={handleClosePlayer}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* SoundCloud Embed */}
            <div className="bg-black">
              <iframe
                width="100%"
                height="120"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(activeRecording.audioUrl)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`}
                title="SoundCloud Player"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* INTRO HELP */}
      {showIntro && !searchQuery && !activeRecording && (
        <div 
          className="absolute bottom-10 right-10 z-10 max-w-xs text-right pointer-events-none hidden md:block"
          style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
        >
          <h1 className="text-4xl font-black text-gray-800/80 mb-2">TNMCity</h1>
          <p className="text-gray-700/80 text-sm font-medium">
            Population: {data.length > 0 ? data.length : "Loading..."} <br/>
            Click a figure to listen.
          </p>
        </div>
      )}
    </div>
  );
}