# DOB Protocol FAQ

## General Questions

### Q: What is DOB Protocol?
A: DOB (Digital Object) protocol is a suite built on top of the Spore protocol on CKB, providing standardized interpretation and composition capabilities for digital assets. It uses a DNA + Pattern + Decoder model to create and manage digital assets.

### Q: What's the difference between DOB/0 and DOB/1?
A: DOB/0 is the basic protocol version focusing on simple trait-based assets, while DOB/1 extends functionality with more complex composition capabilities and advanced rendering features. Choose DOB/0 for simple NFTs and DOB/1 for more complex, composable assets.

### Q: How do I choose between different storage options (BTCFS/IPFS/Regular Link)?
A: 
- BTCFS: Best for decentralization and long-term storage
- IPFS: Good balance of decentralization and flexibility
- Regular Link: Use only for testing or when content is guaranteed to be maintained

## Technical Questions

### Q: How do I optimize gas costs?
A: 
- Optimize content storage
- Consider using cluster cells for related DOBs

### Q: What should I consider when designing patterns?
A: 
- Keep traits modular and well-organized
- Choose appropriate DNA lengths
- Use meaningful trait names
- Consider gas costs and storage efficiency
- Test pattern interpretation across platforms

### Q: How can I ensure my DOBs are compatible across different platforms?
A: 
- Use standard decoders
- Test rendering on major platforms (JoyID, Omiga, etc.)
- Follow DOB protocol standards
- Use supported content types

## Common Issues

### Q: Why isn't my DOB rendering correctly?
Common causes:
- Incorrect pattern structure
- Decoder compatibility issues
- Content storage problems
- Invalid DNA format

### Q: How do I handle upgrades and maintenance?
A: 
- Document all changes
- Test thoroughly before deployment
- Communicate with users
- Maintain backward compatibility when possible

### Q: What are the best practices for content storage?
A: 
- Use BTCFS for critical content
- Implement proper backup strategies
- Monitor content availability
- Consider content size limitations

## Platform Support

### Q: Which platforms support DOB viewing?
A: Major platforms include:
- [JoyID](https://app.joy.id)
- [Omiga](https://omiga.io)
- [CKB Explorer](https://explorer.nervos.org)
- [Mobit](https://mobit.app)
- [Dobby](https://dobby.market)

### Q: How can I test platform compatibility?
A: 
- Deploy test DOBs
- Check rendering on each platform
- Verify traits display
- Test all interactive features

## Development

### Q: How do I start developing with DOB?
A: 
1. Study the examples in this cookbook
2. Set up a development environment
3. Start with simple DOB/0 implementations
4. Progress to more complex features
5. Test thoroughly before mainnet deployment

### Q: Where can I find more resources?
A: 
- [Spore Protocol](https://spore.pro) 
- [CKB documentation](https://docs.nervos.org/)
- [CCC](https://github.com/ckb-devrel/ccc) 
- This cookbook's examples
- Community forums and channels