import assert from 'assert';
import { expect } from 'chai';
//var should = require('chai').should();
import { calculate_stat_usage} from "./bin/index.js"

describe("#calculate_stat_usage", function () {
    it ("calculates basic str, con and dex stats into game values like dmg", function() {
      expect(calculate_stat_usage(3, 3, 3)).to.equal([6, 3, 6, 3, 9])
    })
 })