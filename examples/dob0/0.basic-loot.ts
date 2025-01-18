import { ccc } from "@ckb-ccc/ccc";
import {  signer } from "@ckb-ccc/playground";


// Build transaction
let { tx, id } = await ccc.spore.createSpore({
    signer,
    data: {
        contentType: "text/plain",
        content: ccc.bytesFrom("hello, basic loot", "utf8"),
    },
});
console.log("sporeId:", id);
// Complete transaction
await tx.completeFeeBy(signer);
// Send transaction
const txHash = await signer.sendTransaction(tx);
console.log(txHash);
