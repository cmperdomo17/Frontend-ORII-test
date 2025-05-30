"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/layout/card";
import { useMovilityForm } from "@/app/dashboard/movility/handlers/movilityHandlers";
import { useBeforeUnload } from "./useBeforeUnload";
import { PersonDataSection } from "./personDataSection";
import { GeneralInfoSection } from "./generalInfoSection";
import { MovilityDetailsSection } from "./movilityDetailsSection";
import { AcademicDetailsSection } from "./academicDetailsSection";
import { AgreementsSection } from "./agreementsSection";
import { StayTimeSection } from "./stayTimeSection";
import { FormActions } from "./formActions";
import { Movility } from "@/types/movilityType";
import { UnsavedChangesModal } from "@/components/ui/modals/unSavedChangesModal";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/userType";
import { Plane } from "lucide-react";

interface MovilityFormProps {
  initialValues?: Partial<Movility>;
  movility?: Movility;
  onClose?: () => void;
  isEditing?: boolean;
  onSuccess?: (result: Movility) => void;
  onFormChange?: (hasChanges: boolean) => void;
}

export function MovilityForm({
  initialValues,
  movility,
  onClose,
  isEditing = false,
  onSuccess,
  onFormChange
}: MovilityFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);
  const [backupTeacher, setBackupTeacher] = useState("");

  const {
    // Estados
    isDirty,
    firstName,
    lastName,
    gender,
    personType,
    identificationType,
    identification,
    email,
    direction,
    faculty,
    eventTypeId,
    description,
    cta,
    origin,
    destination,
    country,
    city,
    originProgram,
    destinationProgram,
    teacher,
    agreement,
    agreementId,
    funding,
    fundingSource,
    entryDate,
    exitDate,
    stayDays,
    movilityYear,
    errors,

    // Setters
    setFirstName,
    setLastName,
    setGender,
    setRole: originalSetRole,
    setDocumentType,
    setDocumentNumber,
    setEmail,
    setDirection,
    setFaculty,
    setEventType,
    setEventDescription,
    setCta,
    setOriginUniversity,
    setDestinationUniversity,
    setCountry,
    setCity,
    setOriginProgram,
    setDestinationProgram,
    setTeacher,
    setAgreement,
    setAgreementId,
    setfunding,
    setFuenteFinanciacion,
    setEntryDate,
    setExitDate,
    setStayDays,
    setMovilityYear,

    // Funciones
    handleSubmit,
    resetForm,
    handleEntryDateChange,
    handleExitDateChange,
    formatDateToInput,
    initializeForm
  } = useMovilityForm();

  useBeforeUnload(isDirty);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Agrega esta validación al inicio
    if (isEditing && movility?.updatable === false && role !== "ADMIN") {
      toast.error("Esta movilidad ya no puede ser editada (ha pasado el período de 2 horas)");
      return;
    }

    const result = await handleSubmit(e, isEditing, movility?.id);

    if (result.success) {
      if (onSuccess) onSuccess(result.data as Movility);
      if (isEditing) {
        onClose?.();
      } else {
        router.push("/dashboard/movility");
      }
    }
  };

  useEffect(() => {
    if (isEditing && movility) {
      initializeForm(movility);
      // Inicializa backupTeacher con el valor existente si es estudiante
      if (movility.person?.personType === "STUDENT") {
        setBackupTeacher(movility.teacher || "");
      }
    } else if (initialValues && Object.keys(initialValues).length > 0) {
      initializeForm(initialValues);
    }

  }, [isEditing, movility, initialValues]);

  const handleCancel = () => {
    if (isDirty) {
      setTargetUrl("/dashboard/movility");
      setShowWarningModal(true);
    } else {
      if (movility) {
        onClose?.();
      } else {
        resetForm();
        router.push("/dashboard/movility");
      }
    }
  };

  const handleRoleChange = (role: string) => {
    if (personType === "STUDENT" && role !== "STUDENT") {
      setBackupTeacher(teacher);
      originalSetRole(role);
      setTeacher("");
    } else if (personType !== "STUDENT" && role === "STUDENT") {
      originalSetRole(role);
      setTeacher(backupTeacher);
    } else {
      originalSetRole(role);
    }
  };

  const handleConfirmNavigation = () => {
    setShowWarningModal(false);
    if (targetUrl) {
      if (movility) {
        onClose?.();
      } else {
        resetForm();
        router.push(targetUrl);
      }
    }
  };

  useEffect(() => {
    if (!isDirty) return;
    if (onFormChange) {
      onFormChange(isDirty);
    }

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor && anchor.href) {
        const href = anchor.href;
        const targetUrl = new URL(href).pathname;

        if (targetUrl !== pathname) {
          e.preventDefault();
          setTargetUrl(targetUrl);
          setShowWarningModal(true);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isDirty, pathname, onFormChange]);

  // Obtener el rol del usuario
  const userSession = useAuthStore((state) => state.userSession);
  const role: UserRole = userSession?.role as UserRole;
  
  return (
    <>
      {!isEditing || movility?.updatable !== false || role === "ADMIN" ? (
        <Card className="max-w-4xl border-l-4 border-l-blue border-r-0 border-t-0 border-b-0 rounded-l-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue/10 to-transparent pb-6">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-blue" />
              <CardTitle className="text-blueDark text-2xl">
                {/* {role === "ADMIN" ? "Soy admin" : "No soy admin"} */}
                {isEditing ? "Edición de Movilidad" : "Registro de Movilidad"}
              </CardTitle>
            </div>
            <CardDescription className="text-blueDark/70 mt-2">
              {isEditing
                ? "Modifique los campos que desea editar."
                : "Complete todos los campos requeridos para crear la movilidad."}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="space-y-6">
                <PersonDataSection
                  firstName={firstName}
                  lastName={lastName}
                  gender={gender}
                  personType={personType}
                  identificationType={identificationType}
                  identification={identification}
                  email={email}
                  errors={errors}
                  setters={{
                    setFirstName,
                    setLastName,
                    setGender,
                    setRole: handleRoleChange,
                    setDocumentType,
                    setDocumentNumber,
                    setEmail
                  }}
                />

                <GeneralInfoSection
                  direction={direction}
                  faculty={faculty}
                  eventTypeId={eventTypeId}
                  description={description}
                  cta={cta}
                  errors={errors}
                  setters={{
                    setDirection,
                    setFaculty,
                    setEventType,
                    setEventDescription,
                    setCta
                  }}
                />

                <MovilityDetailsSection
                  origin={origin}
                  destination={destination}
                  country={country}
                  city={city}
                  errors={errors}
                  setters={{
                    setOriginUniversity,
                    setDestinationUniversity,
                    setCountry,
                    setCity
                  }}
                />

                <AcademicDetailsSection
                  originProgram={originProgram}
                  destinationProgram={destinationProgram}
                  teacher={personType === "STUDENT" ? teacher : ""}
                  personType={personType}
                  errors={errors}
                  setters={{
                    setOriginProgram,
                    setDestinationProgram,
                    setTeacher
                  }}
                />

                <AgreementsSection
                  agreement={agreement}
                  agreementId={agreementId}
                  funding={funding}
                  fundingSource={fundingSource}
                  errors={errors}
                  setters={{
                    setAgreement,
                    setAgreementId,
                    setfunding,
                    setFuenteFinanciacion
                  }}
                />

                <StayTimeSection
                  entryDate={entryDate}
                  exitDate={exitDate}
                  stayDays={stayDays}
                  movilityYear={movilityYear}
                  errors={errors}
                  setters={{
                    setEntryDate,
                    setExitDate,
                    setStayDays,
                    setMovilityYear
                  }}
                  handleEntryDateChange={handleEntryDateChange}
                  handleExitDateChange={handleExitDateChange}
                  formatDateToInput={formatDateToInput}
                  direction={direction}
                />
              </div>

              <FormActions
                submitButtonText={isEditing ? "Actualizar movilidad" : "Crear movilidad"}
                submittingText={isEditing ? "Actualizando..." : "Creando..."}
                onCancel={handleCancel}
                icon={<Plane className="h-4 w-4" />}
              />

            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#BD3800] bg-white">
          <CardHeader>
            <CardTitle className="text-[#BD3800] font-titillium text-xl">
              Movilidad no editable
            </CardTitle>
            <CardDescription className="text-[#46464F] font-open-sans text-base">
              Esta movilidad ha superado el período de 2 horas permitido para edición.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="border-l-4 border-[#BD3800] bg-white rounded-r-lg p-4">
                <div className="font-titillium font-semibold text-lg mb-2 text-[#BD3800]">
                  Edición bloqueada
                </div>
                <p className="font-open-sans text-base text-[#46464F]">
                  Para modificaciones, por favor contacte al administrador del sistema.
                </p>
              </div>
              <Button
                onClick={onClose}
                className="w-full sm:w-auto bg-[#000066] hover:bg-[#5056AC] text-white font-titillium"
              >
                Volver a la lista
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <UnsavedChangesModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        onConfirm={handleConfirmNavigation}
      />
    </>
  );
}