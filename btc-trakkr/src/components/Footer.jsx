import { IconContext } from 'react-icons';
import { BsCurrencyBitcoin } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillMail } from "react-icons/ai";

const Footer = () => {

    const footerYear = new Date().getFullYear();

    return (
        <footer className='w-100 pb-3 bg-body-tertiary shadow text-center bottom-0 fs-7'>
            <div className='pt-2'>
                <IconContext.Provider value={{ color: "orange", size: 40 }}>
                    <BsCurrencyBitcoin />
                </IconContext.Provider>
                <p>Copyright &copy; {footerYear}</p>
                <span className='mx-3  '>
                    <IconContext.Provider value={{ size: 30 }}>
                        <AiFillGithub className='bg-secondary rounded'/>
                    </IconContext.Provider>
                </span>
                <span className='mx-3'>
                    <IconContext.Provider value={{ size: 30 }}>
                        <AiFillLinkedin className='bg-primary rounded'/>
                    </IconContext.Provider>
                </span>
                    
                <span className='mx-3'>
                    <IconContext.Provider value={{ size: 30 }}>
                        <AiFillMail className='bg-success rounded'/>
                    </IconContext.Provider>
                </span>
            </div>
        </footer>
    );
};

export default Footer;