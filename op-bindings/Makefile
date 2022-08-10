SHELL := /bin/bash

all: bindings deployed

bindings: l1block-bindings l2-to-l1-message-passer-bindings vmeta3-portal-bindings l2-output-oracle-bindings
deployed: l1-block-deployed vmeta3-portal-deployed l2-to-l1-message-passer-deployed


l1-block-deployed: l1block-bindings
	./gen_deployed_bytecode.sh L1Block bindings

vmeta3-portal-deployed: vmeta3-portal-bindings
	./gen_deployed_bytecode.sh Vmeta3Portal bindings

l2-to-l1-message-passer-deployed: l2-to-l1-message-passer-bindings
	./gen_deployed_bytecode.sh L2ToL1MessagePasser bindings

l1block-bindings:
	./gen_bindings.sh L1Block bindings

l2-to-l1-message-passer-bindings:
	./gen_bindings.sh L2ToL1MessagePasser bindings

vmeta3-portal-bindings:
	./gen_bindings.sh Vmeta3Portal bindings

l2-output-oracle-bindings:
	./gen_bindings.sh L2OutputOracle bindings

