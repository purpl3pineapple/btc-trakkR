import Container from "react-bootstrap/Container";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const LightningNodeListToggler = ({ toggleNodeList }) => {

    const timeframes = [
        { name: 'Liquidity', value: 'liquid' },
        { name: 'Connectivity', value: 'connect' },
        { name: 'Oldest', value: 'old' },
    ];

    return (
        <Container className="d-flex align-items-end m-3 pb-3">
            <ToggleButtonGroup name="lightning-nodes" size="sm" className="ms-auto" defaultValue="liquid">{
                timeframes.map((tf, idx) => <ToggleButton
                  key={idx}
                  id={`lightning-nodes-${idx}`}
                  type="radio"
                  name="lightning-nodes"
                  value={tf.value}
                  onChange={toggleNodeList}
                  className="bg-dark lightning-tgl-btn"
                >
                  {tf.name}
                </ToggleButton>)
            }</ToggleButtonGroup>
        </Container>
    );
};

export default LightningNodeListToggler;