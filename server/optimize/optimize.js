const User = require("../models/user")
const PriorityQueue = require("js-priority-queue");

// Wrapper class for <int, int> pairs
class KeyValue {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
// Create a min heap
const minHeap = new PriorityQueue({
  comparator: (a, b) => a.value - b.value,
});
// Create a max heap
const maxHeap = new PriorityQueue({
  comparator: (a, b) => b.value - a.value,
});

module.exports = async function optimize(transactions) {
  const friendIds = new Set();
  transactions.forEach((transaction) => {
    friendIds.add(transaction.payer);
    friendIds.add(transaction.receiver);
  });

  // console.log(transactions)
  const residue = new Map();
  for (const id of friendIds) {
    residue.set(id, 0);
  }
  for (const transaction of transactions) {
    residue.set(
      transaction.payer,
      residue.get(transaction.payer) - parseInt(transaction.amount)
    );
    residue.set(
      transaction.receiver,
      residue.get(transaction.receiver) + parseInt(transaction.amount)
    );
  }
  // console.log(residue)
  
  let ans = [];
  const flag = Array.from(residue.values()).some((value) => value !== 0);
  if (!flag) {
    return ans;
  }

  for (const r of residue) {
    if (r[1] < 0) minHeap.queue(new KeyValue(r[0], r[1]));
    else maxHeap.queue(new KeyValue(r[0], r[1]));
  }
  // console.log(minHeap.length)
  while (minHeap.length) {
    const p = minHeap.dequeue();
    const r = maxHeap.dequeue();
    const amt = Math.min(p.value * -1, r.value);
    ans.push({ payer: p.key, receiver: r.key, amount: String(amt) });
    // console.log(ans,"dwlkjghefjge")
    p.value += amt;
    r.value -= amt;

    if (p.value < 0) {
      minHeap.queue(new KeyValue(p.key, p.value));
    } else if (r.value > 0) {
      maxHeap.queue(new KeyValue(r.key, r.value));
    }
  }
  for(const ele of ans){
    const payer = ele.payer
    const receiver = ele.receiver
    const p = await User.findById(payer)
    const r = await User.findById(receiver)
    ele.payer = p.name
    ele.receiver = r.name
  }
  return ans;
}

