const User = require("../models/user")
module.exports = function optimize(transactions) {

  const friendIds = new Set();
  transactions.forEach((transaction) => {
    friendIds.add(transaction.payer);
    friendIds.add(transaction.receiver);
  });

  const residue = new Map();
  for (const id of friendIds) {
    residue.set(id, 0);
  }
  for (const transaction of transactions) {
    residue.set(transaction.payer, residue.get(transaction.payer) - parseInt(transaction.amount));
    residue.set(transaction.receiver, residue.get(transaction.receiver) + parseInt(transaction.amount));
  }
  
  const ans = [];
  const flag = Array.from(residue.values()).some((value) => value !== 0);
  if (!flag){
    return ans;
  }
  const t = Array.from(residue.entries()).map(([id, value]) => [value, id]);
  t.sort((a, b) => a[0] - b[0]);

  while (t.length > 0) {
    const p = [...t.shift()]; // Convert array to copy
    const r = [...t.pop()];   // Convert array to copy
    const amt = Math.min(p[0] * -1, r[0]);
    ans.push({ payer: p[1], receiver: r[1], amount: String(amt) });
    p[0] += amt;
    r[0] -= amt;
    if (p[0] < 0) {
      t.push([p[0], p[1]]);
      t.sort((a, b) => a[0] - b[0]);
    } else if (r[0] > 0) {
      t.push([r[0], r[1]]);
      t.sort((a, b) => a[0] - b[0]);
    }
  }
  return ans;
};

