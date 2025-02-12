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
 
  const clusterDescription = "A cluster with Nervape compose as the primary rendering objects.";
  
  const dob0Pattern: ccc.spore.dob.PatternElementDob0[] = [
    {
      traitName: "Background",
      dobType: "String",
      dnaOffset: 0,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Flames Red", "Volcano Eruption Magenta", "Ocean Floor Blue", "Winter Wonderland Day"],
    },
    {
      traitName: "Headwear",
      dobType: "String",
      dnaOffset: 1,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Cap Bitcoin", "Nervape Xmas Tree Head Strap Star Light Violet", "Cap Nervos Green", "Cap Nervape Yellow"],
    },
    {
      traitName: "Mask",
      dobType: "String",
      dnaOffset: 2,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Zombie Mask", "Opera Mask Wukong", "Bonelist Mask", "Goofy Eyes Soup"],
    },
    {
      traitName: "Ears",
      dobType: "String",
      dnaOffset: 3,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Daisy Earrings Yellow", "Bone Earrings Blue Purple", "Apple Earrings Red", "Feather Earrings"],
    },
    {
      traitName: "Accessory",
      dobType: "String",
      dnaOffset: 4,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Nervape Figure Green", "Assorted Rings Gold", "Bitcoin Chain", "Nervos Chain"],
    },
    {
      traitName: "Upper body",
      dobType: "String",
      dnaOffset: 5,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Tee POW", "Faux Fur Coat Pink", "Short-Sleeve Button-up Nervape Blue", "Tee Bitcoin Pattern"],
    },
    {
      traitName: "Lower body",
      dobType: "String",
      dnaOffset: 6,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Cargo Shorts", "Knife Pleated Skirt Denim Blue", "Swimming Trunks POW BOOM", "Fishnet Stocking"],
    },
    {
      traitName: "Handheld",
      dobType: "String",
      dnaOffset: 7,
      dnaLength: 1,
      patternType: "options",
      traitArgs: ["Skateboard Red", "Ruyi Jingu Bang", "Coin BTC", "Coin CKB"],
    }
  ];

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
      traitName: "",
      patternType: "raw",
      traitArgs: "<image width='500' height='500' href='btcfs://f1dce09bbb61961b3c61efbfa263a38511cf89dbdeed206f6ecc001a52c1fb01i0' />"
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Background",
      patternType: "options",
      traitArgs: [
        ["Flames Red", "<image width='500' height='500' href='btcfs://765415ac4bb47b2a4a31d917573edd19adb0ecb1b27a437bdef59f20845c8231i1' />"],
        ["Volcano Eruption Magenta", "<image width='500' height='500' href='btcfs://1611250986d396bc22205d630a5c24cee5f8a34817b20b5cb58238bd087181cai1' />"],
        ["Ocean Floor Blue", "<image width='500' height='500' href='btcfs://b55371289e9aa083b3680742be038f7fbdff23cd464f002506d835b20ab11797i1' />"],
        ["Winter Wonderland Day", "<image width='500' height='500' href='btcfs://f6307288879631a8ff83e48ceea2652a4eed4b43466c67e454c6c4e320a5bdc1i1' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Headwear",
      patternType: "options",
      traitArgs: [
        ["Cap Bitcoin", "<image width='500' height='500' href='btcfs://6c459c31e8662fca440429f5e07c49889d2bbb9f7ed396b3d156f2cec5fe359ei0' />"],
        ["Nervape Xmas Tree Head Strap Star Light Violet", "<image width='500' height='500' href='btcfs://6782ed2557e340de388c9acde001ec50d5acaa817de66a54d6977b67eb2d4d03i1' />"],
        ["Cap Nervos Green", "<image width='500' height='500' href='btcfs://9157a5f42dd4d621a20dcced9aa2a44c349a2227c2dcd69edb34dd7a2adde10ci0' />"],
        ["Cap Nervape Yellow", "<image width='500' height='500' href='btcfs://874bd3d9bfe54469702765029301306354ecb1961a5ba6253bff6af5e0e22600i0' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Mask",
      patternType: "options",
      traitArgs: [
        ["Zombie Mask", "<image width='500' height='500' href='btcfs://9831cfdfc88d20fe2bd9ee8ede0bf72b9074e61f100b384550f720157eee646ei0' />"],
        ["Opera Mask Wukong", "<image width='500' height='500' href='btcfs://470d5f61d5b0878d863b93c7d69e9ec831b67069cf24f6b7f29f0b709dd1dd18i0' />"],
        ["Bonelist Mask", "<image width='500' height='500' href='btcfs://65be344dbe3a0d1b27e314a15bd8ecb4b350bb8aaf049702d93738ffdc0d4847i0' />"],
        ["Goofy Eyes Soup", "<image width='500' height='500' href='btcfs://2c888132cfa0342be9a1f2cf3c6b96b30c80c49fc54a702a7fd2e52963d8e2f9i0' />"],
      ]
    }, 
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Ears",
      patternType: "options",
      traitArgs: [
        ["Daisy Earrings Yellow", "<image width='500' height='500' href='btcfs://fe492fd08bbcaf9cc3b461d34fa388f14d7c8e9759b40ee241a274dbace27b29i0' />"],
        ["Bone Earrings Blue Purple", "<image width='500' height='500' href='btcfs://c7543d4066fff897fb23446cbe9ab8d3d77f04a2f6f2be8afacff8a479060755i0' />"],
        ["Apple Earrings Red", "<image width='500' height='500' href='btcfs://0840773bd7d9e56f43cd1e5b72c997e61e9aee55578a231c1a5d923ce67b6be5i0' />"],
        ["Feather Earrings", "<image width='500' height='500' href='btcfs://10d24f3aa3685f98c2fee91f2dcad65b0dd6612a63cc0921ccab3684446c0548i0' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Accessory",
      patternType: "options",
      traitArgs: [
        ["Nervape Figure Green", "<image width='500' height='500' href='btcfs://c08bd2dfd9d50b88911c05f7d7db1430f1f5c4c96933220e8393d13e0b142ff0i1' />"],
        ["Assorted Rings Gold", "<image width='500' height='500' href='btcfs://77007c6c7b5dc7f40824dbf21a633ec5c6a93faac6d4770d2cbc2db0272d2aebi0' />"],
        ["Bitcoin Chain", "<image width='500' height='500' href='btcfs://a1af1a4f36a30df75c5c2ccef20972a46743499790d8bb34603801ff822ee4c8i1' />"],
        ["Nervos Chain", "<image width='500' height='500' href='btcfs://72d42930da02c9f3be654fde100f196691852a0a95ff28f269f33bc0dbeeb4d0i1' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Upper body",
      patternType: "options",
      traitArgs: [
        ["Tee POW", "<image width='500' height='500' href='btcfs://95409604adad8ff6600071f78c3651a5438368812ccf4135eae4382cdb80a193i1' />"],
        ["Faux Fur Coat Pink", "<image width='500' height='500' href='btcfs://31361a16cd069578914b9dc6993ea2a532430589bd49e36a03c46410a49967d0i1' />"],
        ["Short-Sleeve Button-up Nervape Blue", "<image width='500' height='500' href='btcfs://83e316fabd7100cea61db4fa6df8d90840557c64ee1a7a46243835737ea1fd00i1' />"],
        ["Tee Bitcoin Pattern", "<image width='500' height='500' href='btcfs://acb0cf5b691b153154644f045a87a57cf1d00c67e4acca3606a7112e1502b05bi1' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Lower body",
      patternType: "options",
      traitArgs: [
        ["Cargo Shorts", "<image width='500' height='500' href='btcfs://7143a9867f41b2a59547e05deb6bbcc61322b409e808ee540224e218b9143c4bi1' />"],
        ["Knife Pleated Skirt Denim Blue", "<image width='500' height='500' href='btcfs://50c9f8650d968d319b3e0435527d7461a8eb1d7ef67e3d2bc9c4c186f2a9302ai1' />"],
        ["Swimming Trunks POW BOOM", "<image width='500' height='500' href='btcfs://71c2e728c754d65ea549da7a31d07ac4b1af4b72896903eb2ef7cb8ddd0b5452i1' />"],
        ["Fishnet Stocking", "<image width='500' height='500' href='btcfs://e6df22f53aed8a007e79159e89231661495f46ecf1cc59f6f127242adce31c24i0' />"],
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Handheld",
      patternType: "options",
      traitArgs: [
        ["Skateboard Red", "<image width='500' height='500' href='btcfs://1ccb3cfd1e33d4fe414cef717c4de93489e8d0cd80d792f068657c959a740a03i1' />"],
        ["Ruyi Jingu Bang", "<image width='500' height='500' href='btcfs://d47d6d4e1ee4556333618d958fe4de44e3f5e572d21c51ac29ae3dfda92f408bi1' />"],
        ["Coin BTC", "<image width='500' height='500' href='btcfs://48afad47bb9817c005131c257deb52302286e01f6a6724996fb9dfe4372a16a0i0' />"],
        ["Coin CKB", "<image width='500' height='500' href='btcfs://14f3d037dbb4ebac317a038803b6b95bb433f3f02239f455e1899a9753984473i0' />"],
      ]
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
    name: "4.Awesome Nervapes",
    description: generateClusterDescriptionUnderDobProtocol(),
  },
});
await clusterTx.completeFeeBy(signer, 2000n);
const clusterTxHash = await signer.sendTransaction(clusterTx);
console.log("Create cluster tx sent:", clusterTxHash, `Cluster ID: ${clusterId}`);

/**
 * create spore
 */
//const clusterId = '0x69c4cbfa31bf6916fc456f4f9b78fbcc22dde28c326d0c7f05e78c723de97088';
const { tx: sporeTx, id: sporeId } = await ccc.spore.createSpore({
  signer,
  data: {
    contentType: "dob/1",
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