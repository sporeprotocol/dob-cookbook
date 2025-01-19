import { ccc } from "@ckb-ccc/ccc";
import { client, signer, render } from "@ckb-ccc/playground";

function generateClusterDescriptionUnderDobProtocol() {
  /**
   * Generation example for DOB0
   */
  const clusterDescription = "this is the description for Common-image cluster";
  const dob0Pattern: ccc.spore.dob.PatternElementDob0[] = [
    {
      traitName: "prev.type",
      dobType: "String",
      dnaOffset: 0,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ['image'],
    },
    {
      traitName: "prev.bg",
      dobType: "String",
      dnaOffset: 6,
      dnaLength: 1,
      patternType: "options",
    
      traitArgs:[
       "btcfs://8330ca2167ee77dcd0bc5589aacd743aba259fd92f63ebc7e4d950ac9e2578a7i0",
      ],
    },
    {
      traitName: "Timestamp",
      dobType: "Number",
      dnaOffset: 2,
      dnaLength: 4,
      patternType: "rawNumber",
    },
  ];
  const dob0: ccc.spore.dob.Dob0 = {
    description: clusterDescription,
    dob: {
      ver: 0,
      decoder: ccc.spore.dob.getDecoder(client, "dob0"),
      pattern: dob0Pattern,
    },
  };
  return ccc.spore.dob.encodeClusterDescriptionForDob0(dob0);
}
const { tx, id: clusterId } = await ccc.spore.createSporeCluster({
  signer,
  data: {
    name: "Common Image",
    description: generateClusterDescriptionUnderDobProtocol(),
  },
});
await tx.completeFeeBy(signer);

const txHash = await signer.sendTransaction(tx);
console.log("Transaction sent:", txHash, "Cluster ID:", clusterId);
/**
##createCluster
 */
const { tx: sporeTx, id: sporeId } = await ccc.spore.createSpore({
  signer,
  data: {
    contentType: "dob/0",
    content: ccc.bytesFrom('{ "dna": "0123456789abcdef" }', "utf8"),
    clusterId: clusterId,
  },
  clusterMode: "clusterCell",
});
await sporeTx.completeFeeBy(signer);

const sporeTxHash = await signer.sendTransaction(sporeTx);
console.log("Transaction sent:", txHash, "Spore ID:", sporeId);
await signer.client.waitTransaction(txHash);

await signer.client.waitTransaction(sporeTxHash);
