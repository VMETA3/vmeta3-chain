package rollupclient

import (
	"context"
	"math/big"

	"github.com/VMETA3/vmeta3-chain/op-node/l2"
	"github.com/VMETA3/vmeta3-chain/op-node/node"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/rpc"
)

type RollupClient struct {
	rpc *rpc.Client
}

func NewRollupClient(rpc *rpc.Client) *RollupClient {
	return &RollupClient{rpc}
}

func (r *RollupClient) GetBatchBundle(
	ctx context.Context,
	req *node.BatchBundleRequest,
) (*node.BatchBundleResponse, error) {

	var batchResponse = new(node.BatchBundleResponse)
	err := r.rpc.CallContext(ctx, &batchResponse, "vmeta3_getBatchBundle", req)
	return batchResponse, err
}

func (r *RollupClient) OutputAtBlock(ctx context.Context, blockNum *big.Int) ([]l2.Bytes32, error) {
	var output []l2.Bytes32
	err := r.rpc.CallContext(ctx, &output, "vmeta3_outputAtBlock", hexutil.EncodeBig(blockNum))
	return output, err
}
