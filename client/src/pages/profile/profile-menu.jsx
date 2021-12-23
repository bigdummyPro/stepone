import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import profileMenu from '../../assets/json-data/profile-menu.json';

function ProfileMenu() {
    const location = useLocation();
    const {id} = useParams();
    const [profileMenuList, setProfileMenuList] = useState([]);
    const authState = useSelector(state => state.authReducer);

    //tìm active index dựa vào chuỗi /profile và chuỗi link của phân tử
    const menuIndexActive = profileMenu.findIndex(prMe => location.pathname.includes('/profile') && location.pathname.includes(prMe.link));

    //tìm vị trí xuất hiện chuỗi link của menu item active trong location path
    const menuActivePosInLocation = location.pathname.indexOf(profileMenu[menuIndexActive].link);

    //cắt tiền tố của url đến vị trí của chuỗi link
    const urlprefix = location.pathname.slice(0, menuActivePosInLocation);

    const menuLineRef = useRef();

    useEffect(()=>{
        const profileMenuActiveEl = document.querySelector('.profile-menu-item.--active');

        if(profileMenuActiveEl){
            menuLineRef.current.style.left = profileMenuActiveEl.offsetLeft + 'px';
            menuLineRef.current.style.width = profileMenuActiveEl.offsetWidth + 'px';
        }
    },[location.pathname])

    useEffect(()=>{ 
        if(authState.user._id !== id){
            const newProfileMenu = [...profileMenu].filter(item => item.link !== '/saved');
            setProfileMenuList(newProfileMenu)
        }else setProfileMenuList([...profileMenu])
    },[authState.user._id, id])
    
    return (
        <div className="profile-menu">
            <ul className="profile-menu__list">
                {
                    profileMenuList.map((prMe, index)=>(
                        <li 
                            className={`profile-menu-item ${menuIndexActive === index ? '--active' : ''}`}
                            key={index}
                        >
                            <Link to={`${urlprefix ? urlprefix : ''}${prMe.link}`}>{prMe.content}</Link>
                        </li>
                    ))
                }
                <li className="menu-line" ref={menuLineRef}></li>
            </ul>
        </div>
    );
}

export default ProfileMenu;