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

/**
 * Generate cluster description
 */
function generateClusterDescriptionUnderDobProtocol() {
 
  const clusterDescription = "A cluster with btcfs i0 svg as the primary rendering objects.";
  
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
      dnaOffset: 1,
      dnaLength: 1,
      patternType: "options",
      traitArgs:[
       "btcfs://8ca2da44996f5a06ad44b5bb87fd9acb71390b6c0cb1910c10b0deb8daad7f82i0",
      ],
    },
    {
      traitName: "prev.bgcolor",
      dobType: "String",
      dnaOffset: 2,
      dnaLength: 1,
      patternType: "options",
      traitArgs:[
       "#FFC103",
      ],
    },
    {
      traitName: "Type",
      dobType: "Number",
      dnaOffset: 3,
      dnaLength: 1,
      patternType: "range",
      traitArgs: [10, 50],
    },
    {
      traitName: "Timestamp",
      dobType: "Number",
      dnaOffset: 4,
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

/**
 * create cluster
 */
const { tx: clusterTx, id: clusterId } = await ccc.spore.createSporeCluster({
  signer,
  data: {
    name: "BTCFS i0 SVG",
    description: generateClusterDescriptionUnderDobProtocol(),
  },
});
await clusterTx.completeFeeBy(signer, 2000n);
const clusterTxHash = await signer.sendTransaction(clusterTx);
console.log("Create cluster tx sent:", clusterTxHash, `Cluster ID: ${clusterId}`);
await signer.client.waitTransaction(clusterTxHash);
console.log("Create cluster tx committed:", getExplorerTxUrl(clusterTxHash), `Cluster ID: ${clusterId}`);

/**
 * create spore
 */
// testnet
//const clusterId = '0xd74f0b5c866f0f04958426213781ddb80e9cd730c78d24f7c149aad18d3bc8bd';
// mainnet
//const clusterId = '0xf921cda6dddff8824548194981790a0c4bf94e451510be5fc09cc582e9f2aca0';
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