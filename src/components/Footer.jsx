import React from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineGithub } from 'react-icons/ai';

export default function Footer() {

    return (
        <footer className='page-footer' >
            <div className='footer-content'>
                <div className='footer-main'>
                    <div className='footer-text'>
                        <p>Website by Matthew Copeland</p>
                    </div>
                    <div className='footer-text'>
                        <p>Weather data from <br /> <a href='https://www.weatherapi.com/'>weatherapi.com</a></p>
                    </div>
                </div>
                <Link className='footer-link' to={'https://github.com/mattc27-dev'}>
                    <AiOutlineGithub size={30} style={{ color: '#fafafa' }} />
                </Link>
            </div>
        </footer>
    )
}