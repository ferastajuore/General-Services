import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineDashboard, AiOutlineFileText } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { BsCalendar3, BsChatDots } from 'react-icons/bs';
// import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TbReport } from 'react-icons/tb';
import { FaUserTie } from 'react-icons/fa';

const Sidebar = ({ collapsed, userData }) => {
	const router = useRouter();
	const [isSSR, setIsSSR] = useState(true);

	// const { t } = useTranslation();
	useEffect(() => {
		setIsSSR(false);
	}, []);

	return (
		!isSSR && (
			<aside className={`sidebar ${collapsed ? 'isClosed' : ''}`}>
				<div className="sidebar-menu">
					<ul className="sidebar-list">
						<>
							<li className={router.pathname == '/' ? 'active' : ''}>
								<Link href="/">
									<div>
										<AiOutlineDashboard />
										<span>لوحة التحكم</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Users' ? 'active' : ''}>
								<Link href="/Users">
									<div>
										<FiUsers />
										<span>المستخدمون</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Reports' ? 'active' : ''}>
								<Link href="/Reports">
									<div>
										<TbReport />
										<span>البلاغات</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Companies' ? 'active' : ''}>
								<Link href="/Companies">
									<div>
										<FaUserTie />
										<span>شركات</span>
									</div>
								</Link>
							</li>
						</>
					</ul>
				</div>
				{/* <div className="sidebar-footer">
					<h4>v1.5.0</h4>
				</div> */}
			</aside>
		)
	);
};

export default Sidebar;
