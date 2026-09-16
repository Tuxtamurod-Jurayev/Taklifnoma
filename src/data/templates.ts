export type Template = {
    id: string;
    name: string;
    category: string;
    description: string;
    preview: string;
    type: "classic" | "opening";
    premium: boolean;
  };
  
  export const templates: Template[] = [
    {
      id: "elegant",
      name: "Elegant",
      category: "Wedding",
      description: "Nafis va zamonaviy to‘y taklifnomasi",
      preview: "/templates/elegant.jpg",
      type: "classic",
      premium: false,
    },
    {
      id: "romantic",
      name: "Romantic",
      category: "Wedding",
      description: "Yurakcha ochilishi va romantik animatsiyalar",
      preview: "/templates/romantic.jpg",
      type: "opening",
      premium: true,
    },
    {
      id: "minimal",
      name: "Minimal",
      category: "Wedding",
      description: "Sodda va zamonaviy dizayn",
      preview: "/templates/minimal.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "luxury",
      name: "Luxury",
      category: "Wedding",
      description: "Hashamatli va premium ko‘rinish",
      preview: "/templates/luxury.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "floral",
      name: "Floral",
      category: "Wedding",
      description: "Gullar va nafis bezaklar",
      preview: "/templates/floral.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "classic",
      name: "Classic",
      category: "Wedding",
      description: "An’anaviy klassik uslub",
      preview: "/templates/classic.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "cinematic",
      name: "Cinematic",
      category: "Wedding",
      description: "Kino uslubidagi zamonaviy taklifnoma",
      preview: "/templates/cinematic.jpg",
      type: "opening",
      premium: true,
    },
    {
      id: "oriental",
      name: "Oriental",
      category: "Wedding",
      description: "Sharqona naqsh va kompozitsiya",
      preview: "/templates/oriental.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "modern",
      name: "Modern",
      category: "Wedding",
      description: "Minimalist va zamonaviy dizayn",
      preview: "/templates/modern.jpg",
      type: "classic",
      premium: true,
    },
    {
      id: "royal",
      name: "Royal",
      category: "Wedding",
      description: "Qirollik uslubidagi premium dizayn",
      preview: "/templates/royal.jpg",
      type: "classic",
      premium: true,
    },
  ];