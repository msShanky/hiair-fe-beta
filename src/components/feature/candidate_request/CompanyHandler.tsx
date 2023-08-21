import React, { FC, useEffect, useState } from "react";
import { useGetCompanyInformationForUserQuery } from "@/reducer/hiairBaseApi";
import { CompanyInformationForm } from "./CompanyInformation";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCompany, updateCompanyInfo } from "@/reducer/userSession";
import { Badge, Button, Card, Divider, Flex, Text } from "@tremor/react";
import { IconCircle, IconLocation, IconUser, IconCircleFilled } from "@tabler/icons-react";
import { upperFirst } from "@mantine/hooks";

type CompanyHandlerProps = {
	nextStep: () => void;
};

// TODO: Display the company list and manage the selection and creation of a new company
export const CompanyHandler: FC<CompanyHandlerProps> = (props) => {
	const { nextStep } = props;
	const { data, isLoading } = useGetCompanyInformationForUserQuery();
	const { companyInfo, companyId: selectedCompanyId } = useAppSelector((state) => state.userSession);
	const [createNewCompany, setCompanyCreation] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isLoading) return;

		if (data && data.length > 0) {
			setCompanyCreation(false);
			return;
		}

		setCompanyCreation(true);
	}, [data, isLoading]);

	if (isLoading) {
		return <p>Loading ....</p>;
	}

	const handleCompanyCreation = (values: CompanyInformationFormState) => {
		dispatch(updateCompanyInfo(values));
		nextStep();
	};

	const handleCompanySelection = (companyId: number) => {
		dispatch(selectCompany(companyId));
		nextStep();
	};

	if (createNewCompany) {
		return <CompanyInformationForm initialFormValues={companyInfo} handleFormSubmit={handleCompanyCreation} />;
	}

	return (
		<div className="flex flex-col items-center justify-center gap-6">
			<section className="mt-4">
				{data &&
					data?.map((companyRel) => {
						const { companyId, company } = companyRel;
						return (
							<div
								key={`company_list_item_${companyId}`}
								className="relative flex flex-col h-56 p-4 mx-auto rounded-md w-80 ring-4 ring-primaryAlt gap-y-2"
							>
								<div className="flex flex-row items-start justify-between w-full gap-y-4">
									<Text className="text-xl text-black">{company.name}</Text>
									<div className="flex flex-row items-center gap-x-2">
										<IconUser size={15} />
										<Text className="text-black text-md">{company.companySize}</Text>
									</div>
								</div>
								<Text className="text-black">{company.about}</Text>
								<div className="flex flex-row items-center gap-x-2">
									<IconLocation size={15} />
									<Text className="text-black text-md">{company.address}</Text>
								</div>
								<div className="flex flex-row items-center gap-x-2">
									<Badge className="text-black text-md">{upperFirst(company.companyType)}</Badge>
									{company.domain && <Badge className="text-black text-md">{upperFirst(company.domain)}</Badge>}
									{company.industry && <Badge className="text-black text-md">{upperFirst(company.industry)}</Badge>}
								</div>
								<div className="absolute bottom-0 right-0 flex items-center justify-end w-full px-4 rounded-t-sm bg-secondaryBlue h-14">
									{!selectedCompanyId ? (
										<Button onClick={() => handleCompanySelection(companyId)} className="text-white">
											Select
										</Button>
									) : (
										<Button onClick={() => handleCompanySelection(companyId)} className="gap-2 text-white">
											<IconCircleFilled className="fill-white" size={15} /> <span>Selected</span>
										</Button>
									)}
								</div>
							</div>
						);
					})}
			</section>
			<Divider />
			<button className="p-5 rounded-sm bg-secondaryYellow" onClick={() => setCompanyCreation(true)}>
				Create new company
			</button>
		</div>
	);
};
