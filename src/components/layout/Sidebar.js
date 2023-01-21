import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FiTruck, FiUsers } from 'react-icons/fi';
import { BsBuilding, BsHeadset, BsNewspaper } from 'react-icons/bs';
// import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { TbReport } from 'react-icons/tb';

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
										<BsBuilding />
										<span>شركات</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Containers' ? 'active' : ''}>
								<Link href="/Containers">
									<div>
										<FiTruck />
										<span>الحاويات</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Ads' ? 'active' : ''}>
								<Link href="/Ads">
									<div>
										<BsNewspaper />
										<span>الاعلانات</span>
									</div>
								</Link>
							</li>
							<li className={router.pathname == '/Services' ? 'active' : ''}>
								<Link href="/Services">
									<div>
										<BsHeadset />
										<span>خدمة العملاء</span>
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
