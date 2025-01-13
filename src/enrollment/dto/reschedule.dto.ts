import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength,ValidateIf } from 'class-validator';


export class RescheduleDto {

    @ValidateIf(o => !o.courseId)
    @IsNumber()
    @IsNotEmpty({ message: 'Class ID is required when Course ID is not provided' })
    classId?: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Strundet ID is required' })
    studentId?: number;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    Comments?: string;

    @IsString()
    @IsNotEmpty()
    billingName: string;

    @IsOptional()
    promotion?: string;

    // Payment Information
    @IsString()
    @IsNotEmpty({ message: 'Credit Card number is required' })
    ccNo: string;

    @IsString()
    @IsNotEmpty({message: 'CVV  is required'})
    CVV: string;

    @IsString()
    @IsNotEmpty()
    CCExpiry?: string;
}