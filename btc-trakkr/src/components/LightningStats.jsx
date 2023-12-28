import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import LightningGeneral from "../components/LightningGeneral";
import LightningLatestSize from "../components/LightningLatestSize";
import Lightning24Hr from "../components/Lightning24Hr";
import LightningFees from "../components/LightningFees";
import LightningTimeframeToggler from "../components/LightningTimeframeToggler";
import LightningLatestNodes from "../components/LightningLatestNodes";
import Lightning3Day from "../components/Lightning3Day";

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
