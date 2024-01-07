import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    faCamera,
    faHome,
    faAdd,
    faUser,
    faDisplay,
    faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

export default function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuItemClick = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <div className="navBar">
            <div className="Subnav">
                <div className='NavHeader'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faCamera} style={{ fontSize: "30px" }} />
                    </div>
                    <h2>ادراة الموقع</h2>
                </div>
                <ul className="menu">
                    <li
                        className={`menu-item ${location.pathname === '/show_products' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('/show_products')}
                    >
                        <div className="text">عرض المنتجات</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faHome} />
                        </div>
                    </li>
                    <li
                        className={`menu-item ${location.pathname === '/add_product' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('/add_product')}
                    >
                        <div className="text">اضافة منتجات</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faAdd} />
                        </div>
                    </li>
                    <li
                        className={`menu-item ${location.pathname === '/add_client' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('/add_client')}
                    >
                        <div className="text">اضافة عميل</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </li>
                    <li
                        className={`menu-item ${location.pathname === '/show_clients' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('/show_clients')}
                    >
                        <div className="text">العملاء</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faDisplay} />
                        </div>
                    </li>
                    <li
                        className={`menu-item ${location.pathname === '/invoice' ? 'active' : ''}`}
                        onClick={() => handleMenuItemClick('/invoice')}
                    >
                        <div className="text">الفواتير</div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
