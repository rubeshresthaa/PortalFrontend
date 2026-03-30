export interface MyProperitiesResponse{
  success: boolean;
  message: string;
  data: Property[];
  statusCode: number;
}

export interface Property {
  _id: string;
  userId: string;

  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImage: string;

  propertyType: string;
  propertyBeds: number;
  propertyBaths: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
}