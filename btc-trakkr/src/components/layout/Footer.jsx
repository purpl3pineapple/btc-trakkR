import PropTypes from 'prop-types'
import { IconContext } from 'react-icons';
import { BsCurrencyBitcoin } from "react-icons/bs";

const Footer = () => {

    const footerYear = new Date().getFullYear();

    return (
        <footer className='pb-3 bg-dark text-center'>
            <div className='pt-2'>
                <IconContext.Provider value={{ color: "orange", size: 50 }}>
                    <BsCurrencyBitcoin />
                </IconContext.Provider>
                <p>Copyright &copy; {footerYear}</p>
            </div>
        </footer>
    );
};

Footer.propTypes = {};

export default Footer;