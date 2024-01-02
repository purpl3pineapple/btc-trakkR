import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import DataSection from "./DataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import mempoolAPI from "../../app/services/api/mempool.api.service";
import PreviousBlock from "./PreviousBlock";
import UpcomingBlock from "./UpcomingBlock";

const MempoolBlocks = () => {
  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const upcomingBlocks = mempoolBlocks.loading ? null : mempoolBlocks.upcoming;
  const previous = mempoolBlocks.loading ? null : mempoolBlocks.previous;

  const dispatch = useDispatch();

  useEffect(() => {
    const prevMempoolBlocks = dispatch(
      mempoolAPI.endpoints.getBlocks.initiate()
    );

    return prevMempoolBlocks.unsubscribe;
  }, [dispatch]);
  return (
    <DataSection
      id="mempool-upcoming-blocks"
      title="Upcoming Blocks"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        <>
          <Container className="py-5">
            <h1 className="mb-3 container-fluid text-dark mempool-data-header-ctnr">
              <span className="mempool-data-header fs-2 fw-bold p-3 my-4 rounded d-inline-block shadow text-reset">
                Upcoming Blocks
              </span>
            </h1>
            <Carousel interval={null} className="px-5">
              {upcomingBlocks === null ? (
                <ProgressBar animated variant="secondary" now={100} />
              ) : (
                upcomingBlocks.map((block, idx) => (
                  <Carousel.Item key={idx}>
                    <UpcomingBlock block={block} />
                  </Carousel.Item>
                ))
              )}
            </Carousel>
          </Container>
          <Container className="py-5">
            <h1 className="mb-3 container-fluid text-dark mempool-data-header-ctnr">
              <span className="mempool-data-header fs-2 fw-bold p-3 my-4 rounded d-inline-block shadow text-reset">
                Previous Blocks
              </span>
            </h1>
            <Carousel interval={null}>
              {previous === null ? (
                <ProgressBar animated variant="secondary" now={100} />
              ) : (
                previous.map((block, idx) => (
                  <Carousel.Item key={idx}>
                    <PreviousBlock block={block} />
                  </Carousel.Item>
                ))
              )}
            </Carousel>
          </Container>
        </>
      }
    />
  );
};

export default MempoolBlocks;
