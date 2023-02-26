import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { GoThreeBars } from 'react-icons/go';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { MdGTranslate } from 'react-icons/md';
import { Avatar, AvatarBadge } from '@chakra-ui/react';

// import { isLogout } from '@Action/AuthActions';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
// import io from '@Middleware/socketIo';

const Header = ({
	collapsed,
	handleCollapsedChange,
	isLogout,
	userData,
	darkMode,
	handleDarkMode,
	handleDirection,
	socket,
}) => {
	const router = useRouter();

	const [isAcitve, setIsAcitve] = useState(false);
	const [Logout, setIsLogout] = useState(false);

	useEffect(() => {
		if (Logout) {
			localStorage.removeItem('auth-user');
			router.push('/Login');
		}
	}, [Logout]);

	return (
		<>
			<header
				className={`header-admin ${darkMode ? 'darkMode' : 'lightMode'}`}
				style={{ width: collapsed ? '95%' : '100%' }}
			>
				<div className="navbar-menu" style={{ color: '#FFF' }}>
					<div className="sidebar-taggle">
						<GoThreeBars
							size="40"
							color="#FFF"
							style={{ cursor: 'pointer' }}
							onClick={() => handleCollapsedChange(collapsed)}
						/>
					</div>
					<nav className="user-nav">
						<Menu>
							<MenuButton className="user-nav__info">
								<div className="d-flex flex-row-reverse align-items-center">
									<Avatar
										className="user-avata"
										size="md"
										name="Segun Adebayo"
										src="/assets/image/avatar.png"
										// src="/assets/images/team.png"
									></Avatar>
									{/* <h4>{userData && userData.name}</h4> */}
									<h4>{userData?.name}</h4>
								</div>
							</MenuButton>

							<MenuList>
								<MenuItem
									style={{ color: '#000' }}
									onClick={() => setIsLogout(!Logout)}
								>
									الخروج
								</MenuItem>
							</MenuList>
						</Menu>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
