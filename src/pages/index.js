import { AdminLayout } from '@/components/layout';
import { Statistics, Sections } from '@/components/Dashboard';
import Header from '@/components/UI/Header.js';

export default function Home() {
	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="Dashboard" />
					<Statistics />
					<Sections />
				</div>
			</AdminLayout>
		</>
	);
}
