#!/usr/bin/env node

var player_global_gold_counter = 0
let combat_finished_flag = 0
var fine = 0
var stats = [];
const prompt = require("prompt-sync")();

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


function Combat_Stat_Check(enemy_stats){
	console.log("your stats are")
	console.log(player_stats)
	console.log("your " + "\x1b[41m" + "\x1b[5m" + "enemies" + "\x1b[0m" + " stats are")
	console.log(enemy_stats)
}



function choose_next_move(enemy_stats){	
	console.log("")
	let choice = prompt("what do you do? (Flee/Attack/Check) ")
	if(choice == "flee"|| choice == "Flee"){
		//todo, flee command
	}
	if(choice == "attack" || choice == "Attack"){
		attack_enemy(enemy_stats, player_stats)
	}
	if(choice == "check" || choice == "Check"){
		Combat_Stat_Check(enemy_stats)
		choose_next_move(enemy_stats, player_stats)
	}
}

function combat_encounter(){

	
	stat_calc()
	let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
	let enemy_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4], mana:temp_array_hold[5]}
	
	Combat_Stat_Check(enemy_stats)

	choose_next_move(enemy_stats, player_stats)

	
	
}

function attack_enemy(enemy_stats){
	


	if(enemy_stats.atkspd*Math.random() > player_stats.atkspd*Math.random()){
		if((Math.random()*7)>player_stats.dodge){
			 player_stats.hp = player_stats.hp-enemy_stats.dmg
			 console.log("")
			 console.log("you enter the fray but the enemy strikes quickly and true, you take " + enemy_stats.dmg + "hp dmg")
			 if(player_stats.hp-enemy_stats.dmg<0){
				console.log("")
				console.log("you " + "\x1b[41m" + "\x1b[5m" + "died" + "\x1b[0m" )}
				combat_finished_flag = 1
				process.exit()
		}
		else{
			console.log("")
			console.log("you enter the fray but the enemy strikes quickly, you barely manage to get out of range from the sweeping blade")
		}
	}
	else{
		if((Math.random()*7)>enemy_stats.dodge){
			enemy_stats.hp = enemy_stats.hp-player_stats.dmg
			console.log("")
			console.log("you enter the fray and your enemy stumbles before the blade strikes deep, he takes " + player_stats.dmg + "hp dmg")

			if(enemy_stats.hp-player_stats.dmg<0){
				console.log("")
				console.log("the fiend lays slain at your feet")
				combat_finished_flag = 1
			}
		}
		else{
			console.log("")
			console.log("you enter the fray but the ellusive enemy manages to gracefully dodge away")
		}
	}



	if(combat_finished_flag == 0){
	choose_next_move(enemy_stats)
}

	else{
		combat_finished_flag = 0
		let choice = prompt("Continue exploring the dungeon or head back? (Cont/Back) ")
		if(choice == "cont" || choice == "Cont"){
			console.log("")
			console.log("You tread the path deeper into the dungeon.")
			console.log("You come across a roaring monstrosity guarding the next hallway")
			console.log("")

			combat_encounter()
		}
		if(choice == "back" || choice == "Back"){
			combat_finished_flag = 0
			if(player_stats.dodge>enemy_stats.atkspd*2){
			console.log("you manage to escape back to town safely")
			back_to_town()
		}
	}
}
}

function back_to_town(enemy_stats){

	let choice = prompt(" do you visit the merchant or head back to the dungeon?")
	
}

combat_encounter()
//console.log(Math.random()*6)

//console.log(player_stats)
//console.log(calculate_stat_usage.apply(null, player_stats))

//str = dmg / regen
//dex = atkspd / dodge
//con = hp / mana

//TODO: decouple stat generation(x)
//TODO: make combat (x)
//TODO: implement flee mechanic()
//TODO: implement town and gold mechanics ()

