<div align="center">
  <a href="https://vmeta3.gitbook.io/welcome-to-vmeta3"><img alt="Vmeta3" src="https://storage.googleapis.com/vmeta3/logo.jpg" width=280></a>
  <br />
</div>

## Documentation

Extensive documentation is available [here](https://vmeta3.gitbook.io/welcome-to-vmeta3).

## Community

Come hang on our very active [discord](https://discord.gg/vmeta3)

## Directory Structure

<pre>
root
├── <a href="./packages">packages</a>
│   ├── <a href="./packages/common-ts">common-ts</a>: Common tools for building apps in TypeScript
│   ├── <a href="./packages/contracts">contracts</a>: L1 and L2 smart contracts for Vmeta3
│   ├── <a href="./packages/contracts-periphery">contracts-periphery</a>: Peripheral contracts for Vmeta3
│   ├── <a href="./packages/core-utils">core-utils</a>: Low-level utilities that make building Vmeta3 easier
│   ├── <a href="./packages/data-transport-layer">data-transport-layer</a>: Service for indexing Vmeta3-related L1 data
│   ├── <a href="./packages/fault-detector">fault-detector</a>:
│   ├── <a href="./packages/integration-tests-bedrock">integration-tests-bedrock</a> (BEDROCK upgrade): Bedrock integration tests.
│   ├── <a href="./packages/message-relayer">message-relayer</a>: Tool for automatically relaying L1<>L2 messages in development
│   ├── <a href="./packages/replica-healthcheck">replica-healthcheck</a>: Service for monitoring the health of a replica node
│   └── <a href="./packages/sdk">sdk</a>: provides a set of tools for interacting with Vmeta3

~~ Production ~~
├── <a href="./batch-submitter">batch-submitter</a>: Service for submitting batches of transactions and results to L1
├── <a href="./bss-core">bss-core</a>: Core batch-submitter logic and utilities
├── <a href="./gas-oracle">gas-oracle</a>: Service for updating L1 gas prices on L2
├── <a href="./indexer">indexer</a>: indexes and syncs transactions
├── <a href="./infra/op-replica">infra/op-replica</a>: Deployment examples and resources for running an Vmeta3 replica
├── <a href="./integration-tests">integration-tests</a>: Various integration tests for the Vmeta3 network
├── <a href="./l2geth">l2geth</a>: Vmeta3 client software, a fork of <a href="https://github.com/ethereum/go-ethereum/tree/v1.9.10">geth v1.9.10</a>  (deprecated for BEDROCK upgrade)
├── <a href="./l2geth-exporter">l2geth-exporter</a>: A prometheus exporter to collect/serve metrics from an L2 geth node
├── <a href="./op-exporter">op-exporter</a>: A prometheus exporter to collect/serve metrics from an Vmeta3 node
├── <a href="./proxyd">proxyd</a>: Configurable RPC request router and proxy
├── <a href="./technical-documents">technical-documents</a>: audits and post-mortem documents
├── <a href="./teleportr">teleportr</a>: Bridge for teleporting ETH between L1 and L2 at low cost

~~ BEDROCK upgrade - Not production-ready yet, part of next major upgrade ~~
├── <a href="./contracts-bedrock">contracts-bedrock</a>: Bedrock smart contracts. To be merged with ./packages/contracts.
├── <a href="./op-bindings">op-bindings</a>: Go bindings for Bedrock smart contracts.
├── <a href="./op-batcher">op-batcher</a>: L2-Batch Submitter, submits bundles of batches to L1
├── <a href="./op-e2e">op-e2e</a>: End-to-End testing of all bedrock components in Go
├── <a href="./op-node">op-node</a>: rollup consensus-layer client.
├── <a href="./op-proposer">op-proposer</a>: L2-Output Submitter, submits proposals to L1
├── <a href="./ops-bedrock">ops-bedrock</a>: Bedrock devnet work
└── <a href="./specs">specs</a>: Specs of the rollup starting at the Bedrock upgrade
</pre>


## License

Code forked from [`optimism`](https://github.com/ethereum-optimism/optimism) under the name [`l2geth`](https://github.com/VMETA3/vmeta3-chain/tree/master/l2geth) is licensed under the [GNU GPLv3](https://gist.github.com/kn9ts/cbe95340d29fc1aaeaa5dd5c059d2e60) in accordance with the [original license](https://github.com/ethereum/go-ethereum/blob/master/COPYING).

All other files within this repository are licensed under the [MIT License](https://github.com/VMETA3/vmeta3-chain/blob/master/LICENSE) unless stated otherwise.