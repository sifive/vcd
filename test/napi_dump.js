'use strict';

const expect = require('chai').expect;
const parser = require('../lib/parser.js');

describe('dump', () => {

  it('simple', done => {
    const inst = parser();
    const dump = [];
    ['"}G', '{u', 'u)'] // array of all signal ids
      .map(id =>
        inst.change.on(id, (time, cmd, value, mask) => {
          dump.push({
            id,
            time,
            cmd,
            value,
            mask
          });
        })
      );

    inst.on('finish', () => {
      expect(inst.getTime()).to.eq(316n);
      expect(dump).to.deep.eq([
        { id: '"}G', time: 100, cmd: 14, value: 0n, mask: 0n },
        { id: '"}G', time: 200, cmd: 15, value: 1n, mask: 0n },
        { id: '{u', time: 200, cmd: 30, value: 0xf0f0f0f0f0f0f0f0n, mask: 0xff00ff00ff00ff00n },
        { id: '"}G', time: 300, cmd: 14, value: 0n, mask: 0n },
        { id: '{u', time: 300, cmd: 30, value: 0xf000000000000000n, mask: 0n },
        { id: '{u', time: 301, cmd: 30, value: 0x0f00000000000000n, mask: 0n },
        { id: '{u', time: 302, cmd: 30, value: 0x00f0000000000000n, mask: 0n },
        { id: '{u', time: 303, cmd: 30, value: 0x000f000000000000n, mask: 0n },
        { id: '{u', time: 304, cmd: 30, value: 0x0000f00000000000n, mask: 0n },
        { id: '{u', time: 305, cmd: 30, value: 0x00000f0000000000n, mask: 0n },
        { id: '{u', time: 306, cmd: 30, value: 0x000000f000000000n, mask: 0n },
        { id: '{u', time: 307, cmd: 30, value: 0x0000000f00000000n, mask: 0n },
        { id: '{u', time: 308, cmd: 31, value: 0x00000000f0000000n, mask: 0n },
        { id: '{u', time: 309, cmd: 30, value: 0x000000000f000000n, mask: 0n },
        { id: '{u', time: 310, cmd: 30, value: 0x0000000000f00000n, mask: 0n },
        { id: '{u', time: 311, cmd: 30, value: 0x00000000000f0000n, mask: 0n },
        { id: '{u', time: 312, cmd: 30, value: 0x000000000000f000n, mask: 0n },
        { id: '{u', time: 313, cmd: 30, value: 0x0000000000000f00n, mask: 0n },
        { id: '{u', time: 314, cmd: 30, value: 0x00000000000000f0n, mask: 0n },
        { id: '{u', time: 315, cmd: 30, value: 0x000000000000000fn, mask: 0n },
        { id: '"}G', time: 316, cmd: 15, value: 1n, mask: 0n }
      ]);
      // console.log(dump);
      done();
    });

    inst.write(`
$version Generated by VerilatedVcd $end
$date Wed Sep 18 22:59:07 2019
 $end
$timescale   1ns $end

  $scope   module   top    $end
    $var wire  1 "}G clock $end
    $scope module leaf $end
      $var wire 64 {u counter [63:0] $end
    $upscope $end
    $scope module fruit $end
      $var wire 4 u) point [3:0] $end
    $upscope $end
  $upscope $end

  $enddefinitions $end
#100
0"}G
#200
1"}G
bzzzzxxxx11110000ZZZZXXXX11110000zzzzxxx`);

    // break in the middle of the number scan

    inst.write(`x11110000zzzzxxxx11110000 {u
#300
0"}G
b1111000000000000000000000000000000000000000000000000000000000000 {u
#301
b0000111100000000000000000000000000000000000000000000000000000000 {u
#302
b0000000011110000000000000000000000000000000000000000000000000000 {u
#303
b0000000000001111000000000000000000000000000000000000000000000000 {u
#304
b0000000000000000111100000000000000000000000000000000000000000000 {u
#305
b0000000000000000000011110000000000000000000000000000000000000000 {u
#306
b0000000000000000000000001111000000000000000000000000000000000000 {u
#307
b0000000000000000000000000000111100000000000000000000000000000000 {u
#308
B0000000000000000000000000000000011110000000000000000000000000000 {u
#309
b0000000000000000000000000000000000001111000000000000000000000000 {u
#310
b0000000000000000000000000000000000000000111100000000000000000000 {u
#311
b0000000000000000000000000000000000000000000011110000000000000000 {u
#312
b0000000000000000000000000000000000000000000000001111000000000000 {u
#313
b0000000000000000000000000000000000000000000000000000111100000000 {u
#314
b0000000000000000000000000000000000000000000000000000000011110000 {u
#315
b0000000000000000000000000000000000000000000000000000000000001111 {u
#316
1"}G
`);
    inst.end();
  });
});

/* eslint-env mocha */
