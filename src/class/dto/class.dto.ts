import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDate, IsBoolean } from 'class-validator';

export class ClassDto {
  @IsNotEmpty()
  @IsString()
  title: string;  // The title of the class

  @IsNotEmpty()
  @IsString()
  description: string;  // A description of the class

  @IsNotEmpty()
  @IsNumber()
  categoryId: number; 
  
  address: string;

  @IsNotEmpty()
  @IsNumber()
  classTypeId: number;  

  @IsOptional()
  @IsNumber()
  countryId?: number;  // Optional: Country ID (Foreign Key)

  @IsOptional()
  @IsNumber()
  locationId?: number;  // Optional: Location ID (Foreign Key)

  @IsNotEmpty()
  @IsDate()
  startDate: Date; 

  @IsNotEmpty()
  @IsDate()
  endDate: Date;  
  @IsNotEmpty()
  @IsNumber()
  maxStudent: number;  // Maximum number of students

  @IsNotEmpty()
  @IsNumber()
  minStudent: number;  // Minimum number of students

  @IsNotEmpty()
  @IsNumber()
  price: number;  // Price of the class

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;  // Status (active or inactive)

  @IsString()
  instructorId?: number; 

  @IsOptional()
  @IsBoolean()
  onlineAvailable?: boolean;  // Optional: Online availability flag

  @IsOptional()
  @IsBoolean()
  isCancel?: boolean;  // Optional: Cancellation flag

  @IsOptional()
  @IsString()
  addedBy?: string;  

  @IsOptional()
  @IsString()
  updatedBy?: string;  

  @IsOptional()
  @IsBoolean()
  isDelete?: boolean;  

  @IsOptional()
  @IsString()
  classTime?: string;  // Optional: Class time (e.g., "9:00 AM - 12:00 PM")

  @IsOptional()
  @IsString()
  onlineCourseId?: string;  // Optional: Online course ID

  @IsOptional()
  @IsBoolean()
  isCorpClass?: boolean;  // Optional: Flag for corporate classes

  @IsOptional()
  @IsString()
  hotel?: string;  // Optional: Hotel information

  @IsOptional()
  @IsString()
  hotelEmailId?: string;  // Optional: Hotel email ID

  @IsOptional()
  @IsString()
  hotelContactNo?: string;  // Optional: Hotel contact number

  @IsOptional()
  @IsString()
  flightConfirmation?: string;  // Optional: Flight confirmation

  @IsOptional()
  @IsString()
  carConfirmation?: string;  // Optional: Car confirmation

  @IsOptional()
  @IsString()
  hotelConfirmation?: string;  // Optional: Hotel confirmation
}
