import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Steps from "./steps";

import Autoplay from "embla-carousel-autoplay";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import Form4 from "./form4";

const testimonials = [
  {
    id: 1,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    name: "Jean-Pierre Mwamba",
    testimonial:
      "Le Club M a transformé ma vision des affaires. L'accompagnement et les opportunités de networking sont exceptionnels.",
  },
  {
    id: 2,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    name: "Marie Kabila",
    testimonial:
      "Grâce au Club M, j'ai pu développer mon entreprise et rencontrer des partenaires de confiance. Une expérience enrichissante !",
  },
  {
    id: 3,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    name: "Paul Mutombo",
    testimonial:
      "L'écosystème du Club M est unique. Les formations et les échanges entre membres m'ont beaucoup apporté professionnellement.",
  },
  {
    id: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    name: "Sophie Nzeba",
    testimonial:
      "Rejoindre le Club M a été l'une des meilleures décisions de ma carrière. L'entraide et le partage d'expériences sont remarquables.",
  },
  {
    id: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    name: "David Tshisekedi",
    testimonial:
      "Le Club M offre un environnement propice à la croissance. Les événements et les rencontres sont toujours très inspirants.",
  },
  {
    id: 6,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    name: "Agnès Mukendi",
    testimonial:
      "En tant que membre du Club M, j'ai accès à un réseau de qualité et à des ressources précieuses pour mon développement.",
  },
];

const FormMember = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Objet formData complet pour toutes les étapes
  const [formData, setFormData] = useState({
    // Step 1 - Situation actuelle
    statutProjet: "",
    activitePrincipale: "",
    dureeActivite: "",
    businessPlan: "",
    // Step 2 - Niveau entrepreneuriat
    niveauEntrepreneuriat: "",
    connaissancesGestion: "",
    dejaAccompagnee: "",
    structureAccompagnement: "",
    // Step 3 - Attentes
    besoinsPrioritaires: [] as string[],
    objectifPrincipal: "",
    typeAccompagnement: "",
    structureAccompagnementAttente: "",
    // Step 4 - Infos personnelles
    nom: "",
    prenom: "",
    dateNaissance: "",
    telephone: "",
    email: "",
    villePays: "",
    nomEntreprise: "",
    siteWeb: "",
    connuClubM: "",
    connuClubMDetail: "",
    confirmeInfos: false,
    accepteContact: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      const checkboxName = name;
      if (
        checkboxName === "confirmeInfos" ||
        checkboxName === "accepteContact"
      ) {
        setFormData((prev) => ({
          ...prev,
          [checkboxName]: checked,
        }));
      } else {
        // Pour les checkboxes multiples (besoinsPrioritaires)
        setFormData((prev) => {
          const currentValues = prev.besoinsPrioritaires || [];
          if (checked) {
            return {
              ...prev,
              besoinsPrioritaires: [...currentValues, value],
            };
          } else {
            return {
              ...prev,
              besoinsPrioritaires: currentValues.filter((v) => v !== value),
            };
          }
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/membre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message);
        // Rediriger vers la page de confirmation après 1.5 secondes
        setTimeout(() => {
          router.push("/confirmation");
        }, 1500);
      } else {
        setErrorMessage(data.error || "Une erreur est survenue");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Une erreur est survenue lors de l'envoi du formulaire");
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-12">
        <div className="col-span-5">
          <div className="block-img sticky top-0 left-0 h-screen">
            <div className="content-img absolute top-0 left-0 w-full h-full">
              <div className="overlay absolute top-0 left-0 w-full h-full bg-[#00000024] z-10"></div>
              <Image
                src="/images/banner2.png"
                alt="banner"
                fill
                className="object-cover"
              />
              <div className="content-text relative z-20 h-full lg:p-8 flex flex-col">
                <div className="flex mb-10">
                  <button
                    onClick={() => router.back()}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#fff] text-black hover:bg-[#000] shadow-none hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <ArrowLeft size={20}></ArrowLeft>
                  </button>
                </div>
                <div className="mt-auto lg:pr-[50px]">
                  <Carousel
                    setApi={setApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 8000,
                      }),
                    ]}
                  >
                    <CarouselContent className="mt-0">
                      {testimonials.map((testimonial) => (
                        <CarouselItem key={testimonial.id}>
                          <div className="card p-8 rounded-2xl bg-[#0000003b] backdrop-blur-[34px]">
                            <div className="flex items-center mb-4 gap-3">
                              <Avatar className="w-[50px] h-[50px]">
                                <AvatarImage
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                />
                                <AvatarFallback className="bg-muted text-white text-lg">
                                  {testimonial.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-white">
                                <h5 className="font-semibold text-[18px] mb-1">
                                  {testimonial.name}
                                </h5>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      size={14}
                                      className="text-yellow-500"
                                      fill="#e0a009"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-white">
                              {testimonial.testimonial}
                            </p>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-4 gap-1">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <button
                          key={index}
                          onClick={() => scrollTo(index)}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            currentSlide === index
                              ? "bg-white w-4"
                              : "bg-white w-2 opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="flex items-center flex-col justify-center bg-white relative z-20 rounded-[34px] lg:left-[-50px]">
            <div className="container mx-auto px-4 py-16 md:py-16">
              <div className="max-w-2xl mx-auto flex flex-col min-h-screen ">
                <Steps currentStep={currentStep} />
                <div className="my-auto">
                  {currentStep === 1 && (
                    <Form1
                      formData={formData}
                      onChange={handleChange}
                      onRadioChange={handleRadioChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {currentStep === 2 && (
                    <Form2
                      formData={formData}
                      onChange={handleChange}
                      onRadioChange={handleRadioChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {currentStep === 3 && (
                    <Form3
                      formData={formData}
                      onChange={handleChange}
                      onRadioChange={handleRadioChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                    />
                  )}
                  {currentStep === 4 && (
                    <Form4
                      formData={formData}
                      onChange={handleChange}
                      onRadioChange={handleRadioChange}
                      onPrev={prevStep}
                      onSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      errorMessage={errorMessage}
                      successMessage={successMessage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormMember;
