import { useEffect, useState } from "react";
import { UserData } from "@/types/userType";

export function useUsersFilters(linksData: UserData[], adminsData: UserData[]) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredLinks, setFilteredLinks] = useState<UserData[]>(linksData);
    const [filteredAdmins, setFilteredAdmins] = useState<UserData[]>(adminsData);

    // Función para verificar si un usuario coincide con el término de búsqueda
    const filterBySearchTerm = (user: UserData, term: string): boolean => {
        if (!term) return true;
        
        return (
            String(user.name)?.toLowerCase().includes(term.toLowerCase()) ||
            String(user.email)?.toLowerCase().includes(term.toLowerCase()) ||
            String(user.lastName)?.toLowerCase().includes(term.toLowerCase())
        );
    };

    // Manejador de búsqueda
    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    // Actualizar los resultados filtrados cuando cambien los datos originales o el término de búsqueda
    useEffect(() => {
        const newFilteredLinks = linksData.filter(user => 
            filterBySearchTerm(user, searchTerm)
        );
        
        const newFilteredAdmins = adminsData.filter(user => 
            filterBySearchTerm(user, searchTerm)
        );
        
        setFilteredLinks(newFilteredLinks);
        setFilteredAdmins(newFilteredAdmins);
    }, [linksData, adminsData, searchTerm]);

    return {
        searchTerm,
        filteredLinks,
        filteredAdmins,
        handleSearch,
    };
}