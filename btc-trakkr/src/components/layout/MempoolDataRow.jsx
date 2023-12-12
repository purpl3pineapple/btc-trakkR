import Row from "react-bootstrap/Row";
import MempoolDataValue from "../MempoolDataValue";

const MempoolDataRow = ({ data }) => {

    return (
        <Row xs={1} md={4} className="g-4 flex-nowrap p-4 justify-content-around">
            {data.map((item, idx) => <MempoolDataValue
                key={idx}
                title={item.title} 
                value={item.value} 
            />)}
        </Row>
    );
};

export default MempoolDataRow;