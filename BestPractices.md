# DOB Protocol Best Practices

## 1. Cluster Design

### 1.1 Pattern Design
- Choose the appropriate DOB protocol (`DOB0`/`DOB1`) based on requirements
- Keep the `patterns` simple and modular
- Use meaningful trait names (`traitName`) to clearly describe attributes
- Carefully design `DNA` generation rules (DNA length and meaning of each bit)
- Document the pattern structure in detail for future reference
- Use appropriate `patternType` (options/range/rawNumber/rawString) based on specific needs
- Handle edge cases in trait generation

### 1.2 Decoder Selection
- Choose appropriate decoder based on rendering needs
- Prefer standard decoders (`DOB0`/`DOB1`) for better compatibility
- If standard decoders (DOB0/DOB1) cannot fulfill rendering needs, develop and deploy a custom decoder. Submit deployment details to https://github.com/sporeprotocol/dob-decoder-standalone-server for decoder server recognition
- Test decoder compatibility across platforms (JoyID, Omiga, etc.)

### 1.3 Content Storage
- For media resources (e.g., images), prefer BTCFS over regular links for better decentralization
- When using IPFS, ensure content is properly pinned and backed up
- Consider BTCFS content size limitations and gas costs
- Choose appropriate content formats (PNG/SVG) based on requirements

## 2. MVP Validation

This phase is for quickly validating Cluster design rationality, DOB rendering quality, and compatibility. We recommend continuously optimizing and adjusting Cluster parameters until rendering meets expectations.

### 2.1 Media Resources
- Use temporary links to test rendering effects initially.
- Finalize media resources and upload them to the blockchain only after rendering validation.
- During feasibility testing, avoid uploading media to the blockchain; use temporary links instead. Ensure servers hosting temporary links support CORS for proper image display.

### 2.2 Creating Cluster and Minting DOB
Find a similar example in `dob-cookbook`, copy the code to [CKB Online Editor (CCC Playground)](https://live.ckbccc.com/), modify parameters, and run:

- Ensure CCC Playground environment is set to `Testnet`
- Check output results in the Console
- Click links in Console to view transaction details and DOB rendering effects
- Use https://dob-render.vercel.app/ to preview and fine-tune DOB parameters by editing the decode response JSON. Update Cluster’s pattern configuration once rendering meets expectations
- Confirm rendering compatibility and quality before proceeding

## 3. Integration and Testing

After MVP validation, proceed to engineering integration. Address the following:

### 3.1 DNA Generation and Validation
- Design `DNA` generation rules meticulously
- Write unit tests to validate `DNA` field distributions

### 3.2 Cluster Creation
- Include project introduction in `Cluster Description`
- Verify trait generation and distribution accuracy
- Handle edge cases in traits generation

### 3.3 DOB Minting
- How will users mint `DOB` in production? Simulate production minting workflows in test environments
- Address concurrency issues to ensure unique DNA/DOB traits during high-volume minting
- Prefer minting `DOB` immediately after user payment transactions are confirmed for better user experience
- If using pre-mint DOBs, batch distribute to users, note potential delays and user experience trade-offs
- Implement currency conversion services if supporting multi-currency payments

### 3.4 DOB Rendering
- Test rendering across platforms
- Optimize image quality and file size
- Finalize all media resources at this stage

### 3.5 Testing
- Perform UI, functional, and non-functional testing.

## 4. Pre-Production Environment

After passing tests, deploy a pre-production environment before public release.

### 4.1 Media Resource Upload
- Upload media to `BTCFS`/`IPFS` at least one week in advance
  - `BTCFS`: https://github.com/nervape/btcfs/blob/main/examples/node/README.md
  - `IPFS`: https://docs.ipfs.tech 
- Update test environment Clusters with finalized media and re-validate
- Prepare pre-production cluster after validation

### 4.2 Create Test Cluster on Mainnet
- Create test Clusters on mainnet with finalized media
- Use distinctive cluster names (e.g., add ⚠️ prefix) to avoid user confusion
- Keep other parameters consistent with production version

### 4.3 Service Deployment
- Deploy the application on mainnet but restrict access to internal testers
- Verify environment variables (e.g., ensure mainnet configurations are used)
- Test wallet connectivity and mainnet transaction workflows

**If possible, prepare a launch checklist for team reference and verification.**

## 5. Production Launch

- Prepare emergency response plans
- Prefer mid-week launches (Tuesday-Thursday) for easier monitoring
- Monitor platform error logs and address promptly
- Implement health checks and alert systems for service anomalies
- Establish user feedback channels and respond proactively
- Communicate transparently during critical incidents