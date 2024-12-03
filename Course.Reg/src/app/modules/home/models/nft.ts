export interface Nft {
  id: number;
  title: string;
  last_bid?: number;
  price: number;
  creator?: string;
  avatar?: string;
  instant_price?: number;
  ending_in?: string;
  image?: string;
  courseCredit?: string;
  courseFullName?: string;
  courseImg?: string;
  courseName?: string;
  description?: string;
  duration?: number;
}
