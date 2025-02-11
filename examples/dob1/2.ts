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

// 编码函数：将日期转换为DNA字符串
function encodeDateToDNA(dateStr: string): string {
    // 确保输入格式为 "YYYYMMDD"
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6));
    const day = parseInt(dateStr.substring(6, 8));
    
    // 将年份转换为16进制
    const yearHex = year.toString(16).padStart(4, '0');
    
    // 将月和日转换为16进制
    const monthHex = month.toString(16).padStart(2, '0');
    const dayHex = day.toString(16).padStart(2, '0');
    
    // 组合月日部分
    const dateHex = monthHex + dayHex;
    
    return yearHex + dateHex;
}

// 解码函数：将DNA中的日期部分解析为星座
function getZodiacFromDNA(datePart: string): string {
    // 将16进制转换回十进制
    const month = parseInt(datePart.substring(0, 2), 16);
    const day = parseInt(datePart.substring(2, 4), 16);
    
    // 星座日期范围判断
    const date = month * 100 + day;
    
    if ((date >= 321 && date <= 419)) return "白羊座";
    if ((date >= 420 && date <= 520)) return "金牛座";
    if ((date >= 521 && date <= 621)) return "双子座";
    if ((date >= 622 && date <= 722)) return "巨蟹座";
    if ((date >= 723 && date <= 822)) return "狮子座";
    if ((date >= 823 && date <= 922)) return "处女座";
    if ((date >= 923 && date <= 1023)) return "天秤座";
    if ((date >= 1024 && date <= 1122)) return "天蝎座";
    if ((date >= 1123 && date <= 1221)) return "射手座";
    if ((date >= 1222 || date <= 119)) return "摩羯座";
    if ((date >= 120 && date <= 218)) return "水瓶座";
    if ((date >= 219 && date <= 320)) return "双鱼座";
    
    return "无效日期";
}

// 使用示例
console.log(encodeDateToDNA("20210130")); // 输出：07e30122
const dna = encodeDateToDNA("20210130");
console.log(getZodiacFromDNA(dna.substring(4))); // 输出：水瓶座

// 更多测试用例
console.log(encodeDateToDNA("20240214")); // 2024年2月14日
console.log(getZodiacFromDNA("020e")); // 2月14日 -> 水瓶座

/**
 * Generate cluster description
 */
function generateClusterDescriptionUnderDobProtocol() {
 
  const clusterDescription = "A zodiac cluster.";
  
  const dob0Pattern: ccc.spore.dob.PatternElementDob0[] = [
    {
      traitName: "Birth Year",
      dobType: "Number",
      dnaOffset: 0,
      dnaLength: 2,
      patternType: "rawNumber",
    },
    {
      traitName: "Birth Day",
      dobType: "Number",
      dnaOffset: 2,
      dnaLength: 2,
      patternType: "rawNumber",
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
      traitName: "Birth Year",
      patternType: "options",
      traitArgs: [
        [['*'],'<text x="250" y="250" text-anchor="middle" fill="black" font-size="24">{value}</text>']
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Birth Day",
      patternType: "options",
      traitArgs: [
        ["*",'<text x="250" y="250" text-anchor="middle" fill="black" font-size="24">{value}</text>']
      ]
    },
    {
      imageName: "IMAGE.0",
      svgFields: "elements",
      traitName: "Birth Day",
      patternType: "options",
      traitArgs: [
        [[321, 419], '<path d="M235,320 Q250,310 265,320 T295,320" fill="none" stroke="black" stroke-width="2"/><path d="M250,320 L250,340 M240,335 L250,340 L260,335" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Aries</text>'],
        [[420, 520], '<circle cx="250" cy="330" r="15" fill="none" stroke="black" stroke-width="2"/><path d="M235,320 Q250,310 265,320" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Taurus</text>'],
        [[521, 621], '<path d="M240,315 V345 M260,315 V345 M240,330 H260" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Gemini</text>'],
        [[622, 722], '<path d="M235,330 A15,15 0 1,1 265,330 M245,325 A8,8 0 1,0 255,325" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Cancer</text>'],
        [[723, 822], '<circle cx="250" cy="330" r="12" fill="none" stroke="black" stroke-width="2"/><path d="M262,330 Q270,330 275,335" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Leo</text>'],
        [[823, 922], '<path d="M245,315 Q250,345 255,315 M250,330 H260" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Virgo</text>'],
        [[923, 1023], '<path d="M235,330 H265 M240,335 L260,335 M250,335 V345" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Libra</text>'],
        [[1024, 1122], '<path d="M235,330 H255 Q265,330 265,340 M265,340 l5,-3 l-3,5" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Scorpio</text>'],
        [[1123, 1221], '<path d="M240,320 L260,340 M260,320 L240,340 M255,335 L265,335" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Sagittarius</text>'],
        [[1222, 119], '<path d="M240,320 Q250,350 260,320 M260,320 Q265,320 265,325" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Capricorn</text>'],
        [[120, 218], '<path d="M235,325 Q250,335 265,325 M235,335 Q250,345 265,335" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Aquarius</text>'],
        [[219, 320], '<path d="M240,330 A10,10 0 1,1 250,330 M250,330 A10,10 0 1,0 260,330" fill="none" stroke="black" stroke-width="2"/><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Pisces</text>'],
        [["*"], '<circle cx="250" cy="330" r="15" fill="none" stroke="black" stroke-width="2"/><text x="250" y="335" text-anchor="middle" fill="black" font-size="16">?</text><text x="250" y="380" text-anchor="middle" fill="black" font-size="24">Unknown</text>']
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
    name: "Zodiac",
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
//const clusterId = '';
const { tx: sporeTx, id: sporeId } = await ccc.spore.createSpore({
  signer,
  data: {
    contentType: "dob/0",
    content: ccc.bytesFrom(`{ "dna": "${encodeDateToDNA('19951223')}" }`, "utf8"),
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

//     "result": "{\"render_output\":\"[{\\\"name\\\":\\\"Birth Year\\\",\\\"traits\\\":[{\\\"Number\\\":1995}]},{\\\"name\\\":\\\"Birth Day\\\",\\\"traits\\\":[{\\\"Number\\\":0702}]},{\\\"name\\\":\\\"IMAGE\\\",\\\"traits\\\":[{\\\"SVG\\\":\\\"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"250\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">{value}</text><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"300\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">{value}</text><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"350\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">巨蟹座</text></svg>\\\"}]}]\",\"dob_content\":{\"dna\":\"cb07be02\"}}",
//     "result": "{\"render_output\":\"[{\\\"name\\\":\\\"Birth Year\\\",\\\"traits\\\":[{\\\"Number\\\":1995}]},{\\\"name\\\":\\\"Birth Day\\\",\\\"traits\\\":[{\\\"Number\\\":1223}]},{\\\"name\\\":\\\"IMAGE\\\",\\\"traits\\\":[{\\\"SVG\\\":\\\"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 500'><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"150\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">{value}</text><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"250\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">{value}</text><text x=\\\\\\\"250\\\\\\\" y=\\\\\\\"300\\\\\\\" text-anchor=\\\\\\\"middle\\\\\\\" fill=\\\\\\\"black\\\\\\\" font-size=\\\\\\\"24\\\\\\\">{value}</text></svg>\\\"}]}]\",\"dob_content\":{\"dna\":\"cb07c704\"}}",
