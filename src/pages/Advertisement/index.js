import { AdminLayout } from '@/components/layout';
import { AdsTable, CreateAds } from '@/components/advertisement';
import { Header } from '@/components/UI';

const Advertisement = () => {
	return (
		<>
			<AdminLayout>
				<div className="dashboard">
					<Header title="اعلانات" />
					<CreateAds />
					<AdsTable />
				</div>
			</AdminLayout>
		</>
	);
};

export default Advertisement;
