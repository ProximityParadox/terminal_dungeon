#!/usr/bin/env node

import callmerchant from "./module.js";


var player_global_gold_counter = 0
let combat_finished_flag = 0
var dicerollsdone = 0
var stats = [];
import PromptSync from "prompt-sync";
const prompt = PromptSync();


//rolls 3 numbers to be used as the str, con and dex stats. Then pushes to array to return as a single value
function stat_calc(){
	dicerollsdone = 0
	stats = [];
	while(dicerollsdone != 3){
	 stats.push(Math.ceil(Math.random()*6))
		dicerollsdone++}
}

//imports previously generated str, dex and con and then adjusts them per stat, makes a temporary array to return the resulting stats
function calculate_stat_usage(str, dex, con){
	let temp_array_hold = []
	let dmg = str*2
	let regen = str*1

	let atkspd = dex*2
	let dodge = dex*1

	let hp = con*3

temp_array_hold.push(dmg, regen, atkspd, dodge, hp)
return temp_array_hold
	
}
//calculating player stats outside of a function since they are persistent global variables that will only be created once per run of program. Keeps track of maxhp to allow regeneration during/after combat
stat_calc()
let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
var player_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4]}
var player_max_hp = player_stats.hp

//simple function to allow the player to print out both player and enemy stats on request in combat, fancied up with a few exit codes
function Combat_Stat_Check(enemy_stats){
	console.log("your stats are")
	console.log(player_stats)
	console.log("your " + "\x1b[41m" + "\x1b[5m" + "enemies" + "\x1b[0m" + " stats are")
	console.log(enemy_stats)
}


//merchant describes the wares and then tells player gold. The actual purchasing of items is handled in the next function, called at the end of this one
export default function merchant(){
	console.log("")
	console.log("the" + "\x1b[33m" + " merchant " + "\x1b[0m" + "greets you warmly and shows you their wares")
	console.log("")
	console.log("a gleaming" + "\x1b[31m" + " sword " +  "\x1b[0m" + "shines brightly, a perfect replacement for your rusty old thing, 9 gold")
	console.log("")
	console.log("a pair of" + "\x1b[34m" + "\x1b[1m" + " shoes " +  "\x1b[0m" + " are proudly shown on the display, they would certaintly help your dodging skills, 4 gold")
	console.log("")
	console.log("you have " + player_global_gold_counter + " gold ")
	console.log("")

	purchase_items()
}

//crossroads to give some world building (i.e not teleporting from dungeon to merchant and then back)
function back_to_town(){
	console.log("")
	let choice = prompt(" do you visit the merchant or head back to the dungeon? ")
	console.log("")
	if(choice == "merchant" || choice == "merc"){
		callmerchant()
	}
	if(choice == "dungeon"){
		combat_encounter()
	}
	else{
		back_to_town()
	}
	
}

function purchase_items(){
	let choice = prompt("which one do you buy? ")
	
	console.log("")

	if(choice == "sword"){
		if(player_global_gold_counter >= 9){
			console.log("the sword feels heafty in your hands, you can certaintly make use of this")
			player_stats.dmg = player_stats.dmg + 4
			player_global_gold_counter = player_global_gold_counter-9
		}
		else{
			console.log("you count your coins and realise you cannot afford it")
			console.log("")
		}
	}
	if(choice == "shoes"){
		if(player_global_gold_counter >= 4){
			console.log("You feel quite light in these shoes, perhaps you should try dancing")
			player_stats.dodge = player_stats.dodge + 2
			player_global_gold_counter = player_global_gold_counter-4
		}
		else{
			console.log("you count your coins and realise you cannot afford it")
			console.log("")
		}
	}
	else{
		console.log("you thank the merchant and return back to town ")
		back_to_town()
	}
	purchase_items()
}

function choose_next_move(enemy_stats){	
	console.log("")
	let choice = prompt("what do you do? (Flee/Attack/Check) ")
	if(choice == "flee"|| choice == "Flee"){
		if(player_stats.dodge >= enemy_stats.atkspd*Math.random*2){
			console.log("you manage to flee your foe")
			back_to_town()
		}
		else{
			console.log("the" + "\x1b[31m" + " fiend " +  "\x1b[0m" + "catches your attempt to flee, you quickly decide to change goal")
			attack_enemy(enemy_stats, player_stats)
			}
		}
	if(choice == "attack" || choice == "Attack" || choice == "atk"){
		attack_enemy(enemy_stats, player_stats)
	}
	if(choice == "check" || choice == "Check" || choice == "chk"){
		Combat_Stat_Check(enemy_stats)
		choose_next_move(enemy_stats, player_stats)
	}

}



function combat_encounter(){

	
	stat_calc()
	let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
	let enemy_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4]}
	
	Combat_Stat_Check(enemy_stats)

	choose_next_move(enemy_stats, player_stats)

	
	
}

function attack_enemy(enemy_stats){
	

	if(enemy_stats.atkspd*Math.random() > player_stats.atkspd*Math.random()){
		if((Math.random()*6)>player_stats.dodge){
			 player_stats.hp = player_stats.hp-enemy_stats.dmg
			 console.log("")
			 console.log("you enter the fray but the enemy strikes quickly and true, you take " + enemy_stats.dmg + "hp dmg")
			 if(player_stats.hp<0){
				console.log("")
				console.log("you " + "\x1b[41m" + "\x1b[5m" + "died" + "\x1b[0m" )
				combat_finished_flag = 1
				process.exit()}
		}
		else{
			console.log("")
			console.log("you enter the fray but the enemy strikes quickly, you barely manage to get out of range from the sweeping blade")
		}
	}
	else{
		if((Math.random()*6)>enemy_stats.dodge){
			enemy_stats.hp = enemy_stats.hp-player_stats.dmg
			console.log("")
			console.log("you enter the fray and your" + "\x1b[31m" + " enemy " +  "\x1b[0m" + "stumbles before the blade strikes deep, he takes " + player_stats.dmg + "hp dmg")

			if(enemy_stats.hp<0){
				console.log("")
				console.log("the" + "\x1b[31m" + " fiend " +  "\x1b[0m" + "lays slain at your feet")
				console.log("")
				let gold_from_encounter = Math.ceil(Math.random()*6)
				player_global_gold_counter = player_global_gold_counter + gold_from_encounter
				console.log("")
				console.log("you find " + "\x1b[33m" + gold_from_encounter + " gold" + "\x1b[0m"  )
				console.log("")
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
		if(player_stats.hp < player_max_hp){
			player_stats.hp = player_stats.hp + player_stats.regen
		}
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
			console.log("")
			console.log("you manage to escape back to town safely")
			back_to_town()
		}
	}
}


console.log("you feel adventurous today, you decide you take your chances and begin your story as an adventurer")

back_to_town()


//str = dmg / regen
//dex = atkspd / dodge
//con = hp / mana

//TODO: decouple stat generation(x)
//TODO: make combat (x)
//TODO: implement flee mechanic(x)
//TODO: implement town and gold mechanics (x)
//TODO: finalize the starting sequence (x)
