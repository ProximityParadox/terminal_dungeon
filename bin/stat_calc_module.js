//**imports previously generated str, dex and con and then adjusts them per stat, makes a temporary array to return the resulting stats 
//* @param {number} str - Strength rating
//* @param {number} dex - Dexterity rating
//* @param {number} con - Constitution rating */
export default function calculate_stat_usage(str, dex, con){
	let temp_array_hold = []
	let dmg = str*2
	let regen = str*1

	let atkspd = dex*2
	let dodge = dex*1

	let hp = con*3

temp_array_hold.push(dmg, regen, atkspd, dodge, hp)
return temp_array_hold
}