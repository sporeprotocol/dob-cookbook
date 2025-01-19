import { ccc } from "@ckb-ccc/ccc";
import { client, signer, render } from "@ckb-ccc/playground";

function generateClusterDescriptionUnderDobProtocol() {
  /**
   * Generation example for DOB0
   */
  const clusterDescription = "this is the description for 0.render-2-btcfs-png cluster";
  const dob0Pattern: ccc.spore.dob.PatternElementDob0[] = [
    {
      traitName: "BackgroundColor",
      dobType: "String",
      dnaOffset: 0,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["red", "blue", "green", "black", "white"],
    },
    {
      traitName: "Type",
      dobType: "Number",
      dnaOffset: 1,
      dnaLength: 1,
      patternType: "range",
      traitArgs: [10, 50],
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
  /**
   * Generation example for DOB1
   */
  const dob1Pattern: ccc.spore.dob.PatternElementDob1[] = [
    {
      imageName: "IMAGE.0",
      svgFields: "attributes",
      traitName: "",
      patternType: "raw",
      traitArgs: "xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'",
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Timestamp",
      patternType: "options",
      traitArgs: [
        [
          [0, 1000000],
          "<image width='300' height='200' href='btcfs://b2f4560f17679d3e3fca66209ac425c660d28a252ef72444c3325c6eb0364393i0' />",
        ],
        [
          ["*"],
          "<image width='300' height='200' href='btcfs://eb3910b3e32a5ed9460bd0d75168c01ba1b8f00cc0faf83e4d8b67b48ea79676i0' />",
        ],
      ],
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "BackgroundColor",
      patternType: "options",
      traitArgs: [
        ["red", "<rect width='20' height='20' x='5' y='5' fill='red' />"],
        ["blue", "<rect width='20' height='20' x='20' y='5' fill='blue' />"],
        ["green", "<rect width='20' height='20' x='5' y='20' fill='green' />"],
        [["*"], "<rect width='20' height='20' x='20' y='20' fill='pink' />"],
      ],
    },
  ];
  const dob1: ccc.spore.dob.Dob1 = {
    description: clusterDescription,
    dob: {
      ver: 1,
      decoders: [
        {
          decoder: ccc.spore.dob.getDecoder(client, "dob0"),
          pattern: dob0Pattern,
        },
        {
          decoder: ccc.spore.dob.getDecoder(client, "dob1"),
          pattern: dob1Pattern,
        },
      ],
    },
  };
  return [
    ccc.spore.dob.encodeClusterDescriptionForDob0(dob0),
    ccc.spore.dob.encodeClusterDescriptionForDob1(dob1),
  ];
}
const { tx, id: clusterId } = await ccc.spore.createSporeCluster({
  signer,
  data: {
    name: "0.render-2-btcfs-png",
    description: generateClusterDescriptionUnderDobProtocol()[1],
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
