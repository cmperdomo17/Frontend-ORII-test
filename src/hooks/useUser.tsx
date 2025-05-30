import { getAdmins, getLinks } from "@/actions/userAction";
import { useState, useEffect } from "react";

export function useUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [linksData, setLinksData] = useState([]);
  const [adminsData, setAdminsData] = useState([]);

  const [triggerReload, setTriggerReload] = useState(false);

  const reloadUsers = () => setTriggerReload((prev) => !prev);

  useEffect(() => {
    const loadLinks = async () => {
      setIsLoading(true);
      const fetchedLinksData = await getLinks();
      setLinksData(fetchedLinksData);
      const fetchedAdminsData = await getAdmins();
      setAdminsData(fetchedAdminsData);

      setIsLoading(false);
    };
    loadLinks();
  }, [triggerReload]);

  return {
    isLoading,
    linksData,
    adminsData,
    reloadUsers,
  };
}
