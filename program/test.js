import { assert, expect, should, use } from 'chai';
import { calculate_stat_usage, stat_calc} from "./bin/index.js"

//TODO: sinon-chai to test console output
//import Sinon from 'sinon';
//import sinonChai from 'sinon-chai';
//should();
//use(sinonChai);

var stats = [];


stat_calc()


// same setup as the actual game to allow for live and preset tests
let temp_array_hold = calculate_stat_usage(stats[0], stats[1], stats[2])
var player_stats = {dmg:temp_array_hold[0], regen:temp_array_hold[1], atkspd:temp_array_hold[2], dodge:temp_array_hold[3], hp:temp_array_hold[4]}
var player_max_hp = player_stats.hp


//simulating expected behaviour from calculate_stat_usage logic
var calc_live = stat_calc()

describe("#calculate_stat_usage", function () {
    it ("calculates basic str, con and dex stats into game values like dmg", function() {
      expect(calculate_stat_usage(3, 3, 3)).deep.to.equal([6, 3, 6, 3, 9])
    })
    it ("Preset Test 2", function() {
      expect(calculate_stat_usage(1, 1, 1)).deep.to.equal([2, 1, 2, 1, 3])
    })
    it ("Preset Test 3", function() {
      expect(calculate_stat_usage(-2, -2, -2)).deep.to.equal([-4, -2, -4, -2, -6])
    })
    it ("Live Test", function() {
      expect(calculate_stat_usage(calc_live[0], calc_live[1], calc_live[2])).deep.to.equal([(calc_live[0]*2), (calc_live[0]*1), (calc_live[1]*2), (calc_live[1]*1), (calc_live[2]*3)])
    })
 })
