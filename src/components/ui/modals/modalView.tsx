"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/modals/dialog";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/layout/card";
import { Movility } from "@/types/movilityType";
import { genderDict, roleDict, documentTypeDict, movilityTypeDict, facultyDict, eventTypeDict, handleExitDateChangeView } from "@/utils/movilityUtils";
import { User, PlaneTakeoff, Info, GraduationCap, MapPin, Calendar, DollarSign, Handshake, X } from "lucide-react";

interface ModalVerProps {
  movility: Movility | null;
  open: boolean;
  onClose: () => void;
}

export default function ModalVer({ movility, open, onClose }: ModalVerProps) {
  if (!movility) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="flex items-center gap-3">
          <PlaneTakeoff className="h-6 w-6 text-blue" />
          <h2 className="text-blueDark text-2xl font-semibold">Detalles de Movilidad</h2>
        </DialogTitle>
        <DialogDescription className="text-blueDark/70 mt-1 pb-3">
          Información completa sobre la movilidad registrada.
        </DialogDescription>
        
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-6">
            {/* Información Personal */}
            <Card className="border-l-4 border-l-blue border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue" />
                  <h3 className="text-lg font-semibold text-blueDark">Información Personal</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-blue font-semibold">Nombre completo</p>
                    <p className="font-medium">{movility.person.firstName} {movility.person.lastName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-blue font-semibold">Tipo de Documento</p>
                    <p className="font-medium">{documentTypeDict[movility.person.identificationType] || movility.person.identificationType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-blue font-semibold">Número de Documento</p>
                    <p className="font-medium">{movility.person.identification}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-blue font-semibold">Correo Electrónico</p>
                    <p className="font-medium">{movility.person.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-blue font-semibold">Rol</p>
                    <p className="font-medium">{roleDict[movility.person.personType] || movility.person.personType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Información General */}
            <Card className="border-l-4 border-l-green-500 border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-600">Información General</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Sentido de la movilidad</p>
                    <p className="font-medium">{movilityTypeDict[movility.direction] || movility.direction}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Género</p>
                    <p className="font-medium">{genderDict[movility.gender] || movility.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Periodo</p>
                    <p className="font-medium">{movility.cta}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Fecha de inicio</p>
                    <p className="font-medium">{movility.entryDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Fecha de finalización</p>
                    <p className="font-medium">{movility.exitDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Días de estancia</p>
                    <p className="font-medium">{handleExitDateChangeView(movility.entryDate, movility.exitDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-green-600 font-semibold">Año de movilidad</p>
                    <p className="font-medium">{movility.entryDate.split('-')[2]}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Programas y Facultad */}
            <Card className="border-l-4 border-l-purple-500 border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-purple-600">Programas y Facultad</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-purple-600 font-semibold">Programa de Origen</p>
                    <p className="font-medium">{movility.originProgram}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-purple-600 font-semibold">Programa de Acogida</p>
                    <p className="font-medium">{movility.destinationProgram}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-purple-600 font-semibold">Facultad</p>
                    <p className="font-medium">{facultyDict[movility.faculty] || movility.faculty}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-purple-600 font-semibold">Universidad de Origen</p>
                    <p className="font-medium">{movility.origin}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-purple-600 font-semibold">Universidad de Destino</p>
                    <p className="font-medium">{movility.destination}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Ubicación y Docente */}
            <Card className="border-l-4 border-l-amber-500 border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-amber-600">Ubicación y Docente</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-amber-600 font-semibold">Ciudad</p>
                    <p className="font-medium">{movility.city}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-amber-600 font-semibold">País</p>
                    <p className="font-medium">{movility.country}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-amber-600 font-semibold">Tutor</p>
                    <p className="font-medium">{movility.teacher || "Sin tutor responsable"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Evento */}
            <Card className="border-l-4 border-l-cyan-500 border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cyan-500" />
                  <h3 className="text-lg font-semibold text-cyan-600">Evento</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-cyan-600 font-semibold">Tipo de Evento</p>
                    <p className="font-medium">{eventTypeDict[movility.event.eventType.eventTypeId.toString()] || movility.event.eventType.eventTypeId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-cyan-600 font-semibold">Descripción del Evento</p>
                    <p className="font-medium">{movility.event.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
    
            {/* Financiación */}
            <Card className="border-l-4 border-l-emerald-500 border-r shadow-sm rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-500" />
                  <h3 className="text-lg font-semibold text-emerald-600">Financiación</h3>
                </div>
              </div>
              <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {movility.agreement ? (
                    <>
                      <div className="space-y-1 md:col-span-2">
                        <div className="flex items-center gap-2">
                          <Handshake className="h-4 w-4 text-emerald-600" />
                          <p className="text-sm font-medium text-emerald-600">Detalles del convenio</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-emerald-600 font-semibold">Número de convenio</p>
                        <p className="font-medium">{movility.agreement.agreementNumber}</p>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1 md:col-span-2">
                      <p className="text-sm text-emerald-600 font-semibold">Convenio</p>
                      <p className="font-medium">No tiene convenio asociado</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm text-emerald-600 font-semibold">Monto de Financiación</p>
                    <p className="font-medium">${movility.funding}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-emerald-600 font-semibold">Fuente de Financiación</p>
                    <p className="font-medium">{movility.fundingSource}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Botón de cierre */}
        <div className="flex justify-end mt-6">
          <Button onClick={onClose} className="gap-2">
            <X className="h-4 w-4" />
            <span>Cerrar</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
