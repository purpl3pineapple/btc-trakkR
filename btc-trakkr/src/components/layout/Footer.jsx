import PropTypes from 'prop-types'
import { IconContext } from 'react-icons';
import { BsCurrencyBitcoin } from "react-icons/bs";

const Footer = () => {

    const footerYear = new Date().getFullYear();

    return (
        <footer className='pb-3 bg-body-tertiary shadow text-center'>
            <div className='pt-2'>
                <IconContext.Provider value={{ color: "orange", size: 50 }}>
                    <BsCurrencyBitcoin />
                </IconContext.Provider>
                <p>Copyright &copy; {footerYear}</p>
                <span className='mx-3'>GITHUB</span>
                <span className='mx-3'>LINKEDIN</span>
                <span className='mx-3'>EMAIL</span>
            </div>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;