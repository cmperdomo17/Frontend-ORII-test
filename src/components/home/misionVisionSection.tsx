import React from 'react';
import { Flag, Lightbulb } from 'lucide-react';

const MissionVisionSection = () => {
    return (
        <section className="mb-16 px-4">
            <div className="grid gap-20 md:grid-cols-2 max-w-6xl mx-auto">
                {/* Misión Card */}
                <div className="bg-[#313891] rounded-2xl px-24 py-20 text-white relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                    
                    <div className="relative z-10">
                        {/* Icon */}
                        <div className="size-20 bg-white rounded-full flex items-center justify-center mb-3 mx-auto">
                            <Flag className="size-10 text-[#313891]" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-3xl font-bold text-center mb-8">
                            Misión
                        </h3>
                        
                        {/* Content */}
                        <p className="text-white/95 leading-relaxed text-center text-base">
                            Fortalecer los lazos de cooperación de la Universidad del Cauca, con instituciones y 
                            entidades a nivel nacional e internacional, promoviendo la movilidad estudiantil, la 
                            investigación conjunta y la difusión de conocimiento, con el fin de fomentar la 
                            excelencia académica y la inclusión social.
                        </p>
                    </div>
                </div>

                {/* Visión Card */}
                <div className="bg-[#313891] rounded-2xl px-24 py-20 text-white relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                    
                    <div className="relative z-10">
                        {/* Icon */}
                        <div className="size-20 bg-white rounded-full flex items-center justify-center mb-3 mx-auto">
                            <Lightbulb className="size-10 text-[#313891]" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-3xl font-bold text-center mb-8">
                            Visión
                        </h3>
                        
                        {/* Content */}
                        <p className="text-white/95 leading-relaxed text-center text-base">
                            Posicionarnos como referentes en la promoción de la internacionalización y la 
                            cooperación académica, consolidando alianzas estratégicas que enriquezcan la 
                            experiencia educativa y contribuyan al desarrollo integral de la comunidad 
                            estudiantil de la Universidad del Cauca y la sociedad en general.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVisionSection;