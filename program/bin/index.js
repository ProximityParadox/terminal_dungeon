#!/usr/bin/env node

var fine = 0
var stats = [];

function stat_calc(){
	fine = 0
	stats = [];
	while(fine != 3){
	 stats.push(Math.ceil(Math.random()*6))
		fine++}
}


function calculate_stat_usage(str, dex, con){
	let temp_array_hold = []
	let dmg = str*3
	let regen = str*1

	let atkspd = dex*2
	let dodge = dex*1

	let hp = con*3
	let mana = con*1

temp_array_hold.push(dmg, regen, atkspd, dodge, hp, mana)
return temp_array_hold
	
}

function create_player(){
	
	stat_calc()
	let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
	const player_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4], mana:temp_array_hold[5]}
	console.log("your stats are")
	console.log(player_stats)
	}
function check_stats_enemy(){
	console.log("your enemies stats are")
	console.log(enemy_stats)
}

function combat_encounter(){
	stat_calc()
	let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])

	let enemy_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4], mana:temp_array_hold[5]}
	console.log("your " + "\x1b[41m" + "\x1b[5m" + "enemies" + "\x1b[0m" + " stats are")
	console.log(enemy_stats)
}

create_player()
combat_encounter()
check_stats_enemy

//console.log(player_stats)
//console.log(calculate_stat_usage.apply(null, player_stats))

//str = dmg / regen
//dex = atkspd / dodge
//con = hp / mana

//TODO: make combat
