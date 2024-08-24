import { Time } from "@angular/common";

export interface Ad {
  id: number;
  title: string;
  description: string;
  ville: string ;
  price: number;
  carburant :string ;
  boiteVitesse :string ;
  timeAgo :string ;
  postedDate: Date;
  brand :string ;
  model :string ;
  year :string ;
  user : {
    id: number;
    username :string
  }
  category: {
    id: number;
    name: string;
  };
  imageSrc?: string; // Chemin de l'image, si applicable
}