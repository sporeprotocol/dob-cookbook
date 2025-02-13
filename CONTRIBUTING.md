# Contributing Guidelines

We welcome contributions to the DOB Cookbook! Here's how to get started:

## Development Setup

1. **Fork the Repository**
2. **Clone your fork**:
```bash
git clone https://github.com/YOUR-USERNAME/dob-cookbook.git
cd dob-cookbook
```

## Adding New Examples

### 1. Determine DOB Version
- **DOB/0**: Basic protocol implementation
- **DOB/1**: Enhanced protocol with SVG composition

### 2. Create Example Files
File structure:
```
examples/
  dob{0|1}/
    {index}.{example-name}.ts    # Core implementation
    {index}.{example-name}.md    # Documentation
```

Copy the content of the existing example code to the newly created {index}.{example-name}.ts file, modify it, and save it.

### 3. Live Testing
1. Use [CKB Live IDE](https://live.ckbccc.com/)
2. Paste TS file content and Run
3. Check console output for:
   - Transaction hashes
   - Platform preview URLs
4. Verify rendering on all platforms

### 4. Documentation Requirements
1. Screenshots:
   - Naming: `{example-name}-platform.ext`
   - Save to: `examples/assets/images/dob{0|1}/`

2. Markdown elements:
```markdown
## Intro
This example demonstrates [brief description of your example].

<div align="center">
  <img src="../assets/images/dob1/example-name-joyid.svg" height="300">
</div>

## [Code](./example-name.ts)
// Your core implementation

## On-chain test cluster and DOB

### Testnet

- 👉[🔗 createCluster tx](https://testnet.explorer.nervos.org/transaction/your-tx-hash)
  - clusterId: `0x...`
  - clusterTypeHash: `0x...`

- 👉[🔗 mintSpore tx](https://testnet.explorer.nervos.org/transaction/your-tx-hash)
  - sporeId: `0x...`
  - sporeTypeHash: `0x...`

### Platform Preview(Testnet)

#### JoyID
![example-joyid.png](../assets/images/dob1/example-joyid.png)
[View on JoyID](https://testnet.joyid.dev/nft/...)

#### Omiga
![example-omiga.png](../assets/images/dob1/example-omiga.png)
[View on Omiga](https://test.omiga.io/info/dobs/...)

#### CKB Explorer
![example-explorer.png](../assets/images/dob1/example-explorer.png)
[View on Explorer](https://testnet.explorer.nervos.org/nft-info/...)

#### Mobit
![example-mobit.png](../assets/images/dob1/example-mobit.png)
[View on Mobit](https://mobit.app/dob/...)

#### Dobby
![example-dobby.png](../assets/images/dob1/example-dobby.png)
[View on Dobby](https://test-dobby.entrust3.com/item-detail_ckb/...)


## Compatibility
|         | JoyID | Omiga | CKB Explorer | Mobit | Dobby |
| ------- | ----- | ----- | ------------ | ----- | ----- |
| Testnet | ✅or❌ | ✅or❌| ✅or❌        | ✅or❌ | ✅or❌| 
| Mainnet | 


---
<div align="right">

| [← Previous Example](prev-example.md) | [Next Example →](next-example.md) |
|:---------------------------------------|----------------------------------------:|
</div>
```

## Submission Process

1. **Commit changes**:
```bash
git add .
git commit -m "feat: add {example-name} example"
git push 
```

2. **Create Pull Request** with:
- Implementation details
- Test results
- Screenshot verification
- Compatibility table update

## Important Notes

1. Never commit:
- Private keys
- Sensitive credentials
- Local development paths

2. Update README compatibility tables

3. Maintain navigation links between examples

For questions, please open an Issue for discussion. Thank you for your contribution!