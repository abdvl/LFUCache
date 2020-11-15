
const LFU = new LFUCache(2)

LFU.put(1,10)
LFU.put(2,20)
LFU.put(1,11)
console.assert(LFU.size == 2)
console.assert(LFU.get(1) == 11)

LFU.put(3,10)
console.assert(LFU.size == 2)

console.log(LFU)

