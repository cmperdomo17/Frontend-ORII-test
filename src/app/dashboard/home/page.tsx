'use client';

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Globe2, BookOpen, Users, ArrowRight, GraduationCap, MapPin, Phone, Mail, Clock, Puzzle } from "lucide-react"
import { useAuthStore } from "@/store/auth"
import { UserRole } from "@/types/userType";
import AnimatedSplitText from "@/components/ui/animations/animatedSplitText";
import MissionVisionSection from "@/components/home/misionVisionSection";
import Particles from "@/components/ui/animations/particles";

export default function Home() {
    const userSession = useAuthStore((state) => state.userSession);
    const role: UserRole = (userSession?.role as UserRole);

    return (
        <>
            <section className="relative mb-16 rounded-2xl bg-blueTertiary text-white overflow-hidden">
                {/* Background particles */}
                <div className="absolute inset-0 z-0">
                    <Particles
                        particleColors={["#fff", "#fff"]}
                        className="h-full w-full"
                        particleCount={200}
                        particleSpread={12}
                        speed={0.05}
                        particleBaseSize={200}
                        moveParticlesOnHover={false}
                        alphaParticles={true}
                        disableRotation={false}
                    />
                </div>

                <div className="relative z-10 grid gap-2 lg:grid-cols-2 px-8 py-16 md:px-12 lg:px-18 lg:py-20">
                    <div className="flex flex-col gap-8 lg:gap-10 justify-center">
                        <AnimatedSplitText
                            text="Oficina de Relaciones Interinstitucionales e Internacionales"
                            className="text-3xl font-poppins font-bold sm:text-4xl lg:text-5xl xl:text-6xl leading-tight"
                            x={0}
                            y={20}
                            duration={.4}
                            stagger={0.05}
                        />
                        <p className="max-w-[600px] text-base text-white leading-relaxed">
                            Impulsando la proyección global de la Universidad del Cauca a través de cooperación internacional y movilidad académica.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                            {role === 'SU' ? (
                                <Link href="/dashboard/users">
                                    <Button className="w-full sm:w-auto bg-white text-blueTertiary hover:bg-white/90 font-bold px-8 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                        Gestionar usuarios
                                    </Button>
                                </Link>
                            ) : (role === 'ADMIN' || role === 'USER') && (
                                <>
                                    <Link href="/dashboard/movility">
                                        <Button className="w-full sm:w-auto bg-white text-blueTertiary hover:bg-white/90 font-bold px-8 py-3 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                            Programas de Movilidad
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard/agreements">
                                        <Button className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white/10 font-bold px-8 py-3 text-base transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                                            Convenios Internacionales
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-end">
                        <div className="relative w-72 h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                            {/* Decorative rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse"></div>
                            <div className="absolute inset-4 rounded-full border border-white/30"></div>

                            {/* Main image container */}
                            <div className="absolute inset-8 overflow-hidden rounded-full border-4 border-white shadow-2xl shadow-white/20 bg-blue/20 backdrop-blur-sm">
                                <Image
                                    src="/logos/UNICAUCA_ORII.webp"
                                    alt="ORII - Global education"
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom wave decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>
            </section>

            {/* What is Mobility Section */}
            <section className="mb-16 px-4">
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-12 items-center">
                    <div>
                        <h2 className="text-2xl text-blueSecondary font-bold tracking-tight sm:text-3xl mb-6">
                            ¿Qué es movilidad?
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-8">
                            Proceso mediante el cual el estudiante se involucra, de manera presencial o virtual en actividades de formación académica y científica tanto en programas de pregrado como de posgrado, durante un periodo determinado, en instituciones o entidades nacionales e internacionales.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Intercambio académico</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Es la posibilidad que tiene un estudiante de realizar uno o dos semestres académicos, de manera presencial o virtual, en una institución o entidad nacional o internacional. Bajo esta modalidad, el estudiante debe encontrarse activo en la Institución de origen y matriculado en la Institución de destino.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Pasantía o estancia de investigación</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Se entiende por pasantía de investigación, la posibilidad que tiene un estudiante para participar en actividades científicas en un laboratorio, centro o grupo de investigación, de una institución o entidad nacional o internacional, bajo la tutoría de un investigador en dicha Institución.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Estudios de profundización</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Se denomina así al desarrollo de temáticas que tienen por finalidad actualizar, complementar, integrar y profundizar al estudiante en temas específicos de su carrera y que se pueden realizar a través de seminarios de investigación.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Evento académico</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Es la participación que realiza el estudiante, como ponente o asistente, en eventos académicos a nivel nacional e internacional. Este tipo de movilidad no implica el reconocimiento de créditos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    5
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Curso corto</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Es la participación de los estudiantes en cursos de corta duración ofrecidos por Instituciones nacionales o internacionales sobre temas específicos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-br from-blueTertiary to-blueSecondary rounded-2xl rotate-3 shadow-xl"></div>
                            <div className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blueTertiary/10 rounded-full -translate-y-6 translate-x-6"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blueSecondary/10 rounded-full translate-y-8 -translate-x-8"></div>
                                <div className="relative z-10">
                                    <Image
                                        src="/img/home.webp"
                                        alt="Movilidad Académica"
                                        width={300}
                                        height={300}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Mission and Vision Section */}
            <MissionVisionSection />

            {/* Functionalities Section */}
            <section className="mb-16 px-4">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl text-blueSecondary font-bold tracking-tight sm:text-4xl">Funciones</h2>
                    <p className="mx-auto mt-2 max-w-[700px] text-blueSecondary/80 font-medium">
                        La ORII tendrá las siguientes:
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Primera columna */}
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Desarrollo y Supervisión del Plan de Acción</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Crear y actualizar el plan de acción de la ORII, asegurando su alineación con la misión y visión institucionales.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Fomento de la Movilidad Académica y la Cooperación</h3>
                                <div className="space-y-3">
                                    <p className="text-slate-600 leading-relaxed">
                                        • Promover programas de movilidad para estudiantes y académicos, facilitando el intercambio de conocimientos y experiencias culturales.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed">
                                        • Gestionar, coordinar y supervisar la gestión de convenios y acuerdos de cooperación nacional e internacional, garantizando su correcta ejecución y alineación con los objetivos institucionales.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Segunda columna */}
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Impulso a la Internacionalización y Difusión de Información</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Diseñar estrategias de comunicación para difundir información sobre oportunidades de movilidad y cooperación para la comunidad universitaria en pro de aumentar la visibilidad de la Universidad a nivel internacional.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-blueSecondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold text-blueSecondary mb-2 text-lg">Participación en Redes y Organizaciones Científicas</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Facilitar la participación de la Universidad en redes académicas y científicas, apoyando y coordinando actividades que promuevan la integración y cooperación interinstitucional a nivel nacional e internacional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Objectives Section */}
            <section className="mb-16 px-4">
                {/* Objetivo General */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-blueSecondary rounded-2xl px-12 py-16 text-white relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="size-20 bg-white rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Puzzle className="size-10 text-blueSecondary" />
                            </div>

                            {/* Title */}
                            <h3 className="text-3xl font-bold text-center mb-8">
                                Objetivo General
                            </h3>

                            {/* Content */}
                            <p className="text-white/95 leading-relaxed text-center text-base max-w-3xl mx-auto">
                                Fortalecer y expandir la cooperación académica de la Universidad del Cauca a nivel nacional e internacional, promoviendo la movilidad estudiantil, la investigación conjunta y la difusión de conocimiento, con el propósito de posicionar a la institución como líder en internacionalización y contribuir al desarrollo integral de la comunidad universitaria y la sociedad en general.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Objetivos Específicos */}
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl text-blueSecondary font-bold tracking-tight sm:text-3xl mb-4">
                            Objetivos Específicos
                        </h2>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Objetivo Específico 1 */}
                        <div className="bg-blueTertiary rounded-2xl px-8 py-12 text-white relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
                            <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-7 -translate-x-7"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="size-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <Users className="size-8 text-blueTertiary" />
                                </div>

                                {/* Title */}
                                <h4 className="text-lg font-bold text-center mb-6">
                                    Promover la Movilidad Estudiantil y Académica
                                </h4>

                                {/* Content */}
                                <div className="space-y-4 text-sm text-white/90 leading-relaxed">
                                    <p>
                                        • Facilitar y fomentar programas de intercambio y movilidad para estudiantes, profesores y personal administrativo con instituciones nacionales e internacionales.
                                    </p>
                                    <p>
                                        • Desarrollar acuerdos y convenios con universidades y organizaciones extranjeras que promuevan la participación activa en programas de movilidad.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Objetivo Específico 2 */}
                        <div className="bg-blueTertiary rounded-2xl px-8 py-12 text-white relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
                            <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-7 -translate-x-7"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="size-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <BookOpen className="size-8 text-blueTertiary" />
                                </div>

                                {/* Title */}
                                <h4 className="text-lg font-bold text-center mb-6">
                                    Fomentar la Investigación Conjunta
                                </h4>

                                {/* Content */}
                                <div className="space-y-4 text-sm text-white/90 leading-relaxed">
                                    <p>
                                        • Identificar y establecer colaboraciones con entidades académicas y de investigación que compartan intereses comunes en áreas estratégicas.
                                    </p>
                                    <p>
                                        • Apoyar la creación de proyectos de investigación en colaboración con instituciones internacionales.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Objetivo Específico 3 */}
                        <div className="bg-blueTertiary rounded-2xl px-8 py-12 text-white relative overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
                            <div className="absolute bottom-0 left-0 w-14 h-14 bg-white/5 rounded-full translate-y-7 -translate-x-7"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="size-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <GraduationCap className="size-8 text-blueTertiary" />
                                </div>

                                {/* Title */}
                                <h4 className="text-lg font-bold text-center mb-6">
                                    Fortalecer las Alianzas Estratégicas
                                </h4>

                                {/* Content */}
                                <div className="space-y-4 text-sm text-white/90 leading-relaxed">
                                    <p>
                                        • Establecer y consolidar alianzas con organizaciones, universidades y redes internacionales.
                                    </p>
                                    <p>
                                        • Promover la internacionalización y el desarrollo académico mediante colaboraciones estratégicas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="mb-16 px-4">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl text-blueSecondary font-bold tracking-tight sm:text-3xl mb-4">
                        Contáctanos
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Estamos aquí para apoyarte en tu proceso de internacionalización. Ponte en contacto con nosotros.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-3xl overflow-hidden border-1 border-blueSecondary">
                        <div className="grid md:grid-cols-2">
                            {/* Contact Information */}
                            <div className="p-8 md:p-12 bg-gradient-to-br from-white to-slate-50">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blueSecondary to-blueTertiary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blueSecondary mb-2 text-lg">Ubicación</h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Universidad del Cauca<br />
                                                Edificio Principal, Oficina 203<br />
                                                Popayán, Cauca, Colombia
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blueSecondary to-blueTertiary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blueSecondary mb-2 text-lg">Horario de Atención</h4>
                                            <p className="text-slate-600 leading-relaxed">
                                                Lunes a Viernes<br />
                                                8:00 AM - 12:00 PM<br />
                                                2:00 PM - 6:00 PM
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blueSecondary to-blueTertiary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blueSecondary mb-2 text-lg">Correo Electrónico</h4>
                                            <a
                                                href="mailto:orii@unicauca.edu.co"
                                                className="text-slate-600 hover:text-blueSecondary transition-colors duration-300 underline-offset-4 hover:underline"
                                            >
                                                orii@unicauca.edu.co
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 group hover:transform hover:scale-105 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blueSecondary to-blueTertiary text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blueSecondary mb-2 text-lg">Teléfono</h4>
                                            <a
                                                href="tel:+5728209800"
                                                className="text-slate-600 hover:text-blueSecondary transition-colors duration-300 underline-offset-4 hover:underline"
                                            >
                                                +57 (2) 8209800 Ext. 2630
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Call to Action Button */}
                                <div className="mt-10 pt-8 border-t border-blueSecondary">
                                    <a
                                        href="mailto:orii@unicauca.edu.co"
                                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blueSecondary to-blueTertiary text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-blueSecondary/25 transition-all duration-300 hover:transform hover:scale-105 group"
                                    >
                                        <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                        Envíanos un mensaje
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            </div>

                            {/* Image Section */}
                            <div className="relative bg-gradient-to-br from-blueTertiary to-blueSecondary overflow-hidden">
                                {/* Animated background elements */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
                                    <div className="absolute top-1/4 left-0 w-20 h-20 bg-white/5 rounded-full -translate-x-10 animate-pulse delay-75"></div>
                                    <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-white/10 rounded-full translate-y-12 animate-pulse delay-150"></div>
                                    <div className="absolute bottom-1/4 right-0 w-16 h-16 bg-white/5 rounded-full translate-x-8 animate-pulse delay-300"></div>
                                </div>

                                {/* Logo container */}
                                <div className="relative z-10 flex items-center justify-center h-full min-h-[400px] p-12">
                                    <div className="relative group">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-110"></div>

                                        {/* Main logo container */}
                                        <div className="relative bg-blueTertiary rounded-full p-8 group-hover:transform group-hover:scale-105 transition-all duration-500">
                                            <Image
                                                src="/orii-front/logos/UNICAUCA_ORII.webp"
                                                alt="ORII - Oficina de Relaciones Internacionales"
                                                width={280}
                                                height={280}
                                                className="w-full h-auto object-contain filter"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-blueSecondary/20 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}