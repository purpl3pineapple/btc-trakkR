import Container from "react-bootstrap/Container";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const LightningTimeframeToggler = ({ toggleTimeframe }) => {

    const timeframes = [
        { name: 'Latest', value: 'latest' },
        { name: '24-Hour', value: '24h' },
        { name: '3-Day', value: '3d' },
    ];

    return (
        <Container className="d-flex align-items-end mb-4 pb-3">
            <ToggleButtonGroup name="lightning-stats" size="sm" className="ms-auto" defaultValue="latest">{
                timeframes.map((tf, idx) => <ToggleButton
                  key={idx}
                  id={`lightning-stats-${idx}`}
                  type="radio"
                  name="lightning-stats"
                  value={tf.value}
                  onChange={toggleTimeframe}
                  className="bg-dark lightning-tgl-btn"
                >
                  {tf.name}
                </ToggleButton>)
            }</ToggleButtonGroup>
        </Container>
    );
};

export default LightningTimeframeToggler;