import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import LightningGeneral from "./LightningGeneral";
import LightningLatestSize from "./LightningLatestSize";
import Lightning24Hr from "./Lightning24Hr";
import LightningFees from "./LightningFees";
import LightningTimeframeToggler from "./LightningTimeframeToggler";
import LightningLatestNodes from "./LightningLatestNodes";
import Lightning3Day from "./Lightning3Day";

const LightningStats = () => {
  const [currentTimeframe, setCurrentTimeframe] = useState("latest");

  const handleTimeframeChange = (value) => {
    setCurrentTimeframe(value);
  };
  
  return (
    <>
      <LightningTimeframeToggler
        toggleTimeframe={(e) => handleTimeframeChange(e.currentTarget.value)}
      />
      <LightningGeneral />
      {
        [
          {
            timeframe: "latest",
            template: (
              <Container className="my-3 py-2 rounded shadow">
                <Row>
                  <LightningFees />
                  <LightningLatestSize />
                  <LightningLatestNodes />
                </Row>
              </Container>
            ),
          },
          {
            timeframe: "24h",
            template: (
              <Container className="my-3 py-2 rounded shadow">
                <Row>
                  <Lightning24Hr />
                </Row>
              </Container>
            ),
          },
          {
            timeframe: "3d",
            template: <Lightning3Day />,
          },
        ].find((stats) => stats.timeframe === currentTimeframe).template
      }
    </>
  );
};

export default LightningStats;
