import Row from "react-bootstrap/Row";
import MempoolDataValue from "../MempoolDataValue";
import ListGroup from "react-bootstrap/ListGroup";

const MempoolDataRow = ({ id, data }) => {

    return (
        <ListGroup id={id} xs={1} s={2} md={5} className="p-4" horizontal>
            {data.map((item, idx) => <MempoolDataValue
                key={idx}
                title={item.title} 
                value={item.value} 
            />)}
        </ListGroup>
    );
};

export default MempoolDataRow;