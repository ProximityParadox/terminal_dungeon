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

stat_calc()
let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
var player_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4], mana:temp_array_hold[5]}
console.log("your stats are")
console.log(player_stats)


function combat_encounter(){
	stat_calc()
	let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])

	let enemy_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4], mana:temp_array_hold[5]}
	console.log("your " + "\x1b[41m" + "\x1b[5m" + "enemies" + "\x1b[0m" + " stats are")
	console.log(enemy_stats)
//	attack_enemy(enemy_stats, player_stats)
}

//function attack_enemy(enemy_stats, player_stats){
//	if(enemy_stats.atkspd > player_stats.atkspd){
//		if((Math.random()*6)>player_stats.dodge){
//			 player_stats.hp-enemy_stats.dmg
//			 console.log("you enter the fray but the enemy strikes quickly and true, you take " + enemy_stats.dmg + "hp dmg")
//		}
//		else{
//			console.log("you enter the fray but the enemy strikes quickly, you barely manage to get out of range from the sweeping blade")
//		}
//
//	}
//	else{
//		if((Math.random()*6)>enemy_stats.dodge){
//			enemy_stats.hp.player_stats.dmg
//			console.log("you enter the fray and your enemy doesn't even have time to realise before the blade strikes deep, he takes " + player_stats.dmg + "hp dmg")
//		}
//		else{
//			console.log("you enter the fray but the ellusive enemy manages to gracefully dodge away")
//		}
//	}
//}

create_player()
combat_encounter()
//console.log(Math.random()*6)

//console.log(player_stats)
//console.log(calculate_stat_usage.apply(null, player_stats))

//str = dmg / regen
//dex = atkspd / dodge
//con = hp / mana

//TODO: make combat
