import { ccc } from "@ckb-ccc/ccc";
import { client, signer } from "@ckb-ccc/playground";

function getExplorerTxUrl(txHash: string) {
  const isMainnet = client.addressPrefix === 'ckb';
  const baseUrl = isMainnet ? 'https://explorer.nervos.org' : 'https://testnet.explorer.nervos.org';

  return `${baseUrl}/transaction/${txHash}`
}

function generateSimpleDNA(length: number): string {
  return Array.from(
    { length }, 
    () => Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

function generateClusterDescriptionUnderDobProtocol() {
  /**
   * Generation example for DOB0
   */
  const clusterDescription = "This is a basic-shape example for dob1.";
  const dob0Pattern: ccc.spore.dob.PatternElementDob0[] = [
    {
      traitName: "Shape",
      dobType: "String",
      dnaOffset: 1,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["circle", "square", "triangle", "star", "text"],
    },
    {
      traitName: "BackgroundColor",
      dobType: "String",
      dnaOffset: 0,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["red", "blue", "green", "yellow", "pink"],
    }
  ];
  
  /**
   * Generation example for DOB1
   */
  const dob1Pattern: ccc.spore.dob.PatternElementDob1[] = [
    {
      imageName: "IMAGE.0",
      svgFields: "attributes",
      traitName: "",
      patternType: "raw",
      traitArgs: "xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'",
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "BackgroundColor",
      patternType: "options",
      traitArgs: [
        ["red", "<rect width='500' height='500' x='0' y='0' fill='red' />"],
        ["blue", "<rect width='500' height='500' x='0' y='0' fill='blue' />"],
        ["green", "<rect width='500' height='500' x='0' y='0' fill='green' />"],
        ["yellow", "<rect width='500' height='500' x='0' y='0' fill='yellow' />"],
        [["*"], "<rect width='500' height='500' x='0' y='0' fill='pink' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Shape",
      patternType: "options",
      traitArgs: [
        ["circle", "<circle cx='250' cy='250' r='150' fill='white' stroke='black' stroke-width='2' />"],
        ["square", "<rect width='300' height='300' x='100' y='100' fill='white' stroke='black' stroke-width='2' />"],
        ["triangle", "<polygon points='250,100 400,400 100,400' fill='white' stroke='black' stroke-width='2' />"],
        ["star", "<path d='M250 100 L290 200 L400 200 L310 260 L340 370 L250 300 L160 370 L190 260 L100 200 L210 200 Z' fill='white' stroke='black' stroke-width='2' />"],
        ["text", "<text x='250' y='250' text-anchor='middle' dominant-baseline='middle' font-size='48' fill='black'>DOB1</text>"],
        [["*"], "<circle cx='250' cy='250' r='150' fill='white' stroke='black' stroke-width='2' />"]
      ],
    }
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

  return ccc.spore.dob.encodeClusterDescriptionForDob1(dob1);
}


/**
 * create cluster
 */

const { tx: clusterTx, id: clusterId } = await ccc.spore.createSporeCluster({
  signer,
  data: {
    name: "dob1-basic-shape",
    description: generateClusterDescriptionUnderDobProtocol(),
  },
});
await clusterTx.completeFeeBy(signer, 2000n);
const clusterTxHash = await signer.sendTransaction(clusterTx);
console.log("Create cluster tx sent:", clusterTxHash, `Cluster ID: ${clusterId}`);

/**
 * create spore
 */
//const clusterId = '0xc2e4164c6b390b0ca31138d1715201c24dc9aafae1a75b1047763cd06602de4e';
const { tx: sporeTx, id: sporeId } = await ccc.spore.createSpore({
  signer,
  data: {
    contentType: "dob/0",
    content: ccc.bytesFrom(`{ "dna": "${generateSimpleDNA(16)}" }`, "utf8"),
    clusterId: clusterId,
  },
  clusterMode: "clusterCell",
});
await sporeTx.completeFeeBy(signer, 2000n);
const sporeTxHash = await signer.sendTransaction(sporeTx);
console.log("Mint DOB tx sent:", sporeTxHash, `Spore ID: ${sporeId}`);

await signer.client.waitTransaction(clusterTxHash);
console.log("Create cluster tx committed:", getExplorerTxUrl(clusterTxHash), `Cluster ID: ${clusterId}`);
await signer.client.waitTransaction(sporeTxHash);
console.log("Mint DOB tx committed:", getExplorerTxUrl(sporeTxHash), `Spore ID: ${sporeId}`);


/**
 * The code below helps you to view the dob you just minted
 */

const getDobTypeHash = (sporeId: string, version?: ccc.spore.SporeVersion | ccc.spore.SporeVersion.V2 )  => {
    const sporeScriptInfo = ccc.spore.getSporeScriptInfo(client, version)
    const dobTypeScript = ccc.Script.from({
        codeHash: sporeScriptInfo.codeHash,
        hashType: sporeScriptInfo.hashType,
        args: sporeId
    })

    return dobTypeScript.hash();
}

const getClusterTypeHash = (clusterId: string, version?: ccc.spore.SporeVersion | ccc.spore.SporeVersion.V2 )  => {
    const clusterScriptInfo = ccc.spore.getClusterScriptInfo(client, version)
    const clusterTypeScript = ccc.Script.from({
        codeHash: clusterScriptInfo.codeHash,
        hashType: clusterScriptInfo.hashType,
        args: clusterId
    })

    return clusterTypeScript.hash();
}

enum PlatformSupportedDOB {
  JOYID = "joyid",
  CKBEXPLORER = "ckb explorer",
  OMIGA = "omiga",
  DOBBY = "dobby",
  MOBIT = "mobit",
}

const viewDobUrl = (platform : PlatformSupportedDOB, clusterId: string, sporeId: string) => {
    const isMainnet = client.addressPrefix === 'ckb';
    let url = ''

    switch (platform) {
        case PlatformSupportedDOB.JOYID:
            url = isMainnet 
                ? `https://app.joy.id/nft/${sporeId.slice(2)}`
                : `https://testnet.joyid.dev/nft/${sporeId.slice(2)}`;
            break;
        case PlatformSupportedDOB.OMIGA:
            const sporeTypeHash = getDobTypeHash(sporeId);
            url = isMainnet
                ? `https://omiga.io/info/dobs/${sporeTypeHash}`
                : `https://test.omiga.io/info/dobs/${sporeTypeHash}`;
            break;
        case PlatformSupportedDOB.CKBEXPLORER:
            const clusterTypeHash = getClusterTypeHash(clusterId);
            url = isMainnet
                ? `https://explorer.nervos.org/nft-info/${clusterTypeHash}/${sporeId}`
                : `https://testnet.explorer.nervos.org/nft-info/${clusterTypeHash}/${sporeId}`;
            break;
        case PlatformSupportedDOB.DOBBY:
            url = isMainnet
                ? `https://app.dobby.market/item-detail_ckb/${sporeId}`
                : `https://test-dobby.entrust3.com/item-detail_ckb/${sporeId}`;
            break;
        case PlatformSupportedDOB.MOBIT:
            url = isMainnet
                ? `https://mobit.app/dob/${sporeId.slice(2)}?chain=ckb`
                : `https://mobit.app/dob/${sporeId.slice(2)}?chain=ckb`;
            break;
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
    
    return url;
}

console.log('Now you can view the dob on JoyId, Omiga, CKB Explorer, Mobit, Dobby...');
Object.values(PlatformSupportedDOB).forEach(platform => {
    console.log(`View on ${platform}: 👉🔗`, viewDobUrl(platform, clusterId, sporeId));
});
