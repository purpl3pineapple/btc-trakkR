import MempoolDataSection from "../components/layout/MempoolDataSection";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import mempoolAPI from "../api-services/mempool.service";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";

const MempoolBlocks = () => {

  const dispatch = useDispatch();

  const { mempool, loading } = useSelector(state => state.mempool.blocks);


  useEffect(() => {

    const blocks = dispatch(mempoolAPI.endpoints.getBlocks.initiate());

    return blocks.unsubscribe();
  });


  return (
    <MempoolDataSection id="mempool-blocks" title="Mempool Past Block Info" content={
      loading
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
            {mempool.map((block, idx) => <tr key={idx}>
              <td>{block.id}</td>
              <td>{block.extras === undefined ? '***' : block.extras.pool.name}</td>
              <td>~{block.extras === undefined ? '***' : Number(block.extras.medianFee).toFixed()} sat/vB</td>
              <td>{block.extras === undefined ? '***' : block.extras.matchRate}</td>
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