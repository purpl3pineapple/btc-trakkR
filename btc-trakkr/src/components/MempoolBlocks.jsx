import MempoolDataSection from "../components/layout/MempoolDataSection";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useGetBlocksQuery } from "../api-services/mempool.service";
import sliceMempoolBlocks from "../context/mempool/mempool.blocks.slice";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";

const MempoolBlocks = () => {

  const dispatch = useDispatch();

  const { blocks, loading } = useSelector(state => state.mempoolBlocks);

  const { updateMempoolBlocks } = sliceMempoolBlocks.actions;

  const fetchedMempoolBlocks = useGetBlocksQuery();

  const { isSuccess: mempoolBlocksFetchSuccess } = fetchedMempoolBlocks;

  const timestampInit = new Date(0);

  const ts = timestamp => timestampInit.setUTCSeconds(timestamp * 1000);

  useEffect(() => {

    dispatch(updateMempoolBlocks({
      blocks: mempoolBlocksFetchSuccess ? fetchedMempoolBlocks.data : null,
      loading: false
    }));
  });

  return (
    <MempoolDataSection id="mempool-blocks" title="Mempool Block Info" content={
      loading || blocks == null
      ? <Spinner as="span" animation="border" role="status">
        <span className="visually-hidden">
          Loading...
        </span>
      </Spinner>

      : <Table responsive striped bordered hover variant="dark-info">
        <thead>
          <tr>
            {[
              'ID',
              'Pool Name',
              'Median Fee',
              'Match Rate',
              'Size',
              'Tx Count',
              'Timestamp',
              'Median Time',
              'Nonce'
            ].map((title, idx) => <th key={idx}>
              <span className="mempool-data-table-hdr text-nowrap">
                {title}
              </span>
            </th>)}
          </tr>
        </thead>
          <tbody className="fs-7">
            {blocks.map((block, idx) => <tr key={idx}>
              <td>{block.id}</td>
              <td>{block.extras.pool.name}</td>
              <td>~{Number(block.extras.medianFee).toFixed()} sat/vB</td>
              <td>{block.extras.matchRate}</td>
              <td className="text-nowrap">{Number(block.size / 1000000).toFixed(1)} MB</td>
              <td>{block.tx_count}</td>
              <td>{new Date(block.timestamp * 1000).toLocaleString('en-US')}</td>
              <td>{new Date(block.mediantime * 1000).toLocaleString('en-US')}</td>
              <td>{block.nonce}</td>
            </tr>)}
          </tbody>
      </Table>
    }/>
  );
};

export default MempoolBlocks;