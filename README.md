För att installera och köra programmet:
1. Ladda ner och unzippa Terminal Dungeon
2. Ladda ner nodejs + npm genom packethanterare
3. CDa in i mappen genom terminalen
4. Skriv "npm install" och vänta tills alla paket är installerade
5. Skriv "node ." eller "npm start"

För att testa programmet:
1. Skriv "npm test"

Funktioner:
 stat_calc(): rolls 3 numbers to be used as the str, con and dex stats. Then pushes to array to return as a single value
 calulate_stat_usage(): imports previously generated str, dex and con and then adjusts them per stat, makes a temporary array to return the resulting stats
