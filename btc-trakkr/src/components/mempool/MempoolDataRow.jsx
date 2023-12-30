import Row from "react-bootstrap/Row";
import MempoolDataValue from "./MempoolDataValue";
import ListGroup from "react-bootstrap/ListGroup";

const MempoolDataRow = ({ id, data }) => {

    return (
        <Row id={id} xs={1} s={2} md={5} className="p-0 text-nowrap w-100 overflow-auto">
            {data.map((item, idx) => <MempoolDataValue
                key={idx}
                title={item.title} 
                value={item.value} 
            />)}
        </Row>
    );
};

export default MempoolDataRow;