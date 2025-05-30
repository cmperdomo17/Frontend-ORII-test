import { useEffect, useState } from "react";
import { AgreementProps, AgreementsData } from "@/types/agreementType";
import { fetchAgreements } from "@/actions/agreementAction";

export function useAgreements() {
  const [isLoading, setIsLoading] = useState(true);
  const [nationalAgreements, setNationalAgreements] = useState<
    AgreementProps[]
  >([]);
  const [internationalAgreements, setInternationalAgreements] = useState<
    AgreementProps[]
  >([]);
  const [filteredNationalAgreements, setFilteredNationalAgreements] = useState<
    AgreementProps[]
  >([]);
  const [filteredInternationalAgreements, setFilteredInternationalAgreements] =
    useState<AgreementProps[]>([]);

  const [triggerReload, setTriggerReload] = useState(false);

  const reloadAgreements = () => setTriggerReload((prev) => !prev);

  useEffect(() => {
    const loadAgreements = async () => {
      setIsLoading(true);
      const agreementsData: AgreementsData = await fetchAgreements();
      setNationalAgreements(agreementsData.NATIONAL as AgreementProps[]);
      setInternationalAgreements(
        agreementsData.INTERNATIONAL as AgreementProps[]
      );
      setFilteredNationalAgreements(
        agreementsData.NATIONAL as AgreementProps[]
      );
      setFilteredInternationalAgreements(
        agreementsData.INTERNATIONAL as AgreementProps[]
      );
      setIsLoading(false);
    };
    loadAgreements();
  }, [triggerReload]);

  return {
    isLoading,
    nationalAgreements,
    internationalAgreements,
    filteredNationalAgreements,
    filteredInternationalAgreements,
    setFilteredNationalAgreements,
    setFilteredInternationalAgreements,
    reloadAgreements,
  };
}
